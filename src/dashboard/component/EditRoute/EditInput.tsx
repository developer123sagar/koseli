import React, { InputHTMLAttributes } from "react";

export const EditInput: React.FC<
  InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    basis?: number;
    type?: string;
    placeH?: string;
  }
> = ({ label, basis = 30, type = "text", placeH, ...props }) => (
  <div className={`basis-full lg:basis-[${basis}%]`}>
    <label className="mb-1 font-bold text-[#141312]">{label}</label>
    <input
      {...props}
      type={type}
      required
      placeholder={placeH}
      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium form-control active:border-primary"
    />
  </div>
);
