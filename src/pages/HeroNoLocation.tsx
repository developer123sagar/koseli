import LocationAutocomplete from "@/components/LocationAutocomplete/locationAutocomplete";

import getAddressFromLatLng from "@/nonRedux/apiCall";
import { HiLocationMarker } from "react-icons/hi";
import { Dispatch, SetStateAction, useState } from "react";
import { formattedDates, timeSlots } from "@/data/dates";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/store";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/store";
import { fetchClientDetails } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { Modal, Spinner } from "@/common";

interface HeroNoLocationProp {
  setShowEditPopUp: Dispatch<SetStateAction<boolean>>;
  showEditPopUp: boolean;
  askPermission: boolean;
  setLatitude: Dispatch<SetStateAction<string | null>>;
  setLongitude: Dispatch<SetStateAction<string | null>>;
  setAskPermission: Dispatch<SetStateAction<boolean>>;
  latitude: string | null;
  longitude: string | null;
  setPermission: Dispatch<SetStateAction<boolean>>;
  setSelectedTimeSlot: Dispatch<SetStateAction<string>>;
  setCurrentDay: Dispatch<SetStateAction<string>>;
  permission: boolean;
  token: string | null;
  loading: boolean;
  setSliderNumber: Dispatch<SetStateAction<number>>;
  scrollDown: boolean;
  setScrollDown: Dispatch<SetStateAction<boolean>>;
  currentDay: string;
  selectedTimeSlot: string;
}

