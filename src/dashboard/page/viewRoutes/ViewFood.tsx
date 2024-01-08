import { TextEditor } from "@/common";
import Buttons from "@/common/Button";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { RootState, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { IFoodItem } from "@/types";

const ViewFood = () => {
  const selectedItem: IFoodItem = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  return (
    <div className="mt-20 w-full">
        <Buttons type="button" variant="secondary" back={true}>
          Go Back
        </Buttons>
        <div className="w-full justify-between flex gap-5 flex-wrap my-6">
          <ViewInputField value={selectedItem?.name || ""} label="Food Name" />

          <ViewInputField value={selectedItem?.price || ""} label="Price" />

          <ViewInputField
            value={selectedItem?.minQuantity || ""}
            label="Quantity"
          />

          <ViewInputField
            value={selectedItem?.foodMakingTime?.minutes || ""}
            label="Food making time (in minutes)"
          />
        </div>
        <label htmlFor="desc">Food Description</label>
        <TextEditor
          existingDescription={selectedItem?.subTitle || "Not available"}
          disabled
        />
        <div className="mt-5">
          <label className="mb-2.5 block text-black">Food Image</label>
          <div className="flex gap-2">
            <img
              src={`${baseImgUrl}/${selectedItem?.activeImage}`}
              alt={selectedItem?.name}
              className="w-[40rem] object-cover"
            />
          </div>
        </div>
      </div>
  );
};

export default ViewFood;
