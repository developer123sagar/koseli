import { TextEditor } from "@/common";
import Buttons from "@/common/Button";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { RootState, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { IFoodCategory } from "@/types";

const ViewCategory = () => {
  const selectedItem: IFoodCategory = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  return (
    <div className="mt-20 w-full">
        <Buttons type="button" variant="secondary" back={true}>
          Go Back
        </Buttons>
        <div className="w-full mt-5 flex gap-5 flex-wrap justify-between mb-5">
          <ViewInputField
            basis={100}
            value={selectedItem?.name || ""}
            label="Category Name"
          />
        </div>
        <TextEditor
          existingDescription={selectedItem?.extra || "Not available"}
          disabled
        />
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black">Image</label>
          <div className="flex gap-2">
            <img
              src={`${baseImgUrl}/${selectedItem?.images[0]}`}
              alt={selectedItem?.name}
              className="w-[40rem] object-cover"
            />
          </div>
        </div>
      </div>
  );
};

export default ViewCategory;
