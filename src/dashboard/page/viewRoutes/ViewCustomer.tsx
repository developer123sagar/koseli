import Buttons from "@/common/Button";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { formatDate } from "@/helpers";
import { RootState, useAppSelector } from "@/redux/store";
import { ICustomer } from "@/types";

const ViewCustomer = () => {
  const selectedItem: ICustomer = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );

  return (
    <div className="mt-20 w-full">
        <Buttons type="button" variant="secondary" back={true}>
          Go Back
        </Buttons>
        <div className="w-full mt-5 flex gap-5 flex-wrap justify-between">
          <ViewInputField
            value={selectedItem?.name || ""}
            label="Customer Name"
          />
          <ViewInputField
            value={selectedItem?.email || ""}
            label="Customer Email"
          />
          <ViewInputField
            value={selectedItem?.verificationStatus || ""}
            label="Verification Status"
          />
          <ViewInputField
            value={formatDate(selectedItem?.joinDate) || ""}
            label="Join Date"
          />
        </div>
      </div>
  );
};

export default ViewCustomer;
