import { TextEditor } from "@/common";
import Buttons from "@/common/Button";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { RootState, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { IFounder } from "@/types";

const ViewFounder = () => {
  const selectedItem: IFounder = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );

  return (
    <div className="mt-20 w-full">
        <Buttons type="button" variant="secondary" back={true}>
          Go Back
        </Buttons>
        <div className="w-full justify-between flex gap-5 flex-wrap my-6">
          <ViewInputField
            basis={100}
            value={selectedItem?.name || ""}
            label="Founder Name"
          />
        </div>
        <label htmlFor="">Food Description</label>
        <TextEditor
          existingDescription={selectedItem?.extra || "Not available"}
          disabled
        />
        <div className="mt-5">
          <label className="mb-2.5 block text-black">Founder Photo</label>
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

export default ViewFounder;
