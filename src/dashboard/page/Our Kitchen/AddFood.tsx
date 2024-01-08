import axios from "axios";
import { useState, useEffect } from "react";
import { url } from "@/routes";
import { Spinner, TextEditor, ToggleBtn, Upload } from "@/common";
import {
  foodInitialFormState,
  foodInputField,
} from "@/dashboard/constants/Foods";
import { IFoodForm } from "@/types";
import { fetchFoodCategory } from "@/redux/foods/foodDetailSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { AiFillDelete } from "react-icons/ai";
import { useUniqueUUID } from "@/hooks/useUniqueUUID";
import { useNavigate } from "react-router-dom";
import MultipleInput from "@/common/MultipleInput";
import Buttons from "@/common/Button";
import { useWindowSize } from "@/hooks/useWindowSize";
import NameMark from "@/common/NameMark";

export default function AddFood() {
  const heading = "text-[black] font-semibold text-[14px]";
  const input =
    "form-control text-sm w-full py-3 pl-1 rounded placeholder:text-gray-500 border border-gray-200 my-1";

  const UID = useUniqueUUID();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [form, setForm] = useState(foodInitialFormState);

  const { category } = useAppSelector((state: RootState) => state.foodDetails);

  useEffect(() => {
    if (category && category.length > 0) {
      setSelectedCategory(category[0]._id);
      setForm((prevFormState) => ({
        ...prevFormState,
        foodCategory: category[0]._id,
      }));
    }
  }, [category]);

  const [addonCounter, setAddonCounter] = useState(1);
  const [loading, setLoading] = useState(false);
  const [addonItems, setAddonItems] = useState([
    {
      name: "",
      extraPrice: null,
      quantity: null,
      extra: "",
      isCheckDefault: false,
      id: UID(),
      isRequired: false,
    },
  ]);

  const [toggle, setToggle] = useState(false);

  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.signin);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchFoodCategory({}));
  }, [dispatch]);

  const handleToggleChange = () => {
    setToggle((prev) => !prev);
  };

  // handle food category
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    setForm((prevForm) => ({
      ...prevForm,
      foodCategory: selectedCategory,
    }));
  };

  const handleAddonInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { name, value } = e.target;
    setAddonItems((prevAddonItems) => {
      const updatedAddonItems = [...prevAddonItems];
      updatedAddonItems[id] = {
        ...updatedAddonItems[id],
        [name]: value,
      };
      setForm((prev) => ({ ...prev, addon: updatedAddonItems }));
      return updatedAddonItems;
    });
  };

  const handleAddButtonClick = () => {
    setAddonItems((prevAddonItems) => {
      const newAddonItem = {
        isRequired: false,
        isCheckDefault: false,
        name: "",
        extraPrice: null,
        quantity: null,
        extra: "",
        id: UID(),
      };
      const updatedAddonItems = [...prevAddonItems, newAddonItem];
      setForm((prev) => ({ ...prev, addon: updatedAddonItems }));
      return updatedAddonItems;
    });
    setAddonCounter(addonCounter + 1);
  };

  const handleDeleteAddon = (idToDelete: string) => {
    const updatedAddonItems = addonItems.filter(
      (item) => item.id !== idToDelete
    );
    setAddonItems(updatedAddonItems);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("working");
    try {
      const res = await axios.post(`${url}/food`, form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log(res);
      if (res.status === 200) {
        navigate("/dashboard/kitchen/food");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const { width } = useWindowSize();

  return (
    <>
      <>
        <main className="mt-8 mb-5 overflow-y-auto">
          <NameMark label="Add Food" variant="primary" />
          <div className="w-full mt-6">
            <div className="flex items-center justify-between flex-wrap gap-8">
              {foodInputField.map((item) => (
                <div key={item.name} className="basis-[48%]">
                  <label className="text-sm font-semibold text-black">
                    {item.name}
                  </label>
                  <input
                    type={item.type}
                    required
                    className={`${input}`}
                    name={item.formName}
                    value={form[item.formName as keyof IFoodForm] as string}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
              <div className="basis-[48%]">
                <label className="text-sm font-semibold   text-black">
                  Food Making Time
                </label>
                <input
                  type="number"
                  required
                  className={`${input}`}
                  name="foodMakingTime"
                  min={1}
                  value={form.foodMakingTime?.minutes as number}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      foodMakingTime: { minutes: parseInt(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="basis-[48%]">
                <h1 className={`${heading}`}>Select a food Category</h1>
                <select
                  id="foodGroupSelect"
                  className={`${input}`}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {category.map((item) => (
                    <option key={item.name} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <h1 className={`${heading}`}>Keywords</h1>
                <MultipleInput
                  initialTags={form.keywords}
                  setTags={(newKeyword) =>
                    setForm({ ...form, keywords: newKeyword })
                  }
                  placeholder="Add Mulitple Keywords"
                />
              </div>

              <TextEditor
                setForm={setForm}
                fieldName={"subTitle"}
                width={width || 1100}
              />

              <div className="flex flex-wrap gap-4 w-full">
                <div className="basis-[30%]">
                  <h1 className={`${heading}`}>Food Image</h1>
                  <div>
                    <Upload
                      fieldName="activeImage"
                      imgTitle="food"
                      setForm={setForm}
                      accept=".jpg,.png"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <h1 className={`${heading}`}>Foods Addon</h1>
                <ToggleBtn
                  toggleName="addon"
                  isOn={toggle}
                  onToggle={handleToggleChange}
                />
                <div>
                  <AnimatePresence>
                    {toggle && (
                      <div className="mt-5">
                        <div className=" gap-4 ">
                          {addonItems.map((item, id) => (
                            <motion.div
                              key={id}
                              initial={{ opacity: "0", height: "0" }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: id * 0.06,
                                type: "spring",
                                stiffness: "300",
                                damping: "30",
                              }}
                              className="relative mb-10 p-5 flex justify-between gap-10 bg-slate-50 py-4 rounded"
                            >
                              <AiFillDelete
                                size={20}
                                className={`${
                                  addonItems.length === 1
                                    ? "hidden"
                                    : "absolute top-2 right-5 text-gray-400 hover:text-red-600 transition-all duration-500 hover:cursor-pointer"
                                }`}
                                onClick={() => handleDeleteAddon(item.id)}
                              />
                              <div>
                                <label className="text-sm font-semibold text-black">
                                  Item Title
                                </label>
                                <input
                                  type="text"
                                  required
                                  className={`${input}`}
                                  name="name"
                                  value={item.name}
                                  onChange={(e) =>
                                    handleAddonInputChange(e, id)
                                  }
                                />
                                <label className="text-sm font-semibold text-black">
                                  Item Price
                                </label>
                                <input
                                  type="number"
                                  required
                                  className={`${input}`}
                                  name="extraPrice"
                                  value={item.extraPrice!}
                                  onChange={(e) =>
                                    handleAddonInputChange(e, id)
                                  }
                                />
                              </div>
                              <div>
                                <label className="text-sm font-semibold text-black">
                                  Minimum quantity
                                </label>
                                <input
                                  type="number"
                                  required
                                  className={`${input}`}
                                  name="quantity"
                                  value={item.quantity!}
                                  onChange={(e) =>
                                    handleAddonInputChange(e, id)
                                  }
                                />
                                <label className="text-sm font-semibold text-black">
                                  Description
                                </label>
                                <input
                                  type="text"
                                  required
                                  className={`${input}`}
                                  name="extra"
                                  value={item.extra}
                                  onChange={(e) =>
                                    handleAddonInputChange(e, id)
                                  }
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <Buttons
                          variant="secondary"
                          type="button"
                          onClick={handleAddButtonClick}
                        >
                          Next
                        </Buttons>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-10 mb-2">
              <Buttons onClick={handleFormSubmit} type="submit">
                {loading ? <Spinner btn /> : "Create"}
              </Buttons>
              <Buttons back variant="destructive">
                Cancel
              </Buttons>
            </div>
          </div>
        </main>
      </>
    </>
  );
}
