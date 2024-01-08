import { Card, Footers } from "@/components";
import Founder_Image from "@/components/About/Founders";
import HeaderWithSearch from "@/components/HeaderWithSearch";

// import Founder_Image from "@/components/About/Founders";

import { Dispatch, SetStateAction } from "react";
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
   
}

export default function About(props:Search) {

  return (
    <>
  <div className="overflow-x-hidden">
       <HeaderWithSearch
       headerLocation={true}
          sliderNumber={props.sliderNumber}
          setSliderNumber={props.setSliderNumber}
          setLongitude={props.setLongitude}
          setLatitude={props.setLatitude}
          setScrollDown={props.setScrollDown}
          setPermission={props.setPermission}
          latitude={props.latitude}
          longitude={props.longitude}
          hideSlider={true}
        />
          <div className="relative mt-10 sm:mt-6">
          <img
              src="/img/About/Aboutpage.png"
            alt="help"
            className="w-full md:h-[20rem] h-[12rem] object-cover "
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full pt-10">
            <span className="flex w-[120px] h-[2px] bg-[#e1e1e1]  mx-auto mb-4">
              <em className="w-[60px] h-[2px] bg-[#eb0029] mx-auto" />
            </span>
            <h1 className="w-fit mx-auto text-black font-bold text-2xl md:text-3xl mb-2">
              About
            </h1>
         
          </div>
        </div>
        <Card />
        <Founder_Image />
        <Footers />
        </div>
       

    
    </>
  );
}
