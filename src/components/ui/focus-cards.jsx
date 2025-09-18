"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function FocusCards({ cards, onSelectDoctor }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onSelectDoctor(card)} // <-- pass doctor on click
          className={cn(
            "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden aspect-[4/3] w-full cursor-pointer transition-all duration-300 ease-out",
            hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
          )}
        >
          <img
            src={card.src}
            alt={card.title}
            className="object-cover absolute inset-0 w-full h-full"
          />
          <div
            className={cn(
              "absolute inset-0 bg-black/50 flex items-end py-4 px-4 transition-opacity duration-300",
              hovered === index ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="text-lg md:text-xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
              {card.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
