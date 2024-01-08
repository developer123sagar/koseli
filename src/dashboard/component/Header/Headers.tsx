import axios from "axios";
import { CustomIcon, Menu, ToggleBtn } from "@/common";
import { BiBell, BiLogOut } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import ChatDropDown from "../Dropdown/chatDropDown";
import NotiDropDown from "../Dropdown/notificationDropDown";
import { baseImgUrl, url } from "@/routes";
import { IRestaurant } from "@/types";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { FaRegCircleUser } from "react-icons/fa6";
import { logout } from "@/redux/auth/loginSlice";
import { connectSocket } from "@/common/global/socket";
import { Socket } from "socket.io-client";
import {
  fetchRestAdminId,
  fetchRestaurantTables,
} from "@/redux/restaurant/restaurantSlice";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";

export const Headers = () => {
  const isInitialRender = useRef(true);
  const isInitialRender2 = useRef(true);
  const [scrollDownChat, setScrollDownChat] = useState(false);
  const [scrollDownNoti, setScrollDownNoti] = useState(false);
  const [unseenNotifications, setUnseenNotifications] = useState<string>("");
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  const [data, setData] = useState<IRestaurant>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuImg = useMemo(() => data?.mainImage || "", [data?.mainImage]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const token = useAppSelector((state: RootState) => state.signin.token);

  const [sock, setSocket] = useState<Socket>();

  useEffect(() => {
    setSocket(connectSocket(token));
  }, [setSocket, connectSocket, token]);

  useEffect(() => {
    sock &&
      sock.on("ORDER_NOTIFICATION", (content) => {
        console.log(content);
        setUnseenNotifications(content.message);
      });
    return () => {
      sock && sock.disconnect();
    };
  }, []);

  const dispatch = useAppDispatch();

  const { restaurantTables } = useAppSelector(
    (state: RootState) => state.restaurant
  );

  const { role } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    dispatch(fetchRestAdminId(token));
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (role === "restaurant") {
      const getInfo = async () => {
        try {
          const res = await axios.get(`${url}/restaurant/info`, {
            headers: {
              Authorization: token,
            },
          });
          if (res.data.Data._id) {
            localStorage.setItem("bussinnessType", res.data.Data.bussinessType);
            localStorage.setItem("resAdminId", res.data.Data._id);
          }

          setData(res.data?.Data);
        } catch (err) {
          console.log(err);
        }
      };
      getInfo();
    }
  }, [token, role]);

  useEffect(() => {
    if (restaurantTables?.isBookingOpen === true) setToggle(true);
    else if (restaurantTables?.isBookingOpen === false) setToggle(false);
  }, [restaurantTables]);

  useEffect(() => {
    if (data?.isAcceptingOrder === true) setToggle2(true);
    else if (data?.isAcceptingOrder === false) setToggle2(false);
  }, [data]);

  const handleToggleChange = () => {
    setToggle(!toggle);
  };

  const handleToggleChange2 = () => {
    setToggle2(!toggle2);
  };

  useEffect(() => {
    if (data?._id) dispatch(fetchRestaurantTables({ restaurantId: data._id }));
  }, [dispatch, data]);

  const updateBookingStatus = async (value: boolean) => {
    try {
      console.log({ isBookingOpen: value });
      const res = await axios.put(
        `${url}/table/update_bookingstatus`,
        { isBookingOpen: value },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const updateOrderStatus = async (value: boolean) => {
    console.log({ isAcceptionOder: value });
    await dispatch(
      UpdateData({
        api: "restaurant/update",
        form: { isAcceptingOrder: value },
        token: token!,
      })
    );
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (toggle === true) updateBookingStatus(true);
    else if (toggle === false) updateBookingStatus(false);
  }, [toggle]);

  useEffect(() => {
    if (isInitialRender2.current) {
      isInitialRender2.current = false;
      return;
    }

    if (toggle2 === true) updateOrderStatus(true);
    else if (toggle2 === false) updateOrderStatus(false);
  }, [toggle2]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full  bg-[rgb(255,255,255)] border-b  border-gray-200 -z-10">
        <div className="flex h-16 flex-grow items-center justify-between w-full">
          <figure className="flex gap-2">
            <Link to="/dashboard">
              <img
                src="/logo.png"
                alt="Koseli"
                width={200}
                height={100}
                className="object-contain h-24"
              />
            </Link>
            {role === "restaurant" && (
              <>
                {restaurantTables.length > 0 && (
                  <div className="flex w-full justify-center items-center gap-5">
                    <h1
                      className={`form-control w-full py-3 pl-2 ml-10 text-gray-600 mr-[-50px]`}
                    >
                      Booking Open?
                    </h1>
                    <ToggleBtn
                      isOn={toggle}
                      onToggle={handleToggleChange}
                      toggleName="booking"
                    />
                  </div>
                )}
                {(data?.hasDelivery === true || data?.userPickup) && (
                  <div className="flex w-full justify-center items-center gap-5">
                    <h1
                      className={`form-control w-full py-3 pl-2 ml-10 text-gray-600 mr-[-50px]`}
                    >
                      Order accepting?
                    </h1>
                    <ToggleBtn
                      isOn={toggle2}
                      onToggle={handleToggleChange2}
                      toggleName="booking"
                    />
                  </div>
                )}
              </>
            )}
          </figure>
          <div className="flex items-center ">
            <IoSearchOutline size={20} className="text-gray-300" />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Type to search..."
              className="focus:outline-none py-2 pl-4 placeholder:text-gray-300 text-sm text-gray-500"
            />
          </div>
          <div className="flex items-center gap-4 relative">
            {[BiBell].map((item, index) => (
              <div
                key={item}
                className="relative p-2 flex h-8.5 w-8.5 items-center hjustify-center rounded-full border-[0.5px] border-gray-50 shadow-inner bg-gray-100 hover:cursor-pointer"
                onClick={() => {
                  if (index === 0) {
                    setScrollDownChat(false);
                    setScrollDownNoti(!scrollDownNoti);
                  } else {
                    setScrollDownChat(!scrollDownChat);
                    setScrollDownNoti(false);
                  }
                }}
              >
                <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-red-500/70 inline">
                  <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-300 opacity-75" />
                </span>
                <CustomIcon
                  icon={item}
                  size={20}
                  className="text-gray-500 hover:text-blue-500 transition duration-500 hover:cursor-pointer"
                />
              </div>
            ))}
            <ChatDropDown scrollDown={scrollDownChat} />

            <NotiDropDown
              scrollDown={scrollDownNoti}
              notification={unseenNotifications}
            />
            <div className="mr-10 ">
              <div className="cursor-pointer" onClick={toggleMenu}>
                {role == "admin" ? (
                  <img
                    src={`/applogo.jpg`}
                    alt="koseli"
                    width={20}
                    height={20}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <img
                    src={`${baseImgUrl}/${menuImg}`}
                    alt="koseli"
                    width={20}
                    height={20}
                    className="h-10 w-10 rounded-full"
                  />
                )}
              </div>
            </div>

            <Menu
              y={role === "admin" ? 55 : 80}
              isMenuOpen={isMenuOpen}
              closeMenu={closeMenu}
            >
              <>
                <div className="flex flex-col mt-1 w-[150px]">
                  {role === "admin" ? (
                    ""
                  ) : (
                    <div>
                      <Link to="/restroprofile">
                        <div
                          className="flex items-center gap-3 cursor-pointer py-1 transition duration-500 px-2"
                          onClick={closeMenu}
                        >
                          <FaRegCircleUser
                            size={20}
                            className="text-gray-500"
                          />
                          <span className="text-sm font-medium text-gray-800 ">
                            Profile
                          </span>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
                <div
                  className="flex items-center gap-3 cursor-pointer mt-[0.15rem] py-1 transition duration-500 px-2"
                  onClick={handleLogout}
                >
                  <BiLogOut size={20} className="text-gray-500" />
                  <span className="text-sm font-medium   text-gray-800">
                    Log out
                  </span>
                </div>
                <div className="w-fit text-xs my-1 px-3 text-gray-600 font-bold ">
                  ( {role === "admin" ? "Admin" : `${data?.name}`} )
                </div>
              </>
            </Menu>
          </div>
        </div>
      </header>
    </>
  );
};
