import { TextEditor } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { RootState, useAppSelector } from "@/redux/store";
import { Privacy } from "@/types";

const ViewPrivacy = () => {
  const selectedItem: Privacy = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  return (
    <div className="mt-20 w-full">
        <Buttons type="button" variant="secondary" back={true}>
          Go Back
        </Buttons>
        <NameMark variant="primary" label="View Privacy and Policy Details" />
        <div className="flex flex-wrap justify-between gap-10 my-6">
          <ViewInputField
            basis={100}
            value={selectedItem?.title || ""}
            label="Privacy and Policy Title"
          />
        </div>
        <label htmlFor="description" className="my-4">
          Description
        </label>
        <TextEditor
          existingDescription={selectedItem?.body}
          disabled
          height={450}
        />
      </div>
  );
};

export default ViewPrivacy;
