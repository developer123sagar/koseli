/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, AdvanceTable, Spinner } from "@/common";
import DeleteModal from "@/dashboard/component/DeleteModal";
import { Dashboard_Layout } from "@/layout";
import {
  clearSelectedRows,
  deleteDashDataWithDelete,
  fetchRestaurantTables,
  handleRowSelection,
  handleSelectAllRows,
  setCurrentPage,
  setSelectedItem,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { AdvanceTbColumn, IAllTable } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllTable = () => {
  const { token } = useAppSelector((state: RootState) => state.signin);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const restaurantTables: any = useAppSelector(
    (state: RootState) => state.fetchDashData.restaurantTables
  );

  const { selectedItem, loading, selectedRows, allItemsSelected } =
    useAppSelector((state: RootState) => state.fetchDashData);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleView = (table: IAllTable) => {
    dispatch(setSelectedItem(table));
    navigate(`/dashboard/booking/table/view/${table?.tableNo}`);
  };

  const handleDelete = (table: IAllTable) => {
    setIsModalOpen(true);
    dispatch(setSelectedItem(table));
  };

  const handleEdit = (table: IAllTable) => {
    dispatch(setSelectedItem(table));
    navigate(`/dashboard/booking/table/edit/${table?.tableNo}`);
  };

  const handleDeleteRows = () => {
    if (selectedRows.length > 0) {
      dispatch(
        deleteDashDataWithDelete({
          api: "table/delete_tables",
          token: token!,
          body: { tableIds: selectedRows },
        })
      );
    }
    dispatch(clearSelectedRows());
  };

  const column: AdvanceTbColumn<IAllTable>[] = [
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
            onChange={() =>
              dispatch(handleSelectAllRows(restaurantTables?.table))
            }
          />
        </div>
      ),
      accessor: (table) => (
        <input
          style={{ width: "40px" }}
          className={`checkbox-animation w-5 h-5 cursor-pointer ${
            selectedRows.includes(table?._id) ? "checked" : ""
          }`}
          type="checkbox"
          checked={selectedRows.includes(table?._id)}
          onChange={() => dispatch(handleRowSelection(table?._id))}
        />
      ),
    },
    {
      header: "Image",
      accessor: (table) => (
        <div className="flex items-center justify-center">
          <img
            src={`${baseImgUrl}/${table?.image}`}
            className="h-20 w-20 object-cover"
          />
        </div>
      ),
    },
    {
      header: "Table Number",
      accessor: (table) => <p>{table?.tableNo}</p>,
    },
    {
      header: "Price",
      accessor: (table) => <p>Rs.{table?.bookingamount}</p>,
    },
    {
      header: "Number of seats",
      accessor: (table) => <p>{table?.number_of_seats}</p>,
    },
    {
      header: "Status",
      accessor: (table) => <p>{table?.status}</p>,
    },
    {
      header: "Is Booked",
      accessor: (table) => <p>{table?.isbooked?.toString()}</p>,
    },
    {
      header: "Action",
      accessor: (table) => (
        <Action
          onDelete={() => handleDelete(table)}
          onViewDetails={() => handleView(table)}
          onEdit={() => handleEdit(table)}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(setCurrentPage(1));

    const id = localStorage.getItem("resAdminId") || "";
    dispatch(fetchRestaurantTables({ restaurantId: id }));
  }, [dispatch]);

  return (
    <Dashboard_Layout
      button={true}
      buttonText="Add Table"
      btnPath="/dashboard/booking/table/create"
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
        <AdvanceTable columns={column} data={restaurantTables} />
      )}
      <DeleteModal
        api="table/delete_tables"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isDeleteMethod
        title={selectedItem?.tableNo}
      />
    </Dashboard_Layout>
  );
};

export default AllTable;
