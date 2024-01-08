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
import { AdvanceTbColumn, ITaxs } from "@/types";
import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
import DeleteModal from "@/dashboard/component/DeleteModal";
import { formatDate } from "@/helpers";
import { useNavigate } from "react-router-dom";

export default function ITax() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { data, loading, selectedRows, allItemsSelected } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { token } = useAppSelector((state: RootState) => state.signin);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(fetchDashboardData({ api: "tax" }));
  }, [dispatch]);

  const handleDelete = (tax: ITaxs) => {
    setIsModalOpen(true);
    dispatch(setSelectedItem(tax));
  };

  const handleView = (tax: ITaxs) => {
    dispatch(setSelectedItem(tax));
    navigate(`/dashboard/system_data/tax/view/${tax?.name?.toUpperCase()}`);
  };

  const handleEdit = (tax: ITaxs) => {
    dispatch(setSelectedItem(tax));
    navigate(`/dashboard/system_data/tax/edit/${tax?.name}`);
  };

  const handleDeleteRows = () => {
    if (selectedRows.length > 0) {
      dispatch(
        deleteDashData({
          api: "tax/many",
          token: token!,
          ids: selectedRows,
        })
      );
    }
    dispatch(clearSelectedRows());
  };

  const column: AdvanceTbColumn<ITaxs>[] = [
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
      accessor: (tax) => (
        <input
          style={{ width: "40px" }}
          className={`checkbox-animation w-5 h-5 cursor-pointer ${
            selectedRows.includes(tax?._id) ? "checked" : ""
          }`}
          type="checkbox"
          checked={selectedRows.includes(tax?._id)}
          onChange={() => dispatch(handleRowSelection(tax?._id))}
        />
      ),
    },
    { header: "Name", accessor: (Taxs) => <p>{Taxs?.name}</p> },
    { header: "Tax", accessor: (Taxs) => <p>{Taxs?.tax} %</p> },
    {
      header: "Created Date",
      accessor: (Taxs) => <p>{formatDate(Taxs?.createdDateTime)}</p>,
    },
    {
      header: "Action",
      accessor: (tax) => (
        <Action
          width={80}
          onDelete={() => handleDelete(tax)}
          onEdit={() => handleEdit(tax)}
          onViewDetails={() => handleView(tax)}
        />
      ),
    },
  ];

  return (
    <>
      <Dashboard_Layout
        button={true}
        buttonText="Add Tax"
        btnPath="/dashboard/system_data/tax/add"
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
          api="tax/many"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Dashboard_Layout>
    </>
  );
}
