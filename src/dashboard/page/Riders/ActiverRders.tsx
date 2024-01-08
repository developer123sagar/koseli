import { useEffect, useState } from "react";
import { baseImgUrl, url } from "@/routes";
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
import { formatDate } from "@/helpers";
import { AdvanceTbColumn, IRiders } from "@/types";
import { Action, AdvanceTable, Modal, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Buttons from "@/common/Button";

export default function ActiveRiders() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { data, loading, selectedRows, allItemsSelected, selectedItem } =
    useAppSelector((state: RootState) => state.fetchDashData);
  const { token } = useAppSelector((state: RootState) => state.signin);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(fetchDashboardData({ api: "rider/auth", token: token! }));
  }, [dispatch, token]);

  const handleDelete = async (rider: IRiders) => {
    setIsModalOpen(true);
    dispatch(setSelectedItem(rider));
  };

  const handleView = (rider: IRiders) => {
    dispatch(setSelectedItem(rider));
    navigate(`/dashboard/rider/view/${rider?.rider?._id}`);
  };

  const handleEdit = (riders: IRiders) => {
    dispatch(setSelectedItem(riders));
    navigate(`/dashboard/rider/edit/${riders?.rider?.name}`);
    localStorage.setItem(
      "desc",
      JSON.stringify(riders?.insurance?.description || "")
    );
  };

  const handleDeleteRows = () => {
    if (selectedRows.length > 0) {
      dispatch(
        deleteDashData({
          api: "rider/auth/many",
          token: token!,
          ids: selectedRows,
        })
      );
    }
    dispatch(clearSelectedRows());
  };

  const column: AdvanceTbColumn<IRiders>[] = [
    {
      header: (
        <div className="relative flex items-center gap-6 justify-center">
          <p className="w-5 h-5 text-xl font-bold">S.N.</p>
          <input
            className="checkbox-animation w-5 h-6 cursor-pointer mt-2"
            type="checkbox"
            checked={allItemsSelected}
            onChange={() => dispatch(handleSelectAllRows(data))}
          />
        </div>
      ),
      accessor: (rider) => (
        <input
          className={`checkbox-animation w-5 h-5 cursor-pointer ${
            selectedRows.includes(rider?.rider?._id) ? "checked" : ""
          }`}
          type="checkbox"
          checked={selectedRows.includes(rider?.rider?._id)}
          onChange={() => dispatch(handleRowSelection(rider?.rider?._id))}
        />
      ),
    },
    {
      header: "Name",
      accessor: (rider) => (
        <div className="flex items-center justify-center">
          <img
            src={`${baseImgUrl}/${rider?.photo}`}
            className="h-20 w-20 object-cover"
          />
        </div>
      ),
    },
    {
      header: "Name",
      accessor: (rider) => <p>{rider?.rider?.name}</p>,
    },
    {
      header: "Email",
      accessor: (rider) => <p>{rider?.email}</p>,
    },
    {
      header: "Gender",
      accessor: (rider) => <p>{rider?.rider?.gender}</p>,
    },
    {
      header: "Contact",
      accessor: (rider) => <p>{rider?.phone}</p>,
    },
    {
      header: "Join Date",
      accessor: (rider) => <p>{formatDate(rider?.rider?.joinDate)}</p>,
    },
    {
      header: "Action",
      accessor: (rider) => (
        <Action
          onDelete={() => handleDelete(rider)}
          onViewDetails={() => handleView(rider)}
          onEdit={() => handleEdit(rider)}
        />
      ),
    },
  ];

  const handleDeleteData = async (rider: IRiders) => {
    try {
      await axios.delete(`${url}/rider/auth/${rider?.rider?._id}`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsModalOpen(false);
      dispatch(fetchDashboardData({ api: "rider/auth", token: token! }));
    }
  };

  return (
    <Dashboard_Layout
        isDeleteBtn={selectedRows.length > 0}
        deleteBtn={
          allItemsSelected
            ? "Delete All"
            : `${selectedRows.length > 0 && `Delete ${selectedRows.length}`}`
        }
        onClick={handleDeleteRows}
        button={true}
      >
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <AdvanceTable columns={column} data={data} />
        )}
        <Modal isOpen={isModalOpen} setIsOpen={closeModal}>
          <div className="flex items-center justify-between py-3 px-5 bg-gray-200/30 bg-opacity-80">
            <h1>{`Are you sure want to Delete ${selectedItem?.rider?.name} ?`}</h1>
          </div>
          <div className="flex justify-end gap-5 px-5 my-8">
            <Buttons
              variant="destructive"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Buttons>
            <Buttons
              variant="secondary"
              onClick={() => handleDeleteData(selectedItem)}
            >
              Yes
            </Buttons>
          </div>
        </Modal>
      </Dashboard_Layout>
  );
}
