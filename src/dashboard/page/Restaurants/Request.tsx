import { useEffect } from "react";
import { baseImgUrl } from "@/routes";
import { IRestaurant } from "@/types";
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
import { Dashboard_Layout } from "@/layout";
import { AdvanceTbColumn } from "@/types";
import { useNavigate } from "react-router-dom";

export default function Request() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, loading, selectedRows, allItemsSelected } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { token } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(
      fetchDashboardData({ api: "restaurant/status/pending", token: token! })
    );
  }, [dispatch, token]);

  const handleDeleteRows = () => {
    if (selectedRows.length > 0) {
      dispatch(
        deleteDashData({
          api: "restaurant/delete/many",
          token: token!,
          ids: selectedRows,
        })
      );
    }
    dispatch(clearSelectedRows());
  };

  const handleView = (restro: IRestaurant) => {
    dispatch(setSelectedItem(restro));
    navigate(`/dashboard/restaurant/view/${restro?._id}?statuschange=true`);
  };

  const column: AdvanceTbColumn<IRestaurant>[] = [
    {
      header: (
        <div
          style={{ width: "40px" }}
          className="flex justify-center flex-col items-center"
        >
          <p className="w-5 h-5 text-xl font-bold">S.N.</p>
          <input
            className="checkbox-animation w-5 h-6 cursor-pointer mt-2 ml-4"
            type="checkbox"
            checked={allItemsSelected}
            onChange={() => dispatch(handleSelectAllRows(data))}
          />
        </div>
      ),
      accessor: (restro) => (
        <input
          style={{ width: "40px" }}
          className={`checkbox-animation w-5 h-5 cursor-pointer ${
            selectedRows.includes(restro?._id) ? "checked" : ""
          }`}
          type="checkbox"
          checked={selectedRows.includes(restro?._id)}
          onChange={() => dispatch(handleRowSelection(restro?._id))}
        />
      ),
    },
    {
      header: "Images",
      accessor: (restro) => (
        <div className="flex items-center justify-center">
          <img
            src={`${baseImgUrl}/${restro.mainImage}`}
            className="w-24 h-24 object-cover rounded"
          />
        </div>
      ),
    },
    {
      header: "Name",
      accessor: (restro) => <p>{restro?.name}</p>,
    },
    {
      header: "Contact",
      accessor: (restro) => <p>{restro?.phoneNumber}</p>,
    },
    {
      header: "Address",
      accessor: (restro) => <p>{restro?.address}</p>,
    },
    {
      header: "Email",
      accessor: (restro) => <p> {restro?.email} </p>,
    },
    {
      header: "Status",
      accessor: (restro) => <p> {restro?.status} </p>,
    },
    {
      header: "Action",
      accessor: (restro) => (
        <Action hideDelete hideEdit onViewDetails={() => handleView(restro)} />
      ),
    },
  ];

  return (
    <>
      <Dashboard_Layout
        button={true}
        buttonText="Add Restaurant"
        btnPath="/dashboard/restaurant/add"
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
      </Dashboard_Layout>
    </>
  );
}
