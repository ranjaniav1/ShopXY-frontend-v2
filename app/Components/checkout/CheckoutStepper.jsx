"use client";
import { usePathname } from "next/navigation";

const Stepper = ({ steps }) => {
  const pathname = usePathname();

  const activeStep = pathname.includes("payment")
    ? 2
    : pathname.includes("address")
    ? 1
    : 0;

  return (
    <>
      <div className="hidden sm:flex justify-center py-6">
        <div className="flex w-full max-w-4xl items-center justify-between relative">
          {steps.map((step, index) => {
            const isCompleted = index < activeStep;
            const isActive = index === activeStep;
            return (
              <div key={index} className="flex flex-col items-center flex-1 relative">
                {index !== steps.length - 1 && (
                  <div className="absolute top-4 right-0 left-1/2 transform translate-x-1/2 h-0.5 bg-gray-300 z-[-1]">
                    <div
                      className={`h-full ${isCompleted ? "bg-primary" : "bg-gray-300"} w-full`}
                    />
                  </div>
                )}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 z-10
                    ${
                      isCompleted
                        ? "bg-primary text-white border-primary"
                        : isActive
                        ? "bg-white text-primary border-primary"
                        : "bg-gray-200 text-gray-500 border-gray-300"
                    }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-sm mt-2 text-center ${
                    isCompleted || isActive ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="sm:hidden text-center text-sm py-2 text-primary">
        Step {activeStep + 1} of {steps.length}: {steps[activeStep]}
      </div>
    </>
  );
};

export default Stepper;