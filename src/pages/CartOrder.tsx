/* eslint-disable @typescript-eslint/no-explicit-any */

import { PageLayout } from "@/layout";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl, url } from "@/routes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CustomIcon, Spinner, ToastMsg } from "@/common";
import { formattedDates, timeSlots } from "@/data/dates";
import {
  IcartDatas,
  decrementItem,
  incrementItem,
  removeItem,
} from "@/redux/cart/cartSliice";
import { IDeliveryForm, MessageType } from "@/types";
import { useUniqueUUID } from "@/hooks/useUniqueUUID";
import { useNavigate } from "react-router-dom";
import {
  payment,
  setSelectedPaymentMethod,
} from "@/redux/checkout-payment/paymentSlice";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import Buttons from "@/common/Button";
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import axios from "axios";
import CartStepper from "@/components/CartStepper";
interface ICalculation {
  distanceAmount: number;
  discount: number;
  tax: number;
  foodPreparing: string;
  TotalAmount: number | null;
  foodAmount: number;
  AddonsubTotal: number | null;
}

type CartOrderProp = {
  currentDay: string;
  selectedTimeSlot: string;
  setCurrentDay: Dispatch<SetStateAction<string>>;
  setSelectedTimeSlot: Dispatch<SetStateAction<string>>;
};

