import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
import {
  fetchDashboardData,
  setCurrentPage,
  setSelectedItem,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { AdvanceTbColumn, IBookedTable, IBooking } from "@/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NewBooking() {
  const { loading } = useAppSelector((state: RootState) => state.fetchDashData);
  const data: IBooking = useAppSelector(
    (state: RootState) => state.fetchDashData.data
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token, role } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    dispatch(setCurrentPage(1));

    if (role === "admin" || role === "restaurant") {
      dispatch(
        fetchDashboardData({ api: "bookingtable/admin", token: token! })
      );
    }
  }, [dispatch, token, role]);

  const handleView = (book: IBookedTable) => {
    dispatch(setSelectedItem(book));
    navigate(`/dashboard/booking/view/${book?.BookingId}`);
  };

  const column: AdvanceTbColumn<IBookedTable>[] = [
    {
      header: "Client Name",
      accessor: (book) => <p>{book?.clientName}</p>,
    },
    {
      header: "Client Email",
      accessor: (book) => <p>{book?.email}</p>,
    },
    {
      header: "Client phone",
      accessor: (book) => <p>{book?.phone}</p>,
    },
    {
      header: "Booked Table",
      accessor: (book) => <p>{book?.tableNo}</p>,
    },
    {
      header: "Time",
      accessor: (book) => <p>{book?.duration}</p>,
    },
    {
      header: "Amount",
      accessor: (book) => <p>Rs. {book?.amount}</p>,
    },
    {
      header: "Pay With",
      accessor: (book) => <p>{book?.paymentMode}</p>,
    },
    {
      header: "Action",
      accessor: (book) => (
        <Action
          // onDelete={() => handleDelete(book)}
          onViewDetails={() => handleView(book)}
          hideEdit
        />
      ),
    },
  ];

  return (
    <>
      <Dashboard_Layout button={false} isDeleteBtn={false}>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <AdvanceTable columns={column} data={data?.bookedTable} />
        )}
      </Dashboard_Layout>
    </>
  );
}
