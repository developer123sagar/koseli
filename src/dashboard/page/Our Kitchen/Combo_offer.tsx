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
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { AdvanceTbColumn, IComboOffers } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Combo_Offer() {
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
      fetchDashboardData({
        api: "combo-offers/restaurant",
        token: token!,
      })
    );
  }, [dispatch, token]);

  const handleDelete = async (combo: IComboOffers) => {
    setIsModalOpen(true);
    dispatch(setSelectedItem(combo));
  };

  const handleView = (combo: IComboOffers) => {
    dispatch(setSelectedItem(combo));
    navigate(`/dashboard/kitchen/combo-offer/view/${combo?.name}`);
  };

  const handleEdit = (combo: IComboOffers) => {
    dispatch(setSelectedItem(combo));
    navigate(`/dashboard/kitchen/combo-offer/edit/${combo?.name}`);
    localStorage.setItem("desc", JSON.stringify(combo?.extra || ""));
  };

  const handleDeleteRows = () => {
    if (selectedRows.length > 0) {
      dispatch(
        deleteDashData({
          api: "combo-offers/delete/many",
          token: token!,
          ids: selectedRows,
        })
      );
    }
    dispatch(clearSelectedRows());
  };

  const column: AdvanceTbColumn<IComboOffers>[] = [
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
      accessor: (combo) => (
        <input
          style={{ width: "40px" }}
          className={`checkbox-animation w-5 h-5 cursor-pointer ${
            selectedRows.includes(combo?._id) ? "checked" : ""
          }`}
          type="checkbox"
          checked={selectedRows.includes(combo?._id)}
          onChange={() => dispatch(handleRowSelection(combo?._id))}
        />
      ),
    },
    {
      header: "Image",
      accessor: (combo) => (
        <div className="flex items-center justify-center">
          <img
            src={`${baseImgUrl}/${combo?.image}`}
            className="h-20 w-20 object-cover"
          />
        </div>
      ),
    },
    {
      header: "Name",
      accessor: (Combo) => <p>{Combo?.name?.toUpperCase()}</p>,
    },
    { header: "Description", accessor: (Combo) => <p>{Combo?.extra}</p> },
    { header: "Amount", accessor: (Combo) => <p>Rs. {Combo?.amount}</p> },
    {
      header: "Actions",
      accessor: (combo) => (
        <Action
          width={55}
          onDelete={() => handleDelete(combo)}
          onViewDetails={() => handleView(combo)}
          onEdit={() => handleEdit(combo)}
        />
      ),
    },
  ];
  return (
    <>
      <>
        <Dashboard_Layout
          button={true}
          buttonText="Add Combo"
          btnPath="/dashboard/kitchen/combo-offer/add"
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
            api="combo-offers/delete/many"
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Dashboard_Layout>
      </>
    </>
  );
}
