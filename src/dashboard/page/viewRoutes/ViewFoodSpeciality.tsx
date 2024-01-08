import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { RootState, useAppSelector } from "@/redux/store";
import { IFoodSpeciality } from "@/types";

const ViewFoodSpeciality = () => {
  const selectedItem: IFoodSpeciality = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );

  return (
    <div className="w-full mt-20 flex gap-5 justify-between">
        <ViewInputField
          value={selectedItem?.name || ""}
          label="Name"
        />
        <ViewInputField
          value={selectedItem?.extra || ""}
          label="Description"
        />
        <ViewInputField
          value={selectedItem?.amount || ""}
          label="Price"
        />
      </div>
  );
};

export default ViewFoodSpeciality;
