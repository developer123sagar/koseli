import { Spinner, Upload } from "@/common";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import { RootState, useAppSelector } from "@/redux/store";
import { baseImgUrl, url } from "@/routes";
import { IRestaurant } from "@/types";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillStar, AiOutlineClockCircle } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState, useMemo, FormEvent } from "react";
import Buttons from "@/common/Button";

const CreateAds = () => {
  const [formData, setFormData] = useState({
    image: "",
    website_url: "https://koseli.app/",
    name: "",
  });

  console.log(formData);

  const [datas, setDatas] = useState<IRestaurant>();
  const menuImg = useMemo(() => datas?.mainImage || "", [datas?.mainImage]);
  const [loading, setLoading] = useState(false);
  const { token } = useAppSelector((state: RootState) => state.signin);

  console.log(menuImg);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await axios.get(`${url}/restaurant/info`, {
          headers: {
            Authorization: token,
          },
        });
        const restaurantData = res.data?.Data;
        restaurantData;
        setDatas(res.data?.Data);
      } catch (err) {
        err;
      }
    };

    getInfo();
  }, [token]);

  const handlePayment = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/advertisement`, formData, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res);
      if (res.status === 200 && res.data.msg) {
        //Show the message here
      } else if (res.status === 200 && res.data) {
        window.open(res.data, "_blank");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16">
      <h1 className="text-[#333333] font-extrabold text-3xl">
        Run a Sponsored Listing
      </h1>
      <p>Boost Your Restaurant Visibility</p>
      <div className="flex mt-10 gap-10">
        <div className="border border-gray-200 basis-[100%]">
          <div className="mx-8 mt-4 mb-10">
            <h1 className="text-[#333333] font-extrabold text-3xl">
              Review Selections
            </h1>
            <p className="text-[#555555] text-lg">
              Your ad campaign will run immediately within store house
            </p>
            <form className="mt-4 flex flex-col gap-2">
              <ViewInputField label="Bidding Amount" value={1000} />
              <div>
                <label className="font-bold">Upload Image</label>
                <Upload
                  fieldName="image"
                  imgTitle="advertisement"
                  setForm={setFormData}
                  accept=".jpg,.png"
                  showImage={false}
                />
              </div>

              <div className="mt-4">
                <h1 className="text-[#555555] mb-3 font-bold">
                  This ad will be displayed to customers in your delivery radius
                  throughout the campiagn's duration.You'll be only charged with
                  customer click on your ad,and any spend will be deducted your
                  payout.{" "}
                </h1>
                <div className="flex gap-3">
                  <input type="checkbox" name="" id="" />
                  <h1 className="font-bold">
                    I accept the
                    <span className="text-green-500">
                      &nbsp;Terms and Conditions
                    </span>
                  </h1>
                </div>
                <div className="flex justify-end mt-5">
                  <Buttons type="button" onClick={handlePayment}>
                    {loading ? <Spinner btn /> : "Pay with Khalti"}
                  </Buttons>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* 2nd part */}

        <div className=" h-96 basis-[80%]">
          <div className="w-[290px] inline-block cursor-pointer relative p-3 overflow-hidden">
            <div className="relative group card_shadow w-[290px] h-[240px] overflow-hidden">
              <figure className="relative ">
                {formData.image ? (
                  <img
                    src={`${baseImgUrl}/${formData.image}`}
                    className="w-full h-[10rem] object-cover  object-center"
                  />
                ) : (
                  <img
                    src={`${baseImgUrl}/${menuImg}`}
                    className="w-full h-[10rem] object-cover  object-center"
                  />
                )}

                <div className="flex absolute bottom-[1px] bg-[#00000066] z-0 h-10 w-full mt-2">
                  <div className="mx-4 flex items-center">
                    <FaLocationDot className="text-[#ffffff]" />
                    <h1 className="ml-2 text-white font-bold">
                      {datas?.address}
                    </h1>
                  </div>
                </div>
              </figure>
              <div className="flex justify-between gap-2  mt-2 mx-2 ">
                <div>
                  <h1 className=" text-left font-bold ">{datas?.name}</h1>
                </div>
                <div>
                  <div className="flex items-center ml-10">
                    <AiFillStar color="black" className="mr-2" />
                    <h1 className="font-bold text-black  mr-2">
                      {datas?.averageRating}
                    </h1>
                  </div>
                  <div className="flex items-center  pt-2 pb-2 rounded-[20px]">
                    <AiOutlineClockCircle className="mr-2 text-[black]" />
                    <h1 className="font-bold text-green ">
                      {datas?.averageDeliveryTime} min
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAds;
