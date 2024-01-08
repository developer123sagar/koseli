import Buttons from "@/common/Button";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { formatDate } from "@/helpers";
import { fetchRestaurant } from "@/redux/restaurant/restaurantSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { IBookedTable, IRestaurant } from "@/types";
import { useEffect } from "react";

const ViewBooking = () => {
  const selectedItem: IBookedTable = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  const restaurantData: IRestaurant[] = useAppSelector(
    (state: RootState) => state.restaurant.restaurantData
  );

  const { role } = useAppSelector((state: RootState) => state.signin);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRestaurant());
  }, [dispatch]);

  const restro = restaurantData.filter(
    (item) => item._id === selectedItem?.restaurantId
  );
  console.log(restro);

  return (
    <div className="mt-20 w-full">
        <Buttons type="button" variant="secondary" back={true}>
          Go Back
        </Buttons>
        <div className="w-full justify-between flex gap-8 flex-wrap my-6">
          <ViewInputField
            basis={48}
            value={selectedItem?.tableNo[0] || ""}
            label="Table Number"
          />
          <ViewInputField
            basis={48}
            value={selectedItem?.BookingId || ""}
            label="Booking Id"
          />
          <ViewInputField
            basis={48}
            value={`${selectedItem?.clientName}` || ""}
            label="Client Name"
          />
          <ViewInputField
            basis={48}
            value={`${selectedItem?.email}` || ""}
            label="Client Email"
          />
          <ViewInputField
            basis={48}
            value={`${selectedItem?.phone}` || ""}
            label="Client Phone"
          />
          <ViewInputField
            basis={48}
            value={formatDate(selectedItem?.date)}
            label="Date"
          />
          <ViewInputField
            basis={48}
            value={`${selectedItem?.duration}` || ""}
            label="Time"
          />
          <ViewInputField
            basis={48}
            value={`${selectedItem?.status}` || ""}
            label="Booking Status"
          />
          <ViewInputField
            basis={48}
            value={`Rs. ${selectedItem?.amount}` || ""}
            label="Booking Price"
          />
          <ViewInputField
            basis={48}
            value={`${selectedItem?.paymentMode}` || ""}
            label="Payment Mode"
          />
          {role === "admin" && (
            <>
              <ViewInputField
                basis={48}
                value={`${restro[0]?.name}` || ""}
                label="Restaurant Name"
              />
              <div>
                <label className="mb-2.5 block text-black">
                  Restaurant Photo
                </label>
                <div className="flex gap-2">
                  <img
                    src={`${baseImgUrl}/${restro[0]?.mainImage}`}
                    alt={restro[0]?.name}
                    className="w-[40rem] object-cover"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
  );
};

export default ViewBooking;
