import { useEffect } from "react";
import { baseImgUrl } from "@/routes";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { formatDate } from "@/helpers";
import { AdvanceTbColumn, ISuspendedRider } from "@/types";
import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";

export default function Suspend() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { token } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    dispatch(
      fetchDashboardData({ api: "rider/auth/status/suspend", token: token! })
    );
  }, [dispatch, token]);

  const column: AdvanceTbColumn<ISuspendedRider>[] = [
    {
      header: "Name",
      accessor: (rider) => (
        <div className="flex items-center gap-10">
          <img
            src={`${baseImgUrl}/${rider.photo}`}
            className="h-12 object-cover"
          />
        </div>
      ),
    },
    {
      header: "Gender",
      accessor: (rider) => <p>{rider?.gender}</p>,
    },
    {
      header: "Contact",
      accessor: (rider) => <p>{rider?.phone}</p>,
    },
    {
      header: "Join Date",
      accessor: (rider) => <p>{formatDate(rider?.joinDate)}</p>,
    },
    {
      header: "Suspend Date",
      accessor: (rider) => <p>{formatDate(rider?.suspendEndDate)}</p>,
    },
    {
      header: "Status",
      accessor: (rider) => <p>{rider?.status}</p>,
    },
    {
      header: "Action",
      accessor: () => <Action />,
    },
  ];

  return (
    <Dashboard_Layout button={false} buttonText="Add " btnPath="/">
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
