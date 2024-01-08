import { FaLocationDot } from "react-icons/fa6";
import { AiFillStar } from "react-icons/ai";
import { baseImgUrl } from "@/routes";
import { useNavigate } from "react-router-dom";
import { saveRestroId } from "@/redux/restaurant/restaurantSlice";

import HeaderWithSearch from "@/components/HeaderWithSearch";
import { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { useAppDispatch, RootState, useAppSelector } from "@/redux/store";
import { performCategorySearch, performSearch } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import { google_map_api_key } from "@/routes";


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

interface SearchItem {
  status: number;
  message: string;
  Data: {
    sequentialMatches: {
      name: string;
      mainImage: string;
      foodprice: number;
      activeImage: string;
      restaurantId: string;
      foodname: string;
      restaurantName: string;
      averageRating: number;
      averageDeliveryTime: string;
      userPickup: boolean;
      hasDeliveryCondition: boolean;
      dining: boolean;
      _id: string;
      address: string;
    }[];
  };
}

interface StateType {
  name?: string;
  mainImage?: string;
  foodprice?: number;
  activeImage?: string;
  restaurantId?: string;
  foodname?: string;
  restaurantName?: string;
  averageRating?: number;
  averageDeliveryTime: string;
  userPickup: boolean;
  hasDeliveryCondition: boolean;
  dining: boolean;
  _id: string;
  address: string;
  minimumSpentToCheckout?: number;
  vegetarian?: boolean;
}
[];

export default function FilteredSearch(props: Search) {
  const [foodContent, setFoodContent] = useState<StateType[]>([]);
  const [restContent, setRestContent] = useState<StateType[]>([]);

  const navigate = useNavigate();
  type Library = "places";

  const libraries: Library[] = ["places"];


  const { catName, searchParam } = useParams();

  const dispatch = useAppDispatch();
 
  const searchedItem: SearchItem[] = useAppSelector(
    (state: RootState) => state.fetchDashData.searchedItem
  );

  const { categorySearch } = useAppSelector((state: RootState) => state.fetchDashData)

  useEffect(() => {
    console.log("first")
    dispatch(performSearch({ data: searchParam }));
    console.log("first")
    if(catName!=="noId") dispatch(performCategorySearch({ data: catName })); 
  }, [dispatch, searchParam,catName]); 

  useEffect(() => {
    if (searchedItem && searchedItem.length > 0) {
      setFoodContent(searchedItem[0].Data.sequentialMatches);
      setRestContent(searchedItem[1].Data.sequentialMatches);
    }
  }, [searchedItem, searchParam]);

  useEffect(() => {
    if (props.sliderNumber === 0) {
      if (searchedItem && searchedItem[0] && searchedItem[1]) {
        const dummyOne: any = [...searchedItem[0]?.Data?.sequentialMatches];
        const dummyTwo: any = [...searchedItem[1]?.Data?.sequentialMatches];
        const filteredDataOne = dummyOne.filter(
          (obj: any) => obj.dining === true
        );
        const filteredDataTwo = dummyTwo.filter(
          (obj: any) => obj.dining === true
        );

        setFoodContent(filteredDataOne);
        setRestContent(filteredDataTwo);
      }

    } else if (props.sliderNumber === 1) {
      if (searchedItem && searchedItem[0] && searchedItem[1]) {
        const dummyOne: any = [...searchedItem[0]?.Data?.sequentialMatches];
        const dummyTwo: any = [...searchedItem[1]?.Data?.sequentialMatches];

        const filteredDataOne = dummyOne.filter(
          (obj: any) => obj.userPickup === true
        );
        const filteredDataTwo = dummyTwo.filter(
          (obj: any) => obj.userPickup === true
        );

        setFoodContent(filteredDataOne);
        setRestContent(filteredDataTwo);
      }

    } else {
      if (searchedItem && searchedItem[0] && searchedItem[1]) {
        const dummyOne: any = [...searchedItem[0]?.Data?.sequentialMatches];
        const dummyTwo: any = [...searchedItem[1]?.Data?.sequentialMatches];

        const filteredDataOne = dummyOne.filter(
          (obj: any) => obj.hasDelivery === true
        );
        const filteredDataTwo = dummyTwo.filter(
          (obj: any) => obj.hasDelivery === true
        );

        setFoodContent(filteredDataOne);
        setRestContent(filteredDataTwo);
      }
    }
  }, [props.sliderNumber]);

  return (
    <LoadScript googleMapsApiKey={google_map_api_key} libraries={libraries}>
      <HeaderWithSearch
        sliderNumber={props.sliderNumber}
        setSliderNumber={props.setSliderNumber}
        setLongitude={props.setLongitude}
        setLatitude={props.setLatitude}
        setScrollDown={props.setScrollDown}
        setPermission={props.setPermission}
        latitude={props.latitude}
        longitude={props.longitude}
        hideSlider={false}
        headerLocation={true}

      />
      <div className="flex gap-10 md:mt-10  mt-6  pb-10">
        <div className="flex-1 flex-wrap lg:pl-0">
          {catName === "noId" && foodContent.length > 0 && (
            <div className="flex justify-center md:justify-center sm:justify-start sm:pl-10 flex-col mt-10">
              <div className=" w-full  flex md:justify-start justify-center">
                <span className="flex w-[120px]  md:w-[120px] h-[2px] bg-[#e1e1e1] mb-4">
                  <em className="w-[60px]  h-[2px] bg-[#e54350]" />
                </span>
              </div>
              <h1 className="font-bold text-xl md:text-2xl text-center md:text-left">
                Food '{searchParam}' Present In
              </h1>

            </div>
          )}
          <div className="flex gap-3 justify-center pl-0 sm:justify-start sm:pl-10 flex-wrap mt-4">
            {catName === "noId"
              ? foodContent.map((item, id) => (
                <div
                  className="gap-6 bg-slate-50 shadow-lg group transition-all duration-500"
                  key={`${item}..${id}`}
                  onClick={() => {
                    if (props.sliderNumber === 0) {
                      navigate(`/book_details/${item.restaurantName}`);
                      dispatch(saveRestroId(item.restaurantId));
                    }

                    else {
                      navigate(`/food_details/${item.restaurantName}`);
                      dispatch(saveRestroId(item.restaurantId));

                    }
                  }}
                >
                  <div
                    className="relative  group admin-header w-[270px] h-[240px] overflow-hidden "
                    key={id}
                  >
                    <figure className="relative ">
                      <img
                        src={`${baseImgUrl}/${item.mainImage}`}
                        alt={item.name}
                        className="w-full h-[10rem] object-cover  object-center"
                      />
                      <div className="absolute top-1 right-4 w-8 h-8 text-white font-bolder bg-opacity-50 transition duration-500 opacity-100 hover:opacity-100 cursor-pointer">
                        <AiOutlineHeart size={28} />
                      </div>

                      <div className="flex">
                        <div className="flex absolute bottom-[1px]   bg-[#00000066] z-10 h-10 w-full mt-2">
                          <div className="mx-4 flex items-center">
                            <FaLocationDot className="text-[#ffffff]" />
                            <h1 className="ml-2 text-white font-bold">
                              {item.address}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </figure>
                    <div className="flex justify-between gap-2  mt-2 mx-2 ">
                      <div>
                        <h1 className=" text-left font-bold ">
                          {item.restaurantName}{" "}
                        </h1>
                      </div>
                      <div>
                        <div className="flex items-center ml-10">
                          <AiFillStar color="black" className="mr-2" />
                          <h1 className="font-bold  text-black  mr-2">
                            {item.averageRating}
                          </h1>
                        </div>
                        <div className="flex items-center  pt-2 pb-2 rounded-[20px]">
                          <AiOutlineClockCircle className="mr-2 text-[black]" />
                          <h1 className="font-bold text-green ">
                            {item.averageDeliveryTime} min
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              : foodContent.length > 0 && catName === "noId"}
          </div>

          {catName === "noId" && restContent.length > 0 && (
            <div className="flex justify-center md:justify-center sm:justify-start sm:pl-10 flex-col mt-10">
              <div className=" w-full  flex md:justify-start justify-center">
                <span className="flex w-[120px]  md:w-[120px] h-[2px] bg-[#e1e1e1] mb-4">
                  <em className="w-[60px]  h-[2px] bg-[#e54350]" />
                </span>
              </div>
              <h1 className="font-bold text-[19px] md:text-2xl text-center md:text-left">
                RESTAURANTS OF YOUR SEARCH
              </h1>
            </div>

          )}
          <div className="mt-4 md:mt-10 flex gap-3 justify-center pl-0 sm:justify-start  sm:pl-10 flex-wrap">
            {restContent.length > 0 && catName === "noId"
              ? restContent.map((item, id) => (
                <div
                  className="gap-6   bg-slate-50 shadow-lg group transition-all duration-500"
                  key={`${item}..${id}`}
                  onClick={() => {
                    if (props.sliderNumber === 0) {
                      navigate(`/book_details/${item.name}`);

                      dispatch(saveRestroId(item.restaurantId));
                    }
                    else {
                      navigate(`/food_details/${item.name}`);

                      dispatch(saveRestroId(item.restaurantId));
                    }
                  }}
                >
                  <div
                    className="relative  group  admin-header w-full md:w-[270px]  h-[240px] overflow-hidden "
                    key={id}
                  >
                    <figure className="relative ">
                      <img
                        src={`${baseImgUrl}/${item.mainImage}`}
                        alt={item.name}
                        className="w-[270px] h-[10rem] object-cover  object-center"
                      />
                      <div className="absolute top-1 right-4 w-8 h-8 text-white font-bolder bg-opacity-50 transition duration-500 opacity-100 hover:opacity-100 cursor-pointer">
                        <AiOutlineHeart size={28} />
                      </div>

                      <div className="flex">
                        <div className="flex absolute bottom-[1px]   bg-[#00000066] z-10 h-10 w-full mt-2">
                          <div className="mx-4 flex items-center">
                            <FaLocationDot className="text-[#ffffff]" />
                            <h1 className="ml-2 text-white font-bold">
                              {item.address}
                            </h1>
                          </div>
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
                        <div className="flex items-center ml-10">
                          <AiFillStar color="black" className="mr-2" />
                          <h1 className="font-bold  text-black  mr-2">
                            {item.averageRating}
                          </h1>
                        </div>
                        <div className="flex items-center  pt-2 pb-2 rounded-[20px]">
                          <AiOutlineClockCircle className="mr-2 text-[black]" />
                          <h1 className="font-bold text-green ">
                            {item.averageDeliveryTime} min
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              : ""}
          </div>

          {catName !== "noId" && (
            <div className="flex justify-center flex-col pl-4 sm:pl-10">
              <span className="flex w-[120px] h-[2px]  bg-[#e1e1e1] mb-4">
                <em className="w-[60px] h-[2px] bg-[#e54350]" />
              </span>
              <h1 className="font-bold text-[12px] sm:text-xl uppercase mb-5">
                {" "}
                {`RESTAURANTS WITH ${catName}`}{" "}
              </h1>
            </div>
          )}

          <div className="flex gap-3 pl-0 sm:pl-10">
            {catName !== "noId" &&
              categorySearch &&
              categorySearch[0] &&
              categorySearch[0].Data.sequentialMatches.map((item: any, id: number) => (
                <div
                  className="gap-6   bg-slate-50 shadow-lg group transition-all duration-500"
                  key={`${item}..${id}`}
                  onClick={() => {
                    if (props.sliderNumber === 0)
                      navigate(`/book_details/${item.restaurantName}`);
                    else navigate(`/food_details/${item.restaurantName}`);
                    dispatch(saveRestroId(item._id));
                  }}
                >
                  <div
                    className="relative  group admin-header w-[270px]  h-[240px] overflow-hidden "
                    key={id}
                  >
                    <figure className="relative ">
                      <img
                        src={`${baseImgUrl}/${item.mainImage}`}
                        alt={item.name}
                        className="w-full h-[10rem] object-cover  object-center"
                      />
                      <div className="absolute top-1 right-4 w-8 h-8 text-white font-bolder bg-opacity-50 transition duration-500 opacity-100 hover:opacity-100 cursor-pointer">
                        <AiOutlineHeart size={28} />
                      </div>

                      <div className="flex">
                        <div className="flex absolute bottom-[1px]   bg-[#00000066] z-10 h-10 w-full mt-2">
                          <div className="mx-4 flex items-center">
                            <FaLocationDot className="text-[#ffffff]" />
                            <h1 className="ml-2 text-white font-bold">
                              {item.address}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </figure>
                    <div className="flex justify-between gap-2  mt-2 mx-2 ">
                      <div>
                        <h1 className=" text-left font-bold ">
                          {item.restaurantName}{" "}
                        </h1>
                      </div>
                      <div>
                        <div className="flex items-center ml-10">
                          <AiFillStar color="black" className="mr-2" />
                          <h1 className="font-bold  text-black  mr-2">
                            {item.averageRating}
                          </h1>
                        </div>
                        <div className="flex items-center  pt-2 pb-2 rounded-[20px]">
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
        </div>
      </div>
    </LoadScript>
  );
}
