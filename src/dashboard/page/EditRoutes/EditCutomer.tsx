import { Spinner } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { ICustomer } from "@/types";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditCutomer = () => {
  const selectedItem: ICustomer = useAppSelector(
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
    navigate("/dashboard/customer_list");
  };


  return (
    <div className="w-full mt-16">
        <NameMark label="Edit Customer Details" variant="primary" />

        <form className="flex flex-col gap-5">
          <EditInput
            label="Customer Name"
            value={form?.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeH="Enter Customer name"
          />
          <EditInput
            label="Customer Email"
            value={form?.email}
            disabled
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeH="Enter Customer email"
          />
          <Buttons
            type="submit"
            onClick={handleUpdateForm}
            className="float-right"
          >
            {loading ? <Spinner btn /> : "Update"}
          </Buttons>
        </form>
      </div>
  );
};

export default EditCutomer;
