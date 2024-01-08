import { TextEditor } from "@/common";
import Buttons from "@/common/Button";
import MultipleInput from "@/common/MultipleInput";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { RootState, useAppSelector } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { IBlog } from "@/types";

const ViewBlog = () => {
  const selectedItem: IBlog = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  return (
    <div className="mt-20 w-full">
        <Buttons type="button" variant="secondary" back={true}>
          Go Back
        </Buttons>
        <div className="w-full mt-5 flex gap-5 flex-wrap">
          <ViewInputField label="Blog Title" value={selectedItem?.title} />
          <ViewInputField label="Category" value={selectedItem?.category} />
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black">Description</label>
          <TextEditor
            existingDescription={selectedItem?.description || "Not available"}
            disabled
            height={500}
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black">Meta Description</label>
          <TextEditor
            existingDescription={
              selectedItem?.metaDescription?.name || "Not available"
            }
            disabled
          />
        </div>
        <div className="w-full">
          <label className="block text-black">Tags</label>
          <MultipleInput
            initialTags={selectedItem?.tags || []}
            placeholder="tags"
            disabled={true}
          />
        </div>

        <div className="mt-10">
          <label className="mb-2.5 block text-black">Blog Image</label>
          <div className="flex gap-2">
            <img
              src={`${baseImgUrl}/${selectedItem?.images}`}
              alt={selectedItem?.title}
              className="w-[40rem] object-cover"
            />
          </div>
        </div>
      </div>
  );
};

export default ViewBlog;
