import { useEffect, useState } from "react";
import { Dashboard_Layout } from "@/layout";
import { Spinner, TextEditor } from "@/common";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { pushNotification } from "@/redux/notification/notificationSlice";

export default function CustomerNotification() {
  const { loading } = useAppSelector((state: RootState) => state.fetchDashData);

  const { res } = useAppSelector((state: RootState) => state.notification);

  const [label, setLabel] = useState("");
  const [body, setBody] = useState({ value: "" });
  const [showPopup,setShowPopup]=useState("");

  useEffect(() => {
    setLabel(res);
  }, [res]);

  const dispatch = useAppDispatch();

  const [form, setForm] = useState<any>({
    to: "/topics/TPRIDERKOSELI",
    notification: {
      body: " ",
      title: " ",
    },
    data: {
      routeId: 6,
    },
  });

  const sendCustomerNotification = () => {
    form.to = "/topics/TPCUSTOMERKOSELI";
    form.notification.body = body?.value;
    console.log(form);
    setShowPopup("");
    dispatch(pushNotification(form));
  };
  const sendRiderNotification = () => {
    form.to = "/topics/TPRIDERKOSELI";
    form.notification.body = body?.value;
    console.log(form);
    setShowPopup("");
    dispatch(pushNotification(form));
  };

  return (
    <>
      <div className={`absolute top-0 right-0 left-0 bottom-0 z-99 bg-[rgba(0,0,0,.7)] ${showPopup==="" && 'hidden' }`} onClick={()=>setShowPopup("")}/>
      <div className="relative">
        <Dashboard_Layout button={false} isDeleteBtn={false}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <EditInput
                label=""
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notification: {
                      ...form.notification,
                      title: e.target.value,
                    },
                  })
                }
                placeH="Enter notification header"
              />
              <div className="mt-5" />
              <TextEditor setForm={setBody} fieldName="value" />
              <button
                className="bg-[#e01f2d]
          font-bold mt-7 border rounded px-8 text-center text-white h-[50px] -z-1"
                onClick={()=>setShowPopup("customer")}
              >
                Send to customer
              </button>
              <button
                className="bg-[#e01f2d]
          font-bold mt-7 border rounded px-8 text-center text-white h-[50px] -z-1 ml-3"
                onClick={()=>setShowPopup("rider")}
              >
                {" "}
                Send to rider{" "}
              </button>
              <h1 className="mt-10 text-green-500"> {label} </h1>
            </>
          )}
        </Dashboard_Layout>
        <div className={`absolute top-[50px] left-[30%] border border-[rgb(200,200,200)] p-5 z-999999 bg-white ${showPopup==="" && 'hidden'}`}>
          
          <h1> Are you sure you want to send the notification to {showPopup} ?</h1>
          <button
                className="bg-[#e01f2d]
          font-bold mt-7 border rounded px-8 text-center text-white h-[50px] -z-1"
                onClick={()=>{
                  if(showPopup==="customer") sendCustomerNotification();
                  else if(showPopup==="rider") sendRiderNotification();
                }}
              >
                {" "}
                Send{" "}
              </button>
        </div>
      </div>
    </>
  );
}
