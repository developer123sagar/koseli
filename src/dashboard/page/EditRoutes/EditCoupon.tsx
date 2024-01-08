/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spinner, TextEditor } from "@/common";
import Buttons from "@/common/Button";
import { InputDate } from "@/common/InputDate";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import {
  UpdateData,
  fetchDashboardData,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { ICoupon, IFoodItem } from "@/types";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditCoupon = () => {
  const data: IFoodItem[] = useAppSelector(
    (state: RootState) => state.fetchDashData.data
  );

  const selectedItem: ICoupon = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );

  const { loading } = useAppSelector((state: RootState) => state.fetchDashData);
  const { token } = useAppSelector((state: RootState) => state.signin);
  const [form, setForm] = useState(selectedItem || {});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "startDate" || name === "endDate") {
      const selectedDate = new Date(value);
      setForm((prevForm) => ({
        ...prevForm,
        [name]: selectedDate,
      }));
    } else if (name === "foodId") {
      setForm((prevForm) => ({
        ...prevForm,
        foodId: value,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    dispatch(fetchDashboardData({ api: "food/restaurant", token: token! }));
  }, [dispatch, token]);

  const handleUpdateForm = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(
      UpdateData({
        api: `coupon/update/${form._id}`,
        form: form,
        token: token!,
      })
    );
    localStorage.removeItem("desc");

    navigate("/dashboard/cupon/code");
  };

  const desc = localStorage.getItem("desc") || "";
  const cleanedDesc = desc.replace(/^"|"$/g, "");

  return (
    <div className="mt-16">
        <NameMark label="Edit Cupon Details" variant="primary" />

        <form className="mt-12 overflow-hidden">
          <div className="flex justify-between flex-wrap gap-y-4">
            <EditInput
              label="Discount on using cupon"
              onChange={(e) =>
                setForm({ ...form, discount: parseInt(e.target.value) })
              }
              placeH="Discount"
              min={1}
              value={form?.discount || (0 as number)}
              basis={48}
            />

            <EditInput
              label="Cupon Max Usage"
              onChange={(e) =>
                setForm({ ...form, maxUsage: parseInt(e.target.value) })
              }
              placeH="Max usage"
              type="text"
              value={form?.maxUsage || (0 as number)}
              basis={48}
            />

            <div className="w-full flex justify-between gap-10">
              <InputDate
                label="Start Date"
                name="startDate"
                value={new Date(form?.startDate) as any}
                onChange={handleInputChange}
              />
              <InputDate
                label="End Date"
                name="endDate"
                value={new Date(form?.endDate) as any}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="my-10">
            <label className="text-[black] font-semibold text-[14px]">
              Description
            </label>
            <TextEditor
              existingDescription={cleanedDesc}
              setForm={setForm}
              fieldName="description"
            />
          </div>

          <div className="w-full flex gap-10 justify-between">
            <div className="w-[40%]">
              <h1 className={`text-[black] font-semibold text-[14px] mb-2`}>
                Food
              </h1>
              <select
                name="foodId"
                value={form.foodId || ""}
                onChange={(e) => handleInputChange(e)}
                className={`form-control text-sm w-full py-3 pl-1 rounded placeholder:text-gray-500 border border-gray-200 my-1`}
              >
                {Array.isArray(data) &&
                  data.length > 0 &&
                  data.map((item) => (
                    <option key={`${item._id}`} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-[40%]">
              <h1 className={`text-[black] font-semibold text-[14px] mb-2`}>
                Status
              </h1>
              <select
                value={form.status}
                onChange={(e) => handleInputChange(e)}
                name="status"
                id="status"
                className="form-control w-full text-sm py-3 pl-1 rounded placeholder:text-gray-500 border border-gray-200 my-1"
              >
                <option value="active">Active</option>
                <option value="inactive">InActive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Buttons type="submit" onClick={handleUpdateForm}>
              {loading ? <Spinner btn /> : "Update"}
            </Buttons>
            <Buttons back variant="destructive">
              Cancel
            </Buttons>
          </div>
        </form>
      </div>
  );
};

export default EditCoupon;
