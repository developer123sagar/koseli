import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import {
  clearSelectedRows,
  deleteDashData,
  fetchDashboardData,
  handleRowSelection,
  handleSelectAllRows,
  setCurrentPage,
  setSelectedItem,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { baseImgUrl } from "@/routes";
import { AdvanceTbColumn, IWatcher } from "@/types";
import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
import { useNavigate } from "react-router-dom";
import DeleteModal from "@/dashboard/component/DeleteModal";

export default function UserManagement() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, loading, selectedRows, allItemsSelected } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  const { token } = useAppSelector((state: RootState) => state.signin);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(fetchDashboardData({ api: "watcher", token: token! }));
  }, [dispatch, token]);

  const handleView = (watcher: IWatcher) => {
    dispatch(setSelectedItem(watcher));
    navigate(`/dashboard/user_management/view/${watcher?.Name}`);
  };

  const handleDelete = async (watcher: IWatcher) => {
    setIsModalOpen(true);
    dispatch(setSelectedItem(watcher));
  };

  const handleDeleteRows = () => {
    if (selectedRows.length > 0) {
      dispatch(
        deleteDashData({
          api: "watcher/delete/many",
          token: token!,
          ids: selectedRows,
        })
      );
    }
    dispatch(clearSelectedRows());
  };

  const column: AdvanceTbColumn<IWatcher>[] = [
    {
      header: (
        <div
          style={{ width: "40px", margin: "0 auto" }}
          className="flex justify-center flex-col items-center"
        >
          <p className="w-5 h-5 text-xl font-bold">S.N.</p>
          <input
            className="checkbox-animation w-5 h-6 cursor-pointer mt-2 ml-2"
            type="checkbox"
            checked={allItemsSelected}
            onChange={() => dispatch(handleSelectAllRows(data))}
          />
        </div>
      ),
      accessor: (usermgt) => (
        <input
          style={{ width: "40px" }}
          className={`checkbox-animation w-5 h-5 cursor-pointer ${
            selectedRows.includes(usermgt?._id) ? "checked" : ""
          }`}
          type="checkbox"
          checked={selectedRows.includes(usermgt?._id)}
          onChange={() => dispatch(handleRowSelection(usermgt?._id))}
        />
      ),
    },
    {
      header: "Image",
      accessor: (watcher) => (
        <div className="flex items-center gap-2">
          <img
            src={`${baseImgUrl}/${watcher?.images}`}
            className="h-12 w-12 mx-auto object-cover"
          />
        </div>
      ),
    },
    {
      header: "Name",
      accessor: (watcher) => <p>{watcher?.Name?.toLocaleUpperCase()}</p>,
    },
    { header: "Email", accessor: (watcher) => <p>{watcher?.Email}</p> },
    { header: "Role", accessor: (watcher) => <p>{watcher?.role}</p> },
    {
      header: "isVerified",
      accessor: (watcher) => <p>{watcher?.verificationStatus}</p>,
    },
    {
      header: "Action",
      accessor: (watcher) => (
        <Action
          width={80}
          hideEdit
          onViewDetails={() => handleView(watcher)}
          onDelete={() => handleDelete(watcher)}
        />
      ),
    },
  ];

  return (
    <>
      <Dashboard_Layout
        button={true}
        btnPath="/dashboard/watcher/create"
        buttonText="Create Watcher"
        isDeleteBtn={selectedRows.length > 0}
        deleteBtn={
          allItemsSelected
            ? "Delete All"
            : `${selectedRows.length > 0 && `Delete ${selectedRows.length}`}`
        }
        onClick={handleDeleteRows}
      >
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <AdvanceTable columns={column} data={data} />
        )}
        <DeleteModal
          api="watcher/delete/many"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Dashboard_Layout>
    </>
  );
}
