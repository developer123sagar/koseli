import Buttons from "@/common/Button";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { RootState, useAppSelector } from "@/redux/store";
import { IFoodOrder } from "@/types";

const ViewFoodOrder = () => {
  const selectedItem: IFoodOrder = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  return (
    <div className="mt-16 w-full">
      <Buttons back variant="secondary">
        Go Back
      </Buttons>
      <div className="w-full mt-5 rounded-sm bg-white flex flex-wrap justify-between">
        <div className="w-full mt-5 rounded-sm bg-white flex flex-wrap gap-6 justify-between">
          <ViewInputField
            value={selectedItem?.orderId}
            label="Order Id"
            basis={48}
          />
          <ViewInputField
            value={selectedItem?.clientId?.name}
            label="Client Name"
            basis={48}
          />
          <ViewInputField
            value={selectedItem?.clientId?.email}
            label="Client Email"
            basis={48}
          />
          <ViewInputField
            value={selectedItem?.totalPrice}
            label="Total Price"
            basis={48}
          />
          <ViewInputField
            value={selectedItem?.paymentStatus}
            label="Payment Status"
            basis={48}
          />
          <ViewInputField
            value={selectedItem?.paymentMode}
            label="Payment Mode"
            basis={48}
          />
          <ViewInputField
            value={selectedItem?.status}
            label="Status"
            basis={48}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewFoodOrder;
