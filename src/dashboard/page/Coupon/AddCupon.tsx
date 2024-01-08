import axios from "axios";

import React, { FormEvent, useState } from "react";

import { RootState, useAppSelector } from "@/redux/store";
import { CuponForm } from "@/types";

import { url } from "@/routes";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { Spinner, TextEditor } from "@/common";
import { useNavigate } from "react-router-dom";
import { InputDate } from "@/common/InputDate";

const AddCupon = () => {
  const [loading, setLoading] = useState(false);

  const { token } = useAppSelector((state: RootState) => state.signin);
  const [form, setForm] = useState<CuponForm>({
    description: "",
    maxUsage: null,
    discount: null,
    name: "",
    status: "active",
    startDate: new Date(),
    endDate: new Date(),
  });

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
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(form);
    try {
      const res = await axios.post(`${url}/coupon/create`, form, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        navigate("/dashboard/cupon/code");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mt-12">
      <NameMark label="Add cupon details" variant="secondary" />
      <form className="mt-12 overflow-hidden">
        <div className="flex justify-between flex-wrap gap-y-4">
          <EditInput
            label="Discount on using cupon"
            type="number"
            onChange={(e) =>
              setForm({ ...form, discount: parseInt(e.target.value) })
            }
            placeH="Discount"
            min={1}
            value={form?.discount as number}
            basis={48}
          />

          <EditInput
            label="Cupon Max Usage"
            onChange={(e) =>
              setForm({ ...form, maxUsage: parseInt(e.target.value) })
            }
            placeH="Max usage"
            type="number"
            value={form?.maxUsage as number}
            basis={48}
          />

          <div className="w-full flex justify-between gap-10">
            <InputDate
              label="Start Date"
              name="startDate"
              value={form.startDate.toISOString().split("T")[0]}
              onChange={handleInputChange}
            />
            <InputDate
              label="End Date"
              name="endDate"
              value={form.endDate.toISOString().split("T")[0]}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="my-5">
          <label className="-mb-3 text-sm">Description</label>
          <TextEditor
            setForm={setForm}
            fieldName={"description"}
            height={400}
          />
        </div>

        <div className="w-full flex gap-10 justify-between">
          <div className="w-[48%]">
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
          <EditInput
            label="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeH="Enter Name"
            type="text"
            value={form?.name}
            basis={48}
          />
        </div>
        <div className="flex justify-end gap-4">
          <Buttons type="submit" onClick={handleFormSubmit}>
            {loading ? <Spinner btn /> : "Create"}
          </Buttons>
          <Buttons back variant="destructive">
            Cancel
          </Buttons>
        </div>
      </form>
    </main>
  );
};

export default AddCupon;
