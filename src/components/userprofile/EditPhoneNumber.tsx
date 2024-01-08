import Buttons from "@/common/Button";
import HeaderNoLocation from "@/pages/HeaderNoLocation";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { FormEvent, useState } from "react";

export default function EditPhoneNumber() {
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
    phone: data?.phone,
  };
  const [form, setForm] = useState(InitialForm);
  return (
    <>
      <HeaderNoLocation />
      <div className="flex items-center h-[100vh] justify-center">
        <div className="">
          <h1 className="text-[40px] pt-4 w-96 rounded font-bold">
            {" "}
            Phone Number
          </h1>
          <p className="text-[20px] mb-3">Personalise your experience</p>
          <form>
            <div>
              <input
                type="number"
                name=""
                id=""
                value={form?.phone}
                onChange={(e) => setForm({ ...FormData, phone: e.target.value })}
                className="border bg-gray-100 w-96 px-10  font-bold text-center text-[28px] p-3 text-black rounded"
              />
              <h1 className="text-[20px] mt-3">
                A verification code will be sent to this number
              </h1>
              <Buttons onClick={handleUpdateForm} type="submit">
                Update
              </Buttons>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
