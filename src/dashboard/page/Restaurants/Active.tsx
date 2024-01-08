import { baseImgUrl } from "@/routes";
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
import { AdvanceTbColumn, IRestaurant } from "@/types";
import { AdvanceTable } from "@/common";
import { Action, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
import { useNavigate } from "react-router-dom";
import DeleteModal from "@/dashboard/component/DeleteModal";

export default function Active() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const route = "restaurant";

  const { data, loading, selectedRows, allItemsSelected } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  const { token } = useAppSelector((state: RootState) => state.signin);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(fetchDashboardData({ api: route, token: token! }));
  }, [dispatch, token]);

  const handleDelete = (restro: IRestaurant) => {
    setIsModalOpen(true);
    dispatch(setSelectedItem(restro));
  };

  const handleView = (restro: IRestaurant) => {
    dispatch(setSelectedItem(restro));
    navigate(`/dashboard/restaurant/view/${restro?.name}`);
  };

  const handleEdit = (restro: IRestaurant) => {
    dispatch(setSelectedItem(restro));
    navigate(`/dashboard/restaurant/edit/${restro?.name}`);
    localStorage.setItem("desc", JSON.stringify(restro?.description || ""));
  };

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
      header: "Image",
      accessor: (restro) => (
        <div className="flex items-center gap-10">
          <img
            src={`${baseImgUrl}/${restro.mainImage}`}
            className="h-20 w-20 object-cover rounded-md"
          />
        </div>
      ),
    },
    {
      header: "Name",
      accessor: (restro) => <p>{restro?.name?.toLocaleUpperCase()}</p>,
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
      header: "Action",
      accessor: (restro) => (
        <Action
          onDelete={() => handleDelete(restro)}
          onViewDetails={() => handleView(restro)}
          onEdit={() => handleEdit(restro)}
        />
      ),
    },
  ];

  console.log(data)
  return (
    <>
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
        <DeleteModal
          api="restaurant/delete/many"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Dashboard_Layout>
    </>
  );
}
