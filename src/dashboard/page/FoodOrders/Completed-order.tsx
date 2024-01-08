import { useEffect } from "react";
import {
  fetchDashboardData,
  setCurrentPage,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { formatDate } from "@/helpers";
import { AdvanceTable, Spinner } from "@/common";
import { AdvanceTbColumn, IFoodOrder } from "@/types";
import {  Dashboard_Layout } from "@/layout";

export default function CompletedOrder() {
  const dispatch = useAppDispatch();

  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { token } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(
      fetchDashboardData({ api: "order/completed-order", token: token! })
    );
  }, [dispatch, token]);

  const column: AdvanceTbColumn<IFoodOrder>[] = [
    {
      header: "OrderId ",
      accessor: (order) => <p>{order?.orderId}</p>,
    },
    {
      header: "User Name ",
      accessor: (order) => <p>{order?.clientId?.name}</p>,
    },
    {
      header: "Price",
      accessor: (order) => <p>{order?.totalPrice}</p>,
    },

    {
      header: "Date",
      accessor: (order) => <p>{formatDate(order?.createdDateTime)}</p>,
    },
    {
      header: "Payment Mode",
      accessor: (order) => <p>{order?.paymentMode}</p>,
    },
    {
      header: "Payment Status",
      accessor: (order) => <p>{order?.paymentStatus}</p>,
    },
    {
      header: "Status",
      accessor: (order) => <p>{order?.status}</p>,
    },
  ];

  return (
    <>
      <Dashboard_Layout isDeleteBtn={false}>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <AdvanceTable columns={column} data={data} />
        )}
      </Dashboard_Layout>
    </>
  );
}
