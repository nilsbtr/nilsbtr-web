"use client";

import { useCallback, useTransition } from "react";

import { toast } from "sonner";

import type { ActionResult } from "../types";

const FAILURE_MESSAGE = "Something went wrong. Please try again.";

/**
 * Runs a dashboard server action from the browser.
 *
 * `isPending` stays true until the action has answered and the screen shows
 * the re-rendered data that came with the answer.
 *
 * Failures are reported in a toast. The exception are failures about single
 * fields, which the calling form shows next to the fields instead.
 *
 * Known issue: now and then the re-rendered data only appears with the next
 * update anywhere on the page (a toast, a closing dialog, a hover).
 */
export function useAdminAction<Args extends unknown[], Data>(
  action: (...args: Args) => Promise<ActionResult<Data>>
) {
  const [isPending, startTransition] = useTransition();

  const run = useCallback(
    (...args: Args) =>
      new Promise<ActionResult<Data>>((resolve) => {
        startTransition(async () => {
          let result: ActionResult<Data>;
          try {
            result = await action(...args);
          } catch {
            // The request itself failed: offline, or the server could not answer.
            result = { ok: false, message: FAILURE_MESSAGE };
          }

          if (!result.ok && !result.fieldErrors) toast.error(result.message);
          resolve(result);
        });
      }),
    [action]
  );

  return { run, isPending };
}
