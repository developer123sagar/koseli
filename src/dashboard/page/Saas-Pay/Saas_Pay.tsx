/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Spinner } from "@/common";
import { RootState, useAppSelector } from "@/redux/store";
import { url } from "@/routes";
import { useEffect, useRef, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { subscription } from "@/constants";
import { motion } from "framer-motion";
import Buttons from "@/common/Button";

interface Subscription {
  name: string;
  price: number;
  description: string;
  Duration: number;
}

export default function Saas_Pay() {
  const [planId, setPlanId] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectPlan, setSelectPlan] = useState({
    Plan1: {
      name: "",
      duration: 3,
      price: 1,
      id: "",
    },
    Plan2: {
      name: "",
      duration: 2,
      price: 2,
      id: "",
    },
    Plan3: {
      name: "",
      duration: 5,
      price: 3,
      id: "",
    },
  });
  const [duration, SetDuration] = useState<number>();
  const [price, SetPrice] = useState<number>();

  const selectOption = (name: string) => {
    setSelectedPlanName(name);
    if (name === selectPlan.Plan1.name) {
      SetDuration(selectPlan.Plan1.duration);
      SetPrice(selectPlan.Plan1.price);
      setPlanId(selectPlan.Plan1.id);
    } else if (name === selectPlan.Plan2.name) {
      SetDuration(selectPlan.Plan2.duration);
      SetPrice(selectPlan.Plan2.price);
      setPlanId(selectPlan.Plan2.id);
    } else {
      SetDuration(selectPlan.Plan3.duration);
      SetPrice(selectPlan.Plan3.price);
      setPlanId(selectPlan.Plan3.id);
    }
  };

  const { token } = useAppSelector((state: RootState) => state.signin);

  useEffect(() => {
    const getSaasData = async () => {
      try {
        const res = await axios.get(`${url}/saas-plan`, {
          headers: {
            Authorization: token,
          },
        });
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSaasData();
  }, [token]);

  useEffect(() => {
    if (Array.isArray(data?.subscriptions))
      setSelectPlan({
        Plan1: {
          duration: data?.subscriptions[0]?.plans[0]?.Duration,
          name: data?.subscriptions[0]?.plans[0]?.name,
          price: data?.subscriptions[0]?.plans[0]?.price,
          id: data?.subscriptions[0]?.plans[0]?._id,
        },
        Plan2: {
          duration: data?.subscriptions[0]?.plans[1]?.Duration,
          name: data?.subscriptions[0]?.plans[1]?.name,
          price: data?.subscriptions[0]?.plans[1]?.price,
          id: data?.subscriptions[0]?.plans[1]?._id,
        },
        Plan3: {
          duration: data?.subscriptions[0]?.plans[2]?.Duration,
          name: data?.subscriptions[0]?.plans[2]?.name,
          price: data?.subscriptions[0]?.plans[2]?.price,
          id: data?.subscriptions[0]?.plans[2]?._id,
        },
      });
  }, [data?.subscriptions]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${url}/saas-Subscriber/subscriber/initiate-payment`,
        {
          planId: planId,
          website_url: "https://koseli.app/",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.status === 200 && res.data) {
        window.open(res.data, "_blank");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const slideLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 320;
    }
  };

  const slideRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 320;
    }
  };

  return (
    <>
      <div className="flex w-full gap-12 mt-16">
          <div className="relative flex items-center group w-fit">
            <MdChevronLeft
              onClick={slideLeft}
              size={30}
              className="bg-gray-200 h-6 w-6 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-40 hidden group-hover:block left-0"
            />
            <div
              ref={scrollRef}
              className="overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide w-[320px]"
            >
              {Array.isArray(data?.subscriptions) &&
                data?.subscriptions[0]?.plans?.map(
                  (item: Subscription, index: number) => (
                    <div
                      className="w-[160px] sm:w-[200px] md:w-[250px] lg:w-[320px] inline-block cursor-pointer relative p-2"
                      key={item?.Duration + index}
                    >
                      <div className="relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke bg-white px-8 py-10 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]">
                        <span className="mb-3 block text-[#323232] text-[20px] font-extrabold">
                          {item.name}
                        </span>
                        <h2 className="mb-5 text-2xl font-bold text-black">
                          Rs.{item.price} for{" "}
                          {item.Duration && item.Duration / 30} month
                        </h2>
                        <p className="mb-8 border-b border-stroke pb-8 text-base text-body-color dark:border-dark-3 dark:text-dark-6">
                          {item.description}
                        </p>
                        <Buttons
                          type="button"
                          onClick={() => selectOption(item.name)}
                          className="w-full flex items-center justify-center"
                        >
                          {selectedPlanName === item.name ? (
                            <motion.img
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              src="/Success.png"
                              className="w-8 h-8 object-cover"
                            />
                          ) : (
                            `Choose ${item.name}`
                          )}
                        </Buttons>

                        <div>
                          <span className="absolute right-0 top-7 z-[-1]">
                            <svg
                              width="77"
                              height="172"
                              viewBox="0 0 77 172"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="86"
                                cy="86"
                                r="86"
                                fill="url(#paint0_linear)"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear"
                                  x1="86"
                                  y1="0"
                                  x2="86"
                                  y2="172"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop
                                    stopColor="#3056D3"
                                    stopOpacity="0.09"
                                  />
                                  <stop
                                    offset="1"
                                    stopColor="#C4C4C4"
                                    stopOpacity="0"
                                  />
                                </linearGradient>
                              </defs>
                            </svg>
                          </span>
                          <span className="absolute right-4 top-4 z-[-1]">
                            <svg
                              width="41"
                              height="89"
                              viewBox="0 0 41 89"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="38.9138"
                                cy="87.4849"
                                r="1.42021"
                                transform="rotate(180 38.9138 87.4849)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="38.9138"
                                cy="74.9871"
                                r="1.42021"
                                transform="rotate(180 38.9138 74.9871)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="38.9138"
                                cy="62.4892"
                                r="1.42021"
                                transform="rotate(180 38.9138 62.4892)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="38.9138"
                                cy="38.3457"
                                r="1.42021"
                                transform="rotate(180 38.9138 38.3457)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="38.9138"
                                cy="13.634"
                                r="1.42021"
                                transform="rotate(180 38.9138 13.634)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="38.9138"
                                cy="50.2754"
                                r="1.42021"
                                transform="rotate(180 38.9138 50.2754)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="38.9138"
                                cy="26.1319"
                                r="1.42021"
                                transform="rotate(180 38.9138 26.1319)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="38.9138"
                                cy="1.42021"
                                r="1.42021"
                                transform="rotate(180 38.9138 1.42021)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="26.4157"
                                cy="87.4849"
                                r="1.42021"
                                transform="rotate(180 26.4157 87.4849)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="26.4157"
                                cy="74.9871"
                                r="1.42021"
                                transform="rotate(180 26.4157 74.9871)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="26.4157"
                                cy="62.4892"
                                r="1.42021"
                                transform="rotate(180 26.4157 62.4892)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="26.4157"
                                cy="38.3457"
                                r="1.42021"
                                transform="rotate(180 26.4157 38.3457)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="26.4157"
                                cy="13.634"
                                r="1.42021"
                                transform="rotate(180 26.4157 13.634)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="26.4157"
                                cy="50.2754"
                                r="1.42021"
                                transform="rotate(180 26.4157 50.2754)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="26.4157"
                                cy="26.1319"
                                r="1.42021"
                                transform="rotate(180 26.4157 26.1319)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="26.4157"
                                cy="1.4202"
                                r="1.42021"
                                transform="rotate(180 26.4157 1.4202)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="13.9177"
                                cy="87.4849"
                                r="1.42021"
                                transform="rotate(180 13.9177 87.4849)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="13.9177"
                                cy="74.9871"
                                r="1.42021"
                                transform="rotate(180 13.9177 74.9871)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="13.9177"
                                cy="62.4892"
                                r="1.42021"
                                transform="rotate(180 13.9177 62.4892)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="13.9177"
                                cy="38.3457"
                                r="1.42021"
                                transform="rotate(180 13.9177 38.3457)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="13.9177"
                                cy="13.634"
                                r="1.42021"
                                transform="rotate(180 13.9177 13.634)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="13.9177"
                                cy="50.2754"
                                r="1.42021"
                                transform="rotate(180 13.9177 50.2754)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="13.9177"
                                cy="26.1319"
                                r="1.42021"
                                transform="rotate(180 13.9177 26.1319)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="13.9177"
                                cy="1.42019"
                                r="1.42021"
                                transform="rotate(180 13.9177 1.42019)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="1.41963"
                                cy="87.4849"
                                r="1.42021"
                                transform="rotate(180 1.41963 87.4849)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="1.41963"
                                cy="74.9871"
                                r="1.42021"
                                transform="rotate(180 1.41963 74.9871)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="1.41963"
                                cy="62.4892"
                                r="1.42021"
                                transform="rotate(180 1.41963 62.4892)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="1.41963"
                                cy="38.3457"
                                r="1.42021"
                                transform="rotate(180 1.41963 38.3457)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="1.41963"
                                cy="13.634"
                                r="1.42021"
                                transform="rotate(180 1.41963 13.634)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="1.41963"
                                cy="50.2754"
                                r="1.42021"
                                transform="rotate(180 1.41963 50.2754)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="1.41963"
                                cy="26.1319"
                                r="1.42021"
                                transform="rotate(180 1.41963 26.1319)"
                                fill="#3056D3"
                              />
                              <circle
                                cx="1.41963"
                                cy="1.4202"
                                r="1.42021"
                                transform="rotate(180 1.41963 1.4202)"
                                fill="#3056D3"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
            <MdChevronRight
              onClick={slideRight}
              size={30}
              className="bg-gray-200 h-6 w-6 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-40 hidden group-hover:block right-0"
            />
          </div>

          {selectedPlanName && (
            <div className="bg-brown-600 border-stroke border-1 border items-center justify-center py-5 px-10">
              <div>
                <h1 className="text-[#323232] text-xl text-center font-extrabold">
                  Please choose any subscription package
                </h1>
                <p className="text-[#323232] text-base text-center">
                  In order to use our services You have to make subscription.
                </p>

                <form className="mt-4">
                  <div className="flex gap-10">
                    <div className="flex flex-col gap-2">
                      <ViewInputField
                        label="Duration (in months)"
                        value={duration! && ((duration / 30) as number)}
                      />

                      <div className="w-[100%]">
                        <label
                          htmlFor="payment"
                          className="text-lg font-bold pb-10 "
                        >
                          Payment Method
                        </label>
                        <div className="text-sm w-full bg-white  flex  pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1">
                          <img
                            src="/img/khalti.png"
                            alt="Khalti"
                            className="dropdown-image h-12"
                          />
                        </div>

                        <Buttons
                          onClick={handleFormSubmit}
                          variant="secondary"
                          className="w-full flex items-center justify-center"
                        >
                          {loading ? <Spinner btn /> : "Pay"}
                        </Buttons>
                      </div>
                    </div>
                    <br />

                    {selectedPlanName && (
                      <div className="mt-2 w-[70%]">
                        <h1 className="text-[#323232] text-xl font-extrabold">
                          Summary
                        </h1>

                        {subscription.map((item, id) => (
                          <div
                            key={`${item.value}..${id}`}
                            className="flex justify-between"
                          >
                            <h1 className="text-[#323232] text-base">
                              {item.label}
                            </h1>
                            <h1
                              className={`text-${
                                item.value === "price" ? "red-800" : "[#323232]"
                              } text-base font-bold`}
                            >
                              {item.value === "price"
                                ? `Rs. ${price}`
                                : item.value === "duration"
                                ? `${duration && duration / 30} month`
                                : item.value === "name"
                                ? selectedPlanName
                                : selectedPlanName}
                            </h1>
                          </div>
                        ))}

                        <hr />
                        <div className="flex justify-between mt-1">
                          <h1 className="text-[#323232] text-base font-bold ">
                            Total
                          </h1>
                          <h1 className="text-[#323232] text-base font-bold ">
                            Rs. {price}
                          </h1>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
    </>
  );
}
