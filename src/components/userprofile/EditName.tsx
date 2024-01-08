import Buttons from "@/common/Button";
import HeaderNoLocation from "@/pages/HeaderNoLocation";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { FormEvent, useState } from "react";

export default function EditName() {
  const { data } = useAppSelector((state: RootState) => state.fetchDashData);
  const { userToken } = useAppSelector((state: RootState) => state.signin);

  const dispatch = useAppDispatch();
  
  const handleUpdateForm = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(
      UpdateData({ api: "client/edit", form: form, token: userToken! })
    );
  };

  const InitialForm = {
    name: data?.name,
  };
  const [form, setForm] = useState(InitialForm);
  return (
    <>
      <HeaderNoLocation  />
      <div className=" w-[50%]  admin-header p-3 flex my-auto mt-40 mx-auto">
        <form className="mx-20 mb-20 mt-10 ">
          <div>
            <h1 className="text-[40px] pt-4 w-96 rounded font-bold">Name</h1>
            <p className="text-[24px] mb-2 text-justify">
              This is the name you would like other people to use when referring
              to you
            </p>
            <label htmlFor="" className="text-[28px] mb-2 font-semibold">
              First Name
            </label>
            <br />
            <input
              type="text"
              className="form-control form-control text-sm w-[50%] bg-slate-50 py-3 pl-1 focus:outline-none rounded placeholder:text-gray-400/50 border border-gray-200 my-1 "
              value={form?.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <br />
          </div>
          <div className="mt-10 ">
            <Buttons type="submit" onClick={handleUpdateForm}>
              Update
            </Buttons>
          </div>
        </form>
      </div>
    </>
  );
}
