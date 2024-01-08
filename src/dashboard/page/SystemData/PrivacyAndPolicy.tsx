import { Action, AdvanceTable, Spinner } from "@/common";
import { truncateString } from "@/helpers";
import { Dashboard_Layout } from "@/layout";
import {
  fetchDashboardData,
  setCurrentPage,
  setSelectedItem,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { AdvanceTbColumn, Privacy } from "@/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyAndPolicy = () => {
  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(fetchDashboardData({ api: "privacy-policy" }));
  }, [dispatch]);

  const handleView = (privacy: Privacy) => {
    dispatch(setSelectedItem(privacy));
    navigate(`/dashboard/system_data/privacy_policy/view/${privacy?.title}`);
  };

  const handleEdit = (privacy: Privacy) => {
    dispatch(setSelectedItem(privacy));
    navigate(`/dashboard/system_data/privacy_policy/edit/${privacy?.title}`);

    const bodyWithoutNewlines = privacy?.body?.replace(/\n/g, "");
    localStorage.setItem("desc", JSON.stringify(bodyWithoutNewlines || ""));
  };

  const column: AdvanceTbColumn<Privacy>[] = [
    { header: "Title", accessor: (privacy) => <p>{privacy?.title}</p> },
    {
      header: "Body",
      accessor: (privacy) => <p>{truncateString(privacy?.body, 100)}</p>,
    },

    {
      header: "Action",
      accessor: (privacy) => (
        <Action
          width={80}
          onEdit={() => handleEdit(privacy)}
          onViewDetails={() => handleView(privacy)}
          hideDelete
        />
      ),
    },
  ];

  return (
    <Dashboard_Layout
        button={true}
        isDeleteBtn={false}
        buttonText="Add Privacy Policy"
        btnPath="/dashboard/system_data/privacy_policy/add"
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

export default PrivacyAndPolicy;
