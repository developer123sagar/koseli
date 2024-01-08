import { useEffect, useState } from "react";
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
import { AdvanceTbColumn, IBlog } from "@/types";
import { Dashboard_Layout } from "@/layout";
import { baseImgUrl } from "@/routes";
import DeleteModal from "@/dashboard/component/DeleteModal";
import { useNavigate } from "react-router-dom";
import { truncateString } from "@/helpers";

export default function ActiveBlog() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, loading, selectedRows, selectedItem, allItemsSelected } =
    useAppSelector((state: RootState) => state.fetchDashData);

  const { token } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(fetchDashboardData({ api: "blogs/active" }));
  }, [dispatch]);

  const handleDelete = (blog: IBlog) => {
    setIsModalOpen(true);
    dispatch(setSelectedItem(blog));
  };

  const handleView = (blog: IBlog) => {
    dispatch(setSelectedItem(blog));
    navigate(`/dashboard/blog/view/${blog?.title}`);
  };

  const handleEdit = (blog: IBlog) => {
    dispatch(setSelectedItem(blog));
    navigate(`/dashboard/blog/edit/${blog?.title}`);
    localStorage.setItem(
      "desc",
      JSON.stringify(blog?.metaDescription?.name || "")
    );
    localStorage.setItem("desc2", JSON.stringify(blog?.description || ""));
  };

  const handleDeleteRows = () => {
    if (selectedRows.length > 0) {
      dispatch(
        deleteDashData({
          api: "blogs/delete/many",
          token: token!,
          ids: selectedRows,
        })
      );
    }
    dispatch(clearSelectedRows());
  };

  const column: AdvanceTbColumn<IBlog>[] = [
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
      accessor: (blog) => (
        <input
          style={{ width: "40px" }}
          className={`checkbox-animation w-5 h-5 cursor-pointer ${
            selectedRows.includes(blog?._id || "") ? "checked" : ""
          }`}
          type="checkbox"
          checked={selectedRows.includes(blog?._id || "")}
          onChange={() => dispatch(handleRowSelection(blog?._id || ""))}
        />
      ),
    },
    {
      header: "Images",
      accessor: (blog) => (
        <div className="flex items-center justify-center">
          <img
            src={`${baseImgUrl}/${blog?.images}`}
            className="h-20 w-20 object-cover rounded-md"
          />
        </div>
      ),
    },
    {
      header: "Title",
      accessor: (blog) => <p>{blog?.title?.toUpperCase()}</p>,
    },
    {
      header: "Description",
      accessor: (blog) => (
        <p className="w-[200px] overflow-auto scrollbar-hide">
          {truncateString(blog?.description, 80)}
        </p>
      ),
    },
    {
      header: "Extra",
      accessor: (blog) => <p> {blog?.category} </p>,
    },
    {
      header: "Action",
      accessor: (blog) => (
        <Action
          onDelete={() => handleDelete(blog)}
          onViewDetails={() => handleView(blog)}
          onEdit={() => handleEdit(blog)}
        />
      ),
    },
  ];

  return (
    <>
      <Dashboard_Layout
        button={true}
        buttonText="Add Blog"
        btnPath="/dashboard/blog/add_new"
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
          api="blogs/delete/many"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={selectedItem?.title}
        />
      </Dashboard_Layout>
    </>
  );
}
