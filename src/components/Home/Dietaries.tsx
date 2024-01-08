/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import {
  fetchDietarydRestro,
  fetchRestaurant,
} from "@/redux/restaurant/restaurantSlice";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { baseImgUrl } from "@/routes";
import { AiFillStar, AiOutlineClockCircle } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import SeeAll from "@/common/SeeAll";
import { CustomIcon } from "@/common";
import { GrNext, GrPrevious } from "react-icons/gr";

type Dietary = {
  latitude: string | null;
  longitude: string | null;
  seeAll: boolean;
  isDietry: boolean;
  showArrow:boolean;

};
const Dietaries = (props: Dietary) => {
  const dispatch = useAppDispatch();
  const [dietry, setDietry] = useState<any>([]);

  const navigate = useNavigate();

  const { dietaryRestro } = useAppSelector(
    (state: RootState) => state.restaurant
  );
  const { restaurantData } = useAppSelector(
    (state: RootState) => state.restaurant
  );

  useEffect(() => {
    dispatch(fetchRestaurant());
  }, [dispatch]);

  console.log(dietaryRestro);

  useEffect(() => {
    if (dietaryRestro && dietaryRestro.dietPlans) {
      const arrayOfObjects = Object.entries(dietaryRestro.dietPlans).flatMap(
        ([restaurant, items]: [string, any]) =>
          items.map((item: any) => ({ restaurant, ...item }))
      );

      setDietry(arrayOfObjects);
    }
  }, [dietaryRestro]);

  useEffect(() => {
    dispatch(
      fetchDietarydRestro({
        latitude: props.latitude,
        longitude: props.longitude,
      })
    );
  }, [dispatch]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const filterDietryRestaurant = restaurantData.filter((restaurant) =>
    dietry.some((diet: any) => diet.restaurantId === restaurant._id)
  );
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

  return (
    <>
    <div className=" flex items-center sm:justify-start  justify-center">
      {filterDietryRestaurant && filterDietryRestaurant.length > 0 ? (
        <div className="pt-5 ">
          <SeeAll
            data={filterDietryRestaurant}
            link="/dietries"
            title={"Dietry Plan"}
            scrollRef={scrollRef}
            seeAll={props.seeAll}
          
            
          />
<ul className={`mt-4    ${filterDietryRestaurant.length==1 &&  "w-full flex  items-center justify-center sm:justify-start  "}`}>
          <div className="  relative flex items-center group" >
          <span className={` ${props.showArrow && filterDietryRestaurant.length > 4 ?"md:block":"hidden"}`}>
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
                  ? "flex flex-col sm:flex-row flex-wrap"
                  : "overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative pr-10"
              }`}
            >
              {filterDietryRestaurant &&
                Array.isArray(filterDietryRestaurant) &&
                filterDietryRestaurant?.map((item, id: number) => (
                  <div
                    className="w-[290px] inline-block cursor-pointer relative p-3 overflow-hidden"
                    key={`${item}..${id}`}
                    onClick={() => {
                      localStorage.setItem("restaurantId", item._id);
                      navigate(`/food_details/${item.name}?isDietry=true`);
                    }}
                  >
                    <div
                      className="relative group card_shadow w-[290px] h-[240px] overflow-hidden"
                      key={id}
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
                          <h1 className=" text-left  font-bold ">
                            {item.name}{" "}
                          </h1>
                        </div>
                        <div>
                          <div className="flex items-center ml-10">
                            <AiFillStar color="black" className="mr-2" />
                            <h1 className="font-bold text-black  mr-2">
                              {item.averageRating}
                            </h1>
                          </div>
                          <div className="flex items-center  pt-2 pb-2 mr-3 rounded-[20px]">
                            <AiOutlineClockCircle className="mr-2 text-[black]" />
                            <h1 className="font-bold text-green ">
                              {item.averageDeliveryTime} min
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <span className={` ${props.showArrow && filterDietryRestaurant.length > 4 ?"md:block":"hidden"}`}>
         <CustomIcon
                icon={GrNext}
                className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block right-0 p-2"
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
};
export default Dietaries;
