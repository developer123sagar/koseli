import { Link } from "react-router-dom";
import { CustomIcon, Drawer } from ".";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IcartDatas, removeItem } from "@/redux/cart/cartSliice";
import { AiFillDelete } from "react-icons/ai";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { Header_content } from "@/constants";
import Buttons from "./Button";
export default function Cart() {
  const { userToken } = useAppSelector((state: RootState) => state.signin);
  const { cartDatas } = useAppSelector((state: RootState) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  console.log(isMenuOpen);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const totalPriceOfCart = cartDatas.reduce(
    (sum, item) => sum + calculateTotalPrice(item),
    0
  );
  function calculateTotalPrice(foodItem: IcartDatas) {
    const foodPrice = foodItem.price * foodItem.minQuantity || 0;
    const addonPrices = foodItem.addon
      ? foodItem.addon.map((addon) => addon.extraPrice * addon.quantity || 0)
      : [];
    const totalAddonPrice = addonPrices.reduce((sum, price) => sum + price, 0);
    return foodPrice + totalAddonPrice;
  }
  const dispatch = useAppDispatch();
  const totalQuantity = cartDatas?.reduce(
    (acc, food) => acc + food.minQuantity,
    0
  );
  const { icons } = Header_content;
  return (
    <div>
      <div className="fixed bottom-[10px] sm:bottom-[40px] right-[30px]   text-[70px] cursor-pointer ">
        {!userToken ? (
          ""
        ) : (
          <div className=" items-center   mx-2">
            {icons.map((item, id) => (
              <div className="relative  " key={`${item.img}...${id}`}>
                {item.path ? (
                  <Link to={item.path}>
                    <img
                      src={item.img}
                      alt={item.img}
                      className="w- hover:cursor-pointer hidden"
                    />
                  </Link>
                ) : (
                  <figure>
                    <img
                      src={item.img}
                      alt={item.img}
                      className="md:w-10 w-8 hover:cursor-pointer   "
                      onClick={item.isCart ? handleDrawerOpen : undefined}
                    />
                  </figure>
                )}

                {item.isCart && totalQuantity > 0 && (
                  <div className="absolute -top-4 -right-3 rounded-full   flex items-center justify-center w-7 h-7 text-sm bg-opacity-90 text-black">
                    <motion.span>{totalQuantity}</motion.span>
                  </div>
                )}
              </div>
            ))}
            {userToken && (
              <div className="w-8 h-8  rounded-full md:hidden hidden ">
                <img
                  src={"/profile.png"}
                  alt={"profile"}
                  className="w-8 h-8 object-contain  hover:cursor-pointer"
                  onClick={toggleMenu}
                />
              </div>
            )}
          </div>
        )}

        {/* chat part */}
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        position="right"
        xValue={400}
        width="400px"
      >
        <div className="flex items-center justify-between py-3 px-5  bg-gray-300/30 bg-opacity-80 mb-4">
          <h1 className="text-2xl text-[#292727]">Your Order</h1>
          <span
            onClick={closeDrawer}
            className="w-[2rem] h-[2rem] rounded-full bg-[#fff]  hover:bg-gray-600 transition duration-700 flex items-center justify-center shadow-xl cursor-pointer"
          >
            <div>
              <img loading="lazy" src="/cross.png" alt="" />
            </div>
          </span>
        </div>
        {totalQuantity > 0 ? (
          <div className="mx-4 py-2">
            <ul className="py-2 overflow-hidden">
              <AnimatePresence initial={false}>
                {cartDatas.map((item, id) => (
                  <motion.li
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      opacity: { duration: 0.3 },
                      height: { duration: 0.3 },
                    }}
                    key={`${item._id}${id}`}
                    className="relative"
                  >
                    <div className="flex py-3 items-center justify-between border-b pb-2 group border-gray-200">
                      <div className="flex gap-6 items-center mb-3">
                        <h2 className="font-medium">
                          <span className="text-lggroup-hover:text-[#F3723B] hover:cursor-pointer transition duration-400">
                            <span className="text-[15px]">
                              {" "}
                              {item.minQuantity}{" "}
                            </span>
                            {item.name}
                            <span className="text-xs font-bold">
                              {" "}
                              (Rs.{item.price})
                            </span>
                          </span>
                          <ul className="text-xs flex flex-col gap-2 h-fit">
                            {item.addon.map((item) => (
                              <div key={item._id}>
                                <li>
                                  <span className="text-gray-600">
                                    {item.quantity} {item.name} &nbsp;{" "}
                                  </span>
                                  <span className="font-bold">
                                    +(Rs.{item.extraPrice})
                                  </span>
                                </li>
                              </div>
                            ))}
                          </ul>
                        </h2>
                      </div>
                      <p className="mt-5">
                        Rs.{" "}
                        {item.total +
                          (item?.addon?.reduce(
                            (acc, currentAddon) =>
                              acc +
                              currentAddon.extraPrice * currentAddon.quantity,
                            0
                          ) || 0)}
                      </p>
                      <CustomIcon
                        icon={AiFillDelete}
                        onClick={() => dispatch(removeItem(item))}
                        className="absolute top-1 right-1 hover:cursor-pointer   hover:text-red-500"
                        size={16}
                      />
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="bg-[#e01f2d] py-3 px-4 mt-10 flex justify-between items-center text-white">
              <span className="px-3 py-1 border border-white">
                {totalQuantity}
              </span>
              <Link to="/cart/order">
                <button className="border border-white py-1 px-8">
                  View Details
                </button>
              </Link>
              <p>Rs. {totalPriceOfCart}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full h-full flex justify-center flex-col  lg:gap-4 items-center my-5">
              <p className="text-3xl font-medium">Your Cart is empty</p>
              <img
                className="w-[400px] h-[350px]  object-contain"
                src="/img/empty_cart.gif"
                alt="shop now"
              />
              <div>
                <Link to={"/rest_details/noId"}>
                  <Buttons>Go to Shop</Buttons>
                </Link>
              </div>
            </div>
          </>
        )}
      </Drawer>
    </div>
  );
}
