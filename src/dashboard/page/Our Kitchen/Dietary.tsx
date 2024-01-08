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
import { AdvanceTbColumn, IDietary } from "@/types";
import { Dashboard_Layout } from "@/layout";
import { useNavigate } from "react-router-dom";
import DeleteModal from "@/dashboard/component/DeleteModal";
import { baseImgUrl } from "@/routes";

export default function Dietary() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { data, loading, selectedRows, allItemsSelected, selectedItem } =
    useAppSelector((state: RootState) => state.fetchDashData);

    console.log(data)

  const { token, role } = useAppSelector((state: RootState) => state.signin);
  const navigate = useNavigate();

  const handleView = (dietary: IDietary) => {
    dispatch(setSelectedItem(dietary));
    navigate(`/dashboard/kitchen/dietary/view/${dietary?.foodName}`);
  };

  const handleDelete = (dietary: IDietary) => {
    setIsModalOpen(true);
    dispatch(setSelectedItem(dietary));
  };

  const handleEdit = (dietary: IDietary) => {
    dispatch(setSelectedItem(dietary));
    navigate(`/dashboard/kitchen/dietary/edit/${dietary?.foodName}`);
    localStorage.setItem("desc", JSON.stringify(dietary?.extra || ""));
  };

  const handleDeleteRows = () => {
    if (selectedRows.length > 0) {
      dispatch(
        deleteDashData({
          api: "dietary-plan/delete/many",
          token: token!,
          ids: selectedRows,
        })
      );
    }
    dispatch(clearSelectedRows());
  };

  const column: AdvanceTbColumn<IDietary>[] = [
    {
      header: (
        <div className="relative">
          <input
            className="checkbox-animation w-5 h-6 cursor-pointer"
            type="checkbox"
            checked={allItemsSelected}
            onChange={() => dispatch(handleSelectAllRows(data))}
          />
          <p className="text-xl text-center font-bold">S.N.</p>
        </div>
      ),
      accessor: (dietary) => (
        <input
          className={`checkbox-animation w-5 h-5 cursor-pointer ${
            selectedRows.includes(dietary?._id || "") ? "checked" : ""
          }`}
          type="checkbox"
          checked={selectedRows.includes(dietary?._id || "")}
          onChange={() => dispatch(handleRowSelection(dietary?._id || ""))}
        />
      ),
    },
    {
      header: "Image",
      accessor: (Dietary) => (
        <div className="flex items-center justify-center">
          <img
            src={`${baseImgUrl}/${Dietary?.image}`}
            className="h-20 w-20 object-cover"
          />
        </div>
      ),
    },
    {
      header: "Food Name",
      accessor: (Dietary) => <p>{Dietary?.foodName?.toUpperCase()}</p>,
    },
    {
      header: "Deitary Plan",
      accessor: (Dietary) => <p>{Dietary?.dietaryPlan}</p>,
    },
    {
      header: "Calorie",
      accessor: (Dietary) => <p>{Dietary?.calorie}</p>,
    },
    {
      header: "Weight",
      accessor: (Dietary) => <p>{Dietary?.weight} gram</p>,
    },
    { header: "Description", accessor: (Dietary) => <p>{Dietary?.extra}</p> },
    {
      header: "Price",
      accessor: (Dietary) => <p>Rs. {Dietary?.price}</p>,
    },
    {
      header: "Food Making Time",
      accessor: (Dietary) => (
        <p>
          {Dietary?.dietaryMakingTimeinMinute
            ? `${Dietary?.dietaryMakingTimeinMinute} min`
            : "Not Available"}
        </p>
      ),
    },
    {
      header: "Actions",
      accessor: (dietary) => (
        <Action
          width={55}
          onViewDetails={() => handleView(dietary)}
          onDelete={() => handleDelete(dietary)}
          onEdit={() => handleEdit(dietary)}
        />
      ),
    },
  ];

  useEffect(() => {
    const restroId = localStorage.getItem("resAdminId") || "";
    console.log(restroId)
    dispatch(setCurrentPage(1));

    if (role === "restaurant" && restroId)
      dispatch(
        fetchDashboardData({
          api: `dietary-plan/restaurant-dietplan?restaurantId=${restroId}`,
          token: token!,
        })
      );
  }, [dispatch, token, role]);

  return (
    <>
        <Dashboard_Layout
          button={true}
          buttonText="Add Dietary Plan"
          btnPath="/dashboard/kitchen/dietary/add"
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
            api="dietary-plan/delete/many"
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            title={selectedItem?.dietaryPlan}
          />
        </Dashboard_Layout>
    </>
  );
}
