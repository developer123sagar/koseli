import { useEffect, useState } from "react";
import { baseImgUrl } from "@/routes";
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
import { Action, AdvanceTable, Spinner } from "@/common";
import { AdvanceTbColumn, IFoodItem } from "@/types";
import { Dashboard_Layout } from "@/layout";
import DeleteModal from "@/dashboard/component/DeleteModal";
import { useNavigate } from "react-router-dom";

export default function Food() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, loading, selectedRows, allItemsSelected } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { token, role } = useAppSelector((state: RootState) => state.signin);

  const handleDelete = async (food: IFoodItem) => {
    setIsModalOpen(true);
    dispatch(setSelectedItem(food));
  };
  const handleView = (food: IFoodItem) => {
    dispatch(setSelectedItem(food));
    navigate(`/dashboard/kitchen/food/view/${food?.name}`);
  };
  const handleEdit = (food: IFoodItem) => {
    dispatch(setSelectedItem(food));
    navigate(`/dashboard/kitchen/food/edit/${food?.name}`);
    localStorage.setItem("desc", JSON.stringify(food?.subTitle || ""));
  };

  const handleDeleteRows = () => {
    if (selectedRows.length > 0) {
      dispatch(
        deleteDashData({
          api: "food/delete/many",
          token: token!,
          ids: selectedRows,
        })
      );
    }
    dispatch(clearSelectedRows());
  };

  const column: AdvanceTbColumn<IFoodItem>[] = [
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
      accessor: (food) => (
        <input
          style={{ width: "40px" }}
          className={`checkbox-animation w-5 h-5 cursor-pointer ${
            selectedRows.includes(food?._id) ? "checked" : ""
          }`}
          type="checkbox"
          checked={selectedRows.includes(food?._id)}
          onChange={() => dispatch(handleRowSelection(food?._id))}
        />
      ),
    },
    {
      header: "Image",
      accessor: (food) => (
        <div className="flex items-center justify-center">
          <img
            src={`${baseImgUrl}/${food?.activeImage}`}
            className="h-20 w-20 object-cover"
          />
        </div>
      ),
    },
    {
      header: "Food Name",
      accessor: (food) => <p>{food?.name?.toUpperCase()}</p>,
    },
    {
      header: "Description",
      accessor: (food) => <p>{food?.subTitle}</p>,
    },
    {
      header: "Price",
      accessor: (food) => <p>Rs. {food?.price}</p>,
    },
    {
      header: "Food Making Time",
      accessor: (food) => <p>{food?.foodMakingTime?.minutes} minutes</p>,
    },
    {
      header: "Action",
      accessor: (food) => (
        <Action
          onDelete={() => handleDelete(food)}
          onViewDetails={() => handleView(food)}
          onEdit={() => handleEdit(food)}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(setCurrentPage(1));

    if (role === "restaurant") {
      dispatch(fetchDashboardData({ api: "food/restaurant", token: token! }));
    } else {
      dispatch(fetchDashboardData({ api: "food", token: token! }));
    }
  }, [dispatch, token, role]);

  return (
    <>
    
        <Dashboard_Layout
          button={true}
          buttonText="Add Food"
          btnPath="/dashboard/kitchen/food/add"
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
            api="food/delete/many"
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Dashboard_Layout>
    
    </>
  );
}
