import React from "react";

export default function DoctorScheduleCard({ doctor, back }) {

    const saveSchedule = () => {
        back();
    }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6">
      
      {/* Left: Doctor Image */}
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={doctor.src}
          alt={doctor.title}
          className="w-48 h-48 object-cover rounded-lg shadow"
        />
      </div>

      {/* Right: Doctor Info + Schedule */}
      <div className="w-full md:w-2/3 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            {doctor.title}
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {doctor.specialization}
          </p>
          
          <div className="mt-4 space-y-2">
            <p className="text-neutral-800 dark:text-neutral-200">
              <span className="font-semibold">Experience:</span> {doctor.experience}
            </p>
            <p className="text-neutral-800 dark:text-neutral-200">
              <span className="font-semibold">Degree:</span> {doctor.degree}
            </p>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Set Working Slots</h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="time"
              className="p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
            />
            <input
              type="time"
              className="p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
            />
          </div>
          <button onClick={saveSchedule} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
