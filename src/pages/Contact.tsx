import { Forms, Footers } from "@/components";
import HeaderWithSearch from "@/components/HeaderWithSearch";
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
export default function Contact(props:Search) {
  return (
   <> 
   <div className="r-2xl:pt-0 ">
    <HeaderWithSearch
   sliderNumber={props.sliderNumber}
   setSliderNumber={props.setSliderNumber}
   setLongitude={props.setLongitude}
   setLatitude={props.setLatitude}
   setScrollDown={props.setScrollDown}
   setPermission={props.setPermission}
   latitude={props.latitude}
   longitude={props.longitude}
   hideSlider={true}
   headerLocation={true}
 />

      <div className="relative flex items-center justify-center  mt-10 sm:mt-6">
        <img
          src="/img/contact/ContactPage.png"
          alt="contact"
          className="w-full md:h-[20rem] h-[12rem] object-cover  "
        />
        <div className="absolute pt-20">
          <span className="flex w-[120px] h-[2px]  bg-[#e1e1e1]  mx-auto mb-4">
            <em className="w-[60px] h-[2px] bg-[#e54350] mx-auto" />
          </span>
          <h1 className="w-fit mx-auto font-bold md:text-3xl text-2xl text-black mb-2">
            Contact
          </h1>
        </div>
      </div>
      <Forms />
      <Footers />
      </div>
      </>
  
  );
}
