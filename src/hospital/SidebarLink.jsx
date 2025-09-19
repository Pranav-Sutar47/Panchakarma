"use client";
import React from "react";
import { cn } from "@/lib/utils";

export function SidebarLink({ link, isActive }) {
  const { label, href, icon, onClick } = link;

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault(); // prevent default page reload
        onClick && onClick();
      }}
      className={cn(
        "cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors",
        isActive ? "bg-gray-300 dark:bg-neutral-700 font-semibold" : ""
      )}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
