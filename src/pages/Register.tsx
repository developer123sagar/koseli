/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth_content } from "@/constants";
import { CustomIcon, Spinner, ToastMsg } from "@/common";
import { Link, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { signupUser } from "@/redux/auth/signupSlice";
import { useState } from "react";
import { useUniqueUUID } from "@/hooks/useUniqueUUID";
import { MessageType } from "@/types";
import Buttons from "@/common/Button";

type FormState = {
  [key: string]: string;
};

export default function Register() {
  const navigate = useNavigate();
  const { input, log_submit, reg_submit, reg_content } = auth_content;

  const UID = useUniqueUUID();

  const [messages, setMessages] = useState<MessageType[]>([]);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirm_pass: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.signup);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password === form.confirm_pass) {
      const { confirm_pass, ...newFormValues } = form;

      dispatch(signupUser(newFormValues)).then((result) => {
        if (signupUser.fulfilled.match(result)) {
          const message = result.payload;
          setMessages([
            {
              id: UID(),
              msg: message,
              theme: "success",
            },
          ]);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          let errorMsg: string | undefined;
          if (result.error) {
            errorMsg = result.error.message;
            setMessages([
              {
                id: UID(),
                msg: errorMsg || "something went wrong",
                theme: "fail",
              },
            ]);
          }
        }
      });
    } else {
      setMessages([
        {
          id: UID(),
          msg: "Password did not matched",
          theme: "warn",
        },
      ]);
    }
  };

  return (
    <>
      <ToastMsg messages={messages} setMessages={setMessages} />
      <div className="h-[99vh] flex w-full  overflow-y-scroll overflow-x-hidden">
        <div className="md:w-[90%] w-full flex items-center justify-center  overflow-y-scroll bg-[#fff] min-h-screen px-3 md:px-10 md:py-5  shadow-lg scrollbar-hide">
          <div className=" md:w-[70%] lg:w-[60%] w-full  ">
          <aside className="mt-4   ">
            <figure
            // className="border-b-[1px] border-gray-300"
            >
              <Link to="/">
                <img
                  src="logo.png"
                  alt="Koseli"
                  className="object-cover mx-auto pb-3 md:w-28 w-20 h-10 md:h-28"
                />
              </Link>
            </figure>
            {/* <div className="flex flex-col gap-2">
              <button className="flex items-center justify-start gap-8 text-white w-full h-[40px] bg-[#444444] overflow-hidden rounded">
                <CustomIcon icon={btn2.icon} size={30} className="ml-5" />{" "}
                {btn2.reg_name}
              </button>
            </div> */}
            {/* <div className="text-center bg-[#ededed] h-[2px] w-full mt-[30px]">
              <span className="relative -top-[20px] inline-block p-[10px] italic bg-white">
                Or
              </span>
            </div> */}
            <form onSubmit={handleSignup}>
              <div className="flex flex-col gap-3 mt-3 ">
                {input.map((item, id) => (
                  <div key={`${item.formName}..${id}`} className="relative">
                    <input
                      required
                      name={item.formName}
                      value={form[item.formName]}
                      onChange={handleInputChange}
                      placeholder={item.placeholder}
                      type={item.type}
                      className="form-control md:w-full w-full  bg-slate-50 py-3 pl-10  md:pl-10 placeholder:pl-10 placeholder:text-gray-500 border border-gray-200"
                    />
                    <CustomIcon
                      icon={item.icon}
                      className="absolute top-4 left-3"
                      size={20}
                      color="gray"
                    />
                  </div>
                ))}
                <Buttons
                  type="submit"
                  className="w-full flex items-center justify-center"
                >
                  {" "}
                  {loading ? <Spinner btn /> : reg_submit}
                </Buttons>
              </div>
            </form>
            <div className="flex items-center gap-2 mt-2 w-fit mx-auto">
              <small>{reg_content}</small>{" "}
              <Link to="/login">
                <small className="text-[#e54350]">{log_submit}</small>
              </Link>
            </div>
          </aside>
          </div>
        </div>
        <div className="hidden md:block w-full">
          <img src="/login.jpg" alt="login" className="w-full h-full"/>
        </div>
        
      </div>
    </>
  );
}
