import axios from "axios";

import { FormEvent, useState } from "react";
import { url } from "@/routes";
import { RootState, useAppSelector } from "@/redux/store";
import { Spinner, TextEditor, Upload } from "@/common";
import { useNavigate } from "react-router-dom";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { IDietary } from "@/types";
import { dietOptions } from "@/constants";

export default function AddDietary() {
  const [form, setForm] = useState<IDietary>({
    dietaryPlan: "Mediterranean Diet",
    calorie: null,
    extra: "",
    foodName: "",
    isHalalCertified: false,
    image: "",
    price: null,
    weight: null,
    dietaryMakingTimeinMinute: null,
  });

  const { token } = useAppSelector((state: RootState) => state.signin);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/dietary-plan`, form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (res.status === 200) navigate("/dashboard/kitchen/dietary");
    } catch (error) {
      console.error("an error occured during submitting form", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(form);
  return (
    <>
      <div className="mt-16">
          <NameMark label="Add Dietary Plan" variant="primary" />
          <form onSubmit={handleFormSubmit}>
            <div className="flex gap-8 flex-wrap justify-between mt-6">
              <EditInput
                label="Food Name"
                placeH="Enter Food Name"
                basis={48}
                value={form?.foodName}
                onChange={(e) => setForm({ ...form, foodName: e.target.value })}
              />
              <EditInput
                label="Calorie"
                placeH="Enter Calorie"
                basis={48}
                min={1}
                type="number"
                value={form?.calorie as number}
                onChange={(e) =>
                  setForm({ ...form, calorie: parseInt(e.target.value) })
                }
              />
              <EditInput
                label="Weight (gm)"
                placeH="Enter Weight"
                basis={48}
                type="number"
                min={1}
                value={form?.weight as number}
                onChange={(e) =>
                  setForm({ ...form, weight: parseInt(e.target.value) })
                }
              />
              <EditInput
                label="Price"
                placeH="Enter Price"
                basis={48}
                type="number"
                min={1}
                value={form?.price as number}
                onChange={(e) =>
                  setForm({ ...form, price: parseInt(e.target.value) })
                }
              />
              <EditInput
                label="Dietary Making Time"
                placeH="Enter Making Time"
                basis={48}
                type="number"
                min={1}
                value={form?.dietaryMakingTimeinMinute as number}
                onChange={(e) =>
                  setForm({
                    ...form,
                    dietaryMakingTimeinMinute: parseInt(e.target.value),
                  })
                }
              />
              <div className="basis-[48%]">
                <h1 className={`text-[black] font-semibold`}>
                  Select Deitary Plan
                </h1>
                <select
                  id="foodGroupSelect"
                  className={`form-control text-sm w-full py-3 pl-1 rounded placeholder:text-gray-500 border-gray-200 border-[1.5px] border-stroke`}
                  onChange={(e) =>
                    setForm({ ...form, dietaryPlan: e.target.value })
                  }
                  value={form?.dietaryPlan}
                >
                  {dietOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="my-5">
              <h1 className={`text-[black] font-semibold`}>Description</h1>
              <TextEditor setForm={setForm} fieldName={"extra"} />
            </div>
            <div className="flex flex-wrap gap-4 w-full">
              <div className="basis-[30%]">
                <h1 className={`text-black font-semibold`}>Deitary Image</h1>
                <div>
                  <Upload
                    fieldName="image"
                    imgTitle="dietary"
                    setForm={setForm}
                    accept=".jpg,.png,.svg"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-10 mb-2">
              <Buttons type="submit">
                {loading ? <Spinner btn /> : "Create"}
              </Buttons>
              <Buttons back variant="destructive">
                Cancel
              </Buttons>
            </div>
          </form>
        </div>
    </>
  );
}
