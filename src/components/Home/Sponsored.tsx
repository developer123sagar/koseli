/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRestaurant } from "@/types";
import {
  fetchSponsoredRestro,
  saveRestroId,
} from "@/redux/restaurant/restaurantSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { baseImgUrl } from "@/routes";
import { FaLocationDot } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";

import SeeAll from "@/common/SeeAll";
import { CustomIcon } from "@/common";
import { GrNext, GrPrevious } from "react-icons/gr";

interface TopRestaurant {
  latitude: string | null;
  longitude: string | null;
  permission: boolean;
  showArrow:boolean;
  sortByTime: boolean;
  isFounder?: boolean;
  timeSort: (
    sponsoredRestro: IRestaurant[],
    setData: React.Dispatch<React.SetStateAction<IRestaurant[]>>
  ) => void;
  ratingSort: (
    sponsoredRestro: IRestaurant[],
    setData: React.Dispatch<React.SetStateAction<IRestaurant[]>>
  ) => void;
  sliderNumber: number;
  priceValue: string;
  setPriceValue: Dispatch<SetStateAction<string>>;
  filterDataOnPrice: boolean;
  setFilterOnPrice: Dispatch<SetStateAction<boolean>>;
  seeAll?: boolean;
  setDataPresent: Dispatch<SetStateAction<boolean>>;
}

export default function SponsoredRestaurant(props: TopRestaurant) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [data, setData] = useState<Array<any>>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
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

  const { sponsoredRestro } = useAppSelector(
    (state: RootState) => state.restaurant
  );

  useEffect(() => {
    dispatch(
      fetchSponsoredRestro({
        latitude: props.latitude,
        longitude: props.longitude,
      })
    );
  }, [dispatch, props.latitude, props.longitude]);

  useEffect(() => {
    if (props.sliderNumber === 0) {
      const dummy = [...sponsoredRestro];
      const filteredData = dummy.filter(
        (obj) => obj.restaurantdetails.dining === true
      );
      setData(filteredData);
    } else if (props.sliderNumber === 1) {
      const dummy = [...sponsoredRestro];
      const filteredData = dummy.filter(
        (obj) => obj.restaurantdetails.userPickup === true
      );
      setData(filteredData);
    } else {
      const dummy = [...sponsoredRestro];
      const filteredData = dummy.filter(
        (obj) => obj.restaurantdetails.hasDelivery === true
      );
      setData(filteredData);
    }
  }, [props.sliderNumber, sponsoredRestro]);

  useEffect(() => {
    data && data.length > 0
      ? props.setDataPresent(true)
      : props.setDataPresent(false);
  }, [data]);

  if (props.latitude === null || props.longitude === null) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
      <div className=" flex items-center sm:justify-start justify-center">
        {data && data.length > 0 ? (
          <div >
            <SeeAll
              title=""
              data={sponsoredRestro}
              link="/toprestaurant"
              scrollRef={scrollRef}
              seeAll={props.seeAll}
              showline={true}
            />
        
<ul className={`mt-4  ${data.length==1 &&  "w-full flex  items-center justify-center sm:justify-start "}`}>
              <div className="  relative flex  items-center group">
              <span className={` ${props.showArrow?"md:block":"hidden"}`}>
             <CustomIcon
                icon={GrPrevious}
                className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block left-0"
                size={20}
                onClick={slideLeft}
              />
          </span>
              <div
                ref={scrollRef}
                className={`${
                  props.seeAll === true
                    ? "flex flex-col   sm:flex-row flex-wrap "
                    : "overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative pr-10"
                }`}
              >
                {data &&
                  Array.isArray(data) &&
                  data.map((item: any, id: number) => (
                    <div
                      className="w-[290px] inline-block cursor-pointer relative p-3 overflow-hidden"
                      key={`${item}..${id}`}
                    >
                      <div
                        className="relative group card_shadow w-[290px] h-[240px] overflow-hidden"
                        onClick={() => {
                          if (props.sliderNumber === 0)
                            navigate(
                              `/book_details/${item.restaurantdetails.name}`
                            );
                          else
                            navigate(
                              `/food_details/${item.restaurantdetails.name}`
                            );
                          console.log(item.restaurant._id);
                          dispatch(saveRestroId(item.restaurant));
                        }}
                      >
                        <figure className="relative cursor-pointer">
                          <img
                            src={`${baseImgUrl}/${item.image}`}
                            alt={item.restaurantdetails.name}
                            className="w-full h-[10rem] object-cover object-center"
                          />

                          <div className="flex absolute bottom-[1px] bg-[#00000066] z-0 h-10 w-full mt-2">
                            <div className="mx-4 flex items-center">
                              <FaLocationDot className="text-[#ffffff]" />
                              <h1 className="ml-2 text-white font-bold">
                                {item.restaurantdetails.address}
                              </h1>
                            </div>
                          </div>
                        </figure>
                        <div className="flex justify-between gap-2 mt-2 mx-2">
                          <div>
                            <h1 className="text-left font-bold ">
                              {item.restaurantdetails.name}{" "}
                            </h1>
                            <h1 className="text-red-600 font-bold">Ads</h1>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <span className={` ${props.showArrow?"md:block":"hidden"}`}>
         <CustomIcon
                icon={GrNext}
                className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block right-0"
                size={20}
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
