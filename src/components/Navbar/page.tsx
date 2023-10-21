"use client";
import React, { useEffect, useState } from "react";
import SearchBox from "../SearchBox/page";
import localFont from "next/font/local";
import { Switch } from "../ui/switch";
import { useTheme } from "next-themes";
import Image from "next/image";

type Props = {};

const fonts1 = localFont({
  src: "../../../public/fonts/Sinoreta_PERSONAL_USE_ONLY.otf",
});
const Page = (props: Props) => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center justify-evenly py-3 bg-black relative ">
      <Image
        src="https://images.unsplash.com/photo-1520531158340-44015069e78e?auto=format&fit=crop&q=80&w=1944&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="grfgre"
        width={1200}
        height={1200}
        className="w-full h-full object-cover absolute top-0 opacity-40 "
      />
      <h1
        style={fonts1.style}
        className="text-sm md:text-3xl z-10 text-neutral-50 tracking-wider"
      >
        Image Gallery
      </h1>

      <div
        onClick={() => setTheme(theme == "light" ? "dark" : "light")}
        className="z-10"
      >
        <Switch />
      </div>
    </div>
  );
};

export default Page;
