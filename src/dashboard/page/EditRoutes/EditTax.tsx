import { Spinner } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { ITaxs } from "@/types";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditTax = () => {
  const selectedItem: ITaxs = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  const { loading } = useAppSelector((state: RootState) => state.fetchDashData);
  const { token } = useAppSelector((state: RootState) => state.signin);
  const [form, setForm] = useState(selectedItem || {});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUpdateForm = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(UpdateData({ api: "tax", form: form, token: token! }));
    navigate("/dashboard/system_data/tax");
  };
  return (
    <>
      <div className="mt-16">
        <NameMark label="Edit Tax Details" variant="primary" />
        <form className="mt-6">
          <div className="flex gap-8 flex-wrap justify-between">
            <EditInput
              label="Tax Name"
              value={form?.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeH="Enter Tax Name"
            />
            <EditInput
              label="Tax Percentage"
              value={form?.name}
              onChange={(e) =>
                setForm({ ...form, tax: parseInt(e.target.value) })
              }
              placeH="Enter Tax Percentage"
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

export default EditTax;
