import { TextEditor } from "@/common";
import Buttons from "@/common/Button";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { RootState, useAppSelector } from "@/redux/store";
import { PlanName } from "@/types";

export default function ViewSaas() {
  const selectedItem: PlanName = useAppSelector(
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
            label="Saas Name"
          />
        </div>
        <TextEditor
          existingDescription={selectedItem?.description || "Not available"}
          disabled
        />
      </div>
  );
}
