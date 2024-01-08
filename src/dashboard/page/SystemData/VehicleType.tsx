import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { AdvanceTbColumn } from "@/types";
import { Action, AdvanceTable } from "@/common";
import { Dashboard_Layout } from "@/layout";

interface IVehicle {
  description: string;
  name: string;
  fare: number;
  commission: number;
  createdDateTime: string;
  activeStatus: boolean;
  _id: string;
}
export default function VehicleType() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.fetchDashData);
  useEffect(() => {
    dispatch(fetchDashboardData({ api: "settings/vehicle-type" }));
  }, [dispatch]);
  const column: AdvanceTbColumn<IVehicle>[] = [
    { header: "Name", accessor: (vehicle) => <p>{vehicle?.name}</p> },
    {
      header: "Commission",
      accessor: (vehicle) => <p>{vehicle?.commission}</p>,
    },
    { header: "Fare", accessor: (vehicle) => <p>{vehicle?.fare}</p> },
    { header: "Status", accessor: (vehicle) => <p>{vehicle?.activeStatus}</p> },
    {
      header: "Action",
      accessor: () => <Action width={80} />,
    },
  ];

  return (
    <>
      <Dashboard_Layout button={false} buttonText="Add " btnPath="/dashboard">
          <AdvanceTable columns={column} data={data} />
        </Dashboard_Layout>
    </>
  );
}
