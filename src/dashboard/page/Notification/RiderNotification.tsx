import { useEffect, useState } from "react";
import { Dashboard_Layout } from "@/layout";
import { Spinner, TextEditor } from "@/common";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";

export default function CustomerNotification() {
  const { loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { token } = useAppSelector((state: RootState) => state.signin);

  const dispatch = useAppDispatch();

  const [form, setForm] = useState<any>({
    title: "",
    description: ""
  });

  useEffect(() => {
    dispatch(
      fetchDashboardData({ api: "customer/notification", token: token! })
    );
  }, [dispatch, token]);

  return (
    <>
      <>
        <Dashboard_Layout button={false}>
          {loading ? (
            <Spinner />
          ) : (
              <>
                <EditInput
              label=""
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeH="Enter notification header"
                />
                <div className="mt-5"/>
                <TextEditor setForm={setForm} fieldName="description"/>
                <button className="bg-[#e01f2d]
          font-bold mt-7 border rounded px-8 text-center text-white h-[50px] -z-1"> Send notification </button>
              </>
          )}
        </Dashboard_Layout>
      </>
    </>
  );
}
