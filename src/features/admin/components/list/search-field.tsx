"use client";

import { type FormEvent, useEffect, useId, useRef } from "react";

import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useListQuery } from "./list-query";

/** Pause after the last keystroke before the list is searched. */
const SEARCH_DELAY_MS = 300;

/**
 * Searches the surrounding list as you type.
 *
 * The input is uncontrolled: the text belongs to whoever is typing, and the
 * list follows a moment later. That way a slow answer to an earlier search
 * can never overwrite what has been typed since.
 */
export function SearchField({
  label,
  placeholder,
  className,
}: {
  /** Accessible name of the field. */
  label: string;
  placeholder: string;
  className?: string;
}) {
  const id = useId();
  const { query, setQuery } = useListQuery<{ q: string; page: number }>();

  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // The delayed search must use the query as it is when the delay ends, not as it was at the keystroke.
  const search = useRef(setQuery);
  useEffect(() => {
    search.current = setQuery;
  }, [setQuery]);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Follow the query when it changes from elsewhere (filters cleared, back button), but never mid-typing.
  useEffect(() => {
    const input = inputRef.current;
    if (input && input !== document.activeElement && input.value.trim() !== query.q) {
      input.value = query.q;
    }
  }, [query.q]);

  function submit(delay: number) {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const q = inputRef.current?.value.trim() ?? "";
      search.current({ q }, { replace: true });
    }, delay);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    submit(0);
  }

  function clear() {
    const input = inputRef.current;
    if (!input) return;

    input.value = "";
    input.focus();
    submit(0);
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <HugeiconsIcon
        icon={Search01Icon}
        strokeWidth={2}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        ref={inputRef}
        id={id}
        type="search"
        defaultValue={query.q}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
        onChange={() => submit(SEARCH_DELAY_MS)}
        className="peer px-8.5 [&::-webkit-search-cancel-button]:appearance-none"
      />
      {/* Only there while the field has text: an empty field shows its placeholder. */}
      <button
        type="button"
        aria-label="Clear search"
        onClick={clear}
        className="absolute inset-y-0 right-0 flex w-9 items-center justify-center rounded-md text-muted-foreground transition-colors peer-placeholder-shown:hidden hover:text-foreground"
      >
        <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-3.5" />
      </button>
    </form>
  );
}
