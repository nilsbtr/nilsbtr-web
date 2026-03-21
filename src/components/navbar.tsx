"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  DashboardSquare01Icon,
  Login03Icon,
  Logout03Icon,
  Menu02Icon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/social", label: "Social" },
  { href: "#", label: "Projects" },
  { href: "#", label: "Blog" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme } = useTheme();
  const { data: session, isPending } = authClient.useSession();

  const isAdmin = session?.user?.role === "admin";

  async function handleLogout() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex h-14 animate-in items-center border-b border-border/50 bg-background/80 px-4 backdrop-blur-xl duration-500 fade-in-0 slide-in-from-top-2 sm:px-6">
      <div className="flex-1">
        <Link
          href="/"
          className="font-cursive text-xl tracking-wide text-foreground transition-colors hover:text-primary"
        >
          nilsbtr
        </Link>
      </div>

      {/* Desktop nav links */}
      <div className="hidden items-center gap-1 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === link.href
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-1 items-center justify-end gap-1">
        {/* Mobile nav menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring md:hidden">
            <HugeiconsIcon icon={Menu02Icon} strokeWidth={2} className="size-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {navLinks.map((link) => (
                <DropdownMenuItem
                  key={link.label}
                  onClick={() => router.push(link.href)}
                  className={cn(pathname === link.href && "text-foreground")}
                >
                  {link.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Avatar size="sm">
              <AvatarFallback className="text-xs">
                {isPending ? "..." : session?.user ? getInitials(session.user.name) : "?"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8}>
            <DropdownMenuGroup>
              {session?.user && (
                <>
                  <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem onClick={() => setTheme("light")} className="hidden dark:flex">
                <HugeiconsIcon icon={Sun03Icon} strokeWidth={2} />
                Light Mode
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="flex dark:hidden">
                <HugeiconsIcon icon={Moon02Icon} strokeWidth={2} />
                Dark Mode
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem onClick={() => router.push("/admin")}>
                  <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />
                  Admin
                </DropdownMenuItem>
              )}
              {session?.user ? (
                <DropdownMenuItem onClick={handleLogout}>
                  <HugeiconsIcon icon={Logout03Icon} strokeWidth={2} />
                  Logout
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => router.push("/login")}>
                  <HugeiconsIcon icon={Login03Icon} strokeWidth={2} />
                  Login
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
