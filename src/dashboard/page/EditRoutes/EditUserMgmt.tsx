import { Spinner, Upload } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { IWatcher } from "@/types";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditUserMgmt = () => {
  const selectedItem: IWatcher = useAppSelector(
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
      UpdateData({ api: "client/edit", form: form, token: token! })
    );
    navigate("/dashboard/user_management");
  };
  return (
    <>
      <div className="mt-16">
        <NameMark label="Edit User Details" variant="primary" />
        <form className="mt-6">
          <div className="w-full flex justify-between">
            <EditInput
              basis={45}
              label="User Name"
              value={form?.Name}
              onChange={(e) => setForm({ ...form, Name: e.target.value })}
              placeH="Enter User Name"
            />
            <EditInput
              basis={45}
              label="User Email"
              value={form?.Email}
              onChange={(e) => setForm({ ...form, Email: e.target.value })}
              placeH="Enter User Email"
            />
          </div>

          <div className="mt-4.5">
            <label className="mb-2.5 block text-black">Image</label>
            <div className="flex gap-2">
              <Upload
                accept=".jpg,.png,.svg,.jpeg"
                imgTitle="usermgmt"
                setForm={setForm}
                fieldName="images"
                existingImg={[form?.images]}
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
    </>
  );
};

export default EditUserMgmt;
