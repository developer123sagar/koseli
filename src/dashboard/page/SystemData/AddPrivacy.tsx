import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { RootState, useAppSelector } from "@/redux/store";
import { url } from "@/routes";
import { Spinner, TextEditor } from "@/common";
import axios from "axios";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";

export default function AddPrivacyPolicy() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    body: "",
  });
  const { token } = useAppSelector((state: RootState) => state.signin);
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/privacy-policy`, form, {
        headers: {
          Authorization: token!,
        },
      });
      if (res.status === 200) navigate("/dashboard/system_data/privacy_policy");
    } catch (error) {
      error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-16 mb-4 ">
          <NameMark label="Privacy and Policy" variant="primary" />
          <div className="flex flex-wrap gap-5 justify-between mt-10">
            <EditInput
              basis={100}
              label="Title"
              value={form?.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeH="Enter title"
            />
          </div>

          <div className="mt-5">
            <h1 className={`text-[black]  font-semibold text-[14px] mb-2`}>
              Description
            </h1>
            <TextEditor setForm={setForm} fieldName={"body"} />
          </div>

          <div className="mt-6 flex justify-end gap-10 mb-2">
            <Buttons type="submit" onClick={handleFormSubmit}>
              {loading ? <Spinner btn /> : "Create"}
            </Buttons>
            <Buttons back variant="destructive">Cancel</Buttons>
          </div>
        </div>
    </>
  );
}
