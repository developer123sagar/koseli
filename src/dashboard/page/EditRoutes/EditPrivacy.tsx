import { Spinner, TextEditor } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { TermAndConditionItem } from "@/types";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditPrivacy = () => {
  const selectedItem: TermAndConditionItem = useAppSelector(
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
      UpdateData({ api: "privacy-policy", form: form, token: token! })
    );
    localStorage.removeItem("desc");
    navigate("/dashboard/system_data/privacy_policy");
  };

  const desc = localStorage.getItem("desc") || "";
  const cleanedDesc = desc.replace(/^"|"$/g, "");

  return (
    <>
      <div className="mt-16">
        <NameMark label="Edit Privacy Policy Details" variant="primary" />
        <form className="mt-6">
          <div className="flex gap-8 flex-wrap justify-between">
            <EditInput
              label="Privacy Policy Title"
              basis={100}
              value={form?.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeH="Enter Privacy Policy Title"
            />
          </div>
          <div className="my-10">
            <label className="text-[black] font-semibold text-[14px]">
              Description
            </label>
            <TextEditor
              existingDescription={cleanedDesc}
              setForm={setForm}
              fieldName="body"
              height={450}
            />
          </div>
          <Buttons
            type="button"
            onClick={handleUpdateForm}
            className="float-right mt-4"
          >
            {loading ? <Spinner btn /> : "Update"}
          </Buttons>
        </form>
      </div>
    </>
  );
};

export default EditPrivacy;
