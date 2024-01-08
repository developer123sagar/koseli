import { AdvanceTable, Spinner } from "@/common";
import Buttons from "@/common/Button";
import { formatDate } from "@/helpers";
import { setCurrentPage } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { url } from "@/routes";
import { AdvanceTbColumn, IFoodItem, ISubHistory } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const ViewSubsHistory = () => {
  const selectedItem: IFoodItem = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );

  const [data, setData] = useState<ISubHistory[]>([]);
  const [loading, setLoading] = useState(false);

  const { token } = useAppSelector((state: RootState) => state.signin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(1));

    const getSubsInfo = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${url}/saas-subscriber/subscriptions/history?restaurantId=${selectedItem._id}`,
          {
            headers: {
              Authorization: token!,
            },
          }
        );
        setData(res.data.Data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getSubsInfo();
  }, [selectedItem?._id, token, dispatch]);

  const columns: AdvanceTbColumn<ISubHistory>[] = [
    {
      header: "Plan Name",
      accessor: (subs) => (
        <p>
          {subs?.planDetails &&
          Array.isArray(subs.planDetails) &&
          subs.planDetails.length > 0
            ? subs.planDetails[0].name
            : "N/A"}
        </p>
      ),
    },
    {
      header: "Plan Duration",
      accessor: (subs) => (
        <p>
          {subs?.planDetails &&
          Array.isArray(subs.planDetails) &&
          subs.planDetails.length > 0
            ? subs.planDetails[0].Duration &&
              subs.planDetails[0].Duration / 30 + " month"
            : "N/A"}
        </p>
      ),
    },

    {
      header: "Plan Description",
      accessor: (subs) => (
        <p>
          {" "}
          {subs?.planDetails &&
          Array.isArray(subs.planDetails) &&
          subs.planDetails.length > 0
            ? subs.planDetails[0].description
            : "N/A"}
        </p>
      ),
    },
    {
      header: "Plan Price",
      accessor: (subs) => (
        <p>
          Rs.{" "}
          {subs?.planDetails &&
          Array.isArray(subs.planDetails) &&
          subs.planDetails.length > 0
            ? subs.planDetails[0].price
            : "N/A"}
        </p>
      ),
    },
    {
      header: "Payment Mode",
      accessor: (subs) => <p>{subs?.paymentMode}</p>,
    },
    {
      header: "Date",
      accessor: (subs) => <p>{formatDate(subs?.createdAt)}</p>,
    },
  ];

  return (
    <div className="mt-20 w-full">
        <Buttons type="button" variant="secondary" back={true} className="ml-5">
          Go Back
        </Buttons>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <AdvanceTable columns={columns} data={data} />
        )}
      </div>
  );
};

export default ViewSubsHistory;
