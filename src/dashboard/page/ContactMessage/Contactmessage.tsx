import { useEffect, useState } from "react";
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
import { AdvanceTbColumn, IContact } from "@/types";
import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
import { formatDate } from "@/helpers";
import DeleteModal from "@/dashboard/component/DeleteModal";
import { useNavigate } from "react-router-dom";

export default function ContactMessage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { data, loading, selectedRows, allItemsSelected } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { token } = useAppSelector((state: RootState) => state.signin);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(fetchDashboardData({ api: "contact-message", token: token! }));
  }, [dispatch, token]);

  const handleDelete = async (contactMsg: IContact) => {
    setIsModalOpen(true);
    dispatch(setSelectedItem(contactMsg));
  };

  const handleView = (contactMsg: IContact) => {
    dispatch(setSelectedItem(contactMsg));
    navigate(`/dashboard/contact_message/view/${contactMsg?.name}`);
  };

  const handleDeleteRows = () => {
    if (selectedRows.length > 0) {
      dispatch(
        deleteDashData({
          api: "contact-message/delete/many",
          token: token!,
          ids: selectedRows,
        })
      );
    }
    dispatch(clearSelectedRows());
  };

  const column: AdvanceTbColumn<IContact>[] = [
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
      accessor: (msg) => (
        <input
          style={{ width: "40px" }}
          className={`checkbox-animation w-5 h-5 cursor-pointer ${
            selectedRows.includes(msg?._id) ? "checked" : ""
          }`}
          type="checkbox"
          checked={selectedRows.includes(msg?._id)}
          onChange={() => dispatch(handleRowSelection(msg?._id))}
        />
      ),
    },
    { header: "Name", accessor: (contactMsg) => <p>{contactMsg?.name}</p> },
    {
      header: "Contact",
      accessor: (contactMsg) => <p>{contactMsg?.contact}</p>,
    },
    { header: "Email", accessor: (contactMsg) => <p>{contactMsg?.email}</p> },
    {
      header: "Message",
      accessor: (contactMsg) => <p>{contactMsg?.message}</p>,
    },
    {
      header: "Date",
      accessor: (contactMsg) => <p>{formatDate(contactMsg?.createdAt)}</p>,
    },
    {
      header: "Actions",
      accessor: (contactMsg) => (
        <Action
          width={55}
          hideEdit
          onDelete={() => handleDelete(contactMsg)}
          onViewDetails={() => handleView(contactMsg)}
        />
      ),
    },
  ];

  return (
    <>
      <Dashboard_Layout
        button={false}
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
          api="contact-message/delete/many"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Dashboard_Layout>
    </>
  );
}
