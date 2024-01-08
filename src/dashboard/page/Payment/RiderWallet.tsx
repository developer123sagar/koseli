import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { formatDate } from "@/helpers";
import { AdvanceTbColumn } from "@/types";
import { AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
interface IWallet {
  createdDateTime: Date;
  amount: number;
  source: string;
  transactionStatus: string;
  rider: {
    name: string;
  };
}
export default function RiderWallet() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { token } = useAppSelector((state: RootState) => state.signin);
  useEffect(() => {
    dispatch(fetchDashboardData({ api: "rider/wallet", token: token! }));
  }, [dispatch, token]);

  const column: AdvanceTbColumn<IWallet>[] = [
    {
      header: "Loaded on",
      accessor: (wallet) => <p>{formatDate(wallet.createdDateTime)}</p>,
    },
    { header: "Rider", accessor: (wallet) => <p>{wallet.rider?.name}</p> },
    { header: "Balance Loaded", accessor: (wallet) => <p>{wallet.amount}</p> },
    { header: "Source", accessor: (wallet) => <p>{wallet.source}</p> },
    {
      header: "Transaction Status",
      accessor: (wallet) => <p>{wallet.transactionStatus}</p>,
    },
    // {
    //   header: "Actions",
    //   accessor: () => <Action width={55} />,
    // },
  ];

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
