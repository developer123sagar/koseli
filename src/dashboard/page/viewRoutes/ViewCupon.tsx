import Buttons from "@/common/Button";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { formatDate } from "@/helpers";
import { RootState, useAppSelector } from "@/redux/store";
import { ICoupon } from "@/types";

const ViewCupon = () => {
  const selectedItem: ICoupon = useAppSelector(
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
            value={selectedItem?.code || ""}
            label="Cupon Code"
          />
          <ViewInputField
            basis={48}
            value={selectedItem?.maxUsage || ""}
            label="Cupon MaxUsage"
          />
          <ViewInputField
            basis={48}
            value={`${selectedItem?.discount} %` || ""}
            label="Discount"
          />
          <ViewInputField
            basis={48}
            value={formatDate(selectedItem?.startDate) || ""}
            label="Start Date"
          />
          <ViewInputField
            basis={48}
            value={formatDate(selectedItem?.endDate) || ""}
            label="Expiry Date"
          />
        </div>
      </div>
  );
};

export default ViewCupon;
