import { useEffect, useState } from "react";
import { baseImgUrl, url } from "@/routes";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import {
  fetchDashboardData,
  setCurrentPage,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { AdvanceTbColumn, IRestaurant, IRestaurantReview } from "@/types";
import { formatDate } from "@/helpers";
import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
import axios from "axios";

export default function RestaurantReview() {
  const dispatch = useAppDispatch();
  const [restroInfo, setRestroInfo] = useState<IRestaurant | null>(null);
  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { token } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    dispatch(setCurrentPage(1));

    if (restroInfo)
      dispatch(
        fetchDashboardData({ api: `review/restaurant/${restroInfo?._id}` })
      );
  }, [dispatch, token, restroInfo?._id, restroInfo]);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await axios.get(`${url}/restaurant/info`, {
          headers: {
            Authorization: token,
          },
        });
        setRestroInfo(res.data?.Data);
      } catch (err) {
        console.log(err);
      }
    };
    getInfo();
  }, [token]);
  console.log(data);

  const column: AdvanceTbColumn<IRestaurantReview>[] = [
    {
      header: "Restaurant Name",
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
      header: " Date",
      accessor: (rider) => <p>{formatDate(rider?.createdDateTime)}</p>,
    },
    {
      header: "Actions",
      accessor: () => <Action width={55} />,
    },
  ];

  return (
    <>
      <Dashboard_Layout isDeleteBtn={false}>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <AdvanceTable columns={column} data={data?.review} />
        )}
      </Dashboard_Layout>
    </>
  );
}
