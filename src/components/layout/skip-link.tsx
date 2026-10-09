/** Id of the element the skip link jumps to. Set it on the page's `<main>`. */
export const MAIN_CONTENT_ID = "main";

/** First focusable element on every page: lets keyboard users jump past the header. */
export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-60 focus-visible:rounded-md focus-visible:bg-popover focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-popover-foreground focus-visible:shadow-md"
    >
      Skip to content
    </a>
  );
}
