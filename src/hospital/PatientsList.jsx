"use client";
import React, { useState, useRef, useEffect, useId } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion"; 
import { patients } from "./Patients"; 
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function PatientsList() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") setActive(null);
    }

    if (active && typeof active === "object") document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="w-full h-full flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-neutral-900 p-4 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-2xl font-bold text-center text-neutral-800 dark:text-neutral-100">
          Patients
        </h1>
      </div>

      {/* LayoutGroup wraps both list + modal so shared layout works */}
      <LayoutGroup>
        {/* Modal overlay + modal content (fixed at top-level, inside LayoutGroup) */}
        <AnimatePresence>
          {active && typeof active === "object" && (
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-40"
              />

              <div className="fixed inset-0 z-50 grid place-items-center p-4">
                <motion.div
                  layoutId={`card-${active.title}-${id}`}
                  ref={ref}
                  className="w-full max-w-[720px] bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-xl"
                >
                  {/* image part */}
                  <motion.div layoutId={`image-${active.title}-${id}`}>
                    <img
                      src={active.src}
                      alt={active.title}
                      className="w-full h-80 object-contain"
                    />
                  </motion.div>

                  {/* content */}
                  <div className="p-4">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-xl font-semibold text-neutral-800 dark:text-neutral-100"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-sm text-neutral-500 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>

                    <div className="mt-4 text-neutral-700 dark:text-neutral-200">
                      {typeof active.content === "function" ? active.content() : active.content}
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        onClick={() => setActive(null)}
                        className="px-4 py-2 rounded bg-gray-100 dark:bg-neutral-800"
                      >
                        Close
                      </button>
                      <a
                        href={active.ctaLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded bg-green-600 text-white"
                      >
                        {active.ctaText}
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* Scrollable patients list */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
          <ul className="w-full space-y-4">
            {patients.map((card, index) => (
              <motion.li
                key={`card-${card.title}-${id}-${index}`}
                layoutId={`card-${card.title}-${id}`}
                onClick={() => setActive(card)}
                className="p-4 flex flex-col md:flex-row items-center justify-between bg-white dark:bg-neutral-900 rounded-xl shadow-sm cursor-pointer hover:shadow-md"
              >
                <div className="flex items-center gap-4 w-full">
                  <motion.div layoutId={`image-${card.title}-${id}`} className="flex-shrink-0">
                    <img
                      src={card.src}
                      alt={card.title}
                      className="h-20 w-20 md:h-14 md:w-14 rounded-lg object-cover"
                    />
                  </motion.div>

                  <div className="flex-1">
                    <motion.h3
                      layoutId={`title-${card.title}-${id}`}
                      className="font-medium text-neutral-800 dark:text-neutral-100"
                    >
                      {card.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${card.description}-${id}`}
                      className="text-sm text-neutral-500 dark:text-neutral-400"
                    >
                      {card.description}
                    </motion.p>
                  </div>
                </div>

                <button className="mt-3 md:mt-0 px-4 py-2 rounded-full bg-gray-100 hover:bg-green-600 hover:text-white transition">
                  {card.ctaText}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </LayoutGroup>
    </div>
  );
}
