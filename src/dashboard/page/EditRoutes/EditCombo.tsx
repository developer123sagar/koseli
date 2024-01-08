import { Select, Spinner, TextEditor, Upload } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { SelectOption } from "@/common/Select";
import Breadcrumb from "@/dashboard/component/BreadCrumb/BreadCrumb";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import {
  UpdateData,
  fetchDashboardData,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { IComboOffers, IFoodItem } from "@/types";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditCombo = () => {
  const selectedItem: IComboOffers = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  const [selectedOptions, setSelectedOptions] = useState<
    SelectOption[] | undefined
  >([]);
  const data: IFoodItem[] = useAppSelector(
    (state: RootState) => state.fetchDashData.data
  );
  const { loading } = useAppSelector((state: RootState) => state.fetchDashData);
  const { token } = useAppSelector((state: RootState) => state.signin);
  const [form, setForm] = useState(selectedItem || {});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDashboardData({ api: "food/restaurant", token: token! }));
  }, [dispatch, token]);

  const handleUpdateForm = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(
      UpdateData({ api: "combo-offers", form: form, token: token! })
    );
    navigate("/dashboard/kitchen/combo-offer");
  };

  const handleSelectChange = (selectedItems: SelectOption[] | undefined) => {
    setSelectedOptions(selectedItems);
    const selectedFoodItemIds =
      selectedItems?.map((option) => option.value) || [];
    setForm((prevForm) => ({
      ...prevForm,
      food: selectedFoodItemIds,
    }));
  };

  const options =
    data?.map((foodItem) => ({
      label: foodItem.name,
      value: foodItem._id,
    })) || [];

  const desc = localStorage.getItem("desc") || "";
  const cleanedDesc = desc.replace(/^"|"$/g, "");

  return (
    <>
      <Breadcrumb pageName="EditCombo" />
      <NameMark label=" Edit Combo Offers Details" variant="primary" />
      <form className="mt-10">
        <div className="flex gap-8 flex-wrap">
          <EditInput
            label="Name"
            value={form?.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeH="Enter combo food name"
          />

          <EditInput
            label="Price"
            value={form?.amount as number}
            onChange={(e) =>
              setForm({ ...form, amount: parseInt(e.target.value) })
            }
            placeH="Enter Food price"
          />

          <EditInput
            label="Expiry Date"
            type="date"
            onChange={(e) =>
              setForm({
                ...form,
                expiredAt: new Date(e.target.value).toISOString(),
              })
            }
          />
          <div className="basis-[50%]">
            <label
              className={`text-[black] font-semibold text-[14px] mb-2`}
              htmlFor="select food"
            >
              Select Food
            </label>
            <Select
              multiple
              value={selectedOptions || []}
              onChange={handleSelectChange}
              options={options}
            />
          </div>
        </div>

        <div className="my-10">
          <label className="text-[black] font-semibold text-[14px]">
            Description
          </label>
          <TextEditor
            existingDescription={cleanedDesc}
            setForm={setForm}
            fieldName="extra"
            width={1000}
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black">Image</label>
          <div className="flex gap-2">
            <Upload
              accept=".jpg,.png,.svg,.jpeg"
              imgTitle="combo"
              setForm={setForm}
              fieldName="image"
              existingImg={[form?.image]}
            />
          </div>
        </div>
        <Buttons type="submit" onClick={handleUpdateForm} className="float-right">
          {loading ? <Spinner btn /> : "Update"}
        </Buttons>
      </form>
    </>
  );
};

export default EditCombo;
