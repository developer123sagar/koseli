/* eslint-disable @typescript-eslint/no-explicit-any */
import DefaultLayout from "@/pages/Main";

import { useEffect } from "react";
import { changeOrderNumber } from "@/redux/order/orderSlice";
import { useAppSelector } from "@/redux/store";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/store";
import { fetchOrderPending } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state: RootState) => state.signin);


  const { orderPending } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  useEffect(() => {
    dispatch(fetchOrderPending(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (orderPending) {
      const newOrder = orderPending.filter(
        (cont: any) => cont.status === "new order"
      );
      dispatch(changeOrderNumber(newOrder.length));
    }
  }, [dispatch, orderPending]);


  return (
    <div className="w-full h-full flex justify-between gap-16">
      <div className="z-999999">
        <DefaultLayout />
      </div>
      <div className="ml-60 overflow-y-auto py-4 w-full mr-2">
        <Outlet/>
      </div>
    </div>
  );
}
