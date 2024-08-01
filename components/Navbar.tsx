"use client";

import NavbarContent from "@/components/NavbarContent";
import { useState } from "react";

const Navbar = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <nav
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <NavbarContent hovered={isHover} />
    </nav>
  );
};

export default Navbar;
