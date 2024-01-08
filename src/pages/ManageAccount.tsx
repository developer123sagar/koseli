/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import {
  changePassword,
  fetchClientDetails,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import {
  useEffect,
  FormEvent,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { Upload } from "@/common";

import HeaderWithSearch from "@/components/HeaderWithSearch";
import { useNavigate } from "react-router-dom";

interface Search {
  latitude: string | null;
  longitude: string | null;
  permission: boolean;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  selectedTimeSlot: string;
  sliderNumber: number;
  setSliderNumber: Dispatch<SetStateAction<number>>;
  setLongitude: Dispatch<SetStateAction<string | null>>;
  setLatitude: Dispatch<SetStateAction<string | null>>;
  setScrollDown: Dispatch<SetStateAction<boolean>>;
  setPermission: Dispatch<SetStateAction<boolean>>;
  isAdmin?: boolean;
  role: string;
}

export default function ManageAccount(props: Search) {
  const [label, setLabel] = useState("");
  const [labelOne, setLabelOne] = useState("");

  const { userToken } = useAppSelector(
    (state: RootState) => state.signin
  );
  const { clientDetails } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  const { passwordChangeRes } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const { updateDataResults } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  console.log(props.role);

  useEffect(() => {
    updateDataResults &&
      updateDataResults.message &&
      setLabelOne(updateDataResults.message);
  }, [updateDataResults]);

  console.log();

  useEffect(() => {
    if (clientDetails) {
      if (clientDetails.isGoogleLinked) {
        if (clientDetails.uploadPhoto) setNoBaseUrl(false);
        else setNoBaseUrl(true);
      } else setNoBaseUrl(false);
      if (!clientDetails.phone)
        setLabelOne("You must enter your phone number to book");
    }
  }, [clientDetails]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [newImage, setNewImage] = useState<any>("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [reCurrentPassword, setReCurrentPassword] = useState("");
  const [noBaseUrl, setNoBaseUrl] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchClientDetails(userToken));
  }, [dispatch, userToken]);

  const handleUpdateForm = async (e: FormEvent) => {
    const dataBody = {
      name: name,
      phone: phone,
      photo: newImage.image,
      uploadPhoto: true,
    };

    e.preventDefault();
    await dispatch(
      UpdateData({ api: "client/edit", form: dataBody, token: userToken! })
    );
    navigate(-1);
  };

  console.log(clientDetails)

  useEffect(() => {
    if (clientDetails) {
      console.log(clientDetails)
      setName(clientDetails.name);
      setEmail(clientDetails.email);
      setPhone(clientDetails.phone);
      setNewImage(clientDetails.photo);
    }
  }, [clientDetails]);

  const updatePassword = async (e: FormEvent, data: any) => {
    e.preventDefault();
    await dispatch(changePassword({ token: userToken, data }));
  };
  useEffect(() => {
    if (passwordChangeRes.message) setLabel(passwordChangeRes.message);
  }, [passwordChangeRes]);

  return (
    <>
      {!props.isAdmin &&
       (
        <HeaderWithSearch
          sliderNumber={props.sliderNumber}
          setSliderNumber={props.setSliderNumber}
          setLongitude={props.setLongitude}
          setLatitude={props.setLatitude}
          setScrollDown={props.setScrollDown}
          setPermission={props.setPermission}
          latitude={props.latitude}
          longitude={props.longitude}
          hideSlider={true}
          headerLocation={true}
        />
      )}
      <div className="md:mt-10 mt-5 h-[100vh] overflow-x-hidden overflow-y-scroll">
        <div className=" flex items-center w-[60%] md:ml-[20%] md:pl-10 bg-white ">
          <div className="flex gap-10 mt-6 mb-3">
            <div className="p-7 pr-20 border-r-2 border-[rgb(230,230,230)]">
              <h1 className="sm:text-[20px] text-[12px] font-bold">EDIT INFORMATION</h1>
              <div className="md:mt-5 mt-2 mb-5">
                <Upload
                  setForm={setNewImage}
                  accept=".jpg, .jpeg, .png"
                  fieldName="image"
                  existingImg={[newImage]}
                  imgTitle="client"
                  noBaseUrl={noBaseUrl}
                />
              </div>
              <h1 className="sm:text-[20px] text-[12px] font-bold mb-5 mt-2 md:mt-8">
                ACCOUNT INFORMATION
              </h1>
              <div>
                <div className="  flex items-center gap-5">
                  <h1 className="text-[15px] font-bold text-[rgb()] ">Name:</h1>
                  <input
                    type="text"
                    value={name}
                    className="h-[50px] border-2 border-[rgb(230,230,230)] pl-3 w-full"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="  flex items-center gap-[22px] mt-3">
                  <h1 className="text-[15px] font-bold text-[#000000] ">
                    Email:
                  </h1>
                  <div className="h-[50px] border-2 border-[rgb(230,230,230)] pl-3 p-[8.5px] w-full">
                    {" "}
                    {email}{" "}
                  </div>
                </div>
                <div className="  flex items-center gap-[17px] mt-3">
                  <h1 className="text-[15px] font-bold text-[#000000] ">
                    Phone:
                  </h1>
                  <input
                    value={phone}
                    className="h-[50px] border-2 border-[rgb(230,230,230)] pl-3 p-[8.5px] w-full"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>
              </div>
              {updateDataResults && (
                <h5
                  className={`${
                    updateDataResults.success === true
                      ? "text-[#26d318]"
                      : "text-[#e01f2d]"
                  } mt-5`}
                >
                  {" "}
                  {labelOne}{" "}
                </h5>
              )}

              <button
                className="bg-[#26d318]
          font-bold mt-7 border rounded px-8 text-center text-white h-[50px] z-1"
                onClick={(e) => {
                  handleUpdateForm(e);
                }}
              >
                {" "}
                Update details{" "}
              </button>
            </div>
            {clientDetails &&
              !clientDetails.isGoogleLinked &&
              !clientDetails.isFacebookLinked && (
                <div className="p-7  pr-20">
                  <h1 className="text-[20px] font-bold mb-5">
                    CHANGE PASSWORD
                  </h1>
                  <div className="  flex items-center gap-[65px]">
                    <h1 className="text-[15px] font-bold text-[#000000] ">
                      Current Password:
                    </h1>
                    <input
                      type="password"
                      value={oldPassword}
                      className="h-[50px] border-2 border-[rgb(230,230,230)] pl-3"
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="  flex items-center gap-[86px] mt-3 ">
                    <h1 className="text-[15px] font-bold text-[#000000] ">
                      New Password:
                    </h1>
                    <input
                      type="password"
                      value={currentPassword}
                      className="h-[50px] border-2 border-[rgb(230,230,230)] pl-3"
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="  flex items-center gap-[22px] mt-3">
                    <h1 className="text-[15px] font-bold text-[#000000] ">
                      Re-enter new Password:
                    </h1>
                    <input
                      type="password"
                      value={reCurrentPassword}
                      className="h-[50px] border-2 border-[rgb(230,230,230)] pl-3"
                      onChange={(e) => setReCurrentPassword(e.target.value)}
                    />
                  </div>
                  <h5 className="text-[#e01f2d] mt-5"> {label} </h5>
                  <button
                    className="bg-[#e01f2d]
          font-bold mt-7 border rounded px-8 text-center text-white h-[50px] -z-1"
                    onClick={(e) => {
                      const data = {
                        oldPassword: oldPassword,
                        newPassword: currentPassword,
                        confirmPassword: reCurrentPassword,
                      };

                      updatePassword(e, data);
                    }}
                  >
                    {" "}
                    Update password{" "}
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
