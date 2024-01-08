import { TableColumn } from "@/types";
import { ReactNode } from "react";

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}

function DynamicTable<T>({ columns, data }: TableProps<T>) {
  return (
    <table className="w-full divide-y">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              className="text-left py-3 text-sm font-semibold text-gray-800 px-1 w-52"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {Array.isArray(data) && data.length > 0
          ? data.map((item, rowIndex) => (
              <tr
                className={`${
                  rowIndex % 2 == 0 ? "bg-gray-100/50" : "bg-gray-200/70"
                }`}
                key={rowIndex}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="py-2 text-[12px] font-semibold text-gray-500 whitespace-nowrap text-left px-1 w-52"
                  >
                    {column.render
                      ? column.render(item[column.accessor])
                      : (item[column.accessor] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          : "No data"}
      </tbody>
    </table>
  );
}

export default DynamicTable;
