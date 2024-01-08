import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { formatDate } from "@/helpers";
import { AdvanceTbColumn } from "@/types";
import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
interface IWithdraw {
  _id: string;
  name: string;
  amount: number;
  transactionStatus: string;
  paymentMethod: string;
  status: string;
  createdDateTime: Date;
}
export default function RiderWithdrawRequest() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { token } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    dispatch(
      fetchDashboardData({ api: "rider/withdraw/request", token: token! })
    );
  }, [dispatch, token]);

  const column: AdvanceTbColumn<IWithdraw>[] = [
    { header: "Name", accessor: (withdraw) => <p>{withdraw.name}</p> },
    {
      header: "Withdraw Amount",
      accessor: (withdraw) => <p>{withdraw.amount}</p>,
    },
    {
      header: "Payment Method",
      accessor: (withdraw) => <p>{withdraw.paymentMethod}</p>,
    },
    {
      header: "TransactionStatus ",
      accessor: (withdraw) => <p>{withdraw.transactionStatus}</p>,
    },
    {
      header: " Date",
      accessor: (withdraw) => <p>{formatDate(withdraw.createdDateTime)}</p>,
    },
    {
      header: "Actions",
      accessor: () => <Action width={55} />,
    },
  ];

  return (
    <>
      <Dashboard_Layout button={false}>
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
