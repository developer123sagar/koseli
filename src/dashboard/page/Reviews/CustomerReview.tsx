import { useEffect } from "react";
import Action from "@/common/Action";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import {
  fetchDashboardData,
  setCurrentPage,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { AdvanceTbColumn, IReview } from "@/types";
import { formatDate } from "@/helpers";
import { AdvanceTable } from "@/common";
import { Dashboard_Layout } from "@/layout";
interface ICustomerReview extends IReview {
  _id: string;
  createdDateTime: Date;
}

export default function CustomerReview() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.fetchDashData);

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(fetchDashboardData({ api: "customer/review" }));
  }, [dispatch]);

  const column: AdvanceTbColumn<ICustomerReview>[] = [
    {
      header: "customer Name",
      accessor: (rider) => <p>{rider.name}</p>,
    },
    {
      header: "Review by Rider",
      accessor: (rider) => <p>{rider.review}</p>,
    },
    {
      header: "Active Status",
      accessor: (rider) => <p>{rider.activeStatus}</p>,
    },

    {
      header: "Rating",
      accessor: (rider) => <p>{rider.rating}</p>,
    },
    {
      header: " Date",
      accessor: (withdraw) => <p>{formatDate(withdraw.createdDateTime)}</p>,
    },
    {
      header: "Actions",
      accessor: () => <Action width={55} />,
    },
  ];

  data;
  return (
    <>
      <Dashboard_Layout
          button={false}
          buttonText="Add Review"
          btnPath="/dashboard"
        >
          <AdvanceTable columns={column} data={data} />
        </Dashboard_Layout>
    </>
  );
}
