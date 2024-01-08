/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Action, AdvanceTable, Spinner } from "@/common";
import { AdvanceTbColumn, IFoodSpeciality } from "@/types";
import { Dashboard_Layout } from "@/layout";
import { useNavigate } from "react-router-dom";
import DeleteModal from "@/dashboard/component/DeleteModal";
import { baseImgUrl } from "@/routes";

export default function Speciality() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { data, loading, selectedRows, allItemsSelected } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  const { token } = useAppSelector((state: RootState) => state.signin);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(
      fetchDashboardData({ api: "food-speciality/restaurant", token: token! })
    );
  }, [dispatch, token]);

  const handleView = (speciality: IFoodSpeciality) => {
    dispatch(setSelectedItem(speciality));
    navigate(
      `/dashboard/kitchen/speciality/view/${speciality?.name?.toUpperCase()}`
    );
  };

  const handleDelete = (speciality: IFoodSpeciality) => {
    setIsModalOpen(true);
    dispatch(setSelectedItem(speciality));
  };

  const handleEdit = (speciality: IFoodSpeciality) => {
    dispatch(setSelectedItem(speciality));
    navigate(`/dashboard/kitchen/speciality/edit/${speciality?.name}`);
    localStorage.setItem("desc", JSON.stringify(speciality.extra || ""));
  };

  const handleDeleteRows = () => {
    if (selectedRows.length > 0) {
      dispatch(
        deleteDashData({
          api: "food-speciality/delete/many",
          token: token!,
          ids: selectedRows,
        })
      );
    }
    dispatch(clearSelectedRows());
  };

  const column: AdvanceTbColumn<IFoodSpeciality>[] = [
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
      accessor: (speciality) => (
        <input
          style={{ width: "40px" }}
          className={`checkbox-animation w-5 h-5 cursor-pointer ${
            selectedRows.includes(speciality?._id) ? "checked" : ""
          }`}
          type="checkbox"
          checked={selectedRows.includes(speciality?._id)}
          onChange={() => dispatch(handleRowSelection(speciality?._id))}
        />
      ),
    },
    {
      header: "Image",
      accessor: (food) => (
        <div className="flex items-center justify-center">
          <img
            src={`${baseImgUrl}/${food?.food?.activeImage}`}
            className="h-20 w-20 object-cover"
          />
        </div>
      ),
    },
    {
      header: "Food Name",
      accessor: (speciality) => <p>{speciality?.name}</p>,
    },
    {
      header: "Description",
      accessor: (speciality) => <p>{speciality?.extra}</p>,
    },
    {
      header: "Price",
      accessor: (speciality) => <p>Rs. {speciality?.amount}</p>,
    },
    {
      header: "Action",
      accessor: (speciality) => (
        <Action
          onDelete={() => handleDelete(speciality)}
          onViewDetails={() => handleView(speciality)}
          onEdit={() => handleEdit(speciality)}
        />
      ),
    },
  ];
  console.log(data);

  return (
    <>
      <Dashboard_Layout
        button={true}
        buttonText="Add Special Food"
        btnPath="/dashboard/kitchen/speciality/add"
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
          api="food-speciality/delete/many"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Dashboard_Layout>
    </>
  );
}
