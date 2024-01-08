import { setCurrentPage } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { useAppDispatch } from "@/redux/store";
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalData: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalData,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center p-4 border-[1px] shadow-slate-300 border-gray-200">
      <ul className="flex gap-2 w-full items-center">
        <li className="text-sm font-serif">Current Page:</li>
        <li className="py-1 px-4 bg-gray-100 rounded text-rose-600 font-bold">
          {currentPage}
        </li>
      </ul>
      <div className="flex items-center justify-end w-full">
        <button
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="mr-2 px-3 py-1 bg-gray-100 rounded disabled:cursor-not-allowed"
        >
          <FiChevronLeft size={30} className="text-sky-500" />
        </button>
        <div className="text-purple-500 text-[13px] mr-2 font-bold">
          {startIndex + 1} - {currentPage === totalPages ? totalData : endIndex} of {totalData}
        </div>
        <button
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 bg-gray-100 rounded disabled:cursor-not-allowed`}
        >
          <FiChevronRight size={30} className="text-sky-500" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
