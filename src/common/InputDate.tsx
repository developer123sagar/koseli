import { InputHTMLAttributes } from "react";

export const InputDate: React.FC<
  InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    basis?: number;
    name: string;
  }
> = ({ label, basis = 48, name, value, onChange, ...props }) => {
  return (
    <div className={`basis-[${basis}%] flex flex-col`}>
      <label htmlFor={name}>{label}</label>
      <input
        type="date"
        name={name}
        required
        className={`form-control text-sm py-3 pl-1 rounded placeholder:text-gray-500 border border-gray-200 my-1`}
        value={
          value instanceof Date ? value.toISOString().split("T")[0] : value
        }
        onChange={onChange}
        {...props}
      />
    </div>
  );
};
