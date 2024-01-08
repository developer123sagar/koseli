import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchDashboardData,
  setCurrentPage,
  setSelectedItem,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { formatDate } from "@/helpers";
import { Action, AdvanceTable, Spinner } from "@/common";
import { AdvanceTbColumn, IFoodOrder } from "@/types";
import { Dashboard_Layout } from "@/layout";
import { useNavigate } from "react-router-dom";

export default function FoodNewOrder() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  const { token } = useAppSelector((state: RootState) => state.signin);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentPage(1));
    dispatch(fetchDashboardData({ api: "order/pending-order", token: token! }));
  }, [dispatch, token]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        menuRef.current &&
        target &&
        !menuRef.current.contains(target) &&
        !target.classList.contains("h-10")
      ) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);

  const handleEdit = (order: IFoodOrder) => {
    dispatch(setSelectedItem(order));
    navigate(`/dashboard/food/neworder/edit/${order?.orderId}`);
  };

  const handleView = (order: IFoodOrder) => {
    dispatch(setSelectedItem(order));
    navigate(`/dashboard/food/neworder/view/${order?.orderId}`);
  };

  const column: AdvanceTbColumn<IFoodOrder>[] = [
    {
      header: "order Id",
      accessor: (order) => <p className="text-xs">{order?.orderId}</p>,
    },
    {
      header: "User Name",
      accessor: (order) => <p>{order?.clientId?.name}</p>,
    },
    {
      header: "Price",
      accessor: (order) => <p>Rs. {order?.totalPrice}</p>,
    },

    {
      header: "Date",
      accessor: (order) => <p>{formatDate(order?.createdDateTime)}</p>,
    },
    {
      header: " Payment Mode",
      accessor: (order) => <p>{order?.paymentMode}</p>,
    },
    {
      header: " Payment Status",
      accessor: (order) => <p>{order?.paymentStatus}</p>,
    },
    {
      header: "Status",
      accessor: (order) => <p>{order?.status}</p>,
    },
    {
      header: "Action",
      accessor: (order) => (
        <Action
          hideDelete
          onEdit={() => handleEdit(order)}
          hideEdit={order.status === "ready"}
          onViewDetails={() => handleView(order)}
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
      </Dashboard_Layout>
    </>
  );
}
