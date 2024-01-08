import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import {
  fetchDashboardData,
  setCurrentPage,
  setSelectedItem,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { AdvanceTbColumn, ICustomer } from "@/types";
import { Action, AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
import { formatDate } from "@/helpers";
import DeleteModal from "@/dashboard/component/DeleteModal";
import { useNavigate } from "react-router-dom";

export default function CustomerList() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { token } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    dispatch(setCurrentPage(1));

    dispatch(fetchDashboardData({ api: "client/list", token: token! }));
  }, [dispatch, token]);

  const navigate = useNavigate();

  const handleView = (customer: ICustomer) => {
    dispatch(setSelectedItem(customer));
    navigate(`/dashboard/customer_list/view/${customer?.name}`);
  };

  const column: AdvanceTbColumn<ICustomer>[] = [
    {
      header: "Name",
      accessor: (customer) => <p>{customer?.name?.toUpperCase()}</p>,
    },
    { header: "Email", accessor: (customer) => <p>{customer?.email}</p> },
    {
      header: "Joined Date",
      accessor: (customer) => <p>{formatDate(customer?.joinDate)}</p>,
    },
    {
      header: "Is verified",
      accessor: (customer) => <p>{customer?.verificationStatus}</p>,
    },
    {
      header: "Actions",
      accessor: (customer) => (
        <Action
          width={55}
          onViewDetails={() => handleView(customer)}
          hideDelete
          hideEdit
        />
      ),
    },
  ];

  return (
    <>
       <Dashboard_Layout isDeleteBtn={false}>
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <AdvanceTable columns={column} data={data} />
          )}
          <DeleteModal
            api="client/delete/many"
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Dashboard_Layout>
    </>
  );
}
