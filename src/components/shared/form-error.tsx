import type { ReactNode } from "react";

/** Message shown above the fields when the server rejects a submission. */
export function FormError({ children }: { children: ReactNode }) {
  return (
    <p
      role="alert"
      className="animate-in rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive duration-300 fade-in-0 slide-in-from-top-1"
    >
      {children}
    </p>
  );
}
