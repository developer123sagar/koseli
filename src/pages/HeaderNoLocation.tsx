import Drawer from "@/common/Drawer";

import { CustomIcon, Menu } from "@/common";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { clientLogout } from "@/redux/auth/loginSlice";
import { AiOutlineSetting } from "react-icons/ai";
import { BiPurchaseTag } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { fetchClientDetails } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { BiTag, BiHeart } from "react-icons/bi";
import { FaExchangeAlt } from "react-icons/fa";
import { baseImgUrl } from "@/routes";

import Buttons from "@/common/Button";

export default function HeaderNoLocation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { userToken } = useAppSelector((state: RootState) => state.signin);
  const { clientDetails } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchClientDetails(userToken));
  }, [dispatch, userToken]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 0);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    dispatch(clientLogout());
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleDrawer = () => {
    setIsDrawerOpen(true);
  };

  return (
    <>
      <header>
        <div
          className={`fixed  top-0 left-0  md:px-20  px-6 shadow-slate-200 w-full  bg-white h-[4.5rem]  flex  z-20 '} ${
            !userToken ? " justify-between items-center " : "flex items-center "
          } ${isScrolled && "shadow-lg  "} `}
        >
          {/* logo */}
          <div className=""></div>
          {userToken ? (
            <FaBars
              onClick={handleDrawer}
              className="cursor-pointer    "
              size={24}
            />
          ) : (
            <div>
              <FaBars
                className="cursor-pointer  h-10 w-4 md:h-6 md:w-10"
                onClick={handleDrawer}
              />
            </div>
          )}
          <figure className="flex w-full  mx-4">
            <Link to="/">
              <img
                loading="lazy"
                src="/logo.png"
                alt="Koseli"
                className="w-24   md:w-32 h-16  object-cover"
              />
            </Link>
          </figure>

          {/* navLinks */}
          <div className="flex gap-10  ">
            {/* nav icons */}
            <div className="flex gap-4 md:mx-0">
              {!userToken ? (
                <div className={`flex pt-0 gap-2`}>
                  <Link to={"/login"}>
                    <button
                      className={` text-[12px] md:text-[18px] px-5 py-2 
                      bg-[#e01f2d] text-white font-bold flex items-center justify-center gap-2 text-center `}
                    >
                      <img
                        loading="lazy"
                        src="/profile.png"
                        alt="user"
                        className="w-3 md:w-6 "
                      />{" "}
                      Login{" "}
                    </button>
                  </Link>
                  <Link to={"/admin/login"}>
                    <button
                      className={` text-[12px] md:text-[18px] px-5 py-2
                    bg-[#27d119] text-white font-bold  items-center justify-center hidden md:flex  gap-2 text-center`}
                    >
                      Vendor
                    </button>
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <Menu y={80} isMenuOpen={isMenuOpen} closeMenu={closeMenu}>
            <>
              <Link
                to={"/userprofile"}
                className="flex flex-col mt-2  w-[150px]"
              >
                <div
                  className="flex items-center gap-3  cursor-pointer py-1 transition duration-500 px-2"
                  onClick={closeMenu}
                >
                  <img
                    src={"/profile.png"}
                    alt={"profile"}
                    className="w-5 h-5 object-contain  hover:cursor-pointer"
                    onClick={toggleMenu}
                  />

                  <span className="text-sm font-bold">Profile</span>
                </div>
                <Link
                  to={"/myorders"}
                  className="flex items-center gap-3 cursor-pointer py-1 transition duration-500 px-2"
                  onClick={closeMenu}
                >
                  <BiPurchaseTag size={20} className="text-gray-500" />
                  <span className="text-sm font-bold">My orders</span>
                </Link>
                <div
                  className="flex items-center gap-3 cursor-pointer py-1 transition duration-500 px-2"
                  onClick={closeMenu}
                >
                  <AiOutlineSetting size={20} className="text-gray-500" />
                  <span className="text-sm font-bold text-gray-800">
                    Settings
                  </span>
                </div>
              </Link>
              <div className="mx-1 border-b-[1px] border-[#e01f2d] mt-1" />
              <div
                className="flex items-center gap-3 cursor-pointer mt-[0.15rem] py-1 transition duration-500 px-2"
                onClick={handleLogout}
              >
                <img
                  src={"/logout.png"}
                  alt={"profile"}
                  className="w-5 h-5 object-contain hover:cursor-pointer"
                  onClick={toggleMenu}
                />
                <span className="text-sm font-bold">Log out</span>
              </div>
            </>
          </Menu>
        </div>
      </header>
      <Drawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        position="left"
        xValue={-400}
        width="300px"
      >
        {userToken ? (
          <div className="mx-2  ">
            <div className="flex w-full  mt-4">
              <div>
                <aside className="">
                  <div className="ml-1  ">
                    <div className=" flex">
                      {" "}
                      <img
                        src="/logo.png"
                        alt=""
                        className=" w-20 h-20 md:w-[140px]  md:h-[50px] object-cover"
                      />
                    </div>
                    <div className="flex w-full items-center gap-2  mb-1">
                      <div className="w-12 h-20  ">
                        <img
                          src={
                            clientDetails?.isGoogleLinked
                              ? clientDetails?.uploadPhoto
                                ? `${baseImgUrl}/${clientDetails?.photo}`
                                : `${clientDetails?.photo}`
                              : `${baseImgUrl}/${clientDetails?.photo}`
                          }
                          alt="user"
                          className="rounded-full bg-blue-300 w-12 h-12 object-cover   mb-2 mt-4"
                        />
                      </div>
                      <div className="flex-col ">
                        <h1 className="font-bold  text-[16px]">
                          {clientDetails?.name}
                        </h1>
                        <Link to="/manageaccount">
                          {" "}
                          <h1 className="font-bold  text-green-500">
                            Manage Account
                          </h1>
                        </Link>
                      </div>
                    </div>
                    <ul className="w-full  flex-col   text-[16px] scroll text-black font-bold">
                      {[
                        { name: "Orders", path: "/myorders", icon: BiTag },
                        {
                          name: "Wishlist",
                          path: "/wishlist",
                          icon: BiHeart,
                        },

                        {
                          name: "Change Address",
                          path: "/change/deliveryAddress",
                          icon: FaExchangeAlt,
                        },
                      ].map((item) => (
                        <Link
                          to={item.path}
                          key={item.name}
                          className="flex items-center  hover:bg-[#ffffff38]  mb-3  gap-6 px-2 "
                        >
                          <CustomIcon
                            icon={item.icon}
                            size={20}
                            className="w-4 text-black h-8 "
                          />
                          <li className=" text-[16px]">{item.name}</li>
                        </Link>
                      ))}

                      {userToken ? (
                        <div
                          className="flex items-center gap-5 cursor-pointer  mt-[0.15rem] py-1 transition duration-500 px-2 "
                          onClick={handleLogout}
                        >
                          <img
                            src={"/logout.png"}
                            alt={"profile"}
                            className="w-5 h-5 object-contain hover:cursor-pointer"
                          />
                          <span className="text-[16px]    font-bold">
                            Log out
                          </span>
                        </div>
                      ) : (
                        <div
                          className="flex items-center gap-5 cursor-pointer mt-[0.15rem] py-1 transition duration-500 px-2 "
                          onClick={handleLogin}
                        >
                          <img
                            src={"/logout.png"}
                            alt={"profile"}
                            className="w-5 h-5 object-contain hover:cursor-pointer"
                          />
                          <span className="text-[16px] font-bold">Log in</span>
                        </div>
                      )}
                    </ul>
                    <hr />
                    <div className="flex flex-col gap-4  mt-6 mx-2  ">
                      <Link to="/restaurant/add">
                        <h1 className="w-full  cursor-pointer   text-[16px]  text-black font-bold">
                          Add Your Restaurant
                        </h1>
                      </Link>
                      <Link to="/rider/add">
                        <h1 className="w-full  cursor-pointer   text-[16px]  text-black font-bold">
                          Add Your Rider
                        </h1>
                      </Link>
                    </div>

                    <div className="flex gap-2  mt-6  ">
                      <figure className="w-16 h-16 mt-3 ">
                        <img
                          src="/applogo.jpg"
                          alt="applogo"
                          className="w-full h-full object-contain "
                        />
                      </figure>

                      <h1 className="font-bold items-center  mt-4 ">
                        More Features on <br /> the app
                      </h1>
                    </div>
                    <div className="flex gap-2 items-center justify-center mt-6">
                      <button className="px-2 flex items-center  gap-3 h-12 w-[110px] bg-white admin-header opacity-90 text-black font-bold rounded">
                        <img
                          src="/img/Home/GooglePlay.png"
                          alt="googleplay"
                          className="w-6 "
                        />

                        <span className="flex flex-col ">
                          <span className="text-[10px]">Google Play</span>
                        </span>
                      </button>
                      <button className="px-2 flex items-center gap-3 h-12 w-[140px] admin-header opacity-90 text-black bg-white font-bold rounded">
                        <span className="icon">
                          <svg
                            fill="currentcolor"
                            viewBox="-52.01 0 560.035 560.035"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#ffffff"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.376 102.429 55.552-2.652 1.644-61.159 35.704-60.523 106.559M310.369 89.418C329.926 65.745 343.089 32.79 339.498 0 311.308 1.133 277.22 18.785 257 42.445c-18.121 20.952-33.991 54.487-29.709 86.628 31.421 2.431 63.52-15.967 83.078-39.655"></path>
                            </g>
                          </svg>
                        </span>

                        <span className="flex flex-col">
                          <span className="text-[10px]">App Store</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        ) : (
          <div className=" flex-col items-center justify-center  mx-6">
            <div className=" flex   justify-center ">
              {" "}
              <img
                src="/logo.png"
                alt=""
                className=" w-20 h-20 md:w-[140px]  md:h-[50px] object-cover"
              />
            </div>
            <div className="md:mt-10 mt-2  mb-4 md:mb-72 ">
              <Buttons
                variant="destructive"
                className="flex gap-5 cursor-pointer mt-[0.15rem] items-center w-full   py-1 transition duration-500 px-2 "
                onClick={handleRegister}
              >
                <span className="text-[16px]   w-full   font-bold">
                  Register
                </span>
              </Buttons>
              <Buttons
                className="flex items-center gap-5 cursor-pointer mt-[0.15rem] py-1 w-full   transition duration-500 px-2 "
                onClick={handleLogin}
              >
                <span className="text-[16px]  w-full font-bold">Log in</span>
              </Buttons>
            </div>

            <hr className=" md:mt-10  mb-4"></hr>

            <div className="flex flex-col gap-4   ">
              <Link to="/rider/add">
                <h1 className="w-full  cursor-pointer    text-[16px]  text-black font-bold">
                  Add Your Rider
                </h1>
              </Link>
              <Link to="/restaurant/add">
                <h1 className="w-full  cursor-pointer  text-[16px]  text-black font-bold">
                  Add Your Restaurant
                </h1>
              </Link>
            </div>

            <div className="flex gap-2  mt-6  ">
              <figure className="w-16 h-16 mt-3 ">
                <img
                  src="/applogo.jpg"
                  alt="applogo"
                  className="w-full h-full object-contain "
                />
              </figure>

              <h1 className="font-bold items-center mt-4 ">
                More Features on <br /> the app
              </h1>
            </div>
            <div className="flex gap-2 items-center justify-center mt-6">
              <button className="px-2 flex items-center  gap-3 h-12 w-[110px] bg-white admin-header opacity-90 text-black font-bold rounded">
                <img
                  src="/img/Home/GooglePlay.png"
                  alt="googleplay"
                  className="w-6 "
                />

                <span className="flex flex-col ">
                  <span className="text-[10px]">Get it on</span>
                  <span className="text-[10px]">Google Play</span>
                </span>
              </button>
              <button className="px-2 flex items-center gap-3 h-12 w-[140px] admin-header opacity-90 text-black bg-white font-bold rounded">
                <span className="icon">
                  <svg
                    fill="currentcolor"
                    viewBox="-52.01 0 560.035 560.035"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.376 102.429 55.552-2.652 1.644-61.159 35.704-60.523 106.559M310.369 89.418C329.926 65.745 343.089 32.79 339.498 0 311.308 1.133 277.22 18.785 257 42.445c-18.121 20.952-33.991 54.487-29.709 86.628 31.421 2.431 63.52-15.967 83.078-39.655"></path>
                    </g>
                  </svg>
                </span>

                <span className="flex flex-col">
                  <span className="text-[10px]">Download from</span>
                  <span className="text-[10px]">App Store</span>
                </span>
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}
