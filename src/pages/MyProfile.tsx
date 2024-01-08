import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";


export default function MyProfile() {
    const { userToken } = useAppSelector((state: RootState) => state.signin);
    const { data } = useAppSelector((state: RootState) => state.fetchDashData);
  
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(fetchDashboardData({ api: "client/info", token: userToken! }));
    }, [dispatch, userToken]);
    console.log(data);
    
  return (
   <>
 
   <div className=" flex  w-full items-center   fixed justify-center h-full ">
   <main className=" ">
          <div className=" flex  justify-between    ">
            <h1 className="text-black font-bold text-center  mx-auto text-2xl">My Profile</h1>
            <button className="bg-blue-300 font-bold  rounded-full py-2 px-8 text-center text-black">Edit</button>
          </div>
          <div>
         
          </div>
          <div className=" flex items-center justify-center ">
          <ul className="text-black w-[36rem]  admin-header  m-10 p-4    ">
          
 
          <li className="flex justify-between flex-col mb-3 with-vertical-line   h-16">
              <h1 className="font-bold text-lg ">Name: </h1>
              <h2 className="font-semibold text-gray-500">{data?.name}</h2>
            </li>
            <li className="flex justify-between flex-col mb-3 with-vertical-line  h-16">
              <h1 className="font-bold text-lg ">Phone: </h1>
              <h2 className="font-semibold text-gray-500">{data?.phone}</h2>
            </li>
   
            <li className="flex justify-between flex-col mb-3 with-vertical-line  h-16">
              <h1 className="font-bold text-lg">Email: </h1>
              <h2 className="font-semibold text-gray-500">{data?.email}</h2>
            </li>

          </ul>
          </div>
        </main>
   </div>
   
   </>
  )
}
