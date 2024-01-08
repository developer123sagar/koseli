// import { useEffect } from "react";
import Dashboard_Layout from "@/layout/Design_Dashoard";
// import AdvanceTable from "@/common/AdvanceTable";
// import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
// import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
// import { Spinner } from "@/common";
// import { AdvanceTbColumn } from "@/types";

export default function DeliveryEarning() {
  // const dispatch = useAppDispatch();
  // const { data, loading } = useAppSelector(
  //   (state: RootState) => state.fetchDashData
  // );

  // useEffect(() => {
  //   dispatch(fetchDashboardData({ api: "delivery-earnings" }));
  // }, [dispatch]);

  // const column: AdvanceTbColumn<IWallet>[] = [
  //   {
  //     header: "Loaded on",
  //     accessor: (wallet) => <p>{formatDate(wallet.createdDateTime)}</p>,
  //   },
  //   { header: "Rider", accessor: (wallet) => <p>{wallet.rider?.name}</p> },
  //   { header: "Balance Loaded", accessor: (wallet) => <p>{wallet.amount}</p> },
  //   { header: "Source", accessor: (wallet) => <p>{wallet.source}</p> },
  //   {
  //     header: "Transaction Status",
  //     accessor: (wallet) => <p>{wallet.transactionStatus}</p>,
  //   },
  //   {
  //     header: "Actions",
  //     accessor: () => <Action width={55} />,
  //   },
  // ];

  return (
    <>
      <Dashboard_Layout button={false} buttonText="Add " btnPath="/dashboard">
          <div className="admin-header">
            <div className="flex flex-col">
              <div className="admin-header">
                {/* {loading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <AdvanceTable columns={column} data={data} />
                )} */}
              </div>
            </div>
          </div>
        </Dashboard_Layout>

    </>
  );
}
