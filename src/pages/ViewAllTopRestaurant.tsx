import { IRestaurant } from "@/types";

import { Dispatch, SetStateAction } from "react";

import HeaderWithSearch from "@/components/HeaderWithSearch";
import { TopRestaurant } from "@/components";

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
}
export default function ViewAllTopRestaurant(props: Search) {
  
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

  return (
    <>
      <HeaderWithSearch
        sliderNumber={props.sliderNumber}
        setSliderNumber={props.setSliderNumber}
        setLongitude={props.setLongitude}
        setLatitude={props.setLatitude}
        setScrollDown={props.setScrollDown}
        setPermission={props.setPermission}
        latitude={props.latitude}
        longitude={props.longitude}
      />
       <div className="sm:mt-10 mt-2">
 <div className="pt-2  mx-auto flex justify-center md:pt-10">
          <TopRestaurant
            latitude={props.latitude}
            longitude={props.longitude}
            permission={props.permission}
            timeSort={timeSort}
            ratingSort={ratingSort}
            sliderNumber={props.sliderNumber}
            seeAll={true}
            showArrow={false}
          />
        </div>
      </div>
    </>
  );
}
