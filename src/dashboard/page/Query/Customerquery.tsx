import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { AdvanceTbColumn } from "@/types";
import { Action, AdvanceTable } from "@/common";
import { Dashboard_Layout } from "@/layout";
interface IQuery {}

export default function CustomerQuery() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.fetchDashData);
  useEffect(() => {
    dispatch(fetchDashboardData({ api: "customer/query" }));
  }, [dispatch]);

  const column: AdvanceTbColumn<IQuery>[] = [
    { header: "Customer", accessor: () => <p>{}</p> },
    { header: "Subject", accessor: () => <p>{}</p> },
    { header: "Message", accessor: () => <p>{}</p> },
    { header: "CreatedAt", accessor: () => <p>{}</p> },
    { header: "Status", accessor: () => <p>{}</p> },
    {
      header: "Actions",
      accessor: () => <Action width={55} />,
    },
  ];
  data;
  return (
    <>
      <Dashboard_Layout button={false} buttonText="" btnPath="/dashboard">
          <AdvanceTable columns={column} data={data} />
        </Dashboard_Layout>
    </>
  );
}
