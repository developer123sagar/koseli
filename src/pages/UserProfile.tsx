import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { Dispatch, SetStateAction, useEffect } from "react";

import ManageAccount from "./ManageAccount";

type userProfileProp = {
  latitude: string | null
  longitude: string | null
  permission: boolean
  setSearchParam: Dispatch<SetStateAction<string>>;
  currentDay: string;
  selectedTimeSlot: string;
  sliderNumber: number;
  setSliderNumber: Dispatch<SetStateAction<number>>;
  setLatitude: Dispatch<SetStateAction<string | null>>;
  setLongitude: Dispatch<SetStateAction<string | null>>;
  setPermission: Dispatch<SetStateAction<boolean>>;
  setScrollDown: Dispatch<SetStateAction<boolean>>;
  role:string

}

const UserProfile = (props: userProfileProp) => {
  const { userToken } = useAppSelector((state: RootState) => state.signin);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDashboardData({ api: "client/info", token: userToken! }));
  }, [dispatch, userToken]);

  return (
    <div className="mt-[-40px] overflow-hidden">
        <ManageAccount 
          latitude={props.latitude}
          longitude={props.longitude}
          permission={props.permission}
          setSearchParam={props.setSearchParam}
          currentDay={props.currentDay}
          selectedTimeSlot={props.selectedTimeSlot}
          sliderNumber={props.sliderNumber}
          setSliderNumber={props.setSliderNumber}
          setLatitude={props.setLatitude}
          setLongitude={props.setLongitude}
          setPermission={props.setPermission}
          setScrollDown={props.setScrollDown}
          isAdmin={true}
          role={props.role}
        />
      </div>
  )
};

export default UserProfile;
