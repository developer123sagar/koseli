import { Spinner, TextEditor, Upload } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { IFounder } from "@/types";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditFounder = () => {
  const selectedItem: IFounder = useAppSelector(
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
      UpdateData({ api: "founder/update", form: form, token: token! })
    );
    localStorage.removeItem("desc");
    navigate("/dashboard/founder");
  };

  const desc = localStorage.getItem("desc") || "";
  const cleanedDesc = desc.replace(/^"|"$/g, "");

  return (
    <>
      <form className="mt-16">
        <NameMark label="Edit Founder Details" variant="primary" />
        <div className="flex gap-8 flex-wrap">
          <EditInput
            label="Name"
            basis={100}
            value={form?.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeH="Enter Food name"
          />
        </div>

        <div className="my-10">
          <label className="text-[black] font-semibold text-[14px]">
            Description
          </label>
          <TextEditor
            existingDescription={cleanedDesc}
            setForm={setForm}
            fieldName="extra"
          />
        </div>

        <div>
          <label className="mb-2.5 block text-black">Founder Photo</label>
          <div className="flex gap-2">
            <Upload
              accept=".jpg,.png,.svg,.jpeg"
              imgTitle="food"
              setForm={setForm}
              fieldName="image"
              existingImg={[form?.image[0]]}
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

export default EditFounder;
