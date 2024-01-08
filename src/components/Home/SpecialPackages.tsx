import { Special_Package } from "@/constants";
import { fetchFoodApiData } from "@/redux/foods/foodDetailSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl, url } from "@/routes";
import { useEffect, useRef, useState } from "react";
import {
  AiFillStar,
  AiOutlineClockCircle,
  AiOutlineHeart,
} from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { saveRestroId } from "@/redux/restaurant/restaurantSlice";
import { IRestaurant } from "@/types";

import SeeAll from "@/common/SeeAll";
import axios from "axios";
import { CustomIcon } from "@/common";
import { GrNext, GrPrevious } from "react-icons/gr";

export default function SpecialPackages({
  seeAll,
  latitude,
  longitude,
  setDataPresent,
  sliderNumber,
  sortByTime,
  showArrow,
  timeSort,
  ratingSort,
  priceValue,
  setPriceValue,
  filterDataOnPrice,
  setFilterOnPrice
}: {
  seeAll?: boolean;
  latitude: string | null;
  longitude: string | null;
  setDataPresent?: React.Dispatch<React.SetStateAction<boolean>>;
  sliderNumber?: number;
  showArrow?:boolean;
  sortByTime?: boolean;
  timeSort?: (
    nearbyData: IRestaurant[],
    setData: React.Dispatch<React.SetStateAction<IRestaurant[]>>
  ) => void;
  ratingSort?: (
    nearbyData: IRestaurant[],
    setData: React.Dispatch<React.SetStateAction<IRestaurant[]>>
  ) => void;
  priceValue?: string;
  setPriceValue?: React.Dispatch<React.SetStateAction<string>>;
  filterDataOnPrice?: boolean;
  setFilterOnPrice?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { title } = Special_Package;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [data,setData]=useState<Array<any>>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { userToken } = useAppSelector((state: RootState) => state.signin);
  const [specialRestros, setSpecialRestros] = useState<string[]>(
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
        if (specialRestros.includes(restroId)) {
          setSpecialRestros((prev) => prev.filter((id) => id !== restroId));
        } else {
          setSpecialRestros((prev) => [...prev, restroId]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    localStorage.setItem("favRestros", JSON.stringify(specialRestros));
  }, [specialRestros]);

  const dynamicFoodData = useAppSelector(
    (state: RootState) => state.foodDetails.dynamicFoodData
  );

  useEffect(() => {
    dispatch(fetchFoodApiData({ api: `food-speciality/nearByfood-speciality/${longitude}/${latitude}` }));
  }, [dispatch]);

  useEffect(() => {
    if (dynamicFoodData && !seeAll) {
      console.log("Here I am")
      if (sliderNumber === 0) {
        const dummy = [...dynamicFoodData];
        const filteredData = dummy.filter((obj) => obj.dining === true);
        if (sortByTime && timeSort) timeSort(filteredData, setData);
        else if(ratingSort) ratingSort(filteredData, setData);
        setFilterOnPrice && setFilterOnPrice(false);
        setPriceValue && setPriceValue("0");
      } else if (sliderNumber === 1) {
        const dummy = [...dynamicFoodData];
        const filteredData = dummy.filter((obj) => obj.userPickup === true);
        if (sortByTime && timeSort) timeSort(filteredData, setData);
        else if(ratingSort) ratingSort(filteredData, setData);
        setFilterOnPrice && setFilterOnPrice(false);
        setPriceValue && setPriceValue("0");
      } else {
        const dummy = [...dynamicFoodData];

        const filteredData = dummy.filter(
          (obj) => obj.hasDelivery === true
        );
        if (sortByTime && timeSort) timeSort(filteredData, setData);
        else if(ratingSort) ratingSort(filteredData, setData);
        setFilterOnPrice && setFilterOnPrice(false);
        setPriceValue && setPriceValue("0");
      }
    }
  }, [sliderNumber, dynamicFoodData,seeAll]);

  useEffect(() => {
    if (!seeAll) {
      console.log("Here I am");
      if (sortByTime && timeSort) {
        timeSort(data, setData);
      } else if (ratingSort) ratingSort(data, setData);
    }
  }, [sortByTime,seeAll]);

  useEffect(() => {
    if (dynamicFoodData && filterDataOnPrice && priceValue && !seeAll) {
      console.log("Here I am")
      const dummy = [...dynamicFoodData];
      const value = parseInt(priceValue);
      const filteredData = dummy.filter(
        (obj) => obj.minimumSpentToCheckout! <= value
      );

      if (sortByTime && timeSort) timeSort(filteredData, setData);
      else if(ratingSort) ratingSort(filteredData, setData);
      setFilterOnPrice && setFilterOnPrice(false);
    }
  }, [filterDataOnPrice,seeAll]);

  useEffect(() => {
    (dynamicFoodData && dynamicFoodData.length > 0 && setDataPresent) ? setDataPresent(true) : setDataPresent && setDataPresent(false);
  }, [dynamicFoodData])

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

  useEffect(()=>{
    if(seeAll) setData(dynamicFoodData)
  },[seeAll,dynamicFoodData])
  
  console.log(data)
  console.log(dynamicFoodData)
  console.log(seeAll)
  
  return (
    <div className="mt-5">
      {data && data.length > 0 ? (
        <div>
          <SeeAll
            data={data}
            link="/specialpackages"
            title={title}
            scrollRef={scrollRef}
            seeAll={seeAll}
          />

<ul className={`mt-4    ${data.length==1 &&  "w-full flex  items-center justify-center sm:justify-start "}`}>
            <div className="  relative flex items-center group">
            <span className={` ${showArrow && data.length > 4 ?"md:block":"hidden"}`}>
             <CustomIcon
                icon={GrPrevious}
                className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block left-0 p-2"
                size={36}
                onClick={slideLeft}
              />
          </span>
            <div
              ref={scrollRef}
              className="overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative pr-10"
            >
              {data.length > 0 &&
                data.map((item:any, id:number) => (
                  <div
                    className="w-[290px] inline-block cursor-pointer relative p-3 overflow-hidden"
                    key={`${item}..${id}`}
                    onClick={() => dispatch(saveRestroId(item._id))}
                  >
                    <div
                      className="relative group card_shadow w-[290px] h-[240px] overflow-hidden"
                      key={id}
                      onClick={() => {
                        navigate(`/food_details/specialDetails/${item.name}`);
                        dispatch(saveRestroId(item._id));
                      }}
                    >
                      <figure className="relative ">
                        <img
                          src={`${baseImgUrl}/${item?.mainImage}`}
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
                      <div className="flex justify-between gap-2  mt-2 mx-2 ">
                        <div>
                          <h1 className=" text-left font-bold ">{item.name} </h1>
                        </div>
                        <div>
                          <div className="flex items-center  ml-10">
                            <AiFillStar color="black" className="mr-2" />
                            <h1 className="font-bold  text-black items-center justify-center  mr-2">
                              {item.averageRating}
                            </h1>
                          </div>
                          <div className="flex items-center mr-3 pt-2 pb-2 rounded-[20px]">
                            <AiOutlineClockCircle className="mr-2  text-[black]" />
                            <h1 className="font-bold text-green ">
                              {item.averageDeliveryTime} min
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8  text-white font-bolder bg-opacity-50 transition duration-500 opacity-100 hover:opacity-100 cursor-pointer">
                      {specialRestros.includes(item._id) ? (
                        <img
                          src="/fav.png"
                          className="h-8 w-8   object-cover "
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
            <span className={` ${showArrow && data.length > 4 ?"md:block":"hidden"}`}>
         <CustomIcon
                icon={GrNext}
                className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block right-0 p-2"
                size={36}
                onClick={slideRight}
              />
          </span>
            </div>
          </ul>
        </div>) : null}

    </div>
  );
}
