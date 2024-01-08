import { SetStateAction, useState } from "react";
import HeaderNoLocation from "../../pages/HeaderNoLocation";
import HeroNoLocation from "../../pages/HeroNoLocation";
import Card from "./Hero_Card";
import DownloadApp from "./DownloadApp";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Footers } from "..";


interface HomeNoLocationProps {
  setLatitude: React.Dispatch<React.SetStateAction<string | null>>;
  setLongitude: React.Dispatch<React.SetStateAction<string | null>>;
  setAskPermission: React.Dispatch<React.SetStateAction<boolean>>;
  setPermission: React.Dispatch<React.SetStateAction<boolean>>;
  latitude: string | null;
  longitude: string | null;
  setSelectedTimeSlot: React.Dispatch<React.SetStateAction<string>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  permission: boolean;
  token: string | null;
  askPermission: boolean;
  loading: boolean;
  setSliderNumber: React.Dispatch<SetStateAction<number>>;
  scrollDown: boolean;
  setScrollDown: React.Dispatch<SetStateAction<boolean>>;
  currentDay:string;
  selectedTimeSlot:string;
}

const HomeNoLocation = (props: HomeNoLocationProps) => {
  const [showEditPopUp, setShowEditPopUp] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blackTopClass = showEditPopUp
    ? "blackTransparentScreen visible"
    : "blackTransparentScreen inVisible";


  if (localStorage.getItem("longitude") !== null && localStorage.getItem("latitude") !== null) return <Navigate to="/rest_details/noId" />
  else {
    return (
      <div className="relative overflow-x-hidden ">
        <div className={blackTopClass} onClick={() => setShowEditPopUp(false)} />
        <HeaderNoLocation />
        
        <HeroNoLocation
          permission={props.permission}
          showEditPopUp={showEditPopUp}
          setShowEditPopUp={setShowEditPopUp}
          setLatitude={props.setLatitude}
          setLongitude={props.setLongitude}
          setAskPermission={props.setAskPermission}
          setPermission={props.setPermission}
          latitude={props.latitude}
          longitude={props.longitude}
          setSelectedTimeSlot={props.setSelectedTimeSlot}
          setCurrentDay={props.setCurrentDay}
          token={props.token}
          loading={props.loading}
          setSliderNumber={props.setSliderNumber}
          askPermission={props.askPermission}
          scrollDown={props.scrollDown}
          setScrollDown={props.setScrollDown}
          selectedTimeSlot={props.selectedTimeSlot}
          currentDay={props.currentDay}
        />
        <Card />
        {/* <Background /> */}
        <DownloadApp />
        {/* <Footer /> */}
        <Footers />
      </div>
    );
  }
};

export default HomeNoLocation;
