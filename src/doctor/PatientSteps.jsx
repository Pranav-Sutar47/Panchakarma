import React, { useState } from "react";
import Stepper from "./Stepper";

export default function PatientSteps({ selectedPatient }) {
  const [steps, setSteps] = useState(selectedPatient.steps);

  const handleMarkDone = () => {
    // Find first incomplete step
    const nextIndex = steps.findIndex((s) => !s.done);

    if (nextIndex !== -1) {
      const updatedSteps = [...steps];
      updatedSteps[nextIndex].done = true;
      setSteps(updatedSteps);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3">Panchakarma Progress</h3>


       <Stepper steps={steps} />




      {/* Mark Done button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleMarkDone}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
        >
          Mark Done
        </button>
      </div>
    </div>
  );
}
