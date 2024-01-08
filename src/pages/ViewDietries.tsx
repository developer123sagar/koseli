import HeaderWithSearch from "@/components/HeaderWithSearch";
import Dietaries from "@/components/Home/Dietaries";


import { Dispatch, SetStateAction } from "react";

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
  setScrollDown:Dispatch<SetStateAction<boolean>>;
  setPermission:Dispatch<SetStateAction<boolean>>;
}
export default function ViewDietries(props: Search) {

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
   <div className="pt-2 flex justify-center md:pt-10">
           
   <Dietaries
                latitude={props.latitude}
                longitude={props.longitude}
                seeAll={true}
                showArrow={false}
            
                isDietry
              />
            
          </div>
   </div>
   </>
  )
}
