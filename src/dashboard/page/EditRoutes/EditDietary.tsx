import { Spinner, TextEditor, Upload } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { dietOptions } from "@/constants";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { IDietary } from "@/types";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditDietary = () => {
  const selectedItem: IDietary = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );

  const { loading } = useAppSelector((state: RootState) => state.fetchDashData);
  const { token } = useAppSelector((state: RootState) => state.signin);
  const [form, setForm] = useState(selectedItem || {});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUpdateForm = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(
      UpdateData({ api: "dietary-plan", form: form, token: token! })
    );
    navigate("/dashboard/kitchen/dietary");
  };

  const desc = localStorage.getItem("desc") || "";
  const cleanedDesc = desc.replace(/^"|"$/g, "");

  return (
    <>
      <NameMark label="Edit Deitry Details" variant="primary" />

      <form className="mt-6">
        <div className="flex gap-8 flex-wrap justify-between">
          <EditInput
            label="Food Name"
            basis={48}
            value={form?.foodName}
            onChange={(e) => setForm({ ...form, foodName: e.target.value })}
            placeH="Enter Food name"
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
            label="Weight (in gm)"
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
        <label className="text-[black] font-semibold text-[14px]">
          Description
        </label>
        <TextEditor
          setForm={setForm}
          fieldName="extra"
          existingDescription={cleanedDesc}
        />
        <div className="my-6">
          <label className="mb-2.5 block text-black">Dietary Image</label>
          <div className="flex gap-2">
            <Upload
              accept=".jpg,.png,.svg,.jpeg"
              imgTitle="dietary"
              setForm={setForm}
              fieldName="image"
              existingImg={[form?.image]}
            />
          </div>
        </div>
        <Buttons
          type="submit"
          onClick={handleUpdateForm}
          className="float-right"
        >
          {loading ? <Spinner btn /> : "Update"}
        </Buttons>
      </form>
    </>
  );
};

export default EditDietary;
