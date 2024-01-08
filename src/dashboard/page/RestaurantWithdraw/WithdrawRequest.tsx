import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { AdvanceTbColumn } from "@/types";
import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";

interface IWithdraw {
  name: string;
}

export default function WithdrawRequest() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { token } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    dispatch(
      fetchDashboardData({ api: "restaurant/withdraw/request", token: token! })
    );
  }, [dispatch, token]);
  const column: AdvanceTbColumn<IWithdraw>[] = [
    { accessor: (withdraw) => <p>{withdraw.name}</p>, header: "Name" },
    { accessor: () => <p>{}</p>, header: "Amount" },
    { accessor: () => <p>{}</p>, header: "CreatedDateTime" },
    { accessor: () => <p>{}</p>, header: "Status" },
    {
      header: "Actions",
      accessor: () => <Action width={55} />,
    },
  ];

  return (
    <>
      <Dashboard_Layout
          button={false}
          buttonText="Add Dietary Plan"
          btnPath="/dashboard"
        >
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
