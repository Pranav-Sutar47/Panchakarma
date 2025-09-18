"use client";
import React, { useState } from "react";
import { doctors } from "./DummyDoctors";
import { FocusCards } from "@/components/ui/focus-cards";
import DoctorSchedule from "./DoctorSchedule";

export default function HospitalDash() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <>
      <div className="sticky top-0 z-30 bg-white dark:bg-neutral-900 p-4 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-2xl font-bold text-center text-neutral-800 dark:text-neutral-100">
          {selectedDoctor ? selectedDoctor.title : "Doctors"}
        </h1>
      </div>

      <div className="h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide p-4">
        {!selectedDoctor ? (
          <FocusCards cards={doctors} onSelectDoctor={setSelectedDoctor} />
        ) : (
          <DoctorSchedule doctor={selectedDoctor} onBack={() => setSelectedDoctor(null)} />
        )}
      </div>
    </>
  );
}
