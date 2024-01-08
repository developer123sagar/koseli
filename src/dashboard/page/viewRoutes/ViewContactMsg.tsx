import { TextEditor } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { RootState, useAppSelector } from "@/redux/store";
import { IContact } from "@/types";

const ViewContactMsg = () => {
  const selectedItem: IContact = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  return (
    <div className="mt-20 w-full">
        <Buttons type="button" variant="secondary" back={true}>
          Go Back
        </Buttons>
        <NameMark variant="primary" label="View Message Details" />
        <div className="flex flex-wrap justify-between gap-10 my-6">
          <ViewInputField
            basis={48}
            value={selectedItem?.name || ""}
            label="Full Name"
          />
          <ViewInputField
            basis={48}
            value={selectedItem?.email || ""}
            label="Email"
          />
          <ViewInputField
            value={selectedItem?.contact || ""}
            label="Mobile Number"
            basis={48}
          />
        </div>
        <label htmlFor="desc">Message</label>
        <TextEditor
          existingDescription={selectedItem?.message || "Not available"}
          disabled
        />
      </div>
  );
};

export default ViewContactMsg;
