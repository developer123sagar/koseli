import { Action, AdvanceTable, Spinner } from "@/common";
import DeleteModal from "@/dashboard/component/DeleteModal";
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
import { fetchRestaurant } from "@/redux/restaurant/restaurantSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { AdvanceTbColumn, INotice } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Notice() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, loading, selectedRows, allItemsSelected } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { restaurantData } = useAppSelector(
    (state: RootState) => state.restaurant
  );

  const { token, role } = useAppSelector((state: RootState) => state.signin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = async (notice: INotice) => {
    setIsModalOpen(true);
    dispatch(setSelectedItem(notice));
  };

  const handleView = (notice: INotice) => {
    dispatch(setSelectedItem(notice));
    navigate(`/dashboard/notice/view/${notice?.noticetitle}`);
  };

  const handleEdit = (notice: INotice) => {
    dispatch(setSelectedItem(notice));
    navigate(`/dashboard/notice/edit/${notice?.noticetitle}`);
    localStorage.setItem("desc", JSON.stringify(notice?.Detail || ""));
  };

  const handleDeleteRows = () => {
    if (selectedRows.length > 0) {
      dispatch(
        deleteDashData({
          api: "notice/delete",
          token: token!,
          ids: selectedRows,
        })
      );
    }
    dispatch(clearSelectedRows());
  };

  const column: AdvanceTbColumn<INotice>[] = [
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
      accessor: (notice) => (
        <input
          style={{ width: "40px" }}
          className={`checkbox-animation w-5 h-5 cursor-pointer ${
            selectedRows.includes(notice?._id) ? "checked" : ""
          }`}
          type="checkbox"
          checked={selectedRows.includes(notice?._id)}
          onChange={() => dispatch(handleRowSelection(notice?._id))}
        />
      ),
    },
    {
      header: "Notice",
      accessor: (notice) => (
        <div className="flex items-center justify-center">
          <img
            src={`${baseImgUrl}/${notice?.image}`}
            className="h-20 w-20 object-cover"
          />
        </div>
      ),
    },
    {
      header: "Restaurant Photo",
      accessor: (notice) => {
        const matchedRestaurant = restaurantData.find(
          (restaurant) => restaurant._id === notice.restaurantId
        );

        return matchedRestaurant ? (
          <div className="flex items-center justify-center">
            <img
              src={`${baseImgUrl}/${matchedRestaurant?.mainImage}`}
              className="h-20 w-20 object-cover"
            />
          </div>
        ) : (
          <p>No Restaurant</p>
        );
      },
    },
    {
      header: "Restaurant Name",
      accessor: (notice) => {
        const matchedRestaurant = restaurantData.find(
          (restaurant) => restaurant._id === notice.restaurantId
        );

        return matchedRestaurant ? (
          <p>{matchedRestaurant?.name}</p>
        ) : (
          <p>No Restaurant</p>
        );
      },
    },
    {
      header: "Notice Title",
      accessor: (notice) => <h1>{notice?.noticetitle}</h1>,
    },
    {
      header: "Notice Detail",
      accessor: (notice) => <h1>{notice?.Detail || "Not Available"}</h1>,
    },

    {
      header: "Action",
      accessor: (notice) => (
        <Action
          onDelete={() => handleDelete(notice)}
          onViewDetails={() => handleView(notice)}
          onEdit={() => handleEdit(notice)}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(setCurrentPage(1));

    if (role === "admin") {
      dispatch(fetchDashboardData({ api: "notice", token: token! }));
    }
  }, [dispatch, token, role]);

  useEffect(() => {
    dispatch(fetchRestaurant());
  }, [dispatch]);

  return (
    <>
      <Dashboard_Layout
        button={true}
        btnPath="/dashboard/notice/add"
        buttonText="Create Notice"
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
          api="notice/delete"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Dashboard_Layout>
    </>
  );
}
