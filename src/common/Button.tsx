import React from "react";
import { useNavigate } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "destructive"|"tertiary";
  customColor?: string;
  back?: boolean;
}

const Buttons: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  customColor,
  className,
  back,
  ...props
}) => {
  let btnColor = "";
  switch (variant) {
    case "default":
      btnColor = "bg-[#26d318]";
      break;
    case "primary":
      btnColor = "bg-[#e01f2d]";
      break;
    case "secondary":
      btnColor = "bg-[#3081D0]";
      break;
    case "destructive":
      btnColor = "bg-red-500";
      break;
      case "tertiary":
        btnColor = "bg-[#26d318]";
        break;
    default:
      btnColor = "bg-[#e01f2d]";
      break;
  }

  if (customColor) {
    btnColor = customColor;
  }

  const navigate = useNavigate();

  return (
    <div className="mt-2">
      <button
        onClick={back ? () => navigate(-1) : undefined}
        className={`
          ${btnColor}
          font-bold border rounded px-8 text-center text-white h-[50px] -z-1 ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Buttons;
