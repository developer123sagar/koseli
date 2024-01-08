import Buttons from "@/common/Button";
import {changeRestPassword } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { fetchRestroInfo } from "@/redux/restaurant/restaurantSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { FormEvent, useEffect, useState } from "react";

export default function ManageRestroProfile() {
  const dispatch = useAppDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [reCurrentPassword, setReCurrentPassword] = useState("");
  const [label, setLabel] = useState("");
  const { passwordChangeRes } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const {restpassword} =useAppSelector((state:RootState)=>state.fetchDashData)
  const updatePassword = async (e: FormEvent, data: any) => {
    console.log(data)
    e.preventDefault();
    await dispatch(changeRestPassword({ token: token, data }));
  };

  useEffect(() => {
    if (passwordChangeRes.message) setLabel(passwordChangeRes.message);
  }, [passwordChangeRes]);

  const token = useAppSelector((state: RootState) => state.signin.token);
  const data = useAppSelector(
    (state: RootState) => state.restaurant.restadminInfo
  );
  useEffect(() => {
    dispatch(fetchRestroInfo(token));
  }, [dispatch, token]);
  return (
   
    <div className="h-[100vh]  fixed ">
        <div className=" flex  w-full items-center pl-10 pt-10  bg-white">
          <div className="flex gap-10  mb-3">
            <div className="p-7  pr-20 ">
              <h1 className="text-[20px]  font-bold text-center mb-6">
                View Profile
              </h1>
              <div className="relative w-full ">
                <img
                  src={`${baseImgUrl}/${data.mainImage}`}
                  alt="Main Image"
                  className="w-[40rem] h-96 object-cover"
                />
                <div className="h-10 flex  items-center justify-center   ">
                  <div className="absolute bottom-0 h-28 w-28  rounded-full bg-opacity-40 bg-white  border-4  flex justify-center">
                    <img
                      src={`${baseImgUrl}/${data.logo}`}
                      alt="Logo"
                      className="  h-full w-full rounded-full   object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center w-full  items-center flex-col gap-2">
                <div className="  flex gap-5 ">
                  <h1 className="font-extrabold text-3xl text-red-600">
                    {data.name}
                  </h1>
                </div>

                <div className="text-xl font-semibold">{data.email}</div>

                <h1 className="text-xl font-normal">{data.phoneNumber}</h1>
              </div>
            </div>
          </div>
          <div>
          <h5 className="text-[#e01f2d] mt-5"> {label} </h5>
         
          <div className="admin-header  p-7">
        
            <div >
              <h1 className="text-[20px] text-center font-bold mb-5 ">CHANGE PASSWORD</h1>
              <div className="  flex  items-center gap-[65px]">
                <h1 className="text-[15px] font-bold text-[#000000] ">
                  Current Password:
                </h1>
                <input
                  type="password"
                  value={oldPassword}
                  className="h-[50px] border-2 border-[rgb(230,230,230)] pl-3"
                  onChange={(e)=>setOldPassword(e.target.value)}
                />
              </div>
              <div className="  flex items-center gap-[86px] mt-3 ">
                <h1 className="text-[15px] font-bold text-[#000000] ">
                  New Password:
                </h1>
                <input
                  type="password"
                  value={currentPassword}
                  className="h-[50px] border-2 border-[rgb(230,230,230)] pl-3"
                  onChange={(e)=>setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="  flex items-center gap-[22px] mt-3">
                <h1 className="text-[15px] font-bold text-[#000000] ">
                  Re-enter new Password:
                </h1>
                <input
                value={reCurrentPassword}
                  type="password"
                  className="h-[50px] border-2 border-[rgb(230,230,230)] pl-3"
                  onChange={(e)=>setReCurrentPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-center mt-4">
        
              <Buttons onClick={(e)=>{
                const data={
                        oldPassword: oldPassword,
                        newPassword: currentPassword,
                        confirmPassword: reCurrentPassword,   
                };
               updatePassword(e,data);
              }}>
               updatePassword{""}
              </Buttons>
             
              </div>
              <h1 className="mt-4 text-center">{restpassword.message}addd</h1>
            </div>
          </div>
          </div>
        </div>
      </div>
  
  );
}
