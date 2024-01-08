import { CustomIcon } from "@/common";
import Buttons from "@/common/Button";
import { clientLogout } from "@/redux/auth/loginSlice";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { BiHeart, BiTag } from "react-icons/bi";
import { FaBars, FaExchangeAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data } = useAppSelector((state: RootState) => state.fetchDashData);
  const { userToken } = useAppSelector((state: RootState) => state.signin);
  useEffect(() => {
    dispatch(fetchDashboardData({ api: "client/info", token: userToken! }));
  }, [dispatch, userToken]);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsMenuOpen(false);
    dispatch(clientLogout());
    localStorage.removeItem("longitude");

    navigate("/");
  };
  const handleLogin = () => {
    setIsMenuOpen(false);
    navigate("/login");
  };
  const handleRegister = () => {
    setIsMenuOpen(false);
    navigate("/register");
  };
  console.log(isMenuOpen);
  const [showProfile, setshowProfile] = useState(false);

  return (
    <>
      {/* <Drawer isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}> */}
      <header>
        <div>
          <div className="mx-2 ">
            <FaBars
              size={28}
              onClick={() => {
                setshowProfile(!showProfile);
              }}
            />

            {showProfile && (
              <div className="flex w-full    mt-10">
                <div
                  className="bg-[rgba(0,0,0,0.7)] fixed z-30  left-0 right-0  overflow-y-hidden top-0 bottom-0"
                  onClick={() => setshowProfile(false)}
                >
                  {" "}
                </div>
                <div>
                  <aside
                    className={`w-72 overflow-y-scroll scroll  fixed flex   transition-all duration-700 ease-in-out flex-col left-0 scroll h-[100vh] top-0 bg-white z-9999  items-center ${
                      showProfile ? "translate-x-0 " : "translate-x-full "
                    }`}
                  >
                    {userToken ? (
                      <div className="ml-1 ">
                        <div className="flex w-full items-center gap-2 mt-4 mb-1">
                          <div className="w-12 h-20  ">
                            <img
                              src="/user.jfif"
                              alt="user"
                              className="rounded-full bg-blue-300 w-12 h-12 object-cover  mb-2 mt-4"
                            />
                          </div>
                          <div className="flex-col ">
                            <h1 className="font-bold  text-[16px]">
                              {data?.name}
                            </h1>
                            <Link to="/manageaccount">
                              {" "}
                              <h1 className="font-bold text-green-500 ">
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
                              className="flex items-center gap-5 cursor-pointer mt-[0.15rem] py-1 transition duration-500 px-2 "
                              onClick={handleLogout}
                            >
                              <img
                                src={"/logout.png"}
                                alt={"profile"}
                                className="w-5 h-5 object-contain hover:cursor-pointer"
                                onClick={toggleMenu}
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
                                src={"/profile.png"}
                                alt={"profile"}
                                className="w-5 h-5 object-contain hover:cursor-pointer"
                                onClick={toggleMenu}
                              />
                              <span className="text-[16px]    font-bold">
                                Log in
                              </span>
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
                        <div className=" flex">
                          {" "}
                          <img
                            loading="lazy"
                            src="/logo.png"
                            alt=""
                            className=" w-40 h-32"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="mx-2  ">
                        <div className=" flex items-center justify-center ">
                          {" "}
                          <img
                            loading="lazy"
                            src="/logo.png"
                            alt=""
                            className=" w-20 h-20 md:w-[140px]  md:h-[50px] object-cover"
                          />
                        </div>
                        <div className="mt-10">
                          <Buttons
                            variant="destructive"
                            className="flex items-center gap-5 cursor-pointer mt-[0.15rem]  w-52 justify-center mx-auto py-1 transition duration-500 px-2 "
                            onClick={handleRegister}
                          >
                            <span className="text-[16px]   w-full   font-bold">
                              Register
                            </span>
                          </Buttons>
                          <Buttons
                            className="flex items-center gap-5 cursor-pointer mt-[0.15rem] py-1 w-52 mx-auto transition duration-500 px-2 "
                            onClick={handleLogin}
                          >
                            <span className="text-[16px]  w-full font-bold">
                              Log in
                            </span>
                          </Buttons>
                        </div>

                        <hr className=" mt-10"></hr>

                        <div className="flex flex-col gap-4 mt-60 mx-8  ">
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

                        <div className="flex gap-2 mx-5 items-center mt-6  ">
                          <figure className="w-16 h-16 mt-3 ">
                            <img
                              loading="lazy"
                              src="/applogo.jpg"
                              alt="applogo"
                              className="w-full h-full object-contain "
                            />
                          </figure>

                          <h1 className="font-bold items-center  mt-4 ">
                            More Features on <br /> the app
                          </h1>
                        </div>
                        <div className="flex gap-2 mx-2 mt-6">
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
                              <span className="text-[10px]">Download from</span>
                              <span className="text-[10px]">App Store</span>
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </aside>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* </Drawer> */}
    </>
  );
}
