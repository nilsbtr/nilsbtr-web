import Image from "next/image";
import React from "react";

import data from "@public/config/socials.json";

const page = () => {
  return (
    <div className="flex justify-center mx-auto w-full">
      <Image
        className="rounded-full"
        src={data.avatar}
        alt={data.name}
        width={100}
        height={100}
      />
    </div>
  );
};

export default page;