export default function CartOrder(props: CartOrderProp) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [specialNote, setSpecialNote] = useState("");
  const [addressLocation, setAddressLocation] = useState<[number, number]>([
    0, 0,
  ]);
  const [showEditPopUp, setShowEditPopUp] = useState(false);

  const { cartDatas } = useAppSelector((state: RootState) => state.cart);
  const { userToken } = useAppSelector((state: RootState) => state.signin);
  const [calculation, setCalculation] = useState<ICalculation | null>(null);
  const [cuponCode, setCuponCode] = useState("");

  const { isDeliveryformSubmitted, selectedPaymentMethod, loading } =
    useAppSelector((state: RootState) => state.payment);

  const data: IDeliveryForm[] = useAppSelector(
    (state: RootState) => state.fetchDashData.data
  );
  const dispatch = useAppDispatch();
  const UID = useUniqueUUID();
  const navigate = useNavigate();

  const totalQuantity = cartDatas?.reduce<number>(
    (acc, food) => acc + food.minQuantity,
    0
  );

  const product_details = cartDatas.map((item) => ({
    identity: item._id,
    quantity: item.minQuantity,
    name: item.name,
    unit_price: item.price,
    total_price: item.total,
    restaurant: item.restaurant,
    addon: [
      ...item.addon.map((item) => ({
        addon_identity: item._id,
        addon_name: item.name,
        addon_price: item.extraPrice,
        addon_quantity: item.quantity,
      })),
    ],
    ...(selectedPaymentMethod === "CASH_ON_DEVLIVERY" && {
      specialNote: specialNote,
    }),
  }));

  useEffect(() => {
    dispatch(
      fetchDashboardData({ api: "deliveryAddress/user", token: userToken! })
    );
  }, [dispatch, userToken, isDeliveryformSubmitted]);

  useEffect(() => {
    const storedCurrentDay = localStorage.getItem("currentDay");
    const storedSelectedSlot = localStorage.getItem("selectedTimeSlot");

    if (storedCurrentDay && storedSelectedSlot) {
      props.setCurrentDay(storedCurrentDay);
      props.setSelectedTimeSlot(storedSelectedSlot);
    }
  }, []);

  const resultString = cartDatas
    .map((item) => `${item.name}:${item.minQuantity}`)
    .join(",");

  const khaltiPayload: any = {
    website_url: "https://www.koseli.com",
    purchase_order_name: resultString,
    deliveryType: localStorage.getItem("deliveryType") || "",
    specialNote: specialNote,
    location: addressLocation,
    paymentMode: selectedPaymentMethod,
    product_details: product_details,
  };

  useEffect(() => {
    if (props.currentDay !== "" && props.selectedTimeSlot !== "") {
      khaltiPayload.isScheduledForLater = true;

      const dateString = props.currentDay;

      // Extract the date string
      const dateArray = dateString.split(", ");
      console.log(dateArray);
      const monthDayYear = dateArray[2].split(" ");
      console.log(monthDayYear);
      const month = monthDayYear[0];
      console.log(month);
      const day = parseInt(monthDayYear[1], 10);
      console.log(day);
      const year = parseInt(dateArray[3], 10);
      console.log(year);

      // Create a new Date object
      const newDate = new Date(`${month} ${day}, ${year}`);

      khaltiPayload.scheduleTime = props.selectedTimeSlot;
      khaltiPayload.scheduledDate = newDate;

      console.log(khaltiPayload);
    }
  }, [props.currentDay, props.selectedTimeSlot]);

  const COD_Payload: any = {
    deliveryType: localStorage.getItem("deliveryType") || "",
    location: addressLocation,
    paymentMode: "CASH_ON_DELIVERY",
    product_details: product_details,
    isScheduledForLater: false,
  };

  // const Stripe_Payload: any = {
  //   purchase_order_name: resultString,
  //   deliveryType: localStorage.getItem("deliveryType") || "",
  //   specialNote: specialNote,
  //   location: addressLocation,
  //   paymentMode: selectedPaymentMethod,
  //   product_details: product_details,
  //   isScheduledForLater: false,
  // };

  // const handleStripePayment = async () => {
  //   if (props.currentDay !== "" && props.selectedTimeSlot !== "") {
  //     Stripe_Payload.isScheduledForLater = true;

  //     const dateString = props.currentDay;

  //     // Extract the date string
  //     const dateArray = dateString.split(", ");
  //     console.log(dateArray);
  //     const monthDayYear = dateArray[2].split(" ");
  //     console.log(monthDayYear);
  //     const month = monthDayYear[0];
  //     console.log(month);
  //     const day = parseInt(monthDayYear[1], 10);
  //     console.log(day);
  //     const year = parseInt(dateArray[3], 10);
  //     console.log(year);

  //     // Create a new Date object
  //     const newDate = new Date(`${month} ${day}, ${year}`);

  //     Stripe_Payload.scheduledDate = newDate;
  //     Stripe_Payload.scheduleTime = props.selectedTimeSlot;
  //   }

  //   const stripe = await loadStripe(stripe_pk);
  //   console.log(stripe);

  //   try {
  //     const response = await axios.post(
  //       `${url}/order/placing-order`,
  //       Stripe_Payload,
  //       {
  //         headers: {
  //           Authorization: userToken!,
  //         },
  //       }
  //     );

  //     const result = await stripe?.redirectToCheckout({
  //       sessionId: response.data,
  //     });

  //     if (result?.error) {
  //       console.log(result.error);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleProceedToCheckout = async () => {
    if (userToken) {
      if (selectedPaymentMethod) {
        if (isDeliveryformSubmitted) {
          if (props.currentDay !== "" && props.selectedTimeSlot !== "") {
            COD_Payload.isScheduledForLater = true;

            const dateString = props.currentDay;

            // Extract the date string
            const dateArray = dateString.split(", ");
            console.log(dateArray);
            const monthDayYear = dateArray[2].split(" ");
            console.log(monthDayYear);
            const month = monthDayYear[0];
            console.log(month);
            const day = parseInt(monthDayYear[1], 10);
            console.log(day);
            const year = parseInt(dateArray[3], 10);
            console.log(year);

            // Create a new Date object
            const newDate = new Date(`${month} ${day}, ${year}`);

            COD_Payload.scheduledDate = newDate;
            COD_Payload.scheduleTime = props.selectedTimeSlot;
          }

          if (
            specialNote === "" ||
            addressLocation[0] === 0 ||
            addressLocation[1] === 0
          ) {
            setMessages([
              {
                id: UID(),
                msg: "Please fill up extra details also",
                theme: "fail",
              },
            ]);
            return;
          }
          try {
            if (selectedPaymentMethod === "KHALTI") {
              await dispatch(
                payment({
                  api: "khalti/initiate-payment",
                  paymentMode: "KHALTI",
                  token: userToken,
                  data: khaltiPayload,
                })
              ).then((res) => {
                if (payment.rejected.match(res)) {
                  setMessages([
                    {
                      id: UID(),
                      msg: res.error.message || "something went wrong",
                      theme: "fail",
                    },
                  ]);
                }
              });
            } else if (selectedPaymentMethod === "CASH_ON_DEVLIVERY") {
              await dispatch(
                payment({
                  api: "order/placing-order",
                  paymentMode: "CASH_ON_DEVLIVERY",
                  token: userToken,
                  data: COD_Payload,
                })
              ).then((res) => {
                if (payment.rejected.match(res)) {
                  setMessages([
                    {
                      id: UID(),
                      msg: res.error.message || "something went wrong",
                      theme: "fail",
                    },
                  ]);
                }
              });
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          setMessages([
            {
              id: UID(),
              msg: "Please fill up the delivery address",
              theme: "fail",
            },
          ]);
          setTimeout(() => {
            navigate("/change/deliveryAddress");
          }, 900);
        }
      } else {
        setMessages([
          {
            id: UID(),
            msg: "Please choose payment method",
            theme: "fail",
          },
        ]);
      }
    } else {
      setMessages([
        {
          id: UID(),
          msg: "Please Login first",
          theme: "fail",
        },
      ]);
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    }
  };

  function calculateTotalPrice(foodItem: IcartDatas) {
    const foodPrice = foodItem.price * foodItem.minQuantity || 0;
    const addonPrices = foodItem.addon
      ? foodItem.addon.map((addon) => addon.extraPrice * addon.quantity || 0)
      : [];
    const totalAddonPrice = addonPrices.reduce((sum, price) => sum + price, 0);
    return foodPrice + totalAddonPrice;
  }

  const totalPriceOfCart = cartDatas.reduce(
    (sum, item) => sum + calculateTotalPrice(item),
    0
  );

  const handleCalculation = async (cupon?: boolean) => {
    if (isDeliveryformSubmitted) {
      const updatedform: any = { ...khaltiPayload };
      if (cupon) {
        updatedform.discount_code = cuponCode;
      } else {
        updatedform.discount_code = undefined;
      }
      try {
        const res = await axios.post(`${url}/data/calculation`, updatedform, {
          headers: {
            Authorization: userToken,
          },
        });
        console.log(res.data);
        setCalculation(res.data);
      } catch (err: any) {
        console.log();
        setMessages([
          {
            id: Date.now().toString(),
            msg: err.response.data.message || "error",
            theme: "fail",
          },
        ]);
      }
    } else {
      navigate("/change/deliveryAddress");
    }
  };

  return (
    <div>
      <ToastMsg messages={messages} setMessages={setMessages} />
      <PageLayout>
        <CartStepper />
        <div className="flex flex-col md:flex-row gap-8 mx-auto md:mx-5  my-10">
          <div className="basis-[70%]">
            {props.currentDay !== "" && props.selectedTimeSlot !== "" && (
              <>
                <h1 className="font-bold mb-10">
                  {" "}
                  Your order has been placed at {props.currentDay}{" "}
                  {props.selectedTimeSlot}{" "}
                  <span
                    className=" underline text-blue-400 cursor-pointer"
                    onClick={() => setShowEditPopUp(!showEditPopUp)}
                  >
                    {" "}
                    Change{" "}
                  </span>
                </h1>

                <div
                  className={`${
                    !showEditPopUp && "hidden"
                  } absolute left-[40%] top-[40%] bg-white  z-10 overflow-y-auto`}
                >
                  <div className="hr  b5">
                    <div className="do hs dn ht bc  ">Pick a time</div>
                    <div className="be d1 dv dw">
                      <div className="ct ak">
                        <select
                          aria-label="Select delivery date"
                          className="hz aj cursor-pointer"
                          onChange={(e) => props.setCurrentDay(e.target.value)}
                        >
                          {formattedDates.map((dt, i) => (
                            <option value={dt} key={i} className="gk">
                              {dt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="e2  fk"></div>
                    <div className="be d1 dv dw">
                      <div className="ct ak">
                        <select
                          aria-label="Select delivery date"
                          className="hz aj cursor-pointer"
                          onChange={(e) =>
                            props.setSelectedTimeSlot(e.target.value)
                          }
                        >
                          {timeSlots.map((ts, i) => (
                            <option value={ts} key={i} className="gk">
                              {ts}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      aria-label="Save scheduled delivery preference"
                      className="ej dw be bg  cl ek  ct al cd d4 af d5 em dd de df dg da db bb"
                      onClick={() => {
                        if (props.currentDay === "") {
                          props.setCurrentDay(formattedDates[0]);
                        }
                        if (props.selectedTimeSlot === "") {
                          props.setSelectedTimeSlot(timeSlots[0]);
                        }
                        localStorage.setItem("currentDay", props.currentDay);
                        localStorage.setItem(
                          "selectedTimeSlot",
                          props.selectedTimeSlot
                        );
                        setShowEditPopUp(false);
                      }}
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              </>
            )}
            {totalQuantity > 0 && (
              <div>
                <div className="md:w-[35rem] overflow-auto flex flex-col  gap-2">
                  {cartDatas?.map((item) => (
                    <div
                      key={item._id}
                      className="relative flex gap-2 w-full bg-gray-50 py-2 px-1 "
                    >
                      <div className="flex   ">
                        <img
                          src={`${baseImgUrl}/${item.activeImage}`}
                          alt={item.name}
                          className="h-24 w-24 object-cover"
                        />
                      </div>

                      <div className=""></div>

                      <div className="flex gap-4  flex-col md:flex-row   justify-between">
                        <ul className="text-xs   flex flex-col gap-2 h-fit">
                          <p className="text-base font-bold">
                            {item.name}{" "}
                            <span className="text-gray-900 text-xs">
                              ( Rs.{item.price})
                            </span>
                          </p>
                          {item?.addon?.map((item) => (
                            <div key={item._id}>
                              <li>
                                <span className="text-gray-600">
                                  {item.quantity} {item.name} &nbsp;{" "}
                                </span>
                                <span className="font-bold text-gray-600">
                                  +(Rs.{item.extraPrice})
                                </span>
                              </li>
                            </div>
                          ))}
                        </ul>
                        <div className="flex gap-2">
                          <div className="flex flex-col  gap-1">
                            <h1>Quantity</h1>
                            <div className="relative ">
                              <span
                                onClick={() =>
                                  dispatch(decrementItem(item._id))
                                }
                                className="w-[3rem] absolute top-0 left-0 h-[3rem] border-[1px] bg-gray-100 transition duration-700 flex items-center justify-center cursor-pointer"
                              >
                                <CustomIcon
                                  icon={AiOutlineMinus}
                                  className="text-gray-500  hover:text-blue-500 transition duration-700"
                                  size={23}
                                />
                              </span>
                              <input
                                type="text"
                                min={1}
                                disabled
                                className="w-[9rem] bg-gray-100 text-center h-[3rem] focus:outline-none rounded placeholder:text-gray-950 border border-gray-300"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={item.minQuantity}
                              />

                              <span
                                onClick={() =>
                                  dispatch(incrementItem(item._id))
                                }
                                className="w-[3rem] absolute top-0 right-0 h-[3rem] bg-gray-100 border border-gray-200 transition duration-700 flex items-center justify-center cursor-pointer"
                              >
                                <CustomIcon
                                  icon={AiOutlinePlus}
                                  className="text-gray-500 hover:text-blue-500 transition duration-700"
                                  size={23}
                                />
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col justify-between  items-end">
                            <CustomIcon
                              icon={AiFillDelete}
                              onClick={() => dispatch(removeItem(item))}
                              className="hover:cursor-pointer hover:text-red-500"
                              size={16}
                            />
                            <p className="mt-4">
                              Rs.
                              {item.total +
                                (item?.addon?.reduce(
                                  (acc, currentAddon) =>
                                    acc +
                                    currentAddon.extraPrice *
                                      currentAddon.quantity,
                                  0
                                ) || 0)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {isDeliveryformSubmitted && (
                  <div className="mx-6 flex flex-col gap-3 mt-10">
                    <div className=" flex flex-col gap2">
                      <h1 className="text--[16px] md:text-xl  mb-2  tracking-tighter ">
                        Please fill up the extra details also (* required)
                      </h1>
                      <label className="mb-1" htmlFor="special note">
                        Write your special note
                      </label>
                      <input
                        placeholder="I need urgently..."
                        type="text"
                        onChange={(e) => setSpecialNote(e.target.value)}
                        value={specialNote}
                        className="md:w-[450px] w-[100%] form-control  bg-slate-50 py-3 pl-5 rounded placeholder:text-gray-500 border border-gray-200"
                      />
                    </div>

                    <div>
                      <label className="mb-1">Choose Delivery Address</label>
                      {Array.isArray(data)
                        ? [
                            {
                              label: "Home Address",
                              value: "home",
                              address: data[0]?.home,
                            },
                            {
                              label: "Work Address",
                              value: "work",
                              address: data[0]?.work,
                            },
                          ].map((item) => (
                            <div
                              key={`${item.value}`}
                              className="py-1"
                              id={item.value}
                              onClick={() => handleCalculation()}
                            >
                              <label className="container_radio">
                                {item?.address?.geoLocation?.coordinates[0] !==
                                  0 && item.label}
                                <input
                                  type="radio"
                                  required
                                  value={item.value}
                                  name="deilivery address"
                                  onClick={() =>
                                    setAddressLocation(
                                      item?.address?.geoLocation?.coordinates
                                    )
                                  }
                                />
                                {item?.address?.geoLocation?.coordinates[0] !==
                                  0 && <span className="checkmark" />}
                              </label>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="basis-[40%] flex flex-col  md:mr-20">
            <div className="w-full justify-end">
              <div className="bg-slate-50 sticky top-[6rem] h-fit py-5">
                {calculation ? (
                  <div className="px-5">
                    <div className="flex justify-between">
                      <h1 className="text-lg">Food Amount</h1>
                      <p>Rs. {calculation.foodAmount}</p>
                    </div>
                    <div className="flex justify-between">
                      <h1 className="text-lg">Tax Price</h1>
                      <p>Rs. {calculation.tax}</p>
                    </div>
                    <div className="flex justify-between">
                      <h1 className="text-lg">Distance Amount</h1>
                      <p>Rs. {calculation.distanceAmount}</p>
                    </div>

                    {calculation.discount && calculation.discount > 1 ? (
                      <div className="flex justify-between">
                        <h1 className="text-lg">Discount</h1>
                        <p>Rs. {calculation.discount}</p>
                      </div>
                    ) : null}

                    <div className="flex justify-between border-t-gray-500 border-t-[1px] py-2 text-xl font-bold">
                      <h1 className="text-lg">Total Price</h1>
                      <p>
                        Rs.{" "}
                        {calculation.TotalAmount ||
                          calculation.foodAmount +
                            calculation.tax +
                            calculation.distanceAmount -
                            calculation.discount}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between border-b-[1px] border-gray-100 px-5 py-2">
                    <span className="text-2xl">Total</span>{" "}
                    <span className="text-2xl">Rs. {totalPriceOfCart}</span>
                  </div>
                )}

                <div className="flex justify-between sm:flex-col lg:flex-row items-center  px-5 ">
                  <input
                    type="text"
                    onChange={(e) => setCuponCode(e.target.value)}
                    placeholder="Enter your coupon code"
                    className="form-control basis-[55%] text-sm w-full py-3 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
                  />
                  <button
                    onClick={() => handleCalculation(true)}
                    type="button"
                    className="lg:basis-[40%] md:w-full font-bold border rounded px-2 sm:py-3 py-[10px] bg-[#26d318] text-white text-center"
                  >
                    Apply Cupon
                  </button>
                </div>
              </div>
            </div>

            <h1 className="bg-white rounded text-lg font-semibold text-black text-center mt-4  p-3 mb-2">
              Pay With
            </h1>
            <section className="overflow-hide w-full flex items-center gap-5 justify-between">
              {[
                {
                  label: "Pay with Khalti",
                  value: "KHALTI",
                  img: "/img/khalti.png",
                },
                {
                  label: "Cash On Delivery",
                  value: "CASH_ON_DEVLIVERY",
                  img: "/cod1.png",
                },
                // { label: "Stripe", value: "STRIPE" },
              ].map((item) => (
                <div
                  key={`${item.value}`}
                  className="h-20 px-6 rounded mb-2 flex items-center gap-2"
                  id={item.value}
                >
                  <label className="container_radio">
                    {!item.img && item.label}
                    <input
                      type="radio"
                      value={item.value}
                      name="payment_method"
                      onClick={() =>
                        dispatch(setSelectedPaymentMethod(item.value))
                      }
                    />
                    <span className="checkmark" />
                  </label>
                  {item.img && (
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-full h-20 object-cover"
                    />
                  )}
                </div>
              ))}
            </section>
            <Buttons
              onClick={handleProceedToCheckout}
              className="flex justify-center items-center w-full"
            >
              {loading ? <Spinner btn /> : "Pay Now"}
            </Buttons>
          </div>
        </div>
      </PageLayout>
      {/* <Elements stripe={stripePromise}>
        <StripeCheckout
          stripeKey={stripe_pk}
          label="Pay Now"
          name="Pay With Credit Card"
          billingAddress
          shippingAddress
          amount={800}
          description={`Your total is ${
            calculation
              ? calculation.TotalAmount ||
                calculation.foodAmount +
                  calculation.tax +
                  calculation.distanceAmount -
                  calculation.discount
              : null
          }`}
          token={handleStripePayment}
        />
      </Elements> */}
    </div>
  );
}
