import { WobbleCard } from "@/components/ui/wobble-card";
import React from "react";
import DoctorInfoCard from "./DoctorInfoCard";
import DoctorScheduleCard from "./DoctorScheduleCard";

export default function DoctorDash() {
  return (
    <div className="h-screen flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-neutral-900 p-4 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-2xl font-bold text-center text-neutral-800 dark:text-neutral-100">
          Dr. Rohan Teli
        </h1>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto w-full mt-5">
          {/* Patient Satisfaction */}
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-pink-900 ">
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {/* Doctor Info fills available space */}
              <DoctorInfoCard className="w-full" />
            </div>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
            <DoctorScheduleCard/>
          </WobbleCard>
        </div>
      </div>
    </div>
  );
}
