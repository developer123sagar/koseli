import { FormEvent, useState } from "react";
import { Spinner, TextEditor, Upload } from "@/common";
import MultipleInput from "@/common/MultipleInput";
import axios from "axios";
import { url } from "@/routes";
import { RootState, useAppSelector } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { IBlog } from "@/types";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";

export default function AddNewBlog() {
  const [loading, setLoading] = useState(false);
  const { token } = useAppSelector((state: RootState) => state.signin);
  const [metaDesc, SetMetaDesc] = useState({
    name: "",
  });
  const navigate = useNavigate();
  const [form, setForm] = useState<IBlog>({
    title: "",
    description: "",
    images: [""],
    category: "",
    tags: [],
    metaDescription: { name: "" },
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const updatedForm = { ...form };
    updatedForm.metaDescription = { name: metaDesc.name };
    console.log(updatedForm);
    try {
      const res = await axios.post(`${url}/blogs`, updatedForm, {
        headers: {
          Authorization: token!,
        },
      });
      if (res.status === 200) navigate("/dashboard/blog/active");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-16">
        <NameMark label="Add Blog" variant="primary" />
        <div className="flex flex-wrap gap-5 justify-between mt-10">
          <EditInput
            label="Blog Title"
            basis={48}
            value={form?.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeH="Enter Blog title"
          />

          <EditInput
            label="Category"
            basis={48}
            value={form?.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeH="Enter category"
          />
          <div className="mb-5 basis-[100%]">
            <h1 className={`text-[black] font-semibold mb-2`}>Tags</h1>
            <MultipleInput
              initialTags={form.tags}
              setTags={(newTags) => setForm({ ...form, tags: newTags })}
              placeholder="Add tags"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 font-bold text-[#141312]"
          >
            Description
          </label>
          <TextEditor fieldName="description" setForm={setForm} />
        </div>
        <div className="mt-5">
          <label
            htmlFor="description"
            className="mb-1 font-bold text-[#141312]"
          >
            Meta Description
          </label>
          <TextEditor fieldName="name" setForm={SetMetaDesc} />
        </div>

        <div className="flex flex-wrap gap-4 w-full mt-6">
          <div className="basis-[30%]">
            <h1 className={`mb-1 font-bold text-[#141312]`}>Blog Image</h1>
            <div>
              <Upload
                fieldName="images"
                imgTitle="blog"
                setForm={setForm}
                accept=".jpg,.png,.svg"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-10 mb-2">
          <Buttons type="submit" onClick={handleFormSubmit}>
            {loading ? <Spinner btn /> : "Create"}
          </Buttons>
          <Buttons back variant="destructive">
            Cancel
          </Buttons>
        </div>
      </div>
    </>
  );
}
