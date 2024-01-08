import { Action, AdvanceTable, Spinner } from "@/common";
import { truncateString } from "@/helpers";
import { Dashboard_Layout } from "@/layout";
import {
  fetchDashboardData,
  setCurrentPage,
  setSelectedItem,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { AdvanceTbColumn, TermAndConditionItem } from "@/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TermsCond = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const navigate = useNavigate();

  const handleView = (terms: TermAndConditionItem) => {
    dispatch(setSelectedItem(terms));
    navigate(`/dashboard/system_data/term_condition/view/${terms?.title}`);
  };

  const handleEdit = (terms: TermAndConditionItem) => {
    dispatch(setSelectedItem(terms));
    navigate(`/dashboard/system_data/term_condition/edit/${terms?.title}`);

    const bodyWithoutNewlines = terms?.body?.replace(/\n/g, "");
    localStorage.setItem("desc", JSON.stringify(bodyWithoutNewlines || ""));
  };

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(fetchDashboardData({ api: "terms-and-condition" }));
  }, [dispatch]);

  const column: AdvanceTbColumn<TermAndConditionItem>[] = [
    { header: "Title", accessor: (terms) => <p>{terms?.title}</p> },
    {
      header: "Body",
      accessor: (terms) => <p>{truncateString(terms?.body, 100)}</p>,
    },

    {
      header: "Action",
      accessor: (terms) => (
        <Action
          width={80}
          onEdit={() => handleEdit(terms)}
          onViewDetails={() => handleView(terms)}
          hideDelete
        />
      ),
    },
  ];

  return (
    <Dashboard_Layout
        button={true}
        isDeleteBtn={false}
        buttonText="Add Terms"
        btnPath="/dashboard/system_data/term_condition/add"
      >
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <AdvanceTable columns={column} data={[data]} />
        )}
      </Dashboard_Layout>
  );
};

export default TermsCond;
