import { AdvanceTable, Spinner } from "@/common";
import { formatDate } from "@/helpers";
import { Dashboard_Layout } from "@/layout";
import {
  fetchDashboardData,
  setCurrentPage,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { AdvanceTbColumn, IAdsHistory } from "@/types";
import { useEffect } from "react";

const AdsHistory = () => {
  const { loading } = useAppSelector((state: RootState) => state.fetchDashData);

  const data: IAdsHistory[] = useAppSelector(
    (state: RootState) => state.fetchDashData.data
  );

  const { token, role } = useAppSelector((state: RootState) => state.signin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(
      fetchDashboardData({
        api: "advertisement",
        token: token!,
      })
    );
  }, [dispatch, token, role]);

  const column: AdvanceTbColumn<IAdsHistory>[] = [
    {
      header: "Advertisemt Id",
      accessor: (ads) => <p className="text-xs">{ads?.advertisementId}</p>,
    },
    {
      header: "Payment Mode",
      accessor: (ads) => <p>{ads?.paymentMode}</p>,
    },
    {
      header: "Bidding Amount",
      accessor: (ads) => <p>Rs. {ads?.bidingAmount}</p>,
    },
    {
      header: "Status",
      accessor: (ads) => <p>{ads?.paymentStatus}</p>,
    },
    {
      header: "Start Date",
      accessor: (ads) => <p>{formatDate(ads?.createdDateTime)}</p>,
    },
    {
      header: "Expiry Date",
      accessor: (ads) => <p>{formatDate(ads?.expiryDate)}</p>,
    },
  ];

  return (
    <Dashboard_Layout
      button={true}
      btnPath="/dashboard/advertisement/create"
      buttonText="Create Ads"
      isDeleteBtn={false}
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
};

export default AdsHistory;
