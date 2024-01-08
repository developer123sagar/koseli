import axios from "axios";
import { FormEvent, useState } from "react";
import { url } from "@/routes";
import { Spinner, TextEditor, Upload } from "@/common";
import { RootState, useAppSelector } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";

export default function AddCategory() {
  const [form, setForm] = useState({
    name: "",
    extra: "",
    images: [""],
    activeStatus: true,
    countryFood: "Nepal",
  });

  const { token } = useAppSelector((state: RootState) => state.signin);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/food-category`, form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (res.status === 200) navigate("/dashboard/kitchen/category");
    } catch (error) {
      console.error("an error occured during submitting form", error);
    } finally {
      setLoading(false);
    }
  };

  const heading = "text-[black] font-semibold text-[14px] mb-2";

  return (
    <>
      <div className="mt-12 overflow-y-auto mb-5">
          <NameMark label="Add Food Category Details" variant="primary" />

          <form onSubmit={handleFormSubmit}>
            <div>
              <EditInput
                label="Food Category Title"
                value={form?.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeH="Enter category title"
              />
              <div className="my-5">
                <h1 className={`${heading}`}>Description</h1>
                <TextEditor setForm={setForm} fieldName={"extra"} />
              </div>
              <div className="flex flex-wrap gap-4 w-full">
                <div className="basis-[30%]">
                  <h1 className={`${heading}`}>Category Photo ?</h1>
                  <div>
                    <Upload
                      accept=".jpg,.png,.svg"
                      fieldName="images"
                      imgTitle="category"
                      setForm={setForm}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4 mb-2">
                <Buttons type="submit">
                  {loading ? <Spinner btn /> : "Create"}
                </Buttons>
                <Buttons back variant="destructive">
                  cancel
                </Buttons>
              </div>
            </div>
          </form>
        </div>
    </>
  );
}
