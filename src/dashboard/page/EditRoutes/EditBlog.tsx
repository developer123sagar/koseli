import { Spinner, TextEditor, Upload } from "@/common";
import Buttons from "@/common/Button";
import MultipleInput from "@/common/MultipleInput";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { IBlog } from "@/types";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditBlog = () => {
  const selectedItem: IBlog = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  const [metaDesc, SetMetaDesc] = useState({
    name: "",
  });
  const { loading } = useAppSelector((state: RootState) => state.fetchDashData);
  const { token } = useAppSelector((state: RootState) => state.signin);
  const [form, setForm] = useState(selectedItem || {});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUpdateForm = async (e: FormEvent) => {
    e.preventDefault();
    const updatedForm = { ...form };
    updatedForm.metaDescription = { name: metaDesc.name };

    await dispatch(
      UpdateData({ api: "blogs", form: updatedForm, token: token! })
    );
    localStorage.removeItem("desc");
    localStorage.removeItem("desc2");
    navigate("/dashboard/blog/active");
  };

  const desc = localStorage.getItem("desc") || "";
  const desc2 = localStorage.getItem("desc2") || "";
  const cleanedDesc = desc.replace(/^"|"$/g, "");
  const cleanedDesc2 = desc2.replace(/^"|"$/g, "");

  return (
    <div className="w-full mt-16">
        <NameMark label="Edit Blog Details" variant="primary" />
        <form className="mt-5">
          <div className="flex gap-8 flex-wrap justify-between">
            <EditInput
              label="Blog Title"
              value={form?.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeH="Enter Blog title"
            />

            <EditInput
              label="Cateogry"
              value={form?.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeH="Enter Category Name"
            />
          </div>

          <div className="my-4">
            <label className="text-[black] font-semibold text-[14px]">
              Meta Description
            </label>
            <TextEditor
              existingDescription={cleanedDesc}
              setForm={SetMetaDesc}
              fieldName="name"
            />
          </div>
          <div className="my-4">
            <label className="text-[black] font-semibold text-[14px]">
              Extra Description
            </label>
            <TextEditor
              existingDescription={cleanedDesc2}
              setForm={setForm}
              fieldName="description"
            />
          </div>

          <div className="w-full">
            <label className="mb-2.5 block text-black">Tags</label>
            <MultipleInput
              initialTags={selectedItem?.tags || []}
              setTags={(newTags) => setForm({ ...form, tags: newTags })}
              placeholder="tags"
            />
          </div>

          <div className="mt-4.5">
            <label className="mb-2.5 block text-black">Image</label>
            <div className="flex gap-2">
              <Upload
                accept=".jpg,.png,.svg,.jpeg"
                imgTitle="blog"
                setForm={setForm}
                fieldName="images"
                existingImg={[form?.images[0]]}
              />
            </div>
          </div>
          <Buttons
            type="button"
            onClick={handleUpdateForm}
            className="float-right"
          >
            {loading ? <Spinner btn /> : "Update"}
          </Buttons>
        </form>
      </div>
  );
};

export default EditBlog;
