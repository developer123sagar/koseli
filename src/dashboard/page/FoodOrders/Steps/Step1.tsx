// import { statusValues } from "@/constants";
import { Spinner, ToastMsg } from "@/common";
import Buttons from "@/common/Button";
import { connectSocket } from "@/common/global/socket";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { checkChatAvaliability } from "@/redux/chat/chatSlice";
import {
  fetchIndvRestInfo,
  fetchRestAdminId,
} from "@/redux/restaurant/restaurantSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { url } from "@/routes";
import { IFoodOrder, MessageType, StepProps } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

const Step1: React.FC<StepProps> = ({ setActiveStep }) => {
  const selectedItem: IFoodOrder = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  const { token } = useAppSelector((state: RootState) => state.signin);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("");
  const [orderChangeNumber, setOrderChangeNumber] = useState<number>(0);
  const { chatAvaliability } = useAppSelector((state: RootState) => state.chat);
  const { restAdminId } = useAppSelector(
    (state: RootState) => state.restaurant
  );
  const [sock, setSocket] = useState<Socket>();
  const dispatch = useAppDispatch();

  const [chatId, setChatId] = useState("");

  const statusValues = [
    { label: "Pickup", value: "pickup" },
    { label: "Acknowledged", value: "acknowledged" },
    {
      label: "Rejected By restaurant",
      value: "Rejectedbyrestaurant",
    },
  ];

  useEffect(() => {
    setSocket(connectSocket(token));
  }, [setSocket, connectSocket, token]);

  useEffect(() => {
    dispatch(fetchRestAdminId(token));
  }, [dispatch, token]);

  const hanldeAcknowledge = async () => {
    setLoading(true);

    if (status) {
      try {
        const res = await axios.put(
          `${url}/order/status/${selectedItem?._id}`,
          {
            status: status,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        if (res.status === 200) {
          if (setActiveStep) setActiveStep(1);

          let data = orderChangeNumber;
          if (data < 5) data++;
          else data = 0;

          setOrderChangeNumber(data);
          if (chatAvaliability.status === 200) {
            if (chatAvaliability.data === null) {
              const postData = {
                senderId: restAdminId._id,
                receiverId: selectedItem.clientId._id,
              };
              try {
                const res = await axios.post(`${url}/chat`, postData);
                console.log(res.data._id);
                setChatId(res.data._id);
              } catch (err) {
                console.error("Error:", err);
              }
            } else {
              setChatId(chatAvaliability.data._id);
            }
          }
          const messageBody = {
            receiveId: selectedItem.clientId._id,
            message: "Your order has been acknowledged",
          };
          sock && sock.emit("CHATTING", messageBody);
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
          msg: "Please Choose Active Status to Acknowledge",
          theme: "fail",
        },
      ]);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      sock && sock.disconnect();
    };
  }, [sock]);

  useEffect(() => {
    if (selectedItem && restAdminId._id && selectedItem?.clientId?._id)
      dispatch(
        checkChatAvaliability({
          senderId: restAdminId._id,
          receiverId: selectedItem.clientId._id,
          token: token,
        })
      );
  }, [dispatch, selectedItem, token, restAdminId._id]);

  useEffect(() => {
    const sendDefaultMessage = async () => {
      if (chatId !== "" && chatId !== " ") {
        const body = {
          chatId: chatId,
          senderId: restAdminId._id,
          content: "Your order has been acknowledged",
        };
        console.log(body);
        try {
          const res = await axios.post(`${url}/message`, body);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    };
    sendDefaultMessage();
  }, [chatId]);

  useEffect(() => {
    dispatch(fetchIndvRestInfo(token));
  }, [dispatch, token]);

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
          <label className="block text-black">Change Status</label>
          <select
            onChange={(e) => setStatus(e.target.value)}
            className={`form-control text-sm w-full py-3 pl-1 rounded placeholder:text-gray-500 border-gray-200 border-[1.5px] border-stroke`}
          >
            <option value="" disabled selected>
              Choose status
            </option>
            {statusValues
              .filter(
                (item) =>
                  item.value !== "pickup" ||
                  selectedItem?.deliveryType === "pickup"
              )
              .map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Buttons
          onClick={hanldeAcknowledge}
          className="flex items-center justify-center"
        >
          {loading ? <Spinner btn /> : "Confirm"}
        </Buttons>
      </div>
    </>
  );
};

export default Step1;
