import HeaderWithSearch from "@/components/HeaderWithSearch";
import SpecialPackages from "@/components/Home/SpecialPackages";

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
  setScrollDown: Dispatch<SetStateAction<boolean>>;
  setPermission: Dispatch<SetStateAction<boolean>>;
}
export default function ViewSepcialPackage(props: Search) {

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
      <div className="mt-20">

        <div className="pt-20 mx-10 md:pt-10">
          <SpecialPackages seeAll={true}
            latitude={props.latitude}
            longitude={props.longitude} />
        </div>
      </div>
    </>
  )
}
