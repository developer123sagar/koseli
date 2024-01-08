import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
import {
  fetchDashboardData,
  setCurrentPage,
  setSelectedItem,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { AdvanceTbColumn, Saas_Plan } from "@/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Saas_plan = () => {
  const { loading, data } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  const { token } = useAppSelector((state: RootState) => state.signin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(fetchDashboardData({ api: "saas-plan", token: token! }));
  }, [dispatch, token]);

  const handleView = (saas: Saas_Plan) => {
    navigate(`/dashboard/saas-plan/view/${saas?.name}`);
  };

  const handleEdit = (saas: Saas_Plan) => {
    dispatch(setSelectedItem(saas));
    navigate(`/dashboard/saas-plan/edit/${saas?.name}`);
    localStorage.setItem("desc", JSON.stringify(saas?.description || ""));
  };

  const column: AdvanceTbColumn<Saas_Plan>[] = [
    {
      header: "Saas Name",
      accessor: (saas) => <p>{saas?.name?.toUpperCase()}</p>,
    },
    {
      header: "Description",
      accessor: (saas) => <p>{saas?.description}</p>,
    },

    {
      header: "Action",
      accessor: (saas) => (
        <Action
          onViewDetails={() => handleView(saas)}
          onEdit={() => handleEdit(saas)}
          hideDelete
        />
      ),
    },
  ];

  return (
    <Dashboard_Layout
      isDeleteBtn={false}
      button={true}
      buttonText="Create Saas Plan"
      btnPath="/dashboard/saas-plan/create"
    >
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <AdvanceTable columns={column} data={data?.subscriptions} />
      )}
    </Dashboard_Layout>
  );
};

export default Saas_plan;
