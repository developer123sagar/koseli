import { CustomIcon, Spinner, ToastMsg } from "@/common";
import { signinAdmin } from "@/redux/auth/loginSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUniqueUUID } from "@/hooks/useUniqueUUID";
import { adminLoginField } from "@/constants";
import { MessageType } from "@/types";
import { auth_content } from "@/constants";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

type FormState = {
  [key: string]: string;
};

const AdminLogin = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [form, setForm] = useState<FormState>({
    emailOrUsername: "",
    password: "",
    Email: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const UID = useUniqueUUID();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.signin);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    if (name === "emailOrUsername") {
      setForm((prevForm) => ({
        ...prevForm,
        Email: value,
      }));
    }
  };

  const handleSignin = (e: FormEvent) => {
    e.preventDefault();
    dispatch(signinAdmin(form)).then((result) => {
      if (signinAdmin.fulfilled.match(result)) {
        navigate("/dashboard");
      } else {
        setMessages([
          {
            id: UID(),
            msg: "error during login",
            theme: "fail",
          },
        ]);
      }
    });
  };

  const { log_content, reg_forgot, reg_remember, reg_submit } = auth_content;

  return (
    <>
      <ToastMsg messages={messages} setMessages={setMessages} />
      <div className=" flex ">
        <div className="w-[100%]  r-md:w-1/2 pl-[13%] pr-[13%] overflow-y-scroll bg-[#fff] min-h-screen px-10 py-5 shadow-lg scrollbar-hide">
          <div className="mt-[90px]">
            <figure>
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="Koseli"
                  width={200}
                  height={200}
                  className="object-contain mx-auto"
                />
              </Link>
            </figure>
            <h1 className="mt-[-30px] text-[2rem] text-center">
              {" "}
              Random&nbsp;<span className="font-bold">
                Nepali&nbsp;
              </span>text{" "}
            </h1>
            <div className="flex flex-col gap-2"></div>
            <form onSubmit={handleSignin}>
              <div className="flex flex-col gap-3 mt-8">
                {adminLoginField.map((item, id) => (
                  <div key={`${item.formName}..${id}`} className="relative">
                    <input
                      name={item.formName}
                      value={form[item.formName]}
                      onChange={handleInputChange}
                      required
                      placeholder={item.placeholder}
                      type={showPassword ? "text" : `${item.type}`}
                      className="form-control w-full bg-slate-50 py-3 pl-10 rounded placeholder:text-gray-500 border border-gray-200"
                    />
                    {item.type === "password" ? (
                      <div className=" flex justify-end">
                        <CustomIcon
                          icon={item.icon}
                          className="absolute top-4   left-3"
                          size={20}
                          color="gray"
                        />
                        {!showPassword ? (
                          <IoEyeOutline
                            className="absolute top-4 mx-3 cursor-pointer"
                            size={20}
                            color="gray"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <FaRegEyeSlash
                            className="absolute top-4 mx-3 cursor-pointer"
                            size={20}
                            color="gray"
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </div>
                    ) : (
                      <CustomIcon
                        icon={item.icon}
                        className="absolute top-4   left-3"
                        size={20}
                        color="gray"
                      />
                    )}
                  </div>
                ))}
                <div className="w-full flex justify-between items-center">
                  <div className="float-left">
                    <label className="container_check text-[#999] text-sm">
                      {reg_remember}
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <button className="text-[#999] text-sm">{reg_forgot}</button>
                </div>
                <div className="pl-5 pr-5">
                  <button className="w-full px-6 py-2 rounded-[25px] h-[45px] mt-5 text-white bg-[#d66d45] font-bold flex items-center justify-center">
                    {loading ? <Spinner btn /> : `Login`}
                  </button>
                </div>
              </div>
            </form>
            <div className="flex items-center gap-2 mt-2 w-fit mx-auto">
              <small>{log_content}</small>
              <Link to="/register">
                <small className="text-[#e54350]">{reg_submit}</small>
              </Link>
            </div>
          </div>
        
        </div>
        <div className="hidden lg:block">
            <img src="/login.jpg" alt="login"  />
          </div>
      </div>
    </>
  );
};

export default AdminLogin;
