import { Spinner, TextEditor, Upload } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { fetchRestaurant } from "@/redux/restaurant/restaurantSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { INotice } from "@/types";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditNotice = () => {
  const selectedItem: INotice = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  const [selectedRestId, setSelectedRestId] = useState("");
  const { loading } = useAppSelector((state: RootState) => state.fetchDashData);

  const { token } = useAppSelector((state: RootState) => state.signin);
  const { restaurantData } = useAppSelector(
    (state: RootState) => state.restaurant
  );

  const [form, setForm] = useState(selectedItem || {});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedItem) {
      setSelectedRestId(selectedItem?.restaurantId);
    }
  }, [selectedItem]);

  useEffect(() => {
    dispatch(fetchRestaurant());
  }, [dispatch]);

  const handleRestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const restId = e.target.value;
    setSelectedRestId(restId);
    setForm((prevForm) => ({
      ...prevForm,
      restaurantId: restId,
    }));
  };

  const handleUpdateForm = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(
      UpdateData({ api: "notice/update", form: form, token: token! })
    );
    navigate("/dashboard/notice");
    localStorage.removeItem("desc");
  };

  const desc = localStorage.getItem("desc") || "";
  const cleanedDesc = desc.replace(/^"|"$/g, "");

  return (
    <>
      <form className="mt-16">
        <NameMark label="Edit Food Details" variant="primary" />
        <div className="flex gap-8 mt-8 flex-wrap">
          <EditInput
            label="Notice Title"
            basis={48}
            value={form?.noticetitle}
            onChange={(e) => setForm({ ...form, noticetitle: e.target.value })}
            placeH="Enter Food name"
          />

          <div className="basis-[48%]">
            <h1 className={`text-[black] font-semibold text-[14px] mb-2`}>
              Select a Restaurant
            </h1>
            <select
              id="foodGroupSelect"
              className={`form-control text-sm w-full py-2 pl-1 rounded placeholder:text-gray-500 border border-gray-200 my-1`}
              value={selectedRestId}
              onChange={handleRestChange}
            >
              <option value=""></option>
              {restaurantData.map((item) => (
                <option key={item.name} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="my-10">
          <label className="text-[black] font-semibold text-[14px]">
            Details
          </label>
          <TextEditor
            existingDescription={cleanedDesc}
            setForm={setForm}
            fieldName="Detail"
            width={1000}
          />
        </div>

        <div className="mt-8">
          <label className="mb-2.5 block text-black">Notice Photo</label>
          <div className="flex gap-2">
            <Upload
              accept=".jpg,.png,.svg,.jpeg"
              imgTitle="notice"
              setForm={setForm}
              fieldName="image"
              existingImg={[form?.image[0]]}
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
    </>
  );
};

export default EditNotice;
