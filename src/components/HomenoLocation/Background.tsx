import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaBicycle, FaCheck } from "react-icons/fa";
import { IoMdPaper } from "react-icons/io";
import { LiaUtensilsSolid } from "react-icons/lia";

export default function Background() {
  return (
    <section className="overflow-hidden  bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
      <div className="flex flex-col  items-center  justify-center  w-full">
        <h1 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
          The Order <span className="text-red-700">Process</span>
        </h1>
        <p className="text-[#6f6f6f] font-bold text-center text-[24px]">
          The process of getting food to your doorstep is described below:
        </p>
      </div>
      <div className="container mx-auto mt-10  ">
        <div className="flex w-full  ">
          {/* 1stpart */}
          <div className="w-[40%]">
            <div className="w-full px-4 ">
              <div className="py-3 sm:py-4  ">
                <div className="w-full admin-header   bg-red-300 h-64 rounded-2xl">
                  <div className="flex gap-6  p-4">
                    <h1 className="text-black w-[15%]  text-sm my-auto  h-20 flex items-center justify-center group-hover:text-blue-800 font-semibold">
                      {" "}
                      <AiOutlineShoppingCart size={96} />
                    </h1>
                    <div className="p-4">
                      <h1
                        className={`text-red-700 font-bold text-[16px]   md:text-[32px]  `}
                      >
                        1. Place Order
                      </h1>
                      <p
                        className={`text-[#999999] md:text-[24px] text-justify  text-[12px] `}
                      >
                        Browse through available dishes and add your desired
                        meal to cart
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 ">
              <div className="py-3 sm:py-4  ">
                <div className="w-full admin-header     h-64 rounded-2xl">
                  <div className="flex gap-6 p-4">
                    <h1 className="text-black w-[15%]  text-sm my-auto  h-20 flex items-center justify-center group-hover:text-blue-800 font-semibold">
                      {" "}
                      <IoMdPaper size={96} />
                    </h1>
                    <div className="p-4">
                      <h1
                        className={`text-red-700 font-bold text-[16px]   md:text-[26px] }`}
                      >
                        2. Order Confirmation
                      </h1>
                      <p
                        className={`text-[#999999] md:text-[24px] text-justify  text-[12px] `}
                      >
                        Our sales representative receives accepts and confirms
                        Your Orders{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 2ndpart */}
          <div className="flex items-center justify-between w-[40%]">
            <div className="w-full px-4 ">
              <div className="py-3 sm:py-4  ">
                <div className="w-full admin-header   bg-red-300 h-64 rounded-2xl">
                  <div className="flex gap-6 p-4">
                    <h1 className="text-black w-[15%]  text-sm my-auto  h-20 flex items-center justify-center group-hover:text-blue-800 font-semibold">
                      {" "}
                      <LiaUtensilsSolid size={96} />
                    </h1>
                    <div className="p-4">
                      <h1
                        className={`text-red-700 font-bold text-[16px]   md:text-[26px]  `}
                      >
                        3. We prepare Your Order
                      </h1>
                      <p
                        className={`text-[#999999] md:text-[24px] text-justify  text-[12px] `}
                      >
                        Your Order is Immediately prepared for pickups
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 3rd part */}
          <div className="w-[40%]">
            <div className="w-full px-4 ">
              <div className="py-3 sm:py-4  ">
                <div className="w-full admin-header   bg-red-300 h-64 rounded-2xl">
                  <div className="flex gap-6 p-4">
                    <h1 className="text-black w-[15%]  text-sm my-auto   h-20 flex items-center justify-center group-hover:text-blue-800 font-semibold">
                      {" "}
                      <FaBicycle size={96} />
                    </h1>
                    <div className="p-4">
                      <h1
                        className={`text-red-700 font-bold text-[16px]   md:text-[32px]  `}
                      >
                        4. Rider Picks Order
                      </h1>
                      <p
                        className={`text-[#999999] md:text-[24px] text-justify  text-[12px] `}
                      >
                        Our stand-by riders pickup your order for delivery."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 ">
              <div className="py-3 sm:py-4  ">
                <div className="w-full admin-header  bg-red-300 h-64 rounded-2xl">
                  <div className="flex gap-6 p-4">
                    <h1 className="text-black w-[15%]  text-sm my-auto   h-20 flex items-center justify-center group-hover:text-blue-800 font-semibold">
                      {" "}
                      <FaCheck size={96} />
                    </h1>
                    <div className="p-4">
                      <h1
                        className={`text-red-700 font-bold text-[16px]   md:text-[26px]  'text-right mx-3' :'text-left'}`}
                      >
                        5. Order Complete
                      </h1>
                      <p
                        className={`text-[#999999] md:text-[24px] text-justify  text-[12px] `}
                      >
                        Your order is delivered to you in you specifed
                        location.You can track rider and rate rider after a
                        successful delivery."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
