import { motion } from "framer-motion";
import React from "react";

interface ToggleBtnProps {
  toggleName: string;
  isOn: boolean;
  onToggle?: (toggleName: string) => void;
}

const ToggleBtn: React.FC<ToggleBtnProps> = ({
  toggleName,
  isOn,
  onToggle,
}) => {
  const spring = {
    type: "spring",
    stiffness: 200,
    damping: 10,
  };

  const toggleSwitch = () => {
    onToggle!(toggleName);
  };

  return (
    <div
      className={`switch w-[50px] h-[20px] border border-gray-400/60 rounded-full flex items-center justify-start cursor-pointer`}
      style={{ backgroundColor: isOn ? "#3182ce" : "#cbd5e0" }}
      data-ison={isOn}
      onClick={toggleSwitch}
    >
      <motion.div
        className="w-[20px] h-[20px] bg-white drop-shadow-2xl rounded-full"
        layout
        transition={spring}
      />
    </div>
  );
};

export default ToggleBtn;
