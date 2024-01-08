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
    setLongitude: Dispatch<SetStateAction<string | null>>;
    setLatitude: Dispatch<SetStateAction<string | null>>;
    setScrollDown:Dispatch<SetStateAction<boolean>>;
    setPermission:Dispatch<SetStateAction<boolean>>;
}

export default function ViewOrder(props:Search) {
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
   <div className="mt-40  w-full flex  items-center justify-center">
    <div className="flex items-center justify-center w-[30%] p-4 admin-header ">
    <div className="">
        <h1 className="font-bold  text-2xl text-center mb-6">View Details</h1>
        <div className=" w-[28rem] flex gap-4 flex-col ">
            <div className="flex justify-between w-full gap-10">
                <h1>Product Detail</h1>
                <h1 className="text-justify">momo</h1>
            </div>
            <hr/>
            <div  className="flex justify-between gap-10">
                <h1>SubTotal</h1>
                <h1>200</h1>
            </div>
            <hr/>
            <div  className="flex justify-between gap-10">
                <h1>Shipping</h1>
                <h1>kathmandu</h1>
            </div>
            <hr/>
            <div  className="flex justify-between gap-10">
                <h1>payment method</h1>
                <h1>khalti</h1>
            </div>
            <hr/>
            <div  className="flex justify-between gap-10">
                <h1>Total</h1>
                <h1>200</h1>
            </div>
        </div>
    </div>
    </div>
   </div>
   </>
  )
}
