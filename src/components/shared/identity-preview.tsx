import { UserAvatar } from "@/components/shared/user-avatar";
import { cn } from "@/lib/utils";

/**
 * How an account will appear: the avatar drawn from the username, with the
 * name and handle beside it. It heads an account form, set off from the fields
 * by a rule, and follows them as they are typed. Hidden from assistive
 * technology, since it only repeats those fields.
 */
export function IdentityPreview({ username, name }: { username: string; name: string }) {
  return (
    <div aria-hidden="true" className="mb-2 flex items-center gap-4 border-b border-border/60 pb-6">
      {/* Keyed by the seed, so every new face pops in. */}
      <UserAvatar
        key={username}
        seed={username}
        className="size-16 animate-in duration-300 zoom-in-90"
      />
      <div className="min-w-0">
        <p className={cn("truncate font-medium", !name && "text-muted-foreground")}>
          {name || "Your name"}
        </p>
        <p className="truncate text-sm text-muted-foreground">@{username || "username"}</p>
      </div>
    </div>
  );
}