const HeroNoLocation = (prop: HeroNoLocationProp) => {
  const navigate = useNavigate();
  const [formattedAddress, setFormattedAddress] = useState("");

  const dispatch = useAppDispatch();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  const { userToken } = useAppSelector((state: RootState) => state.signin);
  const { clientDetails } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  useEffect(() => {
    const getFormattedAddress = async () => {
      const addressFormatted = await getAddressFromLatLng(
        prop.latitude,
        prop.longitude,
        "AIzaSyAStOIlU1usyOgrzfZa-WLdlilLGjcmzrE"
      );
      setFormattedAddress(addressFormatted);
    };
    if (prop.latitude !== null && prop.longitude !== null)
      getFormattedAddress();
  }, [prop.askPermission, prop.latitude, prop.longitude]);

  useEffect(() => {
    if (userToken) {
      dispatch(fetchClientDetails(userToken));
    }
  }, [dispatch, userToken]);

  if (
    localStorage.getItem("latitude") !== null &&
    localStorage.getItem("longitude") !== null
  )
    return <Navigate to="/rest_details/noId" />;
  else {
    return (
      <>
        <div className=" overflow-x-hidden ">
          <div className="transform w-full sm:pt-[100px] pt-[50%]  flex sm:justify-center items-center flex-col h-[100vh] md:h-[100vh] mainBg">
            <p className="lg:text-[40px] lg:mb-4 lg:mt-[-150px] mt-[-80px]   md:text-center  text-start text-[28px] mx-4 md:mx-0 text-[black]  font-bold">
              Delicious Meals delivered to Your Doorstep{" "}
            </p>
            <div className="lg:flex items-center gap-10 lg:gap-2 w-full justify-center pt-0 sm:pt-0 pl-[5%] pr-[5%] sm:pl-[20%] sm:pr-[20%]">
              <div className="relative flex-1 ">
                <div className="absolute pt-3 flex justify-center items-center gap-2  h-full  left-[10px] mt-[-6px] lg:mt-0">
                  <HiLocationMarker size={24} />
                </div>
                <LocationAutocomplete
                  setLongitude={prop.setLongitude}
                  setLatitude={prop.setLatitude}
                  setScrollDown={prop.setScrollDown}
                  setPermission={prop.setAskPermission}
                  latitude={prop.latitude}
                  longitude={prop.longitude}
                />

                {prop.latitude !== null && prop.longitude !== null && (
                  <div
                    className={`absolute lg:top-19 right-0  text-white  left-0 pb-3 h-12 overflow-scroll text-center pt-3 bg-[#292b2c]
                cursor-pointer font-bold ${
                  prop.scrollDown ? "scrollDown" : "scrollUp"
                }`}
                    onClick={() => navigate("/rest_details/noId")}
                  >
                    <h5>{formattedAddress}</h5>
                  </div>
                )}
                <div
                  className={`absolute flex justify-center ${
                    prop.longitude !== null && prop.latitude !== null
                      ? "lg:top-29 top-25"
                      : "lg:top-19 top-15"
                  } right-0  text-white  left-0 p-3 text-center ${
                    prop.permission ? "bg-[#d9534f]" : "bg-[#292b2c]"
                  }  cursor-pointer font-bold ${
                    prop.scrollDown ? "scrollDown" : "scrollUp"
                  }`}
                  onClick={() => {
                    prop.setAskPermission(true);
                  }}
                >
                  <h5 className="text-center">
                    {" "}
                    {prop.loading ? (
                      <Spinner btn />
                    ) : (
                      "Set your current address"
                    )}{" "}
                  </h5>
                </div>
              </div>
              <div
                className={`h-[60px] flex justify-between text-black font-bold cursor-pointer relative lg:mt-0 ${
                  prop.scrollDown &&
                  prop.latitude !== null &&
                  prop.longitude !== null
                    ? "mt-22"
                    : prop.scrollDown &&
                      prop.latitude === null &&
                      prop.longitude === null
                    ? "mt-12"
                    : "mt-5"
                }`}
              >
                <div className="flex items-center absolute  top-[18px]  left-[12px] mt-[-1px]  lg:mt-2">
                  <FaClock size={20} />
                </div>
                <div className={"w-full  lg:mt-2 "}>
                  <select
                    value={prop.showEditPopUp ? "schedule" : "delivery "}
                    className="h-[60px] pl-12 pr-2 w-full bg-[rgb(235,235,235)] text-black    font-bold cursor-pointer"
                    onChange={(e) => {
                      if (e.target.value === "schedule")
                        prop.setShowEditPopUp(true);
                        setIsDetailModalOpen(true)
                    }}
                  >
                    <option
                      className=""
                      value="delivery"
                      onClick={() => navigate("/rest_details/noId")}
                    >
                      {" "}
                      Deliver now
                    </option>
                    <option value="schedule">Schedule for later </option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => {
                  if (prop.latitude !== null || prop.longitude !== null) {
                    prop.setSliderNumber(0);
                    navigate("/rest_details/noId");
                  }
                }}
                className="bg-[#e01f2d] lg:w-32 w-full mt-4 p-2  h-[62px] text-white cursor-pointer font-bold "
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <Modal
          maxWidth="sm:max-w-[28rem] relative"
          isOpen={isDetailModalOpen}
          setIsOpen={closeDetailModal}
        >
           <div className={ ` ${!prop.showEditPopUp && "hidden"}`}
            // className={`${
            //   !prop.showEditPopUp && "hidden"
            // } absolute left-[35%] md:left-[35%] top-[11%] md:top-[10%] bg-white  z-10 overflow-y-auto`}
          >
            <div className="md:p-[24px] p-[12px] w-[16rem] md:w-[410px] ">
              <div className="do text-[12px] md:text-[32px] font-bold  ht mb-2px md:mb-[24px]">
                Pick a time
              </div>
              <div className="be md:text-[16px] text-[10px] leading-[12px] md:leading-[24px]">
                <div className="ct  ak">
                  <select
                    aria-label="Select delivery date"
                    className="hz aj cursor-pointer"
                    onChange={(e) => prop.setCurrentDay(e.target.value)}
                  >
                    {formattedDates.map((dt, i) => (
                      <option value={dt} key={i} className="gk">
                        {dt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className=""></div>
              <div className="be md:text-[16px] text-[10px] leading-[12px] md:leading-[24px]">
                <div className="ct ak">
                  <select
                    aria-label="Select delivery date"
                    className="hz aj cursor-pointer"
                    onChange={(e) => prop.setSelectedTimeSlot(e.target.value)}
                  >
                    {timeSlots.map((ts, i) => (
                      <option value={ts} key={i} className="gk">
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                aria-label="Save scheduled delivery preference"
                className="  bg-black text-white rounded md:p-4 p-2 ct  mt-[10px] md:mt-[24px]"
                onClick={() => {
                  if (prop.latitude !== null || prop.longitude !== null) {
                    prop.setSliderNumber(1);
                    if (prop.currentDay === "") {
                      prop.setCurrentDay(formattedDates[0]);
                    }
                    if (prop.selectedTimeSlot === "") {
                      prop.setSelectedTimeSlot(timeSlots[0]);
                    }
                    localStorage.setItem("currentDay", prop.currentDay);
                    localStorage.setItem(
                      "selectedTimeSlot",
                      prop.selectedTimeSlot
                    );
                    if (!userToken) navigate("/rest_details/noId");
                    else navigate("/rest_details/noId");
                  } else alert("You need to enter the address first");
                }}
              >
                Schedule
              </button>
              <button
                onClick={() => {
                  if (prop.latitude !== null || prop.longitude !== null) {
                    prop.setSliderNumber(0);
                    if (!userToken) navigate("/rest_details/noId");
                    else {
                      if (clientDetails.phone) navigate("/rest_details/noId");
                      else navigate("/manageAccount");
                    }
                  }
                }}
                className=" bg-gray-100 text-black rounded md:p-4 p-2 ct  mt-[10px] md:mt-[24px] "
              >
                Deliver now
              </button>
            </div>
          </div> 
        </Modal>
      </>
    );
  }
};
export default HeroNoLocation;
