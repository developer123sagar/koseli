/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
import {
  fetchDashboardData,
  setCurrentPage,
  setSelectedItem,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { AdvanceTbColumn, IRestaurant, ISubHistory } from "@/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SubsHistory = () => {
  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  const { token, role } = useAppSelector((state: RootState) => state.signin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleView = (subs: IRestaurant) => {
    dispatch(setSelectedItem(subs));
    navigate(`/dashboard/subscription/history/view/${subs?.name}`);
  };

  const RestaurantCol: AdvanceTbColumn<ISubHistory>[] = [
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
  ];

  const AdminCol: AdvanceTbColumn<IRestaurant>[] = [
    {
      header: "Image",
      accessor: (restro) => (
        <div className="flex items-center gap-10">
          <img
            src={`${baseImgUrl}/${restro.mainImage}`}
            className="h-20 w-20 object-cover rounded-md"
          />
        </div>
      ),
    },
    {
      header: "Name",
      accessor: (restro) => <p>{restro?.name?.toLocaleUpperCase()}</p>,
    },
    {
      header: "Contact",
      accessor: (restro) => <p>{restro?.phoneNumber}</p>,
    },
    {
      header: "Address",
      accessor: (restro) => <p>{restro?.address}</p>,
    },
    {
      header: "Email",
      accessor: (restro) => <p> {restro?.email} </p>,
    },
    {
      header: "Action",
      accessor: (restro) => (
        <Action hideDelete hideEdit onViewDetails={() => handleView(restro)} />
      ),
    },
  ];

  useEffect(() => {
    dispatch(setCurrentPage(1));

    if (role === "restaurant") {
      dispatch(
        fetchDashboardData({
          api: "saas-subscriber/subscriptions/history",
          token: token!,
        })
      );
    } else {
      dispatch(
        fetchDashboardData({
          api: "saas-subscriber/filter",
          token: token!,
        })
      );
    }
  }, [dispatch, token, role]);

  return (
     <Dashboard_Layout button={false} isDeleteBtn={false}>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <AdvanceTable
            columns={role === "admin" ? AdminCol : RestaurantCol}
            data={data}
          />
        )}
      </Dashboard_Layout>

  );
};

export default SubsHistory;
