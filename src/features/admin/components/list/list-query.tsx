"use client";

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useOptimistic,
  useTransition,
} from "react";

import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { type ListQuery, getListHref } from "../../lib/list-query";

type ListQueryContextValue<Query extends ListQuery> = {
  /** The list's state. It follows a control at once, before the server has answered. */
  query: Query;
  /** Whether the rows on screen are still those of a previous query. */
  isPending: boolean;
  /**
   * Changes part of the query and loads the matching rows. Any change other
   * than turning the page starts again from the first one.
   */
  setQuery: (patch: Partial<Query>, options?: { replace?: boolean }) => void;
};

const ListQueryContext = createContext<ListQueryContextValue<ListQuery> | null>(null);

/**
 * Connects a list's controls to its query, which lives in the URL. The page
 * parses the query on the server and hands it in; the controls below change it
 * through `useListQuery`, which navigates to the new URL.
 */
export function ListQueryProvider<Query extends ListQuery>({
  query,
  defaults,
  children,
}: {
  query: Query;
  defaults: Query;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [current, setOptimistic] = useOptimistic(query);

  const setQuery = useCallback<ListQueryContextValue<Query>["setQuery"]>(
    (patch, { replace = false } = {}) => {
      const next = { ...current, page: defaults.page, ...patch };
      const href = getListHref(pathname, next, defaults);
      // Turning the page starts reading from the top again; everything else stays in place.
      const options = { scroll: patch.page !== undefined };

      startTransition(() => {
        setOptimistic(next);
        if (replace) router.replace(href, options);
        else router.push(href, options);
      });
    },
    [current, defaults, pathname, router, setOptimistic]
  );

  const value = useMemo(
    () => ({ query: current, isPending, setQuery }),
    [current, isPending, setQuery]
  );

  return (
    <ListQueryContext.Provider value={value as unknown as ListQueryContextValue<ListQuery>}>
      {children}
    </ListQueryContext.Provider>
  );
}

/** The query of the surrounding list. `Query` names the part of it the caller works with. */
export function useListQuery<Query extends ListQuery>() {
  const context = useContext(ListQueryContext);
  if (!context) throw new Error("useListQuery must be used inside a ListQueryProvider.");

  return context as unknown as ListQueryContextValue<Query>;
}

/**
 * Holds the rows of a list. While a new query is loading, the previous rows
 * stay in place and dim, unless the answer arrives quickly enough to not need it.
 */
export function ListResults({ className, children }: { className?: string; children: ReactNode }) {
  const { isPending } = useListQuery();

  return (
    <div
      aria-busy={isPending}
      data-pending={isPending ? "" : undefined}
      className={cn(
        "transition-opacity data-pending:opacity-60 data-pending:delay-150 motion-reduce:transition-none",
        className
      )}
    >
      {children}
    </div>
  );
}
