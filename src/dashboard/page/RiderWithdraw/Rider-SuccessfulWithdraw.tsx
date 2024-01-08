import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { formatDate } from "@/helpers";
import { AdvanceTbColumn } from "@/types";
import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
interface ISuccessful_Withdraw {
  _id: string;
  name: string;
  amount: number;
  transactionStatus: string;
  paymentMethod: string;
  status: string;
  createdDateTime: Date;
}

export default function RiderSuccessfulWithdraw() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  useEffect(() => {
    dispatch(fetchDashboardData({ api: "rider/withdraw/success" }));
  }, [dispatch]);
  const column: AdvanceTbColumn<ISuccessful_Withdraw>[] = [
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

  data;
  return (
    <>
      <Dashboard_Layout button={false} buttonText="Add " btnPath="/">
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
