/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import { google_map_api_key, url } from "@/routes";
import { fetchFoodCategory } from "@/redux/foods/foodDetailSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState, ChangeEvent, useRef } from "react";
import { CustomIcon, ImageSlider, Modal, Spinner } from "@/common";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { baseImgUrl } from "@/routes";
import { addCart } from "@/redux/cart/cartSliice";

import {
  fetchRestaurant,
  fetchRestaurantSlots,
  fetchRestaurantTables,
  fetchTableBooked,
} from "@/redux/restaurant/restaurantSlice";
import { IFoodItem, IRestaurant } from "@/types";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillClockFill } from "react-icons/bs";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import TopRestaurantReview from "@/components/Home/ReviewRestaurant";
import TablePopUp from "@/components/TablePopUp/tablePopUp";
import HeaderWithSearch from "@/components/HeaderWithSearch";
import { Dispatch, SetStateAction } from "react";
import Cart from "@/common/Cart";
import ChatView from "@/common/chat/ChatView";
import { useNavigate } from "react-router-dom";

interface Search {
  latitude: string | null;
  longitude: string | null;
  permission: boolean;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  selectedTimeSlot: string;
  sliderNumber: number;
  setSliderNumber: Dispatch<SetStateAction<number>>;
  setLongitude: Dispatch<SetStateAction<string | null>>;
  setLatitude: Dispatch<SetStateAction<string | null>>;
  setScrollDown: Dispatch<SetStateAction<boolean>>;
  setPermission: Dispatch<SetStateAction<boolean>>;
}

