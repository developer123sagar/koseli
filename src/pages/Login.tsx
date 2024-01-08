/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth_content } from "@/constants";
import { CustomIcon, Modal, Spinner, ToastMsg } from "@/common";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle, signinUser } from "@/redux/auth/loginSlice";
import { useAppDispatch } from "@/redux/store";
import { FormEvent, useRef, useState } from "react";
import { useUniqueUUID } from "@/hooks/useUniqueUUID";
import { MessageType } from "@/types";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/config/firebase";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import Buttons from "@/common/Button";
import axios from "axios";
import { url } from "@/routes";
import { MdOutlineMail } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

type FormState = {
  [key: string]: string;
};

export default function Login() {
  const { btn2, input, log_content, reg_forgot, log_submit, reg_submit } =
    auth_content;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });

  const [reset, setReset] = useState({
    email: "",
  });
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [resetErrMsg, setResetErrMsg] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetCode, setResetCode] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [resetPassForm, setResetPassForm] = useState({
    email: "",
    enteredOTP: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleResetCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    setResetCode((prevCodes) => {
      const newCodes = [...prevCodes];
      newCodes[index] = value;
      return newCodes;
    });

    if (value === "") {
      const prevIndex = index > 0 ? index - 1 : 0;
      if (inputRefs.current[prevIndex]) {
        inputRefs.current[prevIndex]?.focus();
      }
    } else if (
      index < inputRefs.current.length - 1 &&
      inputRefs.current[index + 1]
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const UID = useUniqueUUID();
  const navigate = useNavigate();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrMsg("");
    setReset({
      email: "",
    });
    setResetErrMsg("");
    setResetPassForm({
      confirmPassword: "",
      email: "",
      enteredOTP: "",
      newPassword: "",
    });
  };

  const closeResetModal = () => {
    setIsResetModalOpen(false);
    setResetErrMsg("");
    setResetPassForm({
      confirmPassword: "",
      email: "",
      enteredOTP: "",
      newPassword: "",
    });
  };

  const dispatch = useAppDispatch();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(signinUser(form)).then((result) => {
        if (signinUser.fulfilled.match(result)) {
          navigate("/");
        } else {
          let errorMsg: string | undefined;
          if (result.error) {
            errorMsg = result.error.message || "Error during login";
          }
          setMessages([
            {
              id: UID(),
              msg: errorMsg!,
              theme: "fail",
            },
          ]);
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        const token = await data.user.getIdToken();
        if (token) {
          await dispatch(
            signInWithGoogle({
              api: "client/register-or-link-google",
              tokenId: token,
            })
          );
          if (
            localStorage.getItem("longitude") &&
            localStorage.getItem("latitude")
          ) {
            navigate("/rest_details/noId");
          } else {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleResetCode = async (e: FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    try {
      const res = await axios.post(`${url}/client/forgot_password`, reset);

      if (res.status === 200) {
        setIsModalOpen(false);
        setIsResetModalOpen(true);
      }
    } catch (err: any) {
      setErrMsg(err.response.data.messege);
    } finally {
      setForgotLoading(false);
    }
  };

  const handleSubmitResetPass = async (e: FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    const otp = resetCode.join("");
    const updatedForm = { ...resetPassForm };

    updatedForm.enteredOTP = otp;
    updatedForm.email = reset.email;
    console.log(updatedForm);
    if (resetPassForm.newPassword === resetPassForm.confirmPassword) {
      if (otp.length === 6)
        try {
          const res = await axios.post(
            `${url}/client/reset-password`,
            updatedForm
          );
          if (res.status === 200) {
            setIsResetModalOpen(false);
            setMessages([
              {
                id: UID(),
                msg: res.data || "Success",
                theme: "success",
              },
            ]);
          }
        } catch (err) {
          console.log(err);
        }
    } else {
      setResetErrMsg("Password do not match");
    }
    setResetLoading(false);
  };

  return (
    <>
      <ToastMsg messages={messages} setMessages={setMessages} />
      <div className="flex ">
        <div className="w-[100%] r-md:w-1/2 pl-[13%]  pr-[13%]  overflow-y-scroll bg-[#fff] min-h-[100vh] px-10 md:py-5  shadow-lg scrollbar-hide">
          <div className="lg:mt-[70px] sm:mt-[4px] mt-[2px] ">
            <figure>
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="Koseli"
                  width={200}
                  height={200}
                  className="object-contain h-28 w-28  mx-auto"
                />
              </Link>
            </figure>
            <h1 className="mt-[-30px] md:text-[2rem] text-[20px] text-center">
              Random&nbsp;<span className="font-bold">Nepali&nbsp;</span>text
            </h1>
            <div className="flex flex-col gap-2"></div>
            <form onSubmit={handleSignin}>
              <div className="flex flex-col gap-3 ">
                {input.map((item, id) => (
                  <div key={`${item.formName}..${id}`} className="relative">
                    {item.showLog && (
                      <>
                        <input
                          name={item.formName}
                          value={form[item.formName]}
                          onChange={handleInputChange}
                          required
                          placeholder={item.placeholder}
                          type={showPassword ? "text" : `${item.type}`}
                          className="form-control w-full bg-slate-50 py-3 pl-10 rounded placeholder:text-gray-500 border border-gray-200 "
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
                      </>
                    )}
                  </div>
                ))}
                <div className="w-full flex justify-between items-center">
                  <div className="float-left">
                    <button type="button">Resend Link</button>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-[#999] text-sm"
                    type="button"
                  >
                    {reg_forgot}
                  </button>
                </div>
                <div className="pl-5 pr-5">
                  <button className="w-full px-6 py-2 rounded-[25px] h-[45px] mt-5 text-gray-900 bg-[#efefefef] font-bold flex items-center justify-center">
                    {loading ? <Spinner btn /> : `${log_submit}`}
                  </button>
                </div>
                <div className="pl-5 pr-5">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-8 text-white text-[12px] sm:text-[16px] w-full h-[50px] bg-[#444444] overflow-hidden rounded-[25px] pt-5 pb-5 pl-2 relative font-bold"
                    onClick={googleLogin}
                  >
                    <div className="bg-white h-[40px] w-[40px] absolute top-[5px]   left-[7px] rounded-[50%] flex justify-center items-center">
                      <CustomIcon icon={btn2.icon} size={30} />
                    </div>
                    {btn2.log_name}
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
        <div className="hidden md:block " >
          <img src="/login.jpg" alt="login" className="h-full w-full object-cover"  />
        </div>
      </div>
      {/* forgot password modal */}
      <Modal isOpen={isModalOpen} setIsOpen={closeModal} maxWidth="max-w-lg">
        <div className="py-10 px-5">
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Reset Your Password
          </h1>
          <p className="font-extrabold text-center mt-2">
            We'll email you a secure code to reset <br /> the password for your
            account
          </p>
          <div className="my-3">
            <form>
              <EditInput
                label="Email"
                type="email"
                required
                placeH="Enter your email address"
                value={reset.email}
                onChange={(e) => setReset({ ...reset, email: e.target.value })}
              />
              <span className="text-rose-500">{errMsg && errMsg}</span>
              <Buttons
                type="submit"
                onClick={handleResetCode}
                className="w-full flex items-center justify-center mt-4"
                variant="secondary"
              >
                {forgotLoading ? <Spinner btn /> : "Send a reset code"}
              </Buttons>
            </form>
          </div>

          <div className="flex items-center gap-2 mt-2 w-fit mx-auto">
            <small>{log_content}</small>
            <Link to="/register">
              <small className="text-[#e54350]">{reg_submit}</small>
            </Link>
          </div>
        </div>
      </Modal>
      {/* reset password modal */}

      <Modal
        isOpen={isResetModalOpen}
        setIsOpen={closeResetModal}
        maxWidth="max-w-lg"
      >
        <div className="py-6 px-8">
          <div className="w-12 h-12 flex mx-auto items-center justify-center border-[1px] border-gray-300 shadow-inner py-2 px-3 bg-gray-200 rounded-full">
            <MdOutlineMail color="purple" size={40} />
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-900">
            Check your email
          </h1>
          <p className="font-extrabold text-center mt-2">
            Please enter your 6-digit code. Then create and <br /> confirm your
            new password
          </p>
          <div className="my-3">
            <div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-start text-sm">
                  <span className="font-bold text-[#141312] bg-white">
                    6-Digit Code
                  </span>
                </div>
              </div>

              <div className="flex gap-4 flex-col">
                <div className="flex items-center justify-between w-full">
                  {resetCode.map((code, index) => (
                    <input
                      key={index}
                      className="resetInput"
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={code}
                      onChange={(e) => handleResetCodeChange(e, index)}
                      ref={(input) => (inputRefs.current[index] = input)}
                    />
                  ))}
                </div>
                <EditInput
                  value={resetPassForm.newPassword}
                  onChange={(e) =>
                    setResetPassForm({
                      ...resetPassForm,
                      newPassword: e.target.value,
                    })
                  }
                  label="New Password"
                  type="password"
                />
                <EditInput
                  value={resetPassForm.confirmPassword}
                  onChange={(e) =>
                    setResetPassForm({
                      ...resetPassForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  label="Confirm Password"
                  type="password"
                />
              </div>
              <span className="text-rose-500 text-sm font-bold mt-2">
                {resetErrMsg && resetErrMsg}
              </span>
              <Buttons
                type="button"
                onClick={handleSubmitResetPass}
                className="w-full flex items-center justify-center mt-6"
                variant="secondary"
              >
                {resetLoading ? <Spinner btn /> : "Reset Password"}
              </Buttons>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
