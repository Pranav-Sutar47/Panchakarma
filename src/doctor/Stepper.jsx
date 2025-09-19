import React, { useState } from 'react'

export default function Stepper({steps,initialCompletedSteps = 0 }) {
   const [doneSteps, setDoneSteps] = useState(initialCompletedSteps);

  const handleNext = () => {
    if (doneSteps < steps.length) setDoneSteps(doneSteps + 1);
  };

  return (
    <div className="w-full mt-10">
      <div className="flex items-center w-full">
        {steps.map((step, i) => {
          const isDone = i < doneSteps;

          return (
            <div key={i} className="flex items-center flex-1 relative">
              {/* Circle */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 z-10
                  ${isDone ? "bg-green-500 border-green-500 text-white" : "bg-gray-200 border-gray-400 text-gray-600"}`}
              >
                {isDone ? "✔" : i + 1}
              </div>

              {/* Connector line */}
              {i !== steps.length - 1 && (
                <div className="flex-1 h-1 bg-gray-300 relative">
                  <div
                    className="h-1 bg-green-500 absolute top-0 left-0 transition-all duration-300"
                    style={{ width: i < doneSteps ? "100%" : "0%" }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Step names */}
      <div className="flex justify-between mt-2">
        {steps.map((step, i) => (
          <span key={i} className="text-sm text-center w-10 md:w-auto">
            {step}
          </span>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Mark Next Done
      </button>
    </div>
  );
}
