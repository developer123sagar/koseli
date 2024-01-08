import { CustomIcon } from "@/common";
import { OrderProcess } from "@/constants";

export default function Order_Process() {
  const { Process } = OrderProcess;

  return (
    <>
      <div className="mt-20 ">
        <div className="flex flex-col  items-center  justify-center  w-full">
          <h1 className="text-[#333333] font-bold text-[28px]">
            The Order <span className="text-red-600">Process</span>
          </h1>
          <p className="text-[#6f6f6f] font-bold text-center text-[24px]">
            The process of getting food to your doorstep is described below:
          </p>
        </div>

        <div className=" grid grid-cols-2  mx-4 gap-4 mt-10  items-center justify-center ">
          {Process.map((item, index) => (
            <div
              className={`border border-gray-200 rounded-xl admin-header  ${
                index === Process.length - 1 ? "md:w-full flex md:mx-auto" : ""
              } md:h-48 h-32`}
              key={index}
            >
              <div className="flex gap-2  p-3">
                {index % 2 === 0 ? (
                  <>
                    <CustomIcon
                      icon={item.Icon}
                      size={16}
                      className={`text-red-600 text-sm my-auto w-20 h-20 flex items-center justify-center group-hover:text-blue-800 font-semibold 
                }`}
                    />
                    <div className="p-4 w-full ">
                      <h1
                        className={`text-black font-bold text-[16px]   md:text-[32px] ${
                          index === Process.length - 1
                            ? "text-left mx-16"
                            : "text-right"
                        }`}
                      >
                        {item.Title}
                      </h1>
                      <p
                        className={`text-[#999999] md:text-[24px]  text-[12px] text-right ${
                          index === Process.length - 1
                            ? "text-justify mx-16"
                            : "text-right"
                        }`}
                      >
                        {item.Description}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4  w-full">
                      <h1
                        className={`text-black-600 font-bold text-[16px]   md:text-[32px] ${
                          index === Process.length - 1
                            ? "text-right mx-3"
                            : "text-left"
                        }`}
                      >
                        {item.Title}
                      </h1>
                      <p
                        className={`text-[#999999] md:text-[24px]  text-[12px] text-right ${
                          index === Process.length - 1
                            ? "text-right mx-3"
                            : "text-justify"
                        }`}
                      >
                        {item.Description}
                      </p>
                    </div>
                    <CustomIcon
                      icon={item.Icon}
                      size={16}
                      className={`text-red-600 text-sm w-20 h-20 my-auto group-hover:text-blue-800 font-semibold 
                }`}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
