import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
import {
  clearSelectedRows,
  deleteDashData,
  fetchDashboardData,
  handleRowSelection,
  handleSelectAllRows,
  setCurrentPage,
  setSelectedItem,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { AdvanceTbColumn, IFounder } from "@/types";
import { useEffect, useState } from "react";
import DeleteModal from "../DeleteModal";
import { useNavigate } from "react-router-dom";

export default function Founder() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, loading, selectedRows, allItemsSelected } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { token } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(fetchDashboardData({ api: "founder", token: token! }));
  }, [dispatch, token]);

  const navigate = useNavigate();

  const handleView = (founder: IFounder) => {
    dispatch(setSelectedItem(founder));
    navigate(`/dashboard/founder/view/${founder?.name}`);
  };

  const handleDelete = async (founder: IFounder) => {
    setIsModalOpen(true);
    dispatch(setSelectedItem(founder));
  };

  const handleEdit = (founder: IFounder) => {
    dispatch(setSelectedItem(founder));
    navigate(`/dashboard/founder/edit/${founder?.name}`);
    localStorage.setItem("desc", JSON.stringify(founder?.extra || ""));
  };

  const handleDeleteRows = () => {
    if (selectedRows.length > 0) {
      dispatch(
        deleteDashData({
          api: "founder/delete",
          token: token!,
          ids: selectedRows,
        })
      );
    }
    dispatch(clearSelectedRows());
  };

  const column: AdvanceTbColumn<IFounder>[] = [
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
      accessor: (founder) => (
        <input
          style={{ width: "40px" }}
          className={`checkbox-animation w-5 h-5 cursor-pointer ${
            selectedRows.includes(founder?._id) ? "checked" : ""
          }`}
          type="checkbox"
          checked={selectedRows.includes(founder?._id)}
          onChange={() => dispatch(handleRowSelection(founder?._id))}
        />
      ),
    },
    {
      header: "Image",
      accessor: (founder) => (
        <div className="flex items-center justify-center">
          <img
            src={`${baseImgUrl}/${founder?.image}`}
            className="h-20 w-20 object-cover"
          />
        </div>
      ),
    },
    {
      header: "name",
      accessor: (founder) => <p>{founder?.name}</p>,
    },

    {
      header: "description",
      accessor: (founder) => <p>{founder?.extra}</p>,
    },
    {
      header: "Action",
      accessor: (founder) => (
        <Action
          onViewDetails={() => handleView(founder)}
          onDelete={() => handleDelete(founder)}
          onEdit={() => handleEdit(founder)}
        />
      ),
    },
  ];
  return (
    <>
      <Dashboard_Layout
        button={true}
        btnPath="/dashboard/add-founder"
        buttonText="Create Founder"
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
          api="founder/delete"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Dashboard_Layout>
    </>
  );
}
