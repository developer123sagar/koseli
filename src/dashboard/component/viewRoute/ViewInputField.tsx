export const ViewInputField = ({
  type = "text",
  value,
  label,
  basis = 30,
}: {
  type?: string;
  value: string | number;
  label: string;
  basis?: number;
}) => {
  return (
    <div className={`basis-full lg:basis-[${basis}%]`}>
      <label className="text-gray-900">{label}</label>
      <input
        type={type}
        value={value}
        disabled
        placeholder={"Not available"}
        className="w-full rounded border-[1.5px] border-stroke  bg-transparent py-3  px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
      />
    </div>
  );
};
