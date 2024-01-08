const NameMark = ({
  label,
  variant,
}: {
  label: string;
  variant: "primary" | "secondary";
}) => {
  let bgColor = "";

  switch (variant) {
    case "primary":
      bgColor = "bg-[#e01f2d]";
      break;
    case "secondary":
      bgColor = "bg-[#26d318]";
      break;
    default:
      bgColor = "bg-blue-700";
      break;
  }

  return (
    <div className={`text-center mt-6`}>
      <h1
        className={`text-2xl font-semibold text-black p-4 rounded-md`}
      >
        {label}
      </h1>
      <div className="flex w-[120px] h-[2px] bg-[#e1e1e1] mx-auto">
        <div className={`w-[60px] h-[2px] ${bgColor} mx-auto`} />
      </div>
    </div>
  );
};

export default NameMark;
