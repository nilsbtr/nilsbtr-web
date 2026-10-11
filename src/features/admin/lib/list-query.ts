import { z } from "zod";

/*
 * The state of the dashboard's lists (search, filters, sorting, page) lives in
 * the URL, so a view can be linked to and survives a reload. The page parses
 * the search parameters on the server; the controls write them back.
 */

/** Search parameters as a page receives them. */
export type RawSearchParams = Record<string, string | string[] | undefined>;

export type ListQuery = Record<string, string | number>;

/** Rows per page, in every list. */
export const PAGE_SIZE = 20;

const pageSchema = z.coerce.number().int().min(1).catch(1);

// Every field falls back to its default, so a mistyped or outdated link still opens the list.
const userListQuerySchema = z.object({
  q: z.string().trim().max(100).catch(""),
  role: z.enum(["all", "admin", "user"]).catch("all"),
  status: z.enum(["all", "active", "banned"]).catch("all"),
  sort: z.enum(["name", "email", "joined", "lastActive"]).catch("joined"),
  dir: z.enum(["asc", "desc"]).catch("desc"),
  page: pageSchema,
});

export type UserListQuery = z.infer<typeof userListQuerySchema>;

export const USER_LIST_DEFAULTS: UserListQuery = userListQuerySchema.parse({});

/** The part of the user list's defaults that narrows it, as opposed to ordering or paging it. */
export const USER_FILTER_DEFAULTS = {
  q: USER_LIST_DEFAULTS.q,
  role: USER_LIST_DEFAULTS.role,
  status: USER_LIST_DEFAULTS.status,
} satisfies Partial<UserListQuery>;

/** Whether a query narrows the list of users at all. */
export function hasUserFilters({ q, role, status }: UserListQuery) {
  return (
    q !== USER_FILTER_DEFAULTS.q ||
    role !== USER_FILTER_DEFAULTS.role ||
    status !== USER_FILTER_DEFAULTS.status
  );
}

const inviteListQuerySchema = z.object({
  state: z.enum(["all", "active", "expired"]).catch("all"),
  page: pageSchema,
});

export type InviteListQuery = z.infer<typeof inviteListQuerySchema>;

export const INVITE_LIST_DEFAULTS: InviteListQuery = inviteListQuerySchema.parse({});

/** A parameter given more than once counts once, with its first value. */
function flatten(searchParams: RawSearchParams) {
  return Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ])
  );
}

export function parseUserListQuery(searchParams: RawSearchParams) {
  return userListQuerySchema.parse(flatten(searchParams));
}

export function parseInviteListQuery(searchParams: RawSearchParams) {
  return inviteListQuerySchema.parse(flatten(searchParams));
}

/** The query string for a list state. Defaults are left out, which keeps URLs short. */
export function serializeListQuery<Query extends ListQuery>(query: Query, defaults: Query) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value !== defaults[key]) params.set(key, String(value));
  }

  return params.toString();
}

/** The address of a list in a given state. */
export function getListHref<Query extends ListQuery>(
  pathname: string,
  query: Query,
  defaults: Query
) {
  const search = serializeListQuery(query, defaults);
  return search ? `${pathname}?${search}` : pathname;
}

/** The last page of a list with `total` rows. An empty list still has one page. */
export function getPageCount(total: number) {
  return Math.max(1, Math.ceil(total / PAGE_SIZE));
}
