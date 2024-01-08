import { AdvanceTable, Spinner } from "@/common";
import { formatDate } from "@/helpers";
import { PageLayout } from "@/layout";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { AdvanceTbColumn, IUserOrder } from "@/types";
import { useEffect } from "react";

const UserOrder = () => {
  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector((state: RootState) => state.signin);
  const { loading } = useAppSelector((state: RootState) => state.fetchDashData);
  const data: IUserOrder[] = useAppSelector(
    (state: RootState) => state.fetchDashData.data
  );

  const modifiedData =
    data?.length > 0
      ? data?.flatMap((order) =>
          order?.food?.map((foodItem) => ({
            orderId: order?.orderId,
            status: order?.status,
            foodName: foodItem?.name,
            quantity: foodItem?.quantity,
            unitPrice: foodItem?.unit_price,
            restaurant: order?.restaurantId?.name,
            date: formatDate(order?.createdDateTime),
          }))
        )
      : [];

  const column: AdvanceTbColumn<(typeof modifiedData)[0]>[] = [
    {
      header: "Order",
      accessor: (order) => <p>{order?.orderId}</p>,
    },
    {
      header: "Amount",
      accessor: (order) => <p>Rs. {order?.unitPrice}</p>,
    },
    {
      header: "Date",
      accessor: (order) => <p>{order?.date}</p>,
    },
    {
      header: "Status",
      accessor: (order) => (
        <p className="w-[100px] bg-green-200/80 rounded-full py-2 text-center text-green-600">
          {order?.status}
        </p>
      ),
    },
    {
      header: "Action",
      accessor: () => (
        <p className="py-2 w-[100px] cursor-pointer bg-orange-500 rounded-full text-white text-center">
          View Details
        </p>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchDashboardData({ api: "order/user", token: userToken! }));
  }, [dispatch, userToken]);

  return (
    <PageLayout>
      <div className="mt-24 px-12">
        {loading ? (
          <Spinner />
        ) : (
          <AdvanceTable columns={column} data={modifiedData} />
        )}
      </div>
    </PageLayout>
  );
};

export default UserOrder;
