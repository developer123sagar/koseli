import { Footers } from "@/components";
import HeaderWithSearch from "@/components/HeaderWithSearch";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { Privacy } from "@/types";
import { Dispatch, SetStateAction, useEffect } from "react";
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

export default function PrivacyPolicy(props:Search) {
  const dispatch = useAppDispatch();
  const data: Privacy = useAppSelector(
    (state: RootState) => state.fetchDashData.data
  );

  useEffect(() => {
    dispatch(fetchDashboardData({ api: "privacy-policy" }));
  }, [dispatch]);
  console.log(data);

  return (
  <>
  <div >
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
          <div className="relative flex items-center justify-center mt-16">
          <img
            src="/img/Blog/privacyPage.png"
            alt="privacy"
            className="w-full md:h-[25rem] h-[12rem] object-cover"
          />
          <div className="absolute pt-20">
            <span className="flex w-[120px] h-[2px]  bg-[#e1e1e1]  mx-auto mb-4">
              <em className="w-[60px] h-[2px] bg-[#e54350] mx-auto" />
            </span>
            <h1 className="w-fit mx-auto font-bold md:text-3xl text-2xl text-black mb-2">
              Privacy Policy
            </h1>
          </div>
        </div>
        <div>
          <div className="mt-10 mx-10">
            <h1 className="font-bold text-[20px]">{data && data.title}</h1>
            <h1 className="md:text-[20px] text-[16px]  text-justify">{data && data.body}</h1>
          </div>
        </div>
     

      <Footers />
      </div>
      </>
  
  );
}
