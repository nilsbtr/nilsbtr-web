"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { ListQuery } from "../../lib/list-query";
import { useListQuery } from "./list-query";

/** Narrows the surrounding list by one field of its query. */
export function FilterSelect({
  name,
  label,
  options,
}: {
  /** The field of the query this filter sets. */
  name: string;
  /** Accessible name of the control: "Filter by role". */
  label: string;
  options: readonly { value: string; label: string }[];
}) {
  const { query, setQuery } = useListQuery<ListQuery>();

  return (
    <Select
      items={options}
      value={String(query[name])}
      onValueChange={(value) => {
        if (value !== null) setQuery({ [name]: value });
      }}
    >
      <SelectTrigger aria-label={label} className="min-w-34 bg-background">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