export default function BookDetails(props: Search) {
  const [isDataVisible, setIsDataVisible] = useState(false);
  const [loadingKhalti, setLoadingKhalti] = useState(false);
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dayOfTheWeek = date.getDay();

  const { token, role, userToken } = useAppSelector(
    (state: RootState) => state.signin
  );

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const toggleDataVisibility = () => {
    setIsDataVisible(!isDataVisible);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [newData, setNewData] = useState<IFoodItem | null>(null);
  const [filteredData, setFilteredData] = useState<IRestaurant[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [tableImage, setTableImage] = useState<string>(" ");
  const [tableShowId, setTableShowId] = useState<string>(" ");
  const [tableBookedId, setTableBookedId] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [tableBookSeats, setTableBookSeats] = useState<number>(0);
  const [totalSeats, setTotalSeats] = useState<number>(0);

  const clickedDate = new Date(year, month - 1, day);
  const formattedClickedDate = `${clickedDate.getFullYear()}-${(
    clickedDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${clickedDate.getDate().toString().padStart(2, "0")}`;

  const [selectedBookingDate, setSelectedBookingDate] =
    useState<string>(formattedClickedDate);
  const [lat, setLat] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);

  const center = { lat: lat, lng: lon };
  const dispatch = useAppDispatch();

  const { restaurantData, restaurantId, restaurantSlots, restaurantTables } =
    useAppSelector((state: RootState) => state.restaurant);

  useEffect(() => {
    if (restaurantData.length > 0) {
      const filterRestaurant: IRestaurant[] = restaurantData?.filter(
        (item: any) => item._id === restaurantId
      );
      setFilteredData(filterRestaurant);
    }
  }, [restaurantData, restaurantId]);

  useEffect(() => {
    if (filteredData.length > 0) {
      setLat(filteredData[0].geo.coordinates[0]);
      setLon(filteredData[0].geo.coordinates[1]);
    }
  }, [filteredData]);

  useEffect(() => {
    dispatch(fetchFoodCategory({}));
    dispatch(fetchRestaurant());
  }, [dispatch]);

  useEffect(() => {
    if (selectedSlot) {
      dispatch(
        fetchTableBooked({
          restaurantId: restaurantId,
          date: selectedSlot,
          tableId: filteredData[0]._id,
          tkn: userToken,
        })
      );
    }
  }, [dispatch, filteredData, restaurantId, selectedSlot, userToken]);

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (filteredData[0]) {
      dispatch(fetchRestaurantSlots(filteredData[0]._id));
    }
  }, [filteredData, dispatch]);

  useEffect(() => {
    if (filteredData[0]) {
      dispatch(fetchRestaurantTables({ restaurantId: filteredData[0]._id }));
    }
  }, [dispatch, token, role, filteredData]);

  const handleQuantityChange = (quantity: number) => {
    if (newData && newData.minQuantity && newData.price) {
      if (quantity >= 1) {
        const updatedData = {
          ...newData,
          minQuantity: quantity,
          total: newData.price * quantity,
        };
        setNewData(updatedData);
      }
    }
  };

  const handleIncrement = () =>
    handleQuantityChange((newData?.minQuantity || 0) + 1);

  const handleDecrement = () =>
    handleQuantityChange((newData?.minQuantity || 0) - 1);

  const handldeCart = () => {
    dispatch(addCart(newData));
    setIsModalOpen(false);
  };
  const [showDescription, setShowDescription] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const reviewRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
    if (descriptionRef.current && !showDescription) {
      descriptionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const toggleReview = () => {
    setShowReview(!showReview);
    if (reviewRef.current && !showReview) {
      reviewRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getDay = (number: number) => {
    if (number > 6) return daysOfWeek[number - 7];
    else return daysOfWeek[number];
  };
  const { clientDetails } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  const navigate = useNavigate();
  const [choosenWeekDay, setNewChoosenWeekDay] = useState<number>(dayOfTheWeek);
  const [clickedValue, setClickedValue] = useState<number>(0);

  const length = 7;
  const myArray = Array.from({ length }, (_, index) => index);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: google_map_api_key,
  });

  console.log(restaurantTables);

  useEffect(() => {
    setSelectedSlot("");
  }, [selectedBookingDate]);

  if (loadingKhalti) return <Spinner />;
  else {
    return (
      <div className="overflow-x-hidden scrollbar-hidden">
        <HeaderWithSearch
          sliderNumber={props.sliderNumber}
          setSliderNumber={props.setSliderNumber}
          setLongitude={props.setLongitude}
          setLatitude={props.setLatitude}
          setScrollDown={props.setScrollDown}
          setPermission={props.setPermission}
          latitude={props.latitude}
          longitude={props.longitude}
          hideSlider={true}
          headerLocation={true}
        />
        <div>
          <ImageSlider
            images={filteredData[0]?.image || []}
            height={20}
            width={100}
          />
        </div>
        <div className="relative w-full  ">
          {filteredData[0] && filteredData[0].vegetarian ? (
            <div className="absolute right-4 translate-y-8 bottom-0  ">
              <img
                loading="lazy"
                src="/img/veglogo.png"
                alt=""
                className="h-24 w-24"
              />
            </div>
          ) : null}
        </div>

        <Modal isOpen={isModalOpen} setIsOpen={closeModal}>
          <div className="flex items-center justify-between py-3 px-5 bg-gray-300/30 bg-opacity-80">
            <h1 className="text-2xl  text-[#292727]">{newData?.name}</h1>
            <span
              onClick={closeModal}
              className="w-[2rem] h-[2rem] rounded-full bg-[#fff] hover:bg-gray-600 transition duration-700 flex items-center justify-center shadow-xl cursor-pointer"
            >
              <div>
                <img loading="lazy" src="/cross.png" alt="" />
              </div>
            </span>
          </div>
          <p className="text-gray-950 mt-2 px-5 text-base">Quantity</p>
          <div className="relative my-3 px-5">
            <CustomIcon
              icon={AiOutlineMinus}
              onClick={handleDecrement}
              className="absolute top-4 left-12 text-gray-400 hover:cursor-pointer hover:text-[#e54350] transition duration-700"
              size={22}
            />
            <input
              type="text"
              min={1}
              className="w-full bg-[#ffff] text-center py-3  focus:outline-none rounded placeholder:text-gray-950 border border-gray-300"
              value={newData?.minQuantity || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleQuantityChange(parseInt(e.target.value))
              }
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <CustomIcon
              icon={AiOutlinePlus}
              onClick={handleIncrement}
              className="absolute top-4  right-12 text-gray-400 hover:cursor-pointer hover:text-[#e54350] transition duration-700"
              size={22}
            />
          </div>
          <div className="w-full mt-6 px-5 flex justify-between">
            <h2>Grand Total</h2>
            <em>Rs. {newData?.total}</em>
          </div>
          <div className="flex gap-2 px-5 my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-transparent border-[1px] hover:border-[#e54350] transition duration-700 border-gray-300 w-full py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handldeCart}
              className="text-white btnBg w-full py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
          <>
            {/* <GoogleMap
              center={center}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
              }}
              zoom={15}
              onClick={handleMapClick}
            >
              {<Marker position={clickedLocation} />}
            </GoogleMap> */}
          </>
        </Modal>

        <Modal isOpen={isDetailModalOpen} setIsOpen={closeDetailModal}>
          <div className="flex items-center justify-between  py-3 px-5 bg-gray-300/30 bg-opacity-80">
            <h1 className=" text-black font-bold text-4xl mb-2">
              {filteredData[0]?.name}
            </h1>
            <span
              onClick={closeDetailModal}
              className="w-[2rem] h-[2rem] rounded-full bg-[#fff] hover:bg-gray-600 transition duration-700 flex items-center justify-center shadow-xl cursor-pointer"
            >
              <div>
                <img loading="lazy" src="/cross.png" alt="" />
              </div>
            </span>
          </div>
          {/* <div>
            <div className="w-full h-[200px] ">
              <>
                <GoogleMap
                  center={center}
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                  }}
                  zoom={15}
                  onClick={handleMapClick}
                >
                  {clickedLocation && <Marker position={clickedLocation} />}
                </GoogleMap>
              </>
            </div>
          </div> */}
          <div className=" mx-4">
            <h1 className=" text-black font-bold text-2xl  mb-2">
              {filteredData[0]?.name}
            </h1>
            <hr />
            <hr />
            <div className="flex justify-between p-4">
              <h1 className="flex items-center">
                <IoLocationSharp size="20" />
              </h1>
              <div>
                <h1>{filteredData[0]?.address}</h1>
                {/* <p> {filteredData[0]?.zipCode}</p> */}
              </div>
              <h1></h1>
            </div>
            <hr />
            <div className="flex justify-between p-6">
              <h1>
                <BsFillClockFill size="20" />
              </h1>
              <h1>Open until</h1>
              {isDataVisible ? (
                <h1>
                  <GrSubtract size="20" onClick={toggleDataVisibility} />
                  {/* Your data here */}
                  <div className=" w-full">
                    <h1> </h1>
                  </div>
                </h1>
              ) : (
                <h1>
                  <GrAdd size="20" onClick={toggleDataVisibility} />
                </h1>
              )}
            </div>
            console.log(handlechangeLocation);
            <hr />
            <div className="flex  justify-between p-6">
              <h1>
                <AiFillStar size="20" />
              </h1>
            </div>
          </div>
        </Modal>
        <div className="flex gap-10 pl-20 p-5 border-b  border-rgb(40,40,40)">
          <h5 onClick={toggleDescription} className="cursor-pointer">
            {" "}
            Description{" "}
          </h5>
          <h5 onClick={toggleReview} className="cursor-pointer ">
            {" "}
            Reviews{" "}
          </h5>
        </div>
        <h1>
          <Cart />
        </h1>
        <h1>
          <ChatView />
        </h1>
        <div className="flex flex-col md:flex-row pb-10 p-2 md:pl-20">
          <div className="   w-full md:w-1/2  ">
            <div
              className="border-b border-rgb(40,40,40)  pb-10"
              ref={descriptionRef}
            >
              <h1 className="text-[20px] md:text-[1.5rem] font-bold lg:pt-17 pt-4">
                {" "}
                Description{" "}
              </h1>
              <p className="mt-3  text-justify mr-2 overflow-x-hidden text-[#6c6c6c]">
                {filteredData[0] && filteredData[0].description}{" "}
              </p>
            </div>

            <div className="border-b border-rgb(40,40,40) pb-10">
              <h1 className="text-[20px] md:text-[1.5rem] font-bold pt-5">
                {" "}
                Gallery{" "}
              </h1>
              <div className="flex  flex-row overflow-x-auto gap-1 cursor-pointer pt-2">
                {filteredData[0] &&
                  filteredData[0].image.map((indvImage, id) => (
                    <img
                      key={id}
                      src={`${baseImgUrl}/${indvImage}`}
                      className="h-[80px] w-[80px] md:h-[120px] md:w-[120px]"
                    />
                  ))}
              </div>
            </div>
            <div className="border-b border-rgb(40,40,40) pb-10">
              <h1 className="text-[20px] md:text-[1.5rem] font-bold pt-5">
                {" "}
                Location{" "}
              </h1>
              <div className="flex flex-wrap gap-1 cursor-pointer pt-2">
                <div className="w-full   md:mx-auto">
                  {/* Adjust the classes above to suit your layout */}
                  <div className="w-full h-96 sm:h-80 md:h-96 lg:h-112 xl:h-128">
                    <div className="w-full h-96  mt-1">
                      {isLoaded && (
                        <GoogleMap
                          center={center}
                          mapContainerStyle={{ width: "100%", height: "100%" }}
                          options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                          }}
                          zoom={15}
                        >
                          <Marker position={center} />
                        </GoogleMap>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-5 " ref={reviewRef}>
              <TopRestaurantReview />
            </div>
          </div>
          {restaurantTables.isBookingOpen ? (
            <div className="w-full  lg:w-1/2  lg:p-10 lg:pl-20  lg:pr-20">
              <div className="box_detail sm:p-6 p-4   booking ">
                <TablePopUp
                  image={tableImage}
                  showTable={showTable}
                  setShowTable={setShowTable}
                  setTableBookedId={setTableBookedId}
                  tableBookedId={tableBookedId}
                  tableId={tableShowId}
                  tableBookSeats={tableBookSeats}
                  totalSeats={totalSeats}
                  setTotalSeats={setTotalSeats}
                />
                <h5 className="md:pl-5   font-bold mb-2  "> Select Table: </h5>
                <div className="flex gap-2 md:pl-5 md:pr-5">
                  {restaurantTables.table.map((table: any, id: number) => (
                    <div
                      key={id}
                      className={`p-5 cursor-pointer border border-solid  ${
                        table.isBooked === true ||
                        tableBookedId.includes(table._id)
                          ? " bg-red-500"
                          : "bg-green-500"
                      }`}
                      onClick={() => {
                        setTableShowId(table._id);
                        setTableImage(table.image);
                        setShowTable(true);
                        setTableBookSeats(table.number_of_seats);
                      }}
                    >
                      <h1 className="text-white"> {table.tableNo} </h1>
                    </div>
                  ))}
                </div>

                <div className="mb-3 mt-5">
                  <div
                    className="horizontal-calendar"
                    style={{ borderTop: "1px solid rgb(230, 230, 230)" }}
                  >
                    <h5 className="sm:pl-5 font-bold mb-2 mt-3">
                      {" "}
                      Select date:{" "}
                    </h5>

                    <div className="date-list-scroll flex sm:pl-5 sm:pr-5 gap-1">
                      {myArray.map((value) => (
                        <div
                          key={value}
                          className={`date-item choosed-day flex-1 pt-2 pb-2  text-center border  border-solid border-gray-200 ${
                            clickedValue === value
                              ? "bg-red-500  text-white"
                              : "bg-white"
                          } ${
                            value >= 3
                              ? "text-[rgb(200,200,200)] "
                              : "cursor-pointer"
                          }`}
                          onClick={() => {
                            if (value < 3) {
                              const clickedDate = new Date(
                                year,
                                month - 1,
                                day + value
                              );
                              const formattedClickedDate = `${clickedDate.getFullYear()}-${(
                                clickedDate.getMonth() + 1
                              )
                                .toString()
                                .padStart(2, "0")}-${clickedDate
                                .getDate()
                                .toString()
                                .padStart(2, "0")}`;

                              if (dayOfTheWeek + value > 6)
                                setNewChoosenWeekDay(dayOfTheWeek + value - 7);
                              else setNewChoosenWeekDay(dayOfTheWeek + value);
                              setClickedValue(value);
                              setSelectedBookingDate(formattedClickedDate);
                            }
                          }}
                        >
                          <div>
                            <p className="date-item-day">
                              {getDay(dayOfTheWeek + value)}
                            </p>
                            <p className="date-item-date ">{day + value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="time-slots-wrapper  sm:p-5">
                  <div
                    className="grid grid-cols-2 gap-4 time-slots m-0 row  justify-content-center align-items-center bg-white  p-5 h-[300px] overflow-auto"
                    style={{ border: "1px solid rgb(230,230,230)" }}
                  >
                    {choosenWeekDay === 0
                      ? restaurantSlots.sunday &&
                        restaurantSlots.sunday.map((slot: any, id: any) => (
                          <div
                            className="slot-item "
                            key={id}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            <div
                              className={`wrapper text-center p-2 border border-solid  hover:border-[rgb(150,150,150)] hover:text-[rgb(50,50,50)] cursor-pointer ${
                                selectedSlot === slot
                                  ? "border-[rgb(150,150,150)] text-[rgb(50,50,50)]"
                                  : "text-[rgb(100,100,100)] border-gray-200"
                              }`}
                            >
                              {slot}
                            </div>
                          </div>
                        ))
                      : choosenWeekDay === 1
                      ? restaurantSlots.monday &&
                        restaurantSlots.monday.map((slot: any, id: any) => (
                          <div
                            className="slot-item"
                            key={id}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            <div
                              className={`wrapper text-center p-2 border border-solid  hover:border-[rgb(150,150,150)] hover:text-[rgb(50,50,50)] cursor-pointer ${
                                selectedSlot === slot
                                  ? "border-[rgb(150,150,150)] text-[rgb(50,50,50)]"
                                  : "text-[rgb(100,100,100)] border-gray-200"
                              }`}
                            >
                              {slot}
                            </div>
                          </div>
                        ))
                      : choosenWeekDay === 2
                      ? restaurantSlots.tuesday &&
                        restaurantSlots.tuesday.map((slot: any, id: any) => (
                          <div
                            className="slot-item"
                            key={id}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            <div
                              className={`wrapper text-center p-2 border border-solid  hover:border-[rgb(150,150,150)] hover:text-[rgb(50,50,50)] cursor-pointer ${
                                selectedSlot === slot
                                  ? "border-[rgb(150,150,150)] text-[rgb(50,50,50)]"
                                  : "text-[rgb(100,100,100)] border-gray-200"
                              }`}
                            >
                              {slot}
                            </div>
                          </div>
                        ))
                      : choosenWeekDay === 3
                      ? restaurantSlots.wednesday &&
                        restaurantSlots.wednesday.map((slot: any, id: any) => (
                          <div
                            className="slot-item"
                            key={id}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            <div className="wrapper text-center p-2 text-[rgb(100,100,100)]">
                              {slot}
                            </div>
                          </div>
                        ))
                      : choosenWeekDay === 4
                      ? restaurantSlots.thursday &&
                        restaurantSlots.thursday.map((slot: any, id: any) => (
                          <div
                            className="slot-item"
                            key={id}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            <div
                              className={`wrapper text-center p-2 border border-solid   hover:border-[rgb(150,150,150)] hover:text-[rgb(50,50,50)] cursor-pointer ${
                                selectedSlot === slot
                                  ? "border-[rgb(150,150,150)] text-[rgb(50,50,50)]"
                                  : "text-[rgb(100,100,100)] border-gray-200"
                              }`}
                            >
                              {slot}
                            </div>
                          </div>
                        ))
                      : choosenWeekDay === 5
                      ? restaurantSlots.friday &&
                        restaurantSlots.friday.map((slot: any, id: any) => (
                          <div
                            className="slot-item"
                            key={id}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            <div
                              className={`wrapper text-center p-2 border border-solid  hover:border-[rgb(150,150,150)] hover:text-[rgb(50,50,50)] cursor-pointer ${
                                selectedSlot === slot
                                  ? "border-[rgb(150,150,150)] text-[rgb(50,50,50)]"
                                  : "text-[rgb(100,100,100)] border-gray-200"
                              }`}
                            >
                              {slot}
                            </div>
                          </div>
                        ))
                      : choosenWeekDay === 6
                      ? restaurantSlots.saturday &&
                        restaurantSlots.saturday.map((slot: any, id: any) => (
                          <div
                            className="slot-item"
                            key={id}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            <div
                              className={`wrapper text-center p-2 border border-solid  hover:border-[rgb(150,150,150)] hover:text-[rgb(50,50,50)] cursor-pointer ${
                                selectedSlot === slot
                                  ? "border-[rgb(150,150,150)]  text-[rgb(50,50,50)]"
                                  : "text-[rgb(100,100,100)] border-gray-200"
                              }`}
                            >
                              {slot}
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
                <div className="pl-5 pr-5 pt-2">
                  <h5 className="text-bold ">
                    {" "}
                    Total Capacity : {totalSeats}{" "}
                  </h5>
                </div>
                <div className="pl-5  pr-5 mt-5 pb-5">
                  <button
                    className="p-3 bg-[#32a067] text-white  w-full font-extrabold"
                    onClick={async () => {
                      try {
                        if (!userToken) {
                          navigate("/login");
                          return;
                        }

                        if (!clientDetails?.phone) {
                          navigate("/manageAccount");
                          return;
                        }

                        if (
                          tableBookedId.length > 0 &&
                          selectedBookingDate.length > 0 &&
                          selectedSlot !== "" &&
                          selectedSlot !== " "
                        ) {
                          const body = {
                            restaurantId: filteredData[0]._id,
                            tableId: tableBookedId,
                            date: selectedBookingDate,
                            duration: selectedSlot,
                            website_url: "https://example.com/",
                          };
                          setLoadingKhalti(true);

                          const res = await axios.post(
                            `${url}/bookingtable`,
                            body,
                            {
                              headers: {
                                Authorization: userToken,
                              },
                            }
                          );
                          if (res.status === 200) {
                            window.location.href = res.data;
                          }
                        } else {
                          alert("Not enough data ");
                        }
                      } catch (err) {
                        setLoadingKhalti(false);
                      }
                    }}
                  >
                    {" "}
                    Book Now{" "}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <h1 className="ml-4">
              {" "}
              We are sorry, the restaurant is not accepting any bookings at the
              moment
            </h1>
          )}
        </div>
      </div>
    );
  }
}
