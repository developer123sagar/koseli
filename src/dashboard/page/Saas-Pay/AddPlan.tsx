import { Spinner, TextEditor } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { url } from "@/routes";
import { PlanName } from "@/types";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPlan = () => {
  const data = useAppSelector((state: RootState) => state.fetchDashData.data);
  const { loading } = useAppSelector((state: RootState) => state.fetchDashData);
  const { token } = useAppSelector((state: RootState) => state.signin);

  const [loading2, setLoading2] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [planForm, setPlanForm] = useState<PlanName>({
    name: "",
    description: "",
    price: null,
    Duration: null,
  });

  useEffect(() => {
    dispatch(fetchDashboardData({ api: "saas-plan", token: token! }));
  }, [dispatch, token]);

  const handlePlan = async (e: FormEvent) => {
    e.preventDefault();
    setLoading2(true);
    const updatedForm = { ...planForm };
    updatedForm.Duration = updatedForm.Duration && updatedForm.Duration * 30;

    console.log(updatedForm);

    try {
      const res = await axios.put(
        `${url}/saas-plan/add-plan/${data?.subscriptions[0]?._id}`,
        {
          plan: updatedForm,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        navigate("/dashboard/saas-plan/planDetails");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading2(false);
    }
  };

  return (
    <>
      <form className="mt-16">
        <NameMark label="Add Saas Plan" variant="primary" />
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex gap-8 flex-wrap">
              <EditInput
                basis={100}
                label="Plan Name"
                value={planForm?.name}
                onChange={(e) =>
                  setPlanForm({ ...planForm, name: e.target.value })
                }
              />
              <div className="basis-full">
                <label className="text-sm font-semibold text-black">
                  Plan Description
                </label>
                <TextEditor setForm={setPlanForm} fieldName={"description"} />
              </div>
              <EditInput
                basis={48}
                label="Plan Duration (in months)"
                value={planForm?.Duration as number}
                onChange={(e) =>
                  setPlanForm({
                    ...planForm,
                    Duration: parseInt(e.target.value),
                  })
                }
              />
              <EditInput
                basis={48}
                min={1}
                type={"number"}
                label="Plan Price"
                value={planForm?.price as number}
                onChange={(e) =>
                  setPlanForm({ ...planForm, price: parseInt(e.target.value) })
                }
              />
            </div>
            <Buttons
              type="button"
              className="mt-4 float-right"
              onClick={handlePlan}
            >
              {loading2 ? <Spinner btn /> : "Add Plan"}
            </Buttons>
          </>
        )}
      </form>
    </>
  );
};

export default AddPlan;
