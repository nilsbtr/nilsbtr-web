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
    <Button asChild>
      <Link href={link} className="flex items-center gap-2 w-full">
        <div className="w-6 h-6 flex items-center justify-center">
          {React.cloneElement(icon, { className: "size-10" })}
        </div>
        <p>{text}</p>
      </Link>
    </Button>
  );
};

export default LinkedButton;
