import { useEffect } from "react";
import { RootState, useAppSelector } from "@/redux/store";
import { useAppDispatch } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { url } from "@/routes";

import DashboardHome from "./DashboardHome";
import axios from "axios";

export default function Dashboard() {
  const { token, role } = useAppSelector((state: RootState) => state.signin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCheckAuthorize = async () => {
      try {
        const res = await axios.get(`${url}/saas-Subscriber/authorization`, {
          headers: {
            Authorization: token,
          },
        });
        if (res.data?.message === "allow") {
          localStorage.setItem("authorized", String(true));
        } else {
          localStorage.setItem("authorized", String(false));
        }
        return res.data?.message;
      } catch (err) {
        localStorage.setItem("authorized", String(false));
      }
    };
    if (role === "restaurant") {
      handleCheckAuthorize();
    }
    if (role === "admin") {
      localStorage.setItem("authorized", String(true));
    }
  }, [role, token, navigate,dispatch]);

  useEffect(() => {
    dispatch(fetchDashboardData({ api: "order/pending-order", token: token! }));
  }, [dispatch, token]);

  return (
    <>
      <div className="dashboardHome pt-20 flex-1 ml-0">
          <DashboardHome />
        </div>
    </>
  );
}
