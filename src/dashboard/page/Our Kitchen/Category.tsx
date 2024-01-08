import { useEffect, useState } from "react";
import { baseImgUrl } from "@/routes";
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
import { AdvanceTbColumn, IFoodCategory } from "@/types";
import { Dashboard_Layout } from "@/layout";
import { useNavigate } from "react-router-dom";
import DeleteModal from "@/dashboard/component/DeleteModal";
import { truncateString } from "@/helpers";

export default function Category() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, loading, selectedRows, allItemsSelected } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  const { token, role } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    dispatch(setCurrentPage(1));

    if (role === "admin")
      dispatch(fetchDashboardData({ api: "food-category", token: token! }));
  }, [dispatch, token, role]);

  const handleEdit = (category: IFoodCategory) => {
    dispatch(setSelectedItem(category));
    navigate(`/dashboard/kitchen/category/edit/${category?._id}`);
    localStorage.setItem("desc", JSON.stringify(category?.extra || ""));
  };
  const handleView = (category: IFoodCategory) => {
    dispatch(setSelectedItem(category));
    navigate(`/dashboard/kitchen/category/view/${category?._id}`);
  };
  const handleDelete = (cateogry: IFoodCategory) => {
    setIsModalOpen(true);
    dispatch(setSelectedItem(cateogry));
  };

  const handleDeleteRows = () => {
    if (selectedRows.length > 0) {
      dispatch(
        deleteDashData({
          api: "food-category/delete/many",
          token: token!,
          ids: selectedRows,
        })
      );
    }
    dispatch(clearSelectedRows());
  };

  const column: AdvanceTbColumn<IFoodCategory>[] = [
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
      accessor: (category) => (
        <input
          style={{ width: "40px" }}
          className={`checkbox-animation w-5 h-5 cursor-pointer ${
            selectedRows.includes(category?._id) ? "checked" : ""
          }`}
          type="checkbox"
          checked={selectedRows.includes(category?._id)}
          onChange={() => dispatch(handleRowSelection(category?._id))}
        />
      ),
    },
    {
      header: "Images",
      accessor: (category) => (
        <div style={{ width: "120px", margin: "0 auto" }}>
          <img
            src={`${baseImgUrl}/${category?.images}`}
            className="w-24 h-20 object-cover mx-auto"
          />
        </div>
      ),
    },
    {
      header: "Name",
      accessor: (category) => (
        <p style={{ width: "80px", margin: "0 auto" }}>
          {category?.name?.toLocaleUpperCase()}
        </p>
      ),
    },
    {
      header: "Description",
      accessor: (category) => (
        <p style={{ width: "180px", margin: "0 auto" }}>
          {truncateString(category?.extra, 100)}
        </p>
      ),
    },
    {
      header: "Actions",
      accessor: (category) => (
        <Action
          width={55}
          onEdit={() => handleEdit(category)}
          onViewDetails={() => handleView(category)}
          onDelete={() => handleDelete(category)}
        />
      ),
    },
  ];

  return (
    <>
      <>
        <Dashboard_Layout
          button={true}
          buttonText="Add Category"
          btnPath="/dashboard/kitchen/category/add"
          isDeleteBtn={selectedRows.length > 0}
          deleteBtn={
            allItemsSelected
              ? "Delete All"
              : `${selectedRows.length > 0 && `Delete ${selectedRows.length}`}`
          }
          onClick={handleDeleteRows}
        >
          {loading ? (
            <Spinner />
          ) : (
            <AdvanceTable columns={column} data={data} />
          )}
          <DeleteModal
            api="food-category/delete/many"
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Dashboard_Layout>
      </>
    </>
  );
}
