const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const DATE_TIME_FORMAT = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

const RELATIVE_FORMAT = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });

const NUMBER_FORMAT = new Intl.NumberFormat("en-US");

/** Units a relative time is expressed in, largest first, with their length in seconds. */
const RELATIVE_UNITS: readonly [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
];

/** A calendar date, like "Oct 10, 2026". */
export function formatDate(date: Date | string | null) {
  if (!date) return "—";
  return DATE_FORMAT.format(new Date(date));
}

/** A date with its time of day, like "Oct 10, 2026, 2:32 PM". */
export function formatDateTime(date: Date | string) {
  return DATE_TIME_FORMAT.format(new Date(date));
}

/** How far a date is from now, like "3 hours ago" or "in 6 days". */
export function formatRelativeTime(date: Date, now = new Date()) {
  const seconds = Math.round((date.getTime() - now.getTime()) / 1000);

  for (const [unit, length] of RELATIVE_UNITS) {
    if (Math.abs(seconds) >= length) {
      return RELATIVE_FORMAT.format(Math.trunc(seconds / length), unit);
    }
  }

  return seconds > 0 ? "in a moment" : "just now";
}

/** A count with thousands separators, like "1,284". */
export function formatCount(count: number) {
  return NUMBER_FORMAT.format(count);
}

/** A count with its noun, like "1 user" or "12 users". */
export function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return `${formatCount(count)} ${count === 1 ? singular : plural}`;
}
