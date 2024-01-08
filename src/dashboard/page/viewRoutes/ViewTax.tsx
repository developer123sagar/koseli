import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { RootState, useAppSelector } from "@/redux/store";
import { ITaxs } from "@/types";

const ViewTax = () => {
  const selectedItem: ITaxs = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );

  return (
    <div className="mt-20 w-full">
        <Buttons type="button" variant="secondary" back={true}>
          Go Back
        </Buttons>
        <NameMark variant="primary" label="View Tax Details" />
        <div className="flex flex-wrap justify-between gap-10 mt-6">
          <ViewInputField
            basis={48}
            value={selectedItem?.name || ""}
            label="Tax Title"
          />
          <ViewInputField
            basis={48}
            value={`${selectedItem?.tax}%` || ""}
            label="Tax"
          />
        </div>
      </div>
  );
};

export default ViewTax;
