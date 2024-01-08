import { Spinner, ToastMsg } from "@/common";
import Buttons from "@/common/Button";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { RootState, useAppSelector } from "@/redux/store";
import { url } from "@/routes";
import { IFoodOrder, MessageType, StepProps } from "@/types";
import axios from "axios";
import React, { useState } from "react";

const Step2: React.FC<StepProps> = ({ setActiveStep }) => {
  const selectedItem: IFoodOrder = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<MessageType[]>([]);

  const [status, setStatus] = useState("");

  const token = useAppSelector((state: RootState) => state.signin.token);

  const handlePreparing = async () => {
    setLoading(true);

    if (status) {
      try {
        const res = await axios.put(
          `${url}/order/status/${selectedItem?._id}`,
          {
            status: "preparing",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        if (res.status === 200) {
          if (setActiveStep) setActiveStep(2);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      setMessages([
        {
          id: Date.now().toString(),
          msg: "Please Choose Active Status",
          theme: "fail",
        },
      ]);
      setLoading(false);
    }
  };

  return (
    <>
      <ToastMsg messages={messages} setMessages={setMessages} />

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
        <div className="mb-4.5 basis-[48%]">
          <label className="block text-black">Change to preparing</label>
          <select
            className="form-control text-sm w-full py-3 pl-1 rounded placeholder:text-gray-500 border border-gray-200 my-1"
            name="preparing"
            id="preparing"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Change Status</option>
            <option value="preparing">Preparing</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Buttons
          onClick={handlePreparing}
          className="flex items-center justify-center"
        >
          {loading ? <Spinner btn /> : "Confirm"}
        </Buttons>
      </div>
    </>
  );
};

export default Step2;
