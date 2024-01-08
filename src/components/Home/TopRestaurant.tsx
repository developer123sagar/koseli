import { IRestaurant } from "@/types";
import {
  fetchNearbyRestaurant,
  saveRestroId,
} from "@/redux/restaurant/restaurantSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { Top_rated_restaurant_content } from "@/constants";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { baseImgUrl, url } from "@/routes";
import { AiFillStar, AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import SeeAll from "@/common/SeeAll";
import { CustomIcon } from "@/common";
import { GrNext, GrPrevious } from "react-icons/gr";

interface TopRestaurant {
  latitude: string | null;
  longitude: string | null;
  permission: boolean;
  timeSort: (
    nearbyData: IRestaurant[],
    setData: React.Dispatch<React.SetStateAction<IRestaurant[]>>
  ) => void;
  ratingSort: (
    nearbyData: IRestaurant[],
    setData: React.Dispatch<React.SetStateAction<IRestaurant[]>>
  ) => void;
  seeAll?: boolean;
  showArrow:boolean;
  sortByTime?: boolean;
  isFounder?: boolean;
  sliderNumber?: number;
  priceValue?: string;
  setPriceValue?: Dispatch<SetStateAction<string>>;
  filterDataOnPrice?: boolean;
  setFilterOnPrice?: Dispatch<SetStateAction<boolean>>;
  setDataPresent?: Dispatch<SetStateAction<boolean>>;
}

export default function TopRestaurant(props: TopRestaurant) {
  const { title } = Top_rated_restaurant_content;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [favRestros, setFavRestros] = useState<string[]>(
    JSON.parse(localStorage.getItem("favRestros") || "[]")
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  const { nearbyData } = useAppSelector((state: RootState) => state.restaurant);
  console.log(nearbyData);
  const { userToken } = useAppSelector((state: RootState) => state.signin);

  const [data, setData] = useState<IRestaurant[]>([]);

  useEffect(() => {
    if (props.latitude !== null && props.longitude !== null) {
      const body = {
        lat: props.latitude,
        long: props.longitude,
      };
      dispatch(fetchNearbyRestaurant(body));
    }
  }, [dispatch, props.latitude, props.longitude]);

  useEffect(() => {
    if (props.sliderNumber === 0) {
      console.log("working");
      const dummy = [...nearbyData];
      console.log(dummy);
      const filteredData = dummy.filter((obj) => obj.dining === true);
      if (props.sortByTime) props.timeSort(filteredData, setData);
      else props.ratingSort(filteredData, setData);
      props.setFilterOnPrice && props.setFilterOnPrice(false);
      props.setPriceValue && props.setPriceValue("0");
    } else if (props.sliderNumber === 1) {
      const dummy = [...nearbyData];
      const filteredData = dummy.filter((obj) => obj.userPickup === true);
      if (props.sortByTime) props.timeSort(filteredData, setData);
      else props.ratingSort(filteredData, setData);
      props.setFilterOnPrice && props.setFilterOnPrice(false);
      props.setPriceValue && props.setPriceValue("0");
    } else {
      const dummy = [...nearbyData];

      const filteredData = dummy.filter((obj) => obj.hasDelivery === true);
      if (props.sortByTime) props.timeSort(filteredData, setData);
      else props.ratingSort(filteredData, setData);
      props.setFilterOnPrice && props.setFilterOnPrice(false);
      props.setPriceValue && props.setPriceValue("0");
    }
  }, [props.sliderNumber, nearbyData]);

  useEffect(() => {
    if (props.sortByTime) {
      props.timeSort(data, setData);
    } else props.ratingSort(data, setData);
  }, [props.sortByTime]);

  useEffect(() => {
    if (props.filterDataOnPrice && props.priceValue) {
      const dummy = [...nearbyData];
      const value = parseInt(props.priceValue);
      const filteredData = dummy.filter(
        (obj) => obj.minimumSpentToCheckout! <= value
      );

      if (props.sortByTime) props.timeSort(filteredData, setData);
      else props.ratingSort(filteredData, setData);
      props.setFilterOnPrice && props.setFilterOnPrice(false);
    }
  }, [props.filterDataOnPrice]);

  const handleWishlist = async (restroId: string) => {
    try {
      const res = await axios.put(`${url}/wishlist/${restroId}`, null, {
        headers: {
          Authorization: userToken,
        },
      });
      if (res.status === 200) {
        if (favRestros.includes(restroId)) {
          setFavRestros((prev) => prev.filter((id) => id !== restroId));
        } else {
          setFavRestros((prev) => [...prev, restroId]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const slideLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 1160;
    }
  };
  
  const slideRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 1160;
    }
  };

  useEffect(() => {
    localStorage.setItem("favRestros", JSON.stringify(favRestros));
  }, [favRestros]);

  console.log(data);

  useEffect(() => {
    data && data.length > 0 && props.setDataPresent
      ? props.setDataPresent(true)
      : props.setDataPresent && props.setDataPresent(false);
  }, [data]);

  if (props.latitude === null || props.longitude === null) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
      <div >
        {data && data.length > 0 ? (
          <div className="pt-5">
            <SeeAll
              title={title}
              data={data}
              link="/toprestaurant"
              scrollRef={scrollRef}
              seeAll={props.seeAll}
            />

<ul className={`mt-4  ${data.length==1 &&  "w-full flex  items-center justify-center  sm:justify-start "}`}>
              <div className=" relative flex items-center group">
              <span className={` ${props.showArrow && data.length > 4 ?"md:block":"hidden"}`}>
            <CustomIcon
              icon={GrPrevious}
              className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block left-0 p-2"
              size={36} 
              onClick={slideLeft}
            />
          </span>
              <div
                ref={scrollRef}
                className={`${
                  props.seeAll === true
                    ? "flex flex-col sm:flex-row flex-wrap "
                    : "overflow-x-scroll whitespace-nowrap  scroll-smooth scrollbar-hide relative pr-10"
                }`}
              >
                {data &&
                  Array.isArray(data) &&
                  data.map((item, id: number) => (
                    <div
                      className="w-[290px]  inline-block cursor-pointer relative p-3 overflow-hidden"
                      key={`${item}..${id}`}
                    >
                      <div
                        className="relative group card_shadow w-[290px] h-[240px] overflow-hidden"
                        onClick={() => {
                          if (props.sliderNumber === 0)
                            navigate(`/book_details/${item.name}`);
                          else navigate(`/food_details/${item.name}`);
                          dispatch(saveRestroId(item._id));
                        }}
                      >
                        <figure className="relative cursor-pointer">
                          <img
                            src={`${baseImgUrl}/${item.mainImage}`}
                            alt={item.name}
                            className="w-full h-[10rem] object-cover object-center"
                          />

                          <div className="flex absolute bottom-[1px] bg-[#00000066] z-0 h-10 w-full mt-2">
                            <div className="mx-4 flex items-center">
                              <FaLocationDot className="text-[#ffffff]" />
                              <h1 className="ml-2 text-white font-bold">
                                {item.address}
                              </h1>
                            </div>
                          </div>
                        </figure>
                        <div className="flex justify-between gap-2 mt-2 mx-2">
                          <div>
                            <h1 className="text-left font-bold">
                              {item.name}{" "}
                            </h1>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <AiFillStar color="black" />
                              <h1 className="font-bold text-black">
                                {item.averageRating}
                              </h1>
                            </div>
                            <div className="flex items-center rounded-[20px] mr-2">
                              <AiOutlineClockCircle className="text-[black]" />
                              <h1 className="font-bold text-green ">
                                {item.averageDeliveryTime} min
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-4 right-2 w-8 h-8  text-white font-bolder bg-opacity-50 transition duration-500 opacity-100 hover:opacity-100 cursor-pointer">
                        {favRestros.includes(item._id) ? (
                          <img
                            src="/fav.png"
                            className="h-8 w-8  object-cover "
                            onClick={() => handleWishlist(item._id)}
                          />
                        ) : (
                          <AiOutlineHeart
                            size={28}
                            onClick={() => handleWishlist(item._id)}
                          />
                        )}
                      </div>
                    </div>
                  ))}
              </div>   
              <span className={` ${props.showArrow && data.length > 4 ?"md:block":"hidden"}`}>
            <CustomIcon
              icon={GrNext}
              className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block p-2 right-0"
              size={36} 
              onClick={slideRight}
            />
          </span>

              </div>
            </ul>
          </div>
        ) : null}
        </div>
      </>
    );
  }
}
