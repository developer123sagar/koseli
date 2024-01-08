/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spinner, TextEditor, ToastMsg } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { useUniqueUUID } from "@/hooks/useUniqueUUID";
import { RootState, useAppSelector } from "@/redux/store";
import { url } from "@/routes";
import { MessageType } from "@/types";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Saas_Plan {
  name: string;
  description: string;
  plans: [
    {
      name: string;
      description: string;
      price: number | null;
      Duration: number | null;
    }
  ];
}

export default function Create_Saas_plan() {
  const { token } = useAppSelector((state: RootState) => state.signin);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [planDesc, setPlanDes] = useState({
    description: "",
  });

  const [form, setForm] = useState<Saas_Plan>({
    name: "",
    description: "",
    plans: [
      {
        name: "",
        description: planDesc.description,
        price: null,
        Duration: null,
      },
    ],
  });

  const UID = useUniqueUUID();
  const navigate = useNavigate();

  const handlePlanDescriptionChange = (newDescription: string) => {
    setPlanDes({ description: newDescription });
    setForm((prevForm) => ({
      ...prevForm,
      plans: [
        {
          ...prevForm.plans[0],
          description: newDescription,
        },
      ],
    }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const updatedForm = { ...form };
    updatedForm.plans[0].Duration =
      updatedForm.plans[0].Duration && updatedForm.plans[0].Duration * 30;

    console.log(updatedForm);
    try {
      const res = await axios.post(`${url}/saas-plan`, updatedForm, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200 || res.status === 201) {
        navigate("/dashboard/saas-plan");
      }
    } catch (err: any) {
      setMessages([
        {
          id: UID(),
          msg: err.response.data.message || "something went wrong",
          theme: "fail",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <>
        <main className="mt-16 oveflow-y-auto">
          <NameMark label="Saas Plan" variant="primary" />
          <form>
            <div className="flex flex-wrap justify-between gap-4">
              <EditInput
                label="Saas Name"
                basis={100}
                value={form?.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeH="Enter Saas plan name"
              />
              <div className="basis-full">
                <label className="text-sm font-semibold text-black">
                  Description
                </label>
                <TextEditor fieldName={"description"} setForm={setForm} />
              </div>
              <EditInput
                label="Plan Name"
                basis={100}
                value={form?.plans[0]?.name}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    plans: [
                      {
                        ...prevForm.plans[0],
                        name: e.target.value,
                      },
                    ],
                  }))
                }
                placeH="Enter plan name"
              />
              <div className="basis-full">
                <label className="text-sm font-semibold text-black">
                  Plan Description
                </label>
                <TextEditor
                  fieldName={"description"}
                  setForm={setPlanDes}
                  onDescriptionChange={handlePlanDescriptionChange}
                />
              </div>
              <EditInput
                label="Plan Duration(in months)"
                min={1}
                basis={48}
                value={form.plans[0]?.Duration as number}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    plans: [
                      {
                        ...prevForm.plans[0],
                        Duration: parseInt(e.target.value),
                      },
                    ],
                  }))
                }
                placeH="Enter plan name"
              />
              <EditInput
                label="Plan Price"
                min={1}
                type="number"
                basis={48}
                value={form.plans[0]?.price as number}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    plans: [
                      {
                        ...prevForm.plans[0],
                        price: parseInt(e.target.value),
                      },
                    ],
                  }))
                }
                placeH="Enter plan name"
              />
            </div>

            <div className="mt-6 flex justify-end gap-5 mb-2">
              <Buttons type="submit" onClick={handleFormSubmit}>
                {loading ? <Spinner btn /> : "Create"}
              </Buttons>
              <Buttons back variant="destructive">
                Cancel
              </Buttons>
            </div>
            <ToastMsg messages={messages} setMessages={setMessages} />
          </form>
        </main>
      </>
    </>
  );
}
