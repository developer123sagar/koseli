import { TextEditor } from "@/common";
import Buttons from "@/common/Button";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { RootState, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { IDietary } from "@/types";

const ViewDietary = () => {
  const selectedItem: IDietary = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );

  return (
    <div className="mt-20">
        <Buttons type="button" variant="secondary" back={true}>
          Go Back
        </Buttons>
        <div className="w-full my-8 flex flex-wrap gap-8">
          <ViewInputField
            basis={48}
            value={selectedItem?.foodName || ""}
            label="Food Name"
          />
          <ViewInputField
            basis={48}
            value={selectedItem?.dietaryPlan || ""}
            label="Dietary Plan Name"
          />
          <ViewInputField
            basis={48}
            value={`${selectedItem?.calorie} calorie` || ""}
            label="Calorie"
          />
          <ViewInputField
            basis={48}
            value={`${selectedItem?.weight} gm` || ""}
            label="Weight"
          />
          <ViewInputField
            basis={48}
            value={`Rs.${selectedItem?.price}` || ""}
            label="Price"
          />
        </div>
        <label htmlFor="desc">Description</label>
        <TextEditor disabled existingDescription={selectedItem?.extra} />
        <div className="mt-5">
          <label className="mb-2.5 block text-black">Dietary Image</label>
          <div className="flex gap-2">
            <img
              src={`${baseImgUrl}/${selectedItem?.image}`}
              alt={selectedItem?.dietaryPlan}
              className="w-[20rem] object-cover"
            />
          </div>
        </div>
      </div>
  );
};

export default ViewDietary;
