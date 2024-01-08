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
import { AdvanceTbColumn, ICoupon } from "@/types";
import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
import { formatDate } from "@/helpers";
import DeleteModal from "@/dashboard/component/DeleteModal";
import { useNavigate } from "react-router-dom";

export default function CouponCode() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, loading, selectedItem, selectedRows, allItemsSelected } =
    useAppSelector((state: RootState) => state.fetchDashData);
  const { token } = useAppSelector((state: RootState) => state.signin);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(
      fetchDashboardData({ api: "coupon/restaurant-coupon", token: token! })
    );
  }, [dispatch, token]);

  const handleDelete = (cupon: ICoupon) => {
    setIsModalOpen(true);
    dispatch(setSelectedItem(cupon));
  };

  const handleView = (cupon: ICoupon) => {
    dispatch(setSelectedItem(cupon));
    navigate(`/dashboard/cupon/code/view/${cupon?.code}`);
  };

  const handleEdit = (cupon: ICoupon) => {
    dispatch(setSelectedItem(cupon));
    navigate(`/dashboard/cupon/code/edit/${cupon?.code}`);
    localStorage.setItem("desc", JSON.stringify(cupon?.description || ""));

  };

  const column: AdvanceTbColumn<ICoupon>[] = [
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
      accessor: (cupon) => (
        <input
          style={{ width: "40px" }}
          className={`checkbox-animation w-5 h-5 cursor-pointer ${
            selectedRows.includes(cupon?._id) ? "checked" : ""
          }`}
          type="checkbox"
          checked={selectedRows.includes(cupon?._id)}
          onChange={() => dispatch(handleRowSelection(cupon?._id))}
        />
      ),
    },
    {
      header: "Usage",
      accessor: (cupon) => <p>{cupon?.maxUsage}</p>,
    },
    {
      header: "CouponCode",
      accessor: (cupon) => <p>{cupon?.code}</p>,
    },

    {
      header: "Discount",
      accessor: (cupon) => <p>{cupon?.discount}</p>,
    },

    {
      header: "Start Date",
      accessor: (cupon) => <p>{formatDate(cupon?.startDate)}</p>,
    },
    {
      header: "Expiry Date",
      accessor: (cupon) => <p>{formatDate(cupon?.endDate)}</p>,
    },
    {
      header: "Actions",
      accessor: (cupon) => (
        <Action
          width={55}
          onDelete={() => handleDelete(cupon)}
          onViewDetails={() => handleView(cupon)}
          onEdit={() => handleEdit(cupon)}
        />
      ),
    },
  ];

  const handleDeleteRows = () => {
    if (selectedRows.length > 0) {
      dispatch(
        deleteDashData({
          api: "coupon/delete",
          token: token!,
          ids: selectedRows,
        })
      );
    }
    dispatch(clearSelectedRows());
  };

  return (
    <>
      <Dashboard_Layout
          button={true}
          buttonText="Add Cupon"
          btnPath="/dashboard/cupon/add"
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
            api="coupon/delete"
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            title={selectedItem?.code}
          />
        </Dashboard_Layout>
    </>
  );
}
