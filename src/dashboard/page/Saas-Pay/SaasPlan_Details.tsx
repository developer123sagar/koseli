import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
import {
  fetchDashboardData,
  setCurrentPage,
  setSelectedItem,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { AdvanceTbColumn, ISaasPlanDetails, PlanName } from "@/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SaasPlan_Details = () => {
  const { loading, data } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  const { token } = useAppSelector((state: RootState) => state.signin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleView = (planDetails: PlanName) => {
    dispatch(setSelectedItem(planDetails));
    navigate(`/dashboard/saas-plan/planDetails/${planDetails?.name}`);
  };

  const handleEdit = (planDetails: PlanName) => {
    dispatch(setSelectedItem(planDetails));
    navigate(`/dashboard/kitchen/planDetails/edit/${planDetails?.name}`);
    localStorage.setItem(
      "desc",
      JSON.stringify(planDetails?.description || "")
    );
  };

  console.log(data);

  const column: AdvanceTbColumn<ISaasPlanDetails>[] = [
    {
      header: "Saas plan Name",
      accessor: (plan) => <p>{plan?.name}</p>,
    },
    {
      header: "Description",
      accessor: (plan) => <p>{plan?.description}</p>,
    },
    {
      header: "Duration",
      accessor: (plan) => <p>{plan?.Duration && plan?.Duration / 30} months</p>,
    },
    {
      header: "Price",
      accessor: (plan) => <p>Rs. {plan?.price}</p>,
    },

    {
      header: "Action",
      accessor: (planDetails) => (
        <Action
          onViewDetails={() => handleView(planDetails)}
          onEdit={() => handleEdit(planDetails)}
          hideDelete
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(fetchDashboardData({ api: "saas-plan", token: token! }));
  }, [dispatch, token]);

  return (
    <Dashboard_Layout
      isDeleteBtn={false}
      button={true}
      buttonText="Add Plan"
      btnPath="/dashboard/saas-plan/add-plan"
    >
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        data &&
        data?.subscriptions &&
        Array.isArray(data?.subscriptions) && (
          <AdvanceTable columns={column} data={data?.subscriptions[0]?.plans} />
        )
      )}
    </Dashboard_Layout>
  );
};

export default SaasPlan_Details;
