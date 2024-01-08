import { PopularHotels } from "@/constants";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl, url } from "@/routes";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import {
  fetchPopularRestaurant,
  saveRestroId,
} from "@/redux/restaurant/restaurantSlice";
import { IRestaurant } from "@/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

import SeeAll from "@/common/SeeAll";
import axios from "axios";
import { CustomIcon } from "@/common";
import { GrNext, GrPrevious } from "react-icons/gr";

interface PopularHotel {
  latitude: string | null;
  longitude: string | null;
  permission: boolean;
  showArrow:boolean;
  sliderNumber: number;
  priceValue?: string;
  seeAll?: boolean;
  setPriceValue?: Dispatch<SetStateAction<string>>;
  filterDataOnPrice?: boolean;
  setFilterOnPrice?: Dispatch<SetStateAction<boolean>>;
  setDataPresent?: Dispatch<SetStateAction<boolean>>;


}


export default function PopularHotel(props: PopularHotel) {
  const { title } = PopularHotels;
  const [data, setData] = useState<IRestaurant[]>([]);
  const { userToken } = useAppSelector((state: RootState) => state.signin);
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { popularData } = useAppSelector(
    (state: RootState) => state.restaurant
  );

  const [popularRestros, setpopularRestros] = useState<string[]>(
    JSON.parse(localStorage.getItem("favRestros") || "[]")
  );

  const handleWishlist = async (restroId: string) => {
    try {
      const res = await axios.put(`${url}/wishlist/${restroId}`, null, {
        headers: {
          Authorization: userToken,
        },
      });
      if (res.status === 200) {
        if (popularRestros.includes(restroId)) {
          setpopularRestros((prev) => prev.filter((id) => id !== restroId));
        } else {
          setpopularRestros((prev) => [...prev, restroId]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    localStorage.setItem("popularRestros", JSON.stringify(popularRestros));
  }, [popularRestros]);

  useEffect(() => {
    if (props.latitude !== null && props.longitude !== null) {
      const body = {
        lat: props.latitude,
        long: props.longitude,
      };
      dispatch(fetchPopularRestaurant(body));
    }
  }, [dispatch, props.latitude, props.longitude]);
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
    if (props.sliderNumber === 0) {
      const dummy = [...popularData];
      const filteredData = dummy.filter((obj) => obj.dining === true);
      setData(filteredData);
      props.setFilterOnPrice && props.setFilterOnPrice(false);
      props.setPriceValue && props.setPriceValue("0");
    } else if (props.sliderNumber === 1) {
      const dummy = [...popularData];
      const filteredData = dummy.filter((obj) => obj.userPickup === true);
      setData(filteredData);
      props.setFilterOnPrice && props.setFilterOnPrice(false);
      props.setPriceValue && props.setPriceValue("0");
    } else {
      const dummy = [...popularData];
      const filteredData = dummy.filter((obj) => obj.hasDelivery === true);
      setData(filteredData);
      props.setFilterOnPrice && props.setFilterOnPrice(false);
      props.setPriceValue && props.setPriceValue("0");
    }
  }, [props.sliderNumber, popularData]);

  useEffect(() => {
    const unfilteredData = popularData.filter((obj) => obj.dining === true);
    setData(unfilteredData);
  }, [popularData]);

  useEffect(() => {
    if (props.filterDataOnPrice && props.priceValue) {
      const dummy = [...popularData];
      const value = parseInt(props.priceValue);
      const filteredData = dummy.filter(
        (obj) => obj.minimumSpentToCheckout! <= value
      );
      setData(filteredData);
      props.setFilterOnPrice && props.setFilterOnPrice(false);
    }
  }, [props.filterDataOnPrice]);

  useEffect(() => {
    data && data.length > 0 && props.setDataPresent
      ? props.setDataPresent(true)
      : props.setDataPresent && props.setDataPresent(false);
  }, [data]);

  return (
    <>
    <div >
      {data && data.length > 0 ? (
        <div className="pt-5  ">
          <SeeAll
            data={popularData}
            link="/popularhotel"
            title={title}
            scrollRef={scrollRef}
            seeAll={props.seeAll}
          />

<ul className={`mt-4    ${data.length==1 &&  "w-full flex  items-center justify-center sm:justify-start "}`}>
            <div>

            <div className="  relative flex  items-center group">

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
                  ? "flex flex-col   sm:flex-row flex-wrap"
                  : "overflow-x-scroll whitespace-nowrap scroll-smooth  scrollbar-hide relative  pr-10"
              }`}
            >
              
              {data &&
                Array.isArray(data) &&
                data?.map((item, id: number) => (
                  <div
                    className="w-[290px] inline-block cursor-pointer relative p-3 overflow-hidden"
                    key={`${item}..${id}`}
                    onClick={() => dispatch(saveRestroId(item._id))}
                  >
                    <div
                      className="relative group card_shadow w-[290px] h-[240px] overflow-hidden"
                      key={id}
                      onClick={() => {
                        if (props.sliderNumber === 0)
                          navigate(`/food_details/${item.name}`);
                        dispatch(saveRestroId(item._id));
                      }}
                    >
                      <figure className="relative ">
                        <img
                          src={`${baseImgUrl}/${item.mainImage}`}
                          alt={item.name}
                          className="w-full h-[10rem] object-cover  object-center"
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
                      <div className="flex justify-between gap-2  mt-2 mx-2 ">
                        <div>
                          <h1 className=" text-left font-bold ">
                            {item.name}{" "}
                          </h1>
                        </div>
                        <div>
                          <div className="flex items-center ">
                            <AiFillStar color="black" className="mr-2" />
                            <h1 className="font-bold text-black  mr-2">
                              {item.averageRating}
                            </h1>
                          </div>
                          <div className="flex items-center  pt-2 pb-2 rounded-[20px]">
                            <AiOutlineClockCircle className="mr-2 text-[black]" />
                            <h1 className="font-bold text-green mr-2 ">
                              {item.averageDeliveryTime} min
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-4 right-2 w-8  h-8 text-white font-bolder bg-opacity-50 transition duration-500 opacity-100 hover:opacity-100 cursor-pointer">
                      {popularRestros.includes(item._id) ? (
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
         <div>
         <span className={` ${props.showArrow && data.length > 4 ?"md:block":"hidden"}`}>
         <CustomIcon
                icon={GrNext}
                className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block right-0 p-2 "
                size={36}
                onClick={slideRight}
              />
          </span>
         </div>
            </div>
            </div>
          </ul>
        </div>
      ) : null}
      </div>
    </>
  );
}
