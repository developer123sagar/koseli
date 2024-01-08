import { TextEditor } from "@/common";
import Buttons from "@/common/Button";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { formatDate } from "@/helpers";
import { RootState, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { IComboOffers } from "@/types";

const ViewCombo = () => {
  const selectedItem: IComboOffers = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  selectedItem;
  return (
    <div className="mt-20">
        <Buttons type="button" variant="secondary" back={true}>
          Go Back
        </Buttons>
        <div className="w-full mt-5 flex gap-5 flex-wrap justify-between mb-5">
          <ViewInputField value={selectedItem?.name || ""} label="Name" />
          <ViewInputField value={selectedItem?.amount || ""} label="Price" />
          <ViewInputField
            value={formatDate(selectedItem?.expiredAt) || ""}
            label="Expiry date"
          />
        </div>
        <TextEditor
          existingDescription={selectedItem?.extra || "Not available"}
          disabled
        />
        <div className="mt-5">
          <label className="mb-2.5 block text-black">Combo Image</label>
          <div className="flex gap-2">
            <img
              src={`${baseImgUrl}/${selectedItem?.image}`}
              alt={selectedItem?.name}
              className="w-[40rem] object-cover"
            />
          </div>
        </div>
      </div>
  );
};

export default ViewCombo;
