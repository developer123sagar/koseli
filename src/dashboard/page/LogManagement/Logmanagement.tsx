import { useEffect } from "react";
import { AdvanceTbColumn, ILog } from "@/types";
import { Dashboard_Layout } from "@/layout";
import { AdvanceTable, Spinner } from "@/common";
// import { Action } from "@/common";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardData, setCurrentPage } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { formatDate } from "@/helpers";

export default function LogManagement() {
  const { token } = useAppSelector((state: RootState) => state.signin);
  const { loading, data } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const dispatch = useAppDispatch();

  const column: AdvanceTbColumn<ILog>[] = [
    {
      header: "IP",
      accessor: (log) => log?.ip,
    },
    {
      header: "Created date",
      accessor: (log) => <p>{formatDate(log?.createdAt)}</p>,
    },
    {
      header: "Lat",
      accessor: (log) => <p> {log?.geo?.lat} </p>,
    },
    {
      header: "Long",
      accessor: (log) => <p> {log?.geo?.lng} </p>,
    },
    {
      header: "Timezone",
      accessor: (log) => <p> {log?.locationDetail?.geo?.timezone} </p>,
    },
  ];

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(fetchDashboardData({ api: "log/all", token: token! }));
  }, [token, dispatch]);

  return (
    <>
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
    </>
  );
}
