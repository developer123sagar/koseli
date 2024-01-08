import { useEffect } from "react";
import { baseImgUrl } from "@/routes";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardData, setCurrentPage } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { AdvanceTbColumn, IReview } from "@/types";
import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";

export default function RiderReview() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { token } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(fetchDashboardData({ api: "rider/review", token: token! }));
  }, [dispatch, token]);

  const column: AdvanceTbColumn<IReview>[] = [
    {
      header: "Name",
      accessor: (rider) => (
        <div className="flex items-center gap-10">
          <img
            src={`${baseImgUrl}/${rider?.rider?.photo}`}
            className="h-12 object-cover"
          />
          <p>{rider?.rider?.name}</p>
        </div>
      ),
    },
    {
      header: "Review",
      accessor: (rider) => <p>{rider?.review}</p>,
    },
    {
      header: "Active Status",
      accessor: (rider) => <p>{rider?.activeStatus}</p>,
    },

    {
      header: "Rating",
      accessor: (rider) => <p>{rider?.rating}</p>,
    },
    {
      header: "Actions",
      accessor: () => <Action width={55} />,
    },
  ];


  return (
    <>
      <Dashboard_Layout button={false} isDeleteBtn={false}>
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
