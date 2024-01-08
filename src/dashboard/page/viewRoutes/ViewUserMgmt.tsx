import Buttons from "@/common/Button";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { RootState, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { IWatcher } from "@/types";

const ViewUserMgmt = () => {
  const selectedItem: IWatcher = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  return (
    <div className="mt-20 w-full">
        <Buttons type="button" variant="secondary" back={true}>
          Go Back
        </Buttons>
        <div className="w-full mt-5 flex gap-5 flex-wrap justify-between">
          <ViewInputField value={selectedItem?.Name || ""} label="User Name" />
          <ViewInputField value={selectedItem?.role || ""} label="User Role" />
          <ViewInputField
            value={selectedItem?.Email || ""}
            label="User Email"
          />
          <div className="mt-4.5">
            <label className="mb-2.5 block text-black">Image</label>
            <div className="flex gap-2">
              <img
                src={`${baseImgUrl}/${selectedItem?.images}`}
                alt={selectedItem?.Name}
                className="w-[40rem] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default ViewUserMgmt;
