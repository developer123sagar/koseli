import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { performSearch } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { AnimatePresence, motion } from "framer-motion";
import { PopularCategory } from "@/components";
import { Link, Navigate, useParams } from "react-router-dom";
import { IRestaurant } from "@/types";
import { TopRestaurant } from "@/components";
import { useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { CustomIcon, Drawer } from "@/common";
import { IcartDatas, removeItem } from "@/redux/cart/cartSliice";
import { fetchClientDetails } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { fetchNoticeBanners } from "@/redux/restaurant/restaurantSlice";
import CircularCheckboxes from "@/components/Checkbox/checkbox";
import PopularHotel from "@/components/Home/PopularHotel";
import ComboOffers from "@/components/Home/ComboOffers";
import SpecialPackages from "@/components/Home/SpecialPackages";
import HeaderWithSearch from "@/components/HeaderWithSearch";
import ChatView from "@/common/chat/ChatView";
import Dietaries from "@/components/Home/Dietaries";
import SponsoredRestaurant from "@/components/Home/Sponsored";
import Cart from "@/common/Cart";
import StoryFormat from "@/components/Home/StoryFormat";

interface Search {
  searchParam: string;
  latitude: string | null;
  longitude: string | null;
  permission: boolean;
  setSearchParam: Dispatch<SetStateAction<string>>;
  currentDay: string;
  selectedTimeSlot: string;
  sliderNumber: number;
  setSliderNumber: Dispatch<SetStateAction<number>>;
  setLongitude: Dispatch<SetStateAction<string | null>>;
  setLatitude: Dispatch<SetStateAction<string | null>>;
  setScrollDown: React.Dispatch<React.SetStateAction<boolean>>;
  setPermission: React.Dispatch<React.SetStateAction<boolean>>;
  openSmlFilter: boolean;
  setOpenSmlFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Search(props: Search) {
  const [sortByTime, setSortByTime] = useState(true);
  const [selectedOption, setSelectedOption] = useState(0);
  const [showComboOffers, setShowComboOffers] = useState(false);
  const [showSpecialPackage, setShowSpecialPackage] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [priceValue, setPriceValue] = useState("0");
  const [filterDataOnPrice, setFilterOnPrice] = useState(false);
  const [dataPresent, setDataPresent] = useState(true);

  const { userToken } = useAppSelector((state: RootState) => state.signin);
  const { cartDatas } = useAppSelector((state: RootState) => state.cart);

  const sortByAverageDeliveryTimeAscending = (
    a: IRestaurant,
    b: IRestaurant
  ) => {
    return (
      (parseInt(a.averageDeliveryTime) || 0) -
      (parseInt(b.averageDeliveryTime) || 0)
    );
  };

  const sortByRating = (a: IRestaurant, b: IRestaurant) => {
    return (a.averageRating || 0) - (b.averageRating || 0);
  };

  const timeSort = (
    nearbyData: IRestaurant[],
    setData: Dispatch<SetStateAction<IRestaurant[]>>
  ) => {
    const sortedData = [...nearbyData].sort(sortByAverageDeliveryTimeAscending);
    setData(sortedData);
  };
  const ratingSort = (
    nearbyData: IRestaurant[],
    setData: Dispatch<SetStateAction<IRestaurant[]>>
  ) => {
    const sortedData = [...nearbyData].sort(sortByRating);
    setData(sortedData);
  };

  const { catName } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (catName === "noId")
      dispatch(performSearch({ data: props.searchParam }));
    else dispatch(performSearch({ data: catName! }));
  }, [dispatch, props.searchParam]);

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
  const totalQuantity = cartDatas?.reduce(
    (acc, food) => acc + food.minQuantity,
    0
  );

  const comboOfferRef = useRef<HTMLDivElement>(null);
  const specialPackageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchNoticeBanners());
  }, [dispatch]);

  useEffect(() => {
    if (userToken) dispatch(fetchClientDetails(userToken));
  }, [dispatch, userToken]);

  if (!props.longitude || !props.latitude) {
    return <Navigate to="/" />;
  } else {
    localStorage.setItem("latitude", props.latitude);
    localStorage.setItem("longitude", props.longitude);
    return (
      <div className="relative">
        <div className="overflow-x-hidden md:mt-10">
          <HeaderWithSearch
            showHamburgerr={true}
            sliderNumber={props.sliderNumber}
            setSliderNumber={props.setSliderNumber}
            setLongitude={props.setLongitude}
            setLatitude={props.setLatitude}
            setScrollDown={props.setScrollDown}
            setPermission={props.setPermission}
            latitude={props.latitude}
            longitude={props.longitude}
            redirect={true}
            openSmlFilter={props.openSmlFilter}
            setOpenSmlFilter={props.setOpenSmlFilter}
          />
          <div />
          <div
            className="r-2xl:grid r-2xl:grid-cols-5 r-2xl:gap-10 flex "
            onClick={() => props.setOpenSmlFilter(false)}
          >
            <div className="w-[300px] hidden r-2xl:block">
              <div
                className={`addTransition p-10 h-screen overflow-auto w-[300px] fixed z-0 mt-10
              }`}
              >
                <h1 className="text-xl mb-4  "> Sort on the basis of: </h1>
                <form className="mt-1 ">
                  <CircularCheckboxes
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    showComboOffers={showComboOffers}
                    showSpecialPackage={showSpecialPackage}
                    setShowComboOffers={setShowComboOffers}
                    setShowSpecialPackage={setShowSpecialPackage}
                    comboOfferRef={comboOfferRef}
                    specialPackageRef={specialPackageRef}
                    setSortByTime={setSortByTime}
                    priceValue={priceValue}
                    setPriceValue={setPriceValue}
                    setFilterOnPrice={setFilterOnPrice}
                  />
                </form>
              </div>
            </div>

            <div className="flex-1 flex-wrap   r-2xl:pl-0 col-span-4">
              <div className="relative ">
                <StoryFormat/>
                <div className="w-[100vw] text-center r-2xl:w-full r-2xl:text-left">
                  <SponsoredRestaurant
                    latitude={props.latitude}
                    longitude={props.longitude}
                    permission={props.permission}
                    sortByTime={sortByTime}
                    timeSort={timeSort}
                    ratingSort={ratingSort}
                    sliderNumber={props.sliderNumber}
                    priceValue={priceValue}
                    setPriceValue={setPriceValue}
                    filterDataOnPrice={filterDataOnPrice}
                    setFilterOnPrice={setFilterOnPrice}
                    seeAll={true}
                    showArrow={true}
                    setDataPresent={setDataPresent}
                  />
                </div>
                <div className="w-[100vw] text-center r-2xl:w-full r-2xl:text-left">
                  <TopRestaurant
                    latitude={props.latitude}
                    longitude={props.longitude}
                    permission={props.permission}
                    sortByTime={sortByTime}
                    timeSort={timeSort}
                    ratingSort={ratingSort}
                    sliderNumber={props.sliderNumber}
                    priceValue={priceValue}
                    setPriceValue={setPriceValue}
                    filterDataOnPrice={filterDataOnPrice}
                    setFilterOnPrice={setFilterOnPrice}
                    seeAll={false}
                    setDataPresent={setDataPresent}
                    showArrow={true}
                  />
                </div>
                <div className="w-[100vw] text-center  r-2xl:w-full r-2xl:text-left">
                  <PopularHotel
                    latitude={props.latitude}
                    longitude={props.longitude}
                    permission={props.permission}
                    sliderNumber={props.sliderNumber}
                    priceValue={priceValue}
                    setPriceValue={setPriceValue}
                    filterDataOnPrice={filterDataOnPrice}
                    setFilterOnPrice={setFilterOnPrice}
                    seeAll={false}
                    setDataPresent={setDataPresent}
                    showArrow={true}
                  />
                </div>
                {dataPresent && <PopularCategory noTitle={true} />}
                <div ref={comboOfferRef}>
                  <div className="w-[100vw] text-center r-2xl:w-full r-2xl:text-left">
                    <ComboOffers
                      seeAll={false}
                      latitude={props.latitude}
                      longitude={props.longitude}
                      setDataPresent={setDataPresent}
                      sliderNumber={props.sliderNumber}
                      sortByTime={sortByTime}
                      timeSort={timeSort}
                      ratingSort={ratingSort}
                      priceValue={priceValue}
                      setPriceValue={setPriceValue}
                      filterDataOnPrice={filterDataOnPrice}
                      setFilterOnPrice={setFilterOnPrice}
                      showArrow={true}
                    />
                  </div>
                </div>
                <div ref={specialPackageRef}>
                  <div className="w-[100vw] text-center r-2xl:w-full r-2xl:text-left">
                    <SpecialPackages
                      seeAll={false}
                      latitude={props.latitude}
                      longitude={props.longitude}
                      setDataPresent={setDataPresent}
                      sliderNumber={props.sliderNumber}
                      sortByTime={sortByTime}
                      timeSort={timeSort}
                      ratingSort={ratingSort}
                      priceValue={priceValue}
                      setPriceValue={setPriceValue}
                      filterDataOnPrice={filterDataOnPrice}
                      setFilterOnPrice={setFilterOnPrice}
                    />
                  </div>
                </div>
                <div className="w-[100vw] text-center r-2xl:w-full r-2xl:text-left ">
                  <Dietaries
                    latitude={props.latitude}
                    longitude={props.longitude}
                    seeAll={false}
                    showArrow={true}
                    isDietry
                  />
                </div>
              </div>
            </div>

            <div className="relative  ">
              <div className=" ">
                {/* cart */}
                <Cart />

                {/* chat part */}
                <div>
                  <ChatView />
                </div>
              </div>
            </div>
            <Drawer
              isOpen={isDrawerOpen}
              setIsOpen={setIsDrawerOpen}
              position="right"
              xValue={400}
              width="400px"
            >
              <div className="flex items-center justify-between py-3 px-5  bg-gray-300/30 bg-opacity-80 mb-4">
                <h1 className="text-2xl text-[#292727] mx-auto ">Your Order</h1>
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
                                  {item.addon
                                    .filter((addon) => addon.name)
                                    .map((item) => (
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
                                    currentAddon.extraPrice *
                                      currentAddon.quantity,
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
                  <div className="w-full h-full flex justify-center flex-col  r-2xl:gap-4 items-center my-5">
                    <p className="text-3xl font-medium">Your Cart is empty</p>
                    <img
                      className="w-[400px] h-[350px]  object-contain"
                      src="/img/empty_cart.gif"
                      alt="shop now"
                    />
                    <div>
                      <Link to={"/rest_details/noId"}>
                        <button className="customBtn">Go to Shop</button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </Drawer>
          </div>
        </div>
        <div
          className={`fixed bg-white right-0 top-[120px] z-99 shadow p-5 ${
            props.openSmlFilter ? "r-2xl:hidden block" : "hidden"
          }`}
        >
          <CircularCheckboxes
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            showComboOffers={showComboOffers}
            showSpecialPackage={showSpecialPackage}
            setShowComboOffers={setShowComboOffers}
            setShowSpecialPackage={setShowSpecialPackage}
            comboOfferRef={comboOfferRef}
            specialPackageRef={specialPackageRef}
            setSortByTime={setSortByTime}
            priceValue={priceValue}
            setPriceValue={setPriceValue}
            setFilterOnPrice={setFilterOnPrice}
          />
        </div>
      </div>
    );
  }
}
