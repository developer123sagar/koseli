/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdvanceTbColumn } from "@/types";
import { Pagination } from ".";
import { RootState, useAppSelector } from "@/redux/store";

interface TableProps<T> {
  columns: AdvanceTbColumn<T>[] | any[];
  data: T[];
}

function AdvanceTable<T>({ columns, data }: TableProps<T>) {
  // const cellWidth = `${100 / columns.length}%`;
  const { limit, currentPage } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  console.log(data)

  const displayedData =
    data &&
    Array.isArray(data) &&
    data.length > 0 &&
    data?.slice(startIndex, endIndex);
  const totalData = data?.length;

  return (
    <div className="p-6 bg-white w-full">
      <div className="overflow-auto">
        <table className="pt-6 pb-2.5 sm:px-7.5 xl:pb-1 text-center overflow-x-scroll scrollbar-hide w-full">
          <thead>
            <tr>
              {columns?.map((column, index) => (
                <th
                  key={index}
                  style={{ width: column.width || "auto" }}
                  className="py-6 px-3 font-bold truncate whitespace-nowrap pointer mx-auto bg-gray-100 bg-opacity-50 uppercase xsm:text-base text-gray-800 border border-gray-200 text-center"
                >
                  <p className="text-[13px] text-center font-bold">
                    {column.header}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 border border-gray-200">
            {Array.isArray(displayedData) && displayedData.length > 0 ? (
              displayedData.map((item, rowIndex) => (
                <tr
                  className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-white"}`}
                  key={rowIndex}
                  style={{ margin: "0 auto" }}
                >
                  {columns?.map((column, colIndex) => {
                    const cellData = column.accessor(item);
                    const renderedData = column.render
                      ? column.render(cellData)
                      : cellData;
                    const textColor =
                      colIndex === 4 ? "text-red-600" : "text-black";
                    const textColor1 =
                      colIndex === 2 ? "text-cyan-600" : "text-black";
                    const textColor2 =
                      colIndex === 0 ? "text-amber-600" : "text-black";
                    const textColor3 =
                      colIndex === 6 ? "text-green-600" : "text-black";
                    return (
                      <td
                        key={colIndex}
                        style={{
                          width: column.width || "auto",
                          margin: "0 auto",
                        }}
                        className={`py-6 text-[14px] font-semibold px-3 whitespace-normal max-h-[100px] text-center border border-gray-200 ${textColor} ${textColor1} ${textColor2} ${textColor3} `}
                      >
                        {renderedData}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr className="text-center pt-20">
                <td className="text-center pt-5 pb-5" colSpan={columns.length}>
                  No data present
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {totalData > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(data?.length / limit)}
            startIndex={startIndex}
            endIndex={endIndex}
            totalData={totalData}
          />
        )}
      </div>
    </div>
  );
}

export default AdvanceTable;
