import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Step1 from "@/dashboard/page/FoodOrders/Steps/Step1";
import Step2 from "@/dashboard/page/FoodOrders/Steps/Step2";
import Step3 from "@/dashboard/page/FoodOrders/Steps/Step3";
import { IFoodOrder, Step } from "@/types";
import { RootState, useAppSelector } from "@/redux/store";

const Stepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const selectedItem: IFoodOrder = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );

  useEffect(() => {
    if (selectedItem.status === "acknowledged") {
      setActiveStep(1);
    } else if (selectedItem.status === "preparing") {
      setActiveStep(2);
    } else {
      setActiveStep(0);
    }
  }, [selectedItem?.status]);

  const steps: Step[] = [
    {
      label: "Acknowledge",
      component: <Step1 setActiveStep={setActiveStep} />,
    },
    { label: "Preparing", component: <Step2 setActiveStep={setActiveStep} /> },
    { label: "Ready", component: <Step3 /> },
  ];

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full p-6 rounded-md">
        <div className="flex items-center justify-center mb-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex items-center w-full ${
                index === activeStep ? "text-blue-500" : "text-gray-300"
              }`}
              initial={{ scale: 1, color: "#4B5563" }}
              animate={{
                scale: index === activeStep ? 1.05 : 1,
                color: index === activeStep ? "#79c2d0" : "#455d7a",
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="h-10 w-10 z-10 flex items-center justify-center border border-gray-100 rounded-full shadow-inner">
                {index + 1}
              </span>
              <span className="mx-2">{step.label}</span>
              {index < steps.length - 1 && (
                <div
                  className={`h-px bg-${
                    index < activeStep ? "blue" : "gray"
                  }-500 w-[190px]`}
                />
              )}
            </motion.div>
          ))}
        </div>
        <AnimatePresence initial={false} custom={activeStep}>
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            {steps[activeStep].component}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Stepper;
