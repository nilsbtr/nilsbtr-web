import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

const LinkedButton = ({
  link,
  icon,
  text,
}: {
  link: string;
  icon: React.ReactElement;
  text: string;
}) => {
  return (
    <Button asChild className="relative w-full">
      <Link href={link} className="flex items-center w-full">
        <div className="h-full w-8 absolute left-0 pl-2 flex items-center justify-center">
          {React.cloneElement(icon, { className: "h-full w-full" })}
        </div>
        <div className="flex flex-grow justify-center">
          <p className="text-center">{text}</p>
        </div>
      </Link>
    </Button>
  );
};

export default LinkedButton;
