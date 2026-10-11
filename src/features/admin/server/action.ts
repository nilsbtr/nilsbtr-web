import "server-only";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { unstable_rethrow } from "next/navigation";

import { isAPIError } from "better-auth/api";
import { z } from "zod";

import { DASHBOARD_ROUTES } from "../lib/routes";
import type { ActionResult } from "../types";
import { type AdminSession, getAdminSession } from "./session";

const FAILURE_MESSAGE = "Something went wrong. Please try again.";

/** A failure the administrator can act on. Its message is shown to them as written. */
export class ActionError extends Error {
  readonly fieldErrors?: Record<string, string>;

  constructor(message: string, fieldErrors?: Record<string, string>) {
    super(message);
    this.name = "ActionError";
    this.fieldErrors = fieldErrors;
  }
}

export type ActionContext = {
  session: AdminSession;
  /** The request's headers, which carry the session on to the auth API. */
  headers: Headers;
};

/** The first problem of every field, keyed by field name. */
function toFieldErrors(error: z.ZodError) {
  const fieldErrors: Record<string, string> = {};

  for (const issue of error.issues) {
    const field = issue.path.join(".");
    fieldErrors[field] ??= issue.message;
  }

  return fieldErrors;
}

/**
 * Runs the body of a dashboard server action.
 *
 * A server action is a public endpoint: anyone can post to it, with any
 * payload. So before the handler runs, the caller has to be an administrator
 * and the input has to pass its schema.
 *
 * The handler returns the action's data, or throws an ActionError for a
 * failure it wants to explain. Either way the dashboard is re-rendered along
 * with the answer: after a change to show it, after a refusal because "that
 * user no longer exists" means the screen was out of date.
 */
export async function runAdminAction<Schema extends z.ZodType, Data = void>(
  schema: Schema,
  input: unknown,
  handler: (input: z.output<Schema>, context: ActionContext) => Promise<Data>
): Promise<ActionResult<Data>> {
  const session = await getAdminSession();
  if (!session) {
    return { ok: false, message: "You need to be signed in as an administrator to do that." };
  }

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Some of the details are not valid.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  try {
    const data = await handler(parsed.data, { session, headers: await headers() });
    return { ok: true, data };
  } catch (error) {
    // Redirects and the like are thrown by Next.js and have to pass through.
    unstable_rethrow(error);

    if (error instanceof ActionError) {
      return { ok: false, message: error.message, fieldErrors: error.fieldErrors };
    }
    if (isAPIError(error)) {
      return { ok: false, message: error.body?.message ?? FAILURE_MESSAGE };
    }

    console.error(error);
    return { ok: false, message: FAILURE_MESSAGE };
  } finally {
    revalidatePath(DASHBOARD_ROUTES.overview, "layout");
  }
}
