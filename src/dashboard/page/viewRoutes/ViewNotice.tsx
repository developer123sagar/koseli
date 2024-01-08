import { TextEditor } from "@/common";
import Buttons from "@/common/Button";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { fetchRestaurant } from "@/redux/restaurant/restaurantSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { INotice } from "@/types";
import { useEffect } from "react";

const ViewNotice = () => {
  const dispatch = useAppDispatch();
  const selectedItem: INotice = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  const { restaurantData } = useAppSelector(
    (state: RootState) => state.restaurant
  );
  useEffect(() => {
    dispatch(fetchRestaurant());
  }, [dispatch]);

  const restaurant = restaurantData?.find(
    (restro) => restro._id === selectedItem?.restaurantId
  );

  return (
    <div className="mt-20 w-full">
        <Buttons type="button" variant="secondary" back={true}>
          Go Back
        </Buttons>
        <div className="w-full justify-between flex gap-5 flex-wrap my-6">
          <ViewInputField
            basis={100}
            value={selectedItem?.noticetitle || ""}
            label="Notice Title"
          />
        </div>
        <div>
          <p>Detail</p>
          <TextEditor disabled existingDescription={selectedItem?.Detail} />
        </div>
        <div className="mt-5">
          <label className="mb-2.5 block text-black">Notice Photo</label>
          <div className="flex gap-2">
            <img
              src={`${baseImgUrl}/${selectedItem?.image}`}
              alt={selectedItem?.noticetitle}
              className="w-[40rem] object-cover"
            />
          </div>
        </div>
        <div className="mt-5">
          <label className="mb-2.5 block text-black">Restaurant Photo</label>
          <div className="flex gap-2">
            <img
              src={`${baseImgUrl}/${restaurant?.mainImage}`}
              alt={restaurant?.name}
              className="w-[40rem] object-cover"
            />
          </div>
        </div>
      </div>
  );
};

export default ViewNotice;
