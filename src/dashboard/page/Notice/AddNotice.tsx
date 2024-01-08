/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { IRestaurant } from "@/types";
import { Spinner, TextEditor, Upload } from "@/common";
import { url } from "@/routes";
import { useState, useEffect, FormEvent } from "react";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { useNavigate } from "react-router-dom";

export default function AddNotice() {
  const data: IRestaurant[] = useAppSelector(
    (state: RootState) => state.fetchDashData.data
  );
  const [loading, setLoading] = useState(false);

  const initialFormState = {
    noticetitle: "",
    restaurantId: "",
    Detail: "",
    image: [],
  };
  const [form, setForm] = useState(initialFormState);
  const { token } = useAppSelector((state: RootState) => state.signin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log(form);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = {
        ...form,
        ...(form.restaurantId === "" && { restaurantId: undefined }),
      };
      console.log(formData);
      const res = await axios.post(`${url}/notice`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (res.status === 200) {
        navigate("/dashboard/notice");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchDashboardData({ api: "restaurant" }));
  }, [dispatch]);

  return (
    <>
      <>
        <main className="mt-16">
          <NameMark label="Add Notice" variant="primary" />
          <form className="mt-10">
            <div className="flex items-center justify-between flex-wrap gap-10">
              <EditInput
                basis={48}
                label="Notice Title"
                placeH="Enter Notice Title"
                value={form?.noticetitle}
                onChange={(e) =>
                  setForm({ ...form, noticetitle: e.target.value })
                }
              />
              <div className="basis-[48%] relative flex flex-col">
                <label className="font-semibold text-black">Restaturant</label>
                <select
                  className="py-3 border border-gray-200 mt-2 text-gray-400 form-control"
                  value={form.restaurantId}
                  onChange={(e) =>
                    setForm({ ...form, restaurantId: e.target.value })
                  }
                >
                  <option value={""} className="form-control"></option>
                  {Array.isArray(data) &&
                    data.length > 0 &&
                    data.map((item, id) => (
                      <>
                        <option
                          key={item._id + id}
                          value={item._id}
                          className="form-control"
                        >
                          {item.name}
                        </option>
                      </>
                    ))}
                </select>
              </div>
            </div>
            <div className="my-10">
              <label className="text-[black] font-semibold text-[14px]">
                Details
              </label>
              <TextEditor setForm={setForm} fieldName="Detail" />
            </div>
            <div className="flex justify-between ">
              <div className="mt-6">
                <div className="bg-[#ededed] h-[2px] w-full mt-[30px] mb-6">
                  <span className="relative -top-[20px] inline-block py-[10px] text-sm font-semibold text-black mb-2">
                    Notice Images ?
                  </span>
                </div>
                <Upload
                  setForm={setForm}
                  accept=".jpg, .jpeg, .png"
                  fieldName="image"
                  imgTitle="notice"
                  multiple
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-10 mb-2">
              <Buttons type="button" onClick={handleFormSubmit}>
                {loading ? <Spinner btn /> : "Create"}
              </Buttons>
              <Buttons back type="button" variant="destructive">
                Cancel
              </Buttons>
            </div>
          </form>
        </main>
      </>
    </>
  );
}
