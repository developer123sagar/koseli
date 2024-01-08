/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { url } from "@/routes";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { IFoodItem, MessageType } from "@/types";
import { useNavigate } from "react-router-dom";
import { Spinner, TextEditor, ToastMsg } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { useUniqueUUID } from "@/hooks/useUniqueUUID";

export default function AddFoodSpeciality() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const data: IFoodItem[] = useAppSelector(
    (state: RootState) => state.fetchDashData.data
  );
  const [selectedId, setSelectedId] = useState<string>(
    data?.length > 0 ? data[0]?._id : ""
  );

  const { token } = useAppSelector((state: RootState) => state.signin);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: data?.length > 0 ? data[0]?.name : "",
    extra: "",
    food: data?.length > 0 ? data[0]?._id : "",
    amount: data?.length > 0 ? data[0]?.price || null : null,
  });

  const dispatch = useAppDispatch();
  const UID = useUniqueUUID();


  useEffect(() => {
    dispatch(fetchDashboardData({ api: "food/restaurant", token: token! }));
  }, [dispatch, token]);

  useEffect(() => {
    if (data?.length > 0) {
      setSelectedId(data[0]._id);
      setForm((prev) => ({
        ...prev,
        food: data[0]?._id,
        name: data[0]?.name,
        amount: data[0]?.price || null,
      }));
    }
  }, [data]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/food-speciality`, form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (res.status === 200) {
        navigate("/dashboard/kitchen/speciality");
      }
    } catch (error: any) {
      const errMsg = error.response.data.message;
      setMessages([
        {
          id: UID(),
          msg: errMsg || "Error while creating food speciality",
          theme: "fail",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleItemChange = (itemId: string) => {
    const selectedFoodItem = data.find((item) => item._id === itemId);
    if (selectedFoodItem) {
      setSelectedId(itemId);
      setForm((prev) => ({
        ...prev,
        food: itemId,
        name: selectedFoodItem.name,
        amount: selectedFoodItem.price || null,
      }));
    }
  };

  const heading = "text-[black] font-semibold text-[14px] mb-2";
  const input =
    "form-control text-sm w-full py-2 pl-1 rounded placeholder:text-gray-500 border border-gray-200 my-1";

  return (
    <>
      <ToastMsg messages={messages} setMessages={setMessages} />

        <div className="mt-16 mb-5">
          <NameMark label="Add Your Special Food" variant="primary" />

          <form className="w-[100%] p-5 mx-auto h-auto">
            <div className="w-full">
              <h1 className={`${heading}`}>Food</h1>
              <select
                value={selectedId || ""}
                onChange={(e) => handleItemChange(e.target.value)}
                className={`${input}`}
              >
                {Array.isArray(data) &&
                  data.length > 0 &&
                  data.map((item) => (
                    <option
                      key={`${item._id}`}
                      value={item._id}
                      className="py-5"
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="my-3">
              <h1 className={`${heading}`}>Description</h1>
              <TextEditor setForm={setForm} fieldName={"extra"} />
            </div>
            <div className="mt-6 flex justify-end gap-10 mb-2">
              <Buttons type="submit" onClick={handleFormSubmit}>
                {loading ? <Spinner btn /> : "Create"}
              </Buttons>
              <Buttons back variant="destructive">
                Cancel
              </Buttons>
            </div>
          </form>
        </div>
    </>
  );
}
