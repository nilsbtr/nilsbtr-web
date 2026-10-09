import { eyebrowVariants } from "@/components/shared/eyebrow";
import { cn } from "@/lib/utils";

export type CategoryNavItem = {
  /** Id of the section to jump to. */
  id: string;
  label: string;
};

/** In-page navigation for the stack page, which is long enough to need one. */
export function CategoryNav({ items }: { items: readonly CategoryNavItem[] }) {
  return (
    <nav aria-label="Stack categories" className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
      <p className={cn(eyebrowVariants({ size: "sm" }), "shrink-0")}>Jump to</p>
      <ul className="-mx-2 flex flex-wrap">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
