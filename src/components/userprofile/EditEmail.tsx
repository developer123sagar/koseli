import Buttons from "@/common/Button";
import HeaderNoLocation from "@/pages/HeaderNoLocation";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { FormEvent, useState } from "react";

export default function EditEmail() {
  const { data } = useAppSelector((state: RootState) => state.fetchDashData);
  const { userToken } = useAppSelector((state: RootState) => state.signin);

  const dispatch = useAppDispatch();
  const handleUpdateForm = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(
      UpdateData({ api: "client/info", form: form, token: userToken! })
    );
  };
  const initialForm = {
    name: data?.email,
  };
  const [form, setForm] = useState(initialForm);
  return (
    <>
      <HeaderNoLocation />
      <div className="flex items-center h-[100vh] justify-center">
        <div className="">
          <h1 className="text-[40px] pt-4 w-96 rounded font-bold"> Email</h1>
          <p className="text-[20px] mb-3">Personalise your experience</p>
          <div>
            <div>
              <input
                type="email"
                name=""
                id=""
                value={form.name}
                onChange={(e) => setForm({ ...FormData, name: e.target })}
                className="border bg-gray-100 w-96 px-10  font-bold text-center text-[28px] p-3 text-black rounded"
              />
              <br />
              <Buttons type="submit" onClick={handleUpdateForm}>
                Update
              </Buttons>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
