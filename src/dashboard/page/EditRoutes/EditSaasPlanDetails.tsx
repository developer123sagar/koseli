import { Spinner, TextEditor } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { PlanName } from "@/types";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditSaasPlanDetails = () => {
  const selectedItem: PlanName = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );

  const { token } = useAppSelector((state: RootState) => state.signin);
  const { loading } = useAppSelector((state: RootState) => state.fetchDashData);

  const [form, setForm] = useState(selectedItem || {});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const durationInMonths = form?.Duration ? Math.ceil(form?.Duration / 30) : 0;

  const handleUpdateForm = async (e: FormEvent) => {
    e.preventDefault();
    // const updatedForm = { ...form };
    // updatedForm.Duration = updatedForm.Duration && updatedForm.Duration * 30;
    await dispatch(
      UpdateData({
        api: `saas-plan/edit/${selectedItem?._id}`,
        form: form,
        token: token!, 
      })
    );
    localStorage.removeItem("desc");
    navigate("/dashboard/saas-plan/planDetails");
  };

  const desc = localStorage.getItem("desc") || "";
  const cleanedDesc = desc.replace(/^"|"$/g, "");

  return (
    <>
      <form className="mt-16">
        <NameMark label="Edit Saas Plan" variant="primary" />
        <div className="flex gap-8 flex-wrap mt-6">
          <EditInput
            basis={48}
            label="Plan Name"
            value={form?.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <EditInput
            basis={48}
            label="Plan Duration (in month)"
            min={1}
            value={durationInMonths.toString()}
            onChange={(e) => {
              const months = parseInt(e.target.value);
              setForm({ ...form, Duration: months * 30 });
            }}
          />
          <EditInput
            basis={48}
            label="Plan Price"
            value={form?.price as number}
            onChange={(e) =>
              setForm({ ...form, price: parseInt(e.target.value) })
            }
          />
        </div>
        <div className="my-10">
          <label className="text-[black] font-semibold text-[14px]">
            Description
          </label>
          <TextEditor
            existingDescription={cleanedDesc}
            setForm={setForm}
            fieldName="description"
          />
        </div>
        <Buttons
          type="button"
          className="mt-4 float-right"
          onClick={handleUpdateForm}
        >
          {loading ? <Spinner btn /> : "Edit Plan Details"}
        </Buttons>
      </form>
    </>
  );
};

export default EditSaasPlanDetails;
