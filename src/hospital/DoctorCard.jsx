"use client";
import React from "react";
import { cn } from "@/lib/utils";

export default function DoctorCard({ doctor, index, hovered, setHovered }) {
  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative flex items-center justify-center w-full rounded-xl overflow-hidden shadow-md bg-gray-100 dark:bg-neutral-900 transition-all duration-300 ease-out",
        "h-48 sm:h-56 md:h-64 lg:h-72", // responsive heights
        hovered !== null && hovered !== index && "blur-sm scale-[0.97]"
      )}
    >
      {/* Doctor Image */}
      <img
        src={doctor.src}
        alt={doctor.title}
        className="block max-h-full w-full object-contain"
      />

      {/* Overlay only behind text at bottom */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <p className="text-sm md:text-base font-semibold text-white">
          {doctor.title}
        </p>
      </div>
    </div>
  );
}
