import Image from "next/image";
import Link from "next/link";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { LuArrowUpRight, LuGamepad2 } from "react-icons/lu";

const NavbarContent = ({
  hovered,
}: Readonly<{
  hovered: React.ReactNode;
}>) => {
  return (
    <div className="bg-background w-full sticky rounded-lg border-2 border-border p-3 flex gap-6 items-center">
      {/* Logo */}
      <div className="rounded-md text-transparent hover:bg-accent hover:text-accent-foreground hover:animate-pulse transition-all duration-300">
        <Link href="/" className="flex gap-3 items-center m-2">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={30}
            height={30}
            className="object-contain rounded-full"
          />
          <h3 className="font-mono font-bold tracking-wider bg-gradient-to-r from-primary to-accent inline-block bg-clip-text">
            nilsbtr.de
          </h3>
        </Link>
      </div>
      {/* Desktop */}
      <div className="hidden md:block">
        <GamingPageButton>
          <div
            className={`transition-all duration-500 ease-out transform ${hovered ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
          >
            <Button variant="outline" className="flex items-center gap-2">
              <LuArrowUpRight
                className={`h-[1.2rem] w-[1.2rem] transition-transform duration-500 delay-200 ease-out ${hovered ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
              />
              <p>Gaming Page</p>
            </Button>
          </div>
        </GamingPageButton>
      </div>
      <div className="absolute right-3 flex items-center gap-2">
        {/* Mobile */}
        <div className="md:hidden flex items-center">
          <GamingPageButton>
            <Button variant="outline" size="icon">
              <LuGamepad2 className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </GamingPageButton>
        </div>
        {/* Theme Switcher */}
        <ThemeSwitcher />
      </div>
    </div>
  );
};

const GamingPageButton = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will redirect you to my gaming page{" "}
            <span className="text-primary">punchedyou.de</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button asChild>
              <Link href="https://www.punchedyou.de">Continue</Link>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NavbarContent;
