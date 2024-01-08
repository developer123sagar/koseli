import { FormEvent, useState } from "react";
import { ITaxForm } from "@/types";
import axios from "axios";
import { url } from "@/routes";
import { RootState, useAppSelector } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { Spinner } from "@/common";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";

export default function AddTax() {
  const [form, setForm] = useState<ITaxForm>({
    name: "",
    tax: null,
    desh: "Nepal",
  });
  const { token } = useAppSelector((state: RootState) => state.signin);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/tax`, form, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        navigate("/dashboard/system_data/tax");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="mt-16">
          <NameMark label="Add Tax" variant="primary" />
          <form className="mt-6">
            <div className="flex justify-between gap-8">
              <EditInput
                label="Tax Name"
                basis={48}
                value={form?.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <EditInput
                label="Tax Value"
                value={form?.tax as number}
                basis={48}
                onChange={(e) =>
                  setForm({ ...form, tax: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="mt-6 flex justify-end gap-10 mb-2">
              <Buttons onClick={handleFormSubmit} type="submit">
                {loading ? <Spinner btn /> : "Create"}
              </Buttons>
              <Buttons back variant="destructive">Cancel</Buttons>
            </div>
          </form>
        </main>
    </>
  );
}
