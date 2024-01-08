import { useEffect } from "react";
import Dashboard_Layout from "@/layout/Design_Dashoard";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";

export default function Cancelled() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    dispatch(fetchDashboardData({ api: "ride/cancelled", token: token! }));
  }, [dispatch, token]);

  return (
    <Dashboard_Layout
        button={true}
        buttonText="Add Rides"
        btnPath="/dashboard"
      >
        <div></div>
      </Dashboard_Layout>
  );
}
