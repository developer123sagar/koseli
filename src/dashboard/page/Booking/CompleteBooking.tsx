import { AdvanceTable, Spinner } from "@/common";
import { Dashboard_Layout } from "@/layout";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { AdvanceTbColumn } from "@/types";
import { useEffect } from "react";
interface IBooking{

}

export default function CompleteBooking() {
   
      const dispatch = useAppDispatch();
      const {token} =useAppSelector((state:RootState)=>state.signin);
      useEffect(()=>{
        dispatch(fetchDashboardData({api:"bookingtable/admin",token:token!}))
      },[dispatch,token]);
     
    const { data, loading } = useAppSelector(
        (state: RootState) => state.fetchDashData
      );
      console.log(data);
      const column:AdvanceTbColumn<IBooking>[]=[
        {
        header:"",
        accessor:()=><p></p>,
      }
      ,];
  return (
    <>
      <Dashboard_Layout button={false}>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <AdvanceTable columns={column} data={data} />
        )}
      </Dashboard_Layout>
    </>
  )
}
