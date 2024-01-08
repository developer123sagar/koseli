import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardData, setCurrentPage } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { AdvanceTbColumn } from "@/types";
import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";

interface IExpired {}

export default function ExpiringDocuments() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { token } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(
      fetchDashboardData({ api: "rider/auth/expiring-document", token: token! })
    );
  }, [dispatch, token]);

  const column: AdvanceTbColumn<IExpired>[] = [
    { header: "Name", accessor: () => <p>{}</p> },
    { header: "License", accessor: () => <p>{}</p> },
    { header: "BlueBook", accessor: () => <p>{}</p> },
    { header: "Insurance", accessor: () => <p>{}</p> },
    { header: "Phonne", accessor: () => <p>{}</p> },
    {
      header: "Actions",
      accessor: () => <Action width={55} />,
    },
  ];

  return (
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
  );
}
