import axios from "axios";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { FormEvent, useEffect, useState } from "react";
import { url } from "@/routes";
import { AddCombofield } from "@/dashboard/constants/Foods";
import { Select, Spinner, TextEditor, Upload } from "@/common";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { IComboOffersForm, IFoodItem } from "@/types";
import { useNavigate } from "react-router-dom";
import { SelectOption } from "@/common/Select";
import Buttons from "@/common/Button";

export default function AddCombo() {
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    SelectOption[] | undefined
  >([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token } = useAppSelector((state: RootState) => state.signin);
  const data: IFoodItem[] = useAppSelector(
    (state: RootState) => state.fetchDashData.data
  );

  const [form, setForm] = useState<IComboOffersForm>({
    name: "",
    food: selectedOptions?.map((option) => option.value) || [],
    extra: "",
    expiredAt: new Date(),
    amount: null,
    image: "",
  });

  useEffect(() => {
    dispatch(fetchDashboardData({ api: "food/restaurant", token: token! }));
  }, [dispatch, token]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "expiredAt") {
      const selectedDate = new Date(value);
      setForm((prevForm) => ({
        ...prevForm,
        [name]: selectedDate,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${url}/combo-offers`, form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (res.status === 200) {
        navigate("/dashboard/kitchen/combo-offer");
      }
    } catch (error) {
      console.error("an error occured during submitting form", error);
    } finally {
      setLoading(false);
    }
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

  const heading = "text-[black] font-semibold text-[14px] mb-2";
  const input =
    "form-control text-sm w-full py-2 pl-1 rounded placeholder:text-gray-500 border border-gray-200 my-1";

  return (
    <>
      <>
        <div className="mt-16 mb-5 overflow-y-auto">
          <h1 className="font-bold flex items-center gap-2 justify-center text-stone-950 text-2xl mb-4">
            <AiOutlineArrowLeft size={20} className="text-[20px]" />
            Add Combo
          </h1>
          <form className="w-[100%] h-auto">
            <div className="flex flex-wrap gap-4 justify-between">
              {AddCombofield.map((item) => (
                <div key={item.name} className="basis-[48%]">
                  <label className="text-sm font-semibold text-black">
                    {item.name}
                  </label>
                  <input
                    type={item.type}
                    name={item.formName}
                    required
                    className={`${input}`}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
            <div className="w-full justify-between flex gap-4 flex-wrap mt-4">
              <div className="basis-[48%]">
                <label className={`${heading}`} htmlFor="select food">
                  Select Food
                </label>
                <Select
                  multiple
                  value={selectedOptions || []}
                  onChange={handleSelectChange}
                  options={options}
                />
              </div>
              <div className="basis-[48%] flex flex-col">
                <label className="text-sm font-semibold text-black">
                  Expiry Date:
                </label>
                <input
                  type="date"
                  required
                  name="expiredAt"
                  onChange={handleInputChange}
                  className="w-fulll form-control text-sm py-2 pl-1 rounded placeholder:text-gray-500 border border-gray-200 my-1"
                />
              </div>
            </div>
            <div className="my-3 w-full">
              <h1 className={`${heading}`}>Description</h1>
              <TextEditor setForm={setForm} fieldName={"extra"} width={1100} />
            </div>
            <div>
              <h1 className={`${heading}`}>Combo Photo</h1>
              <Upload
                fieldName="image"
                imgTitle="food"
                setForm={setForm}
                accept=".jpg,.png,.svg"
              />
            </div>
            <div className="mt-6 flex justify-end gap-10 mb-2">
             
              <Buttons type="submit" onClick={handleFormSubmit} >{loading ? <Spinner btn /> : "Create"}</Buttons>
              <Buttons back variant="destructive">Cancel</Buttons>
            </div>
          </form>
        </div>
      </>
    </>
  );
}
