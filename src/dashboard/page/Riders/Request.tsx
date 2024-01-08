import { useEffect } from "react";
import { baseImgUrl } from "@/routes";
import { AdvanceTbColumn, IRiders2 } from "@/types";
import { formatDate } from "@/helpers";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import {
  fetchDashboardData,
  setCurrentPage,
  setSelectedItem,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { Dashboard_Layout } from "@/layout";
import { Action, AdvanceTable, Spinner } from "@/common";
import { useNavigate } from "react-router-dom";

export default function RequestRiders() {
  const navigate = useNavigate();

  const handleView = (rider: IRiders2) => {
    dispatch(setSelectedItem(rider));
    console.log(rider);
    navigate(`/dashboard/rider/request/view/${rider?._id}`);
  };

  const columns: AdvanceTbColumn<IRiders2>[] = [
    {
      header: "Image",
      accessor: (rider) => (
        <img
          src={`${baseImgUrl}/${rider?.photo}`}
          className="h-20 w-24 object-cover"
        />
      ),
    },
    {
      header: "Name",
      accessor: (rider) => <p>{rider?.rider?.name}</p>,
    },
    {
      header: "Email",
      accessor: (rider) => <p>{rider.email}</p>,
    },
    {
      header: "Gender",
      accessor: (rider) => <p>{rider.rider?.gender}</p>,
    },
    {
      header: "Contact",
      accessor: (rider) => <p>{rider.phone}</p>,
    },
    {
      header: "Join Date",
      accessor: (rider) => <p>{formatDate(rider?.rider?.joinDate)}</p>,
    },
    {
      header: "Is verified",
      accessor: (rider) => <p>{rider.isVerified?.toString()}</p>,
    },
    {
      header: "Status",
      accessor: (rider) => <p>{rider?.status}</p>,
    },

    {
      header: "Action",
      accessor: (rider) => (
        <Action hideDelete hideEdit onViewDetails={() => handleView(rider)} />
      ),
    },
  ];

  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { token } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(
      fetchDashboardData({ api: "rider/auth/status/pending", token: token! })
    );
  }, [dispatch, token]);
  data;

  return (
    <>
      <Dashboard_Layout
          button={true}
          isDeleteBtn={false}
          buttonText="Add Rider"
          btnPath="/dashboard/riders/add"
        >
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <AdvanceTable data={data} columns={columns} />
          )}
        </Dashboard_Layout>
    </>
  );
}
