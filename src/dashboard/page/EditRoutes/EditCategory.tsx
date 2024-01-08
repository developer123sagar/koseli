import { FormEvent, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { IFoodCategory } from "@/types";
import { Spinner, TextEditor, Upload } from "@/common";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { useNavigate } from "react-router-dom";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import Buttons from "@/common/Button";

const EditCategory = () => {
  const selectedItem: IFoodCategory = useAppSelector(
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
      UpdateData({ api: "food-category", form: form, token: token! })
    );
    localStorage.removeItem("desc");
    navigate("/dashboard/kitchen/category");
  };

  const desc = localStorage.getItem("desc") || "";
  const cleanedDesc = desc.replace(/^"|"$/g, "");

  return (
    <div className="mt-16">
        <NameMark label="Edit Category Details" variant="primary" />
        <form className="w-[1000px] overflow-hidden">
          <EditInput
            label="Category Name"
            value={form?.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeH="Enter category name"
          />
          <div className="my-10">
            <label className="text-[black] font-semibold text-[14px]">
              Description
            </label>
            <TextEditor
              existingDescription={cleanedDesc}
              setForm={setForm}
              fieldName="extra"
              width={1000}
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black">Image</label>
            <div className="flex gap-2">
              <Upload
                accept=".jpg,.png,.svg,.jpeg"
                imgTitle="cagtegory"
                setForm={setForm}
                fieldName="images"
                existingImg={form?.images}
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
      </div>
  );
};

export default EditCategory;
