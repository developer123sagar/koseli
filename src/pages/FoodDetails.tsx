/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  fetchFoodCategory,
  fetchRestaurantFood,
} from "@/redux/foods/foodDetailSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CustomIcon, ImageSlider, Modal, Spinner, ToastMsg } from "@/common";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { baseImgUrl, google_map_api_key } from "@/routes";
import { addCart, removeMsg } from "@/redux/cart/cartSliice";
import {
  Restaurant_Review,
  fetchIndvDietary,
  fetchIndvSpecialOffer,
  fetchRestaurant,
  fetchRestaurantTables,
} from "@/redux/restaurant/restaurantSlice";
import {
  IAddon,
  IComboOffers,
  IFoodItem,
  IFoodSpeciality,
  IRestaurant,
} from "@/types";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillClockFill } from "react-icons/bs";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import HeaderWithSearch from "@/components/HeaderWithSearch";
import { Dispatch, SetStateAction } from "react";
import Buttons from "@/common/Button";
import Cart from "@/common/Cart";
import { truncateString } from "@/helpers";
import { fetchIndvComboOffer } from "@/redux/restaurant/restaurantSlice";
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
  setLatitude: Dispatch<SetStateAction<string | null>>;
  setLongitude: Dispatch<SetStateAction<string | null>>;
  setPermission: Dispatch<SetStateAction<boolean>>;
  setScrollDown: Dispatch<SetStateAction<boolean>>;
  headerLocation?: boolean;
  toComboOffer?: boolean;
  toSpecialPackage?: boolean;
}
export default function FoodDetails(props: Search) {
  const [activeCategory, setActiveCategory] = useState("");
  const [dietaryPlans, setDietaryPlans] = useState<any>([]);

  const urlParams = new URLSearchParams(window.location.search);
  const isDietry = urlParams.get("isDietry") === "true" || false;

  const toggleActive = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  const { restaurantData, restaurantId, restaurantTables } = useAppSelector(
    (state: RootState) => state.restaurant
  );
  const avaeragerating = useAppSelector(
    (state: RootState) => state.restaurant.averagerating
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeitModalOpen, setIsDeitModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const [newData, setNewData] = useState<IFoodItem | any | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<{
    [key: string]: boolean;
  }>({});
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [lat, setLat] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: google_map_api_key,
  });
  const filterRestaurant: IRestaurant[] = restaurantData?.filter(
    (item) => item._id === restaurantId
  );

  useEffect(() => {
    if (
      filterRestaurant &&
      Array.isArray(filterRestaurant) &&
      filterRestaurant.length === 1
    )
      setLat(filterRestaurant[0]?.geo?.coordinates[0]);
    setLon(filterRestaurant[0]?.geo?.coordinates[1]);
  }, [filterRestaurant]);

  const center = { lat: lat, lng: lon };
  const dispatch = useAppDispatch();
  const { category, restaurantFood } = useAppSelector(
    (state: RootState) => state.foodDetails
  );
  const rating = useAppSelector((state: RootState) => state.restaurant.reviews);

  const Day = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const today = new Date().getDay();
  const { token } = useAppSelector((state: RootState) => state.signin);
  const { message } = useAppSelector((state: RootState) => state.cart);

  const TodayOpenDate = filterRestaurant[0]?.openTime[Day[today]]?.startTime;
  const TodayCloseDate = filterRestaurant[0]?.openTime[Day[today]]?.endTime;
  const Minutes = new Date(TodayOpenDate).getUTCMinutes();
  const Hours = new Date(TodayOpenDate).getUTCHours();
  const Second = new Date(TodayOpenDate).getUTCSeconds();
  const closeMinutes = new Date(TodayCloseDate).getUTCMinutes();
  const closeHours = new Date(TodayCloseDate).getUTCHours();
  const closeSecond = new Date(TodayCloseDate).getUTCSeconds();
  const Hoursperiod = Hours < 12 ? "am" : "pm";
  const Timeperiod = closeHours < 12 ? "am" : "pm";
  const OpenTime = `OpenTime:${Hours}:${Minutes}:${Second} ${Hoursperiod}`;
  const CloseTime = `CloseTime:${closeMinutes}:${closeHours} ${closeSecond}:${Timeperiod}`;

  const { indvComboOffer } = useAppSelector(
    (state: RootState) => state.restaurant
  );

  const { indvSpecialOffer } = useAppSelector(
    (state: RootState) => state.restaurant
  );

  const { dietaryRestro } = useAppSelector(
    (state: RootState) => state.restaurant
  );

  const { inddietaryRestro } = useAppSelector(
    (state: RootState) => state.restaurant
  );

  useEffect(() => {
    dispatch(fetchFoodCategory({}));
    dispatch(fetchRestaurantFood({ id: restaurantId }));
    dispatch(fetchRestaurant());
  }, [dispatch, restaurantId]);
  useEffect(() => {
    dispatch(fetchIndvSpecialOffer({ restaurantId: restaurantId }));
  }, [dispatch, restaurantId]);
  useEffect(() => {
    dispatch(Restaurant_Review({ restaurantId: restaurantId, token: token }));
  }, [dispatch, token, restaurantId]);

  const restroDietId = localStorage.getItem("restaurantId") || "";

  useEffect(() => {
    dispatch(
      fetchIndvDietary({
        latitude: props.latitude,
        longitude: props.longitude,
        restaurantId: restroDietId,
      })
    );
  }, [dispatch]);

  // grouping food data based on category
  const groupedFoodData = category?.reduce<{
    [key: string]: IFoodItem[];
  }>((acc, categoryItem) => {
    const foodsInCategory = restaurantFood?.filter(
      (foodItem) => foodItem.foodCategory === categoryItem._id
    );
    if (foodsInCategory && foodsInCategory.length > 0) {
      acc[categoryItem.name] = foodsInCategory;
    }
    return acc;
  }, {});

  const restroId = localStorage.getItem("restaurantId") || "";

  const openModal = (item: any, type?: "COMBO" | "SPECIALITY") => {
    const transformedData = {
      ...(type === "COMBO"
        ? { activeImage: item?.image[0] }
        : { activeImage: item?.food?.activeImage }),
      activeStatus: true,
      addon: [],
      createdBy: new Date(),
      createdDateTime: new Date(),
      foodCategory: item.extra,
      foodMakingTime: { minutes: 20 },
      foodSpeciality: [],
      images: [item.image || ""],
      minQuantity: 1,
      name: item.name,
      price: item.amount,
      ...(type === "COMBO"
        ? { restaurant: item?.restaurants }
        : { restaurant: restroId }),
      subTitle: "",
      total: item.amount,
      _id: item._id,
    };

    setIsModalOpen(true);
    if (type === "COMBO" || type === "SPECIALITY") {
      setNewData(transformedData);
    } else {
      setNewData({ ...item, minQuantity: 1, total: item.price });
    }
  };

  const openDietryModal = (item: any) => {
    const transformedData = {
      activeImage: item.image,
      activeStatus: item.activeStatus,
      addon: [],
      createdBy: new Date(),
      createdDateTime: new Date(),
      foodCategory: item.dietaryPlan,
      foodMakingTime: { minutes: item.dietaryMakingTimeinMinute },
      foodSpeciality: [],
      images: [item.image || ""],
      minQuantity: 1,
      name: item.foodName,
      price: item.price,
      restaurant: item.restaurantId,
      subTitle: "",
      total: item.price,
      _id: item._id,
    };
    setIsDeitModalOpen(true);

    setNewData(transformedData);
  };

  const openDetailModal = () => {
    setIsDetailModalOpen(true);
  };
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    if (!isAddedToCart) {
      setSelectedAddons({});
    }
  };
  const closeModal2 = () => {
    setIsDeitModalOpen(false);
  };

  const handleAddon = (addonId: string) => {
    setSelectedAddons((prevSelectedAddons) => ({
      ...prevSelectedAddons,
      [addonId]: !prevSelectedAddons[addonId],
    }));
  };

  useEffect(() => {
    if (message && message.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeMsg());
      }, 2000);
      return () => clearTimeout(timer);
    }
  });

  const handldeCart = () => {
    const selectedAddonsData = newData?.addon.filter(
      (item: any) => selectedAddons[item.id]
    );

    const newDataWithSelectedAddons = {
      ...newData,
      addon: selectedAddonsData || [],
    };

    dispatch(addCart(newDataWithSelectedAddons));
    setIsDeitModalOpen(false);
    setIsModalOpen(false);
    setIsAddedToCart(true);
  };

  const filteredCategories = category?.filter((item) => {
    const foodsInCategory = restaurantFood?.filter(
      (foodItem) => foodItem.foodCategory === item._id
    );
    return foodsInCategory && foodsInCategory.length > 0;
  });

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

  useEffect(() => {
    if (dietaryRestro && dietaryRestro.dietPlans) {
      const arrayOfObjects = Object.entries(dietaryRestro.dietPlans).flatMap(
        ([restaurant, items]: [string, any]) =>
          items.map((item: any) => ({ restaurant, ...item }))
      );
      const uniqueDietaryPlans = [
        ...new Set(arrayOfObjects.map((item) => item.dietaryPlan)),
      ];
      setDietaryPlans(uniqueDietaryPlans);
    }
  }, [dietaryRestro]);

  useEffect(() => {
    dispatch(fetchIndvComboOffer(restaurantId));
  }, [dispatch, restaurantId]);

  const handleIncrement = () =>
    handleQuantityChange((newData?.minQuantity || 0) + 1);

  const handleDecrement = () =>
    handleQuantityChange((newData?.minQuantity || 0) - 1);

  const comboOfferRef = useRef<HTMLDivElement>(null);
  const specialPackageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.toComboOffer && comboOfferRef.current !== null) {
      const rect = comboOfferRef.current.getBoundingClientRect();
      const targetPosition = window.scrollY + rect.top;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (props.toSpecialPackage && specialPackageRef.current !== null) {
      const rect = specialPackageRef.current.getBoundingClientRect();
      const targetPosition = window.scrollY + rect.top;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (
      filterRestaurant &&
      Array.isArray(filterRestaurant) &&
      filterRestaurant.length > 0
    ) {
      dispatch(
        fetchRestaurantTables({ restaurantId: filterRestaurant[0]._id })
      );
    }
  }, [dispatch, token]);

  const navigate = useNavigate();

  return (
    <div className="mb-5 ">
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
      <ToastMsg messages={message} />

      <ImageSlider
        images={filterRestaurant[0]?.image || []}
        width={100}
        height={20}
      />
      <div className="relative w-full ">
        {filterRestaurant[0] && filterRestaurant[0].vegetarian ? (
          <div className="absolute right-4 translate-y-8 bottom-0">
            <img
              loading="lazy"
              src="/img/veglogo.png"
              alt=""
              className="h-24 w-24"
            />
          </div>
        ) : null}
      </div>
      <div className="mt-2 mb-10 mx-4 r-2xl:mx-40">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-10">
            <h1 className=" text-black font-bold md:text-[20px] text-[16px] mb-2">
              {filterRestaurant[0]?.name}
            </h1>
            <img
              loading="lazy"
              src={`${baseImgUrl}/${filterRestaurant[0]?.logo}`}
              alt=""
              className="h-12 w-12  object-cover"
            />
          </div>
          {restaurantTables && restaurantTables?.isBookingOpen && (
            <Buttons
              type="button"
              onClick={() =>
                navigate(`/book_details/${filterRestaurant[0]?._id}`)
              }
            >
              Book Now
            </Buttons>
          )}
        </div>
        <div className="flex gap-2  ">
          <p className="flex gap-2 items-center justify-center font-bold">
            <AiFillStar className="text-[#22c55e]  " />
            {rating && rating.toString()}
          </p>

          <h1
            className="font-bold pointer text-[12px] underline p-1  rounded-3xl pointer cursor-pointer hover:text-[#22c55e] transition duration-500 ease-in-out"
            onClick={() => openDetailModal()}
          >
            More Info
          </h1>
        </div>
        <p className="text-[#545454]">{filterRestaurant[0]?.description}</p>
      </div>
      <div className="flex flex-col mx-2 overflow-x-hidden gap-2 ">
        <div className="admin-header w-auto overflow-scroll flex">
          <ul className="mx-2 r-2xl:mx-40 h-fit flex justify-center  items-center  gap-10 mb-2">
            {!isDietry ? (
              filteredCategories?.map((item) => (
                <div
                  key={`${item._id}`}
                  onClick={() => toggleActive(item.name)}
                >
                  <li>
                    <p
                      className="  text-center font-bold p-4 md:p-0 text-[16px]"
                      onClick={() => toggleActive(item.name)}
                    >
                      {item.name}
                    </p>
                    {activeCategory === item.name && (
                      <hr className={` border border-red-300 `} />
                    )}
                  </li>
                </div>
              ))
            ) : (
              <ul className="w-full mx-auto my-4 mt-5 mb-5 ml-5">
                <div className="flex gap-5">
                  {dietaryPlans?.map((item: any, id: number) => (
                    <div
                      key={id}
                      className=" flex justify-center items-center pt-2 pb-2 px-5 bg-[rgb(230,230,230)] cursor-pointer"
                    >
                      <h1> {item} </h1>
                    </div>
                  ))}
                </div>
              </ul>
            )}
          </ul>
        </div>
        <h1>
          <Cart />
        </h1>
        <h1>
          <ChatView />
        </h1>

        {!isDietry ? (
          <>
            {/* showing food data according to the category */}
            <main className="w-full  h-fit flex flex-col gap-10 md:mx-10 p-4 md:p-0  r-2xl:mx-40">
              {groupedFoodData &&
                Object?.entries(groupedFoodData)?.map(
                  ([categoryName, categoryFoods], index) => (
                    <section key={categoryName} id={`${index}`}>
                      <h1 id={`${index}`} className="text-xl font-bold  mb-3 ">
                        <span>{categoryName}</span>
                      </h1>

                      <div className="w-full  gap-y-4 h-full md:flex flex-row flex-wrap  ">
                        {categoryFoods.map((foodItem, index) => (
                          <div
                            onClick={() => openModal(foodItem)}
                            className="w-full sm:w-[200px]  md:w-[250px] lg:w-[300px]   h-[120px]  md:h-[120px] inline-block cursor-pointer shadow-lg hover:cursor-pointer border-dashed hover:shadow-md border overflow-hidden border-black mr-5"
                            key={`${foodItem._id}.${index}`}
                          >
                            <div className="flex justify-between ">
                              <div className="py-2 px-5 flex flex-col ">
                                <div>
                                  <h1 className="font-semibold mb-1">
                                    {truncateString(foodItem.name, 15)}
                                  </h1>
                                </div>
                                <em className="mt-4">Rs. {foodItem.price}</em>
                              </div>
                              <img
                                src={`${baseImgUrl}/${foodItem.activeImage}`}
                                alt={foodItem.name}
                                className="w-[160px] h-[120px] md:h-[120px]   object-cover"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )
                )}
            </main>
            {/* showing combo food according to the restaurant */}
            <main className="w-full  h-fit flex flex-col md:mx-10 p-4 md:p-0  r-2xl:mx-40 mt-4">
              {indvComboOffer && indvComboOffer.length > 0 && (
                <h1 className="text-xl font-bold  mb-3 ">
                  <span ref={comboOfferRef}>Combo offer</span>
                </h1>
              )}

              <div className="w-full  gap-y-4 h-full md:flex flex-row flex-wrap">
                {indvComboOffer.map((item: IComboOffers, index: number) => (
                  <div
                    className="w-full sm:w-[200px] md:w-[250px] lg:w-[300px]  h-[120px] md:h-[120px]  inline-block cursor-pointer shadow-lg hover:cursor-pointer border-dashed hover:shadow-md border overflow-hidden border-black mr-5"
                    onClick={() => openModal(item, "COMBO")}
                    key={index}
                  >
                    <div className="flex justify-between ">
                      <div className="py-2 px-5 flex flex-col ">
                        <div>
                          <h1 className="font-semibold  mb-1">{item.name}</h1>
                        </div>
                        <em className="mt-6  ">Rs. {item.amount}</em>
                      </div>
                      <img
                        src={`${baseImgUrl}/${item.image}`}
                        className="w-[160px] h-[140px] md:h-[120px]  object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </main>
            {/* showing foodspeciality according to the restaurant */}
            <main className="w-full  h-fit flex flex-col md:mx-10 p-4 md:p-0    r-2xl:mx-40 mt-4">
              {indvSpecialOffer && indvSpecialOffer.length > 0 && (
                <h1 className="text-xl font-bold  mb-3 ">
                  <span>Food Speciality</span>
                </h1>
              )}

              <div className="w-full   gap-y-4 h-full md:flex flex-row">
                {indvSpecialOffer.map(
                  (item: IFoodSpeciality, index: number) => (
                    <div
                      className="w-full sm:w-[200px] md:w-[250px] lg:w-[300px]  h-[120px] md:h-[120px] inline-block cursor-pointer shadow-lg hover:cursor-pointer border-dashed hover:shadow-md border overflow-hidden border-black mr-5"
                      onClick={() => openModal(item, "SPECIALITY")}
                      key={index}
                    >
                      <div className="flex justify-between">
                        <div className="py-2 px-5 flex flex-col ">
                          <div>
                            <h1 className="font-semibold  mb-1">{item.name}</h1>
                          </div>
                          <em className="mt-6">Rs. {item.amount}</em>
                        </div>
                        <img
                          src={`${baseImgUrl}/${item?.food?.activeImage}`}
                          className="w-[160px] h-[120px] md:h-[120px]  object-cover"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </main>
          </>
        ) : (
          <div className="w-full  h-fit flex flex-col md:mx-10 p-4 md:p-0  r-2xl:mx-40 mt-4">
            {inddietaryRestro?.map((item: any, index: number) => (
              <div
                className="w-full sm:w-[200px] md:w-[250px] lg:w-[300px]  h-[120px] md:h-[120px] inline-block cursor-pointer shadow-lg hover:cursor-pointer border-dashed hover:shadow-md border overflow-hidden border-black mr-5"
                key={index}
                onClick={() => openDietryModal(item)}
              >
                <div className="flex justify-between ">
                  <div className="py-2 px-5 flex flex-col ">
                    <div>
                      <h1 className="font-semibold  mb-1">
                        {item.dietaryPlan}
                      </h1>
                      <p className="text-gray-900  text-[14px]">
                        {truncateString(item.extra, 25)}
                      </p>
                    </div>
                    <em className="mt-4">{item.amount}</em>
                  </div>
                  <img
                    src={`${baseImgUrl}/${item.image}`}
                    className="w-[160px] h-[120px] md:h-[120px]  object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        setIsOpen={closeModal}
        maxWidth="sm:max-w-[42rem] relative"
      >
        {filterRestaurant[0]?.isAcceptingOrder ? (
          <>
            <div className="w-full h-full flex flex-col md:flex-row gap-2 md:gap-5">
              <img
                src={`${baseImgUrl}/${newData?.activeImage}`}
                alt={newData?.name}
                className="w-[350px] md:h-[400px] sm:h-[160px] h-[120px] object-cover"
              />

              <div className="md:mt-2 w-full mx-4 md:mx-0 mr-4">
                <div className="flex justify-between md:mb-5 md:mr-2 mr-6">
                  <h1 className="md:text-2xl text-xl  font-bold">
                    {newData?.name}
                  </h1>
                  <span
                    onClick={closeModal}
                    className="w-[2rem] h-[2rem] absolute top-0 right-1 lg:relative rounded-full bg-[#fff] hover:bg-gray-600 transition duration-700 flex items-center justify-center shadow-xl cursor-pointer"
                  >
                    <div>
                      <img loading="lazy" src="/cross.png" alt="fa" />
                    </div>
                  </span>
                </div>
                <p className="text-sm  text-gray-500">{newData?.subTitle}</p>
                {newData?.addon[0]?.name != "" && (
                  <div className="mt-4">
                    <h2 className="text-xl font-bold">Add Something Extra</h2>
                    {newData?.addon
                      .filter((addon: IAddon) => addon.name)
                      .map((item: IAddon, id: number) => (
                        <div
                          className="w-full max-w-full border-b-[1px] border-gray-400 py-2 flex justify-between"
                          key={item.id + id}
                        >
                          <div>
                            <h3 className="text-gray-700">{item.name}</h3>
                            <h4 className="text-sm text-gray-500">
                              +Rs. {item.extraPrice}
                            </h4>
                          </div>
                          <div className="flex items-center justify-center rounded-full w-12 h-12">
                            {selectedAddons[item.id] ? (
                              <span className="animate-addon-once">
                                <img
                                  src="/Success.png"
                                  alt="success"
                                  className="w-8"
                                  loading="lazy"
                                />
                              </span>
                            ) : (
                              <span
                                onClick={() => handleAddon(item.id)}
                                className="w-[2rem] h-[2rem] rounded-full bg-[#fff] hover:bg-gray-400 transition duration-700 flex items-center justify-center shadow-xl cursor-pointer"
                              >
                                <CustomIcon
                                  icon={AiOutlinePlus}
                                  className="text-gray-500 hover:text-white transition duration-700"
                                  size={23}
                                />
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex md:flex-row  flex-col md:gap-4   justify-between">
              <div className="relative my-3 px-5 basis-[55%]">
                <span
                  onClick={handleDecrement}
                  className="w-[2rem] absolute top-2 left-8 h-[2rem] rounded-full bg-[#fff] hover:bg-gray-400 transition duration-700 flex items-center justify-center shadow-xl cursor-pointer"
                >
                  <CustomIcon
                    icon={AiOutlineMinus}
                    className="text-gray-500 hover:text-white transition duration-700"
                    size={23}
                  />
                </span>
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

                <span
                  onClick={handleIncrement}
                  className="w-[2rem] absolute top-2 right-8 h-[2rem] rounded-full bg-[#fff] hover:bg-gray-400 transition duration-700 flex items-center justify-center shadow-xl cursor-pointer"
                >
                  <CustomIcon
                    icon={AiOutlinePlus}
                    className="text-gray-500 hover:text-white transition duration-700"
                    size={23}
                  />
                </span>
              </div>

              <div className="flex gap-2   justify-end px-5 md:my-2 mb-4 ">
                <Buttons
                  onClick={handldeCart}
                  className="md:text-sm text-[10px]"
                >
                  Add Cart
                </Buttons>
                <Buttons
                  className="text-sm"
                  variant="destructive"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Buttons>
              </div>
            </div>
          </>
        ) : (
          <div className="p-10">
            <h1> The restaurant is not accepting any orders at the moment </h1>
          </div>
        )}
      </Modal>
      <Modal
        isOpen={isDeitModalOpen}
        setIsOpen={closeModal2}
        maxWidth="max-w-[42rem]"
      >
        <div className="w-full h-full flex flex-col md:flex-row gap-2 md:gap-5">
          <img
            src={`${baseImgUrl}/${newData?.activeImage}`}
            alt={newData?.name}
            className="w-[350px] md:h-[400px] sm:h-[160px] h-[120px] object-cover"
          />

          <div className="md:mt-2 w-full mx-4 md:mx-0 mr-4">
            <div className="flex justify-between md:mb-5 md:mr-2 mr-6">
              <h1 className="md:text-2xl font-bold">{newData?.name}</h1>
              <span
                onClick={closeModal2}
                className="w-[2rem] h-[2rem] rounded-full bg-[#fff] hover:bg-gray-600 transition duration-700 flex items-center justify-center shadow-xl cursor-pointer"
              >
                <div>
                  <img loading="lazy" src="/cross.png" alt="" />
                </div>
              </span>
            </div>
            <p className="text-sm  text-gray-500">{newData?.subTitle}</p>
            {newData?.addon[0]?.name != "" && (
              <div className="mt-4">
                <h2 className="text-xl font-bold">Add Something Extra</h2>
                {newData?.addon
                  .filter((addon: IAddon) => addon.name)
                  .map((item: IAddon, id: number) => (
                    <div
                      className="w-full max-w-full border-b-[1px] border-gray-400 py-2 flex justify-between"
                      key={item.id + id}
                    >
                      <div>
                        <h3 className="text-gray-700">{item.name}</h3>
                        <h4 className="text-sm text-gray-500">
                          +Rs. {item.extraPrice}
                        </h4>
                      </div>
                      <div className="flex items-center justify-center rounded-full w-12 h-12">
                        {selectedAddons[item.id] ? (
                          <span className="animate-addon-once">
                            <img
                              src="/Success.png"
                              alt="success"
                              className="w-8"
                              loading="lazy"
                            />
                          </span>
                        ) : (
                          <span
                            onClick={() => handleAddon(item.id)}
                            className="w-[2rem] h-[2rem] rounded-full bg-[#fff] hover:bg-gray-400 transition duration-700 flex items-center justify-center shadow-xl cursor-pointer"
                          >
                            <CustomIcon
                              icon={AiOutlinePlus}
                              className="text-gray-500 hover:text-white transition duration-700"
                              size={23}
                            />
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex md:flex-row  flex-col md:gap-4   justify-between">
          <div className="relative my-3 px-5 basis-[55%]">
            <span
              onClick={handleDecrement}
              className="w-[2rem] absolute top-2 left-8 h-[2rem] rounded-full bg-[#fff] hover:bg-gray-400 transition duration-700 flex items-center justify-center shadow-xl cursor-pointer"
            >
              <CustomIcon
                icon={AiOutlineMinus}
                className="text-gray-500 hover:text-white transition duration-700"
                size={23}
              />
            </span>
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

            <span
              onClick={handleIncrement}
              className="w-[2rem] absolute top-2 right-8 h-[2rem] rounded-full bg-[#fff] hover:bg-gray-400 transition duration-700 flex items-center justify-center shadow-xl cursor-pointer"
            >
              <CustomIcon
                icon={AiOutlinePlus}
                className="text-gray-500 hover:text-white transition duration-700"
                size={23}
              />
            </span>
          </div>

          <div className="flex gap-2 justify-end px-5 my-2">
            <Buttons onClick={handldeCart} className="text-sm">
              Add Cart
            </Buttons>
            <Buttons
              className="text-sm"
              variant="destructive"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Buttons>
          </div>
        </div>
      </Modal>

      {/* Restaurant Detail */}
      <Modal isOpen={isDetailModalOpen} setIsOpen={closeDetailModal}>
        <div className="flex items-center justify-between   py-3 px-5 bg-gray-300/30 bg-opacity-80">
          <h1 className=" text-black font-bold text-[16px] sm:text-2xl text-center  w-full mb-2">
            {filterRestaurant[0]?.name}
          </h1>
          <span
            onClick={closeDetailModal}
            className="sm:w-[2rem] sm:h-[2rem] h-[1rem] w-[1rem] rounded-full  bg-[#fff] hover:bg-gray-600 transition duration-700 flex items-center justify-center shadow-xl cursor-pointer"
          >
            <div>
              <img loading="lazy" src="/cross.png" alt="" />
            </div>
          </span>
        </div>
        <div>
          <div className="w-full h-[200px] ">
            {isLoaded ? (
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
                >
                  {<Marker position={center} />}
                </GoogleMap>
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
        <div className=" sm:mx-4 w-[100%] sm:w-[90%] flex flex-col justify-center">
          <hr />

          <hr />
          <div className="flex   gap-4 sm:gap-0 sm:justify-between p-4 ">
            <h1 className="flex items-center   ">
              <IoLocationSharp size="20" />
            </h1>

            <h1 className="justify-start  w-full basis-70">
              {filterRestaurant[0]?.address}
            </h1>
            {/* <p> {filterRestaurant[0]?.zipCode}</p> */}
          </div>
          <hr />
          <div className="flex   gap-4 sm:gap-0 sm:justify-between p-4 ">
            <h1 className="flex items-center    ">
              <BsFillClockFill size="20" />
            </h1>
            <h1 className="justify-start w-full basis-70">{OpenTime}</h1>
          </div>

          <hr />
          <div className="flex   gap-4 sm:gap-0 sm:justify-between p-4 ">
            <h1>
              <BsFillClockFill size="20" />
            </h1>
            <h1 className=" justify-start w-full basis-70">{CloseTime}</h1>
          </div>
          <hr />
          <div className="flex   gap-4 sm:gap-0 sm:justify-between p-4">
            <h1>
              <AiFillStar size="20" />
            </h1>
            <div className=" justify-start w-full basis-70">
              {avaeragerating?.data?.rating ? (
                <h1 className=" justify-start w-full h basis-70">
                  {parseFloat(avaeragerating?.data?.rating)}{" "}
                </h1>
              ) : (
                0
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
