/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { PageLayout } from "@/layout";
import { clearCart } from "@/redux/cart/cartSliice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { connectSocket } from "@/common/global/socket";
import { Socket } from "socket.io-client";
import { useState } from "react";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";

const OrderSccess = () => {

  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector((state: RootState) => state.signin);

  const data: any = useAppSelector(
    (state: RootState) => state.fetchDashData.data
  );

  useEffect(() => {
    dispatch(fetchDashboardData({ api: "client/info", token: userToken! }));
  }, [dispatch, userToken]);

  const [sock, setSocket] = useState<Socket>()
    

  useEffect(() => {
    setSocket(connectSocket(userToken));
  },[setSocket,connectSocket]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get("message");
    const orderId = urlParams.get("orderId");

    if (data !== null) {
      if (message === "success") {
        dispatch(clearCart());

        const orderData = {
          userId: data._id,
          restaurantId: localStorage.getItem("restaurantId"),
          message: `A new order has been placed with order ${orderId}`,
        };

        sock&&sock.emit("ORDER_NOTIFICATION", orderData);
      }
    }
  }, [dispatch, data]);

  useEffect(()=>{
    return () => {
      sock&&sock.disconnect();
    };
  },[])

  return (
    <PageLayout>
      <div className="flex items-center justify-center mt-32">
        you order has been sucessfully completed.
      </div>
    </PageLayout>
  );
};

export default OrderSccess;
