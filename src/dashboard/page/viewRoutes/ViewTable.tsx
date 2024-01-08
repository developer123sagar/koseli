import { ToggleBtn } from "@/common";
import Buttons from "@/common/Button";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { RootState, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { IAllTable } from "@/types";

const ViewTable = () => {
  const selectedItem: IAllTable = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );

  console.log(selectedItem);
  return (
    <div className="mt-20 w-full">
        <Buttons type="button" variant="secondary" back={true}>
          Go Back
        </Buttons>
        <div className="w-full justify-between flex gap-8 flex-wrap my-6">
          <ViewInputField
            basis={48}
            value={selectedItem?.tableNo || ""}
            label="Table Number"
          />

          <ViewInputField
            basis={48}
            value={`Rs.${selectedItem?.bookingamount}` || ""}
            label="Booking Amount"
          />

          <ViewInputField
            basis={48}
            value={selectedItem?.number_of_seats || ""}
            label="Number of Seats"
          />
          <ViewInputField
            basis={48}
            value={selectedItem?.status || ""}
            label="Status"
          />
        </div>
        <div>
          <h2 className="mb-2">Is booked?</h2>
          <ToggleBtn isOn={selectedItem?.isbooked} toggleName="table" />
        </div>

        <div className="mt-5">
          <label className="mb-2.5 block text-black">Table Image</label>
          <div className="flex gap-2">
            <img
              src={`${baseImgUrl}/${selectedItem?.image}`}
              alt={selectedItem?.tableNo}
              className="w-[20rem] object-cover"
            />
          </div>
        </div>
      </div>
  );
};

export default ViewTable;
