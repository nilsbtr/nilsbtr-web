import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { FaGamepad, FaUser } from "react-icons/fa6";
import { LuAlignJustify } from "react-icons/lu";

const navLinks = [
  { title: "Socials", path: "/socials", icon: <FaUser /> },
  { title: "Gaming", path: "/gaming", icon: <FaGamepad /> },
];

export default function Navbar() {
  return (
    <nav className="bg-background w-full sticky rounded-lg border-2 border-border p-3 flex gap-6 items-center">
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
          <p className="bg-gradient-to-r from-primary to-accent font-semibold text-lg tracking-wide inline-block bg-clip-text">
            nilsbtr.de
          </p>
        </Link>
      </div>
      {/* Desktop */}
      <div className="hidden md:block">
        <ul className="flex items-center gap-6 tracking-wide">
          {navLinks.map(({ title, path, icon }) => (
            <li
              key={title}
              className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              <Link href={path} className="flex items-center gap-2">
                {icon}
                <p>{title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute right-3 flex items-center gap-2">
        {/* Theme Switcher */}
        <ThemeSwitcher />
        {/* Mobile */}
        <div className="md:hidden flex items-center">
          <NavbarSheet />
        </div>
      </div>
    </nav>
  );
}

function NavbarSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <LuAlignJustify className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Navigate</SheetTitle>
        </SheetHeader>
        <ul className="grid gap-4 py-4">
          {navLinks.map(({ title, path, icon }) => (
            <li key={title} className="grid grid-cols-4 items-center gap-4">
              <SheetClose asChild>
                <Link
                  href={path}
                  className="text-foreground flex items-center gap-2"
                >
                  <p>{title}</p>
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4"></div>
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
