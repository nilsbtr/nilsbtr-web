"use client";

import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

import { USER_FILTER_DEFAULTS, type UserListQuery, hasUserFilters } from "../../lib/list-query";
import { FilterSelect } from "../list/filter-select";
import { useListQuery } from "../list/list-query";
import { SearchField } from "../list/search-field";

const ROLE_FILTER_OPTIONS = [
  { value: "all", label: "All roles" },
  { value: "admin", label: "Admins" },
  { value: "user", label: "Users" },
] as const;

const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "Any status" },
  { value: "active", label: "Active" },
  { value: "banned", label: "Banned" },
] as const;

/** Search and filters above the list of users. */
export function UsersToolbar() {
  const { query } = useListQuery<UserListQuery>();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <SearchField
        label="Search users"
        placeholder="Search by name, email or username"
        className="min-w-56 flex-1 sm:max-w-sm"
      />
      <FilterSelect name="role" label="Filter by role" options={ROLE_FILTER_OPTIONS} />
      <FilterSelect name="status" label="Filter by status" options={STATUS_FILTER_OPTIONS} />
      {hasUserFilters(query) && (
        <ClearUserFiltersButton variant="ghost" className="text-muted-foreground" />
      )}
    </div>
  );
}

/** Puts the search and the filters back to their defaults. The sorting stays as it is. */
export function ClearUserFiltersButton(
  props: Pick<ComponentProps<typeof Button>, "variant" | "className">
) {
  const { setQuery } = useListQuery<UserListQuery>();

  return (
    <Button onClick={() => setQuery(USER_FILTER_DEFAULTS)} {...props}>
      Clear filters
    </Button>
  );
}
