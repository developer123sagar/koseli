import { Spinner, TextEditor, ToggleBtn, Upload } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { booleanBtn, days, inputField } from "@/dashboard/constants/Restaurant";
import { UpdateData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { google_map_api_key } from "@/routes";
import {
  BusinessType,
  DaySchedule,
  IRestaurant,
  IRestaurantForm,
  OpenTime,
} from "@/types";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditRestaurant = () => {
  const [dayStates, setDayStates] = useState(
    days.map(() => ({
      open: true,
      startTime: "06:00",
      endTime: "20:00",
    }))
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: google_map_api_key,
  });
  const selectedItem: IRestaurant = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );
  const [bussinessType, setBussinessType] =
    useState<BusinessType>("restaurant");

  const [openingType, setOpeningType] = useState(true);
  const [form, setForm] = useState(selectedItem || {});
  const [clickedLocation, setClickedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>({ lat: form?.geo?.coordinates[0], lng: form?.geo?.coordinates[1] });

  const { token } = useAppSelector((state: RootState) => state.signin);
  const { loading } = useAppSelector((state: RootState) => state.fetchDashData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setClickedLocation({ lat, lng });
      setForm({ ...form, geo: { type: "Point", coordinates: [lat, lng] } });
    }
  };

  const center = {
    lat: form?.geo?.coordinates[0],
    lng: form?.geo?.coordinates[1],
  };

  const handleUpdateForm = async (e: FormEvent) => {
    e.preventDefault();
    const updatedForm = { ...form };
    updatedForm.bussinessType = bussinessType;
    await dispatch(
      UpdateData({ api: "restaurant/update", form: updatedForm, token: token! })
    );
    localStorage.removeItem("desc");
    navigate("/dashboard/restaurant/active");
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleOpeningTypeChange = (value: boolean) => {
    value;
    setOpeningType(value);
    setForm((prevForm) => {
      const updatedOpenTime = { ...prevForm.openTime };
      updatedOpenTime.isSameTimeEveryDay = value as unknown as DaySchedule;
      return {
        ...prevForm,
        openTime: updatedOpenTime,
      };
    });
  };

  const handleDayOpenChange = (dayIndex: number, value: boolean) => {
    const updatedDayStates = [...dayStates];
    updatedDayStates[dayIndex].open = value;
    setDayStates(updatedDayStates);
    setForm((prevForm) => ({
      ...prevForm,
      openTime: {
        ...prevForm.openTime,
        [days[dayIndex].toLowerCase()]: {
          ...prevForm.openTime[days[dayIndex].toLowerCase()],
          isClosed: !value,
        },
      },
    }));
  };

  const handleTimeForDiffDay = (
    dayIndex: number,
    newValue: string,
    time: "open" | "close"
  ) => {
    if (/^\d{2}:\d{2}$/.test(newValue)) {
      setForm((prevForm) => {
        const updatedForm = { ...prevForm };
        const [hours, minutes] = newValue.split(":");
        const newDate = new Date();
        newDate.setHours(parseInt(hours, 10));
        newDate.setMinutes(parseInt(minutes, 10));

        const dayName = days[dayIndex].toLowerCase();
        const updatedOpenTime = {
          ...updatedForm.openTime,
          [dayName]: {
            ...updatedForm.openTime[dayName],
            [time === "open" ? "startTime" : "endTime"]: newDate,
            isClosed: false,
          },
        };

        return {
          ...updatedForm,
          openTime: updatedOpenTime,
        };
      });
    } else {
      console.error("Invalid time format");
    }
  };

  const handleTimeForSameDay = (newValue: string, time: "close" | "open") => {
    if (/^\d{2}:\d{2}$/.test(newValue)) {
      setForm((prevForm) => {
        const updatedForm = { ...prevForm };
        const [hours, minutes] = newValue.split(":");
        const newDate = new Date();
        newDate.setHours(parseInt(hours, 10));
        newDate.setMinutes(parseInt(minutes, 10));

        const updatedOpenTime: OpenTime = {
          ...updatedForm.openTime,
          everyday: {
            ...updatedForm.openTime.everyday,
            [time === "open" ? "startTime" : "endTime"]: newDate,
          },
        };
        if (time === "open") {
          days.forEach((day) => {
            updatedOpenTime[day.toLowerCase()] = {
              ...updatedForm.openTime[day.toLowerCase()],
              startTime: newDate,
            };
          });
        } else if (time === "close") {
          days.forEach((day) => {
            updatedOpenTime[day.toLowerCase()] = {
              ...updatedForm.openTime[day.toLowerCase()],
              endTime: newDate,
            };
          });
        }

        return {
          ...updatedForm,
          openTime: updatedOpenTime,
        };
      });
    } else {
      console.error("Invalid time format");
    }
  };

  const formatTime = (timeString: Date) => {
    const date = new Date(timeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleToggleChange = (toggleName: keyof IRestaurantForm) => {
    setForm((prevForm) => ({
      ...prevForm,
      [toggleName]: !prevForm[toggleName],
    }));
  };

  const desc = localStorage.getItem("desc") || "";
  const cleanedDesc = desc.replace(/^"|"$/g, "");

  return (
    <>
      <div className="w-full mt-20">
        <NameMark
          label={`Edit ${selectedItem?.name} Details` || ""}
          variant="primary"
        />
        <div className="flex flex-col gap-9 mt-6">
          <div>
            <form>
              <div className="p-6.5">
                <div className="flex flex-wrap justify-between gap-4">
                  {/* input fields */}
                  {inputField.map((item) => (
                    <div className="basis-[48%]" key={item.name}>
                      <label className="text-sm font-semibold text-black">
                        {item.name}
                      </label>
                      <input
                        type={item.type}
                        required
                        placeholder={item.placeH}
                        className="form-control text-sm w-full py-2 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
                        name={item.formName}
                        value={
                          form[item.formName as keyof IRestaurantForm] as string
                        }
                        onChange={handleInputChange}
                      />
                    </div>
                  ))}
                </div>

                <div className="w-[48%]">
                  <h1 className={`text-[black] font-semibold text-[14px]`}>
                    Business Type
                  </h1>
                  <select
                    value={bussinessType}
                    onChange={(e) => {
                      setBussinessType(e.target.value as BusinessType);
                      setForm({
                        ...form,
                        bussinessType: e.target.value as BusinessType,
                      });
                    }}
                    className="form-control w-full text-sm py-3 pl-1 rounded placeholder:text-gray-500 border border-gray-200 my-1"
                  >
                    <option value="restaurant">Restaurant</option>
                    <option value="privateBussiness">Private Bussiness</option>
                  </select>
                </div>

                {/* description  */}
                <div className="my-10">
                  <label className="text-[black] font-semibold text-[14px]">
                    Description
                  </label>
                  <TextEditor
                    existingDescription={cleanedDesc}
                    setForm={setForm}
                    fieldName="description"
                  />
                </div>

                {/* active hours radio button */}
                <div className="mt-12">
                  <div className="text-center bg-[#ededed] h-[2px] w-full mt-[30px] mb-6">
                    <span className="relative -top-[20px] inline-block p-[10px]  text-sm font-semibold text-black mb-2 bg-white">
                      Active hours
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <label className="text-sm font-semibold text-black mb-2">
                        Opening Type:
                      </label>
                      <label className="container_radio w-[152px] text-sm font-semibold text-black my-2">
                        Same Time Every Day
                        <input
                          type="radio"
                          value=""
                          name="active hours"
                          onChange={() => handleOpeningTypeChange(true)}
                          checked={openingType}
                        />
                        <span className="checkmark" />
                      </label>
                      <label className="container_radio w-[152px] text-sm font-semibold text-black mb-2">
                        Different Time Every Day
                        <input
                          type="radio"
                          value=""
                          name="active hours"
                          onChange={() => handleOpeningTypeChange(false)}
                          checked={!openingType}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-black mb-2">
                        Open Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        id="open_time"
                        className="text-sm  py-2 pl-1 rounded border border-gray-200 my-1 focus:ring-0 focus:outline-none"
                        disabled={!openingType}
                        onChange={(e) =>
                          handleTimeForSameDay(e.target.value, "open")
                        }
                        value={
                          formatTime(form.openTime?.everyday?.startTime) || ""
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-black mb-2">
                        Close Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        id="close_time"
                        className="text-sm  py-2 pl-1 rounded border border-gray-200 my-1 focus:ring-0 focus:outline-none"
                        onChange={(e) =>
                          handleTimeForSameDay(e.target.value, "close")
                        }
                        value={
                          formatTime(form.openTime?.everyday?.endTime) || ""
                        }
                        disabled={!openingType}
                      />
                    </div>
                  </div>
                  <AnimatePresence>
                    {!openingType && (
                      <>
                        {days?.map((day, id) => (
                          <motion.div
                            initial={{ opacity: "0", height: "0" }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: id * 0.06,
                              type: "spring",
                              stiffness: "300",
                              damping: "30",
                            }}
                            key={day}
                            className="flex justify-between mb-5"
                          >
                            <ul>
                              <label className="mr-2 text-sm font-semibold text-black mb-2">
                                {day}
                              </label>
                              <li className="flex gap-5">
                                <label className="container_radio text-sm font-semibold text-black my-2">
                                  Open
                                  <input
                                    type="radio"
                                    value=""
                                    name={`active_hours_${id}`}
                                    onChange={() =>
                                      handleDayOpenChange(id, true)
                                    }
                                    checked={
                                      !form?.openTime[day?.toLowerCase()]
                                        ?.isClosed
                                    }
                                  />
                                  <span className="checkmark" />
                                </label>
                                <label className="container_radio text-sm font-semibold text-black my-2">
                                  Close
                                  <input
                                    type="radio"
                                    value=""
                                    name={`active_hours_${id}`}
                                    onChange={() =>
                                      handleDayOpenChange(id, false)
                                    }
                                    checked={
                                      form?.openTime[day.toLowerCase()].isClosed
                                    }
                                  />
                                  <span className="checkmark" />
                                </label>
                              </li>
                            </ul>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-semibold text-black">
                                Open Time
                              </label>
                              <input
                                type="time"
                                name={`time1_${id}`}
                                id={`open_time_${id}`}
                                className="text-sm  py-2 pl-1 rounded border border-gray-200 my-1 focus:ring-0 focus:outline-none"
                                value={formatTime(
                                  form.openTime[days[id].toLowerCase()]
                                    ?.startTime
                                )}
                                onChange={(e) =>
                                  handleTimeForDiffDay(
                                    id,
                                    e.target.value,
                                    "open"
                                  )
                                }
                                disabled={!dayStates[id].open}
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-semibold text-black">
                                Close Time
                              </label>
                              <input
                                type="time"
                                name={`time2_${id}`}
                                id={`close_time_${id}`}
                                className="text-sm  py-2 pl-1 rounded border border-gray-200 my-1 focus:ring-0 focus:outline-none"
                                value={formatTime(
                                  form.openTime[days[id].toLowerCase()]?.endTime
                                )}
                                onChange={(e) =>
                                  handleTimeForDiffDay(
                                    id,
                                    e.target.value,
                                    "close"
                                  )
                                }
                                disabled={!dayStates[id].open}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* toggle button */}
                <ul className="w-full flex items-center justify-between mt-10">
                  {booleanBtn.map((item) => (
                    <li
                      key={item.label}
                      className="flex flex-col items-center justify-center"
                    >
                      <label className="text-sm font-semibold text-black mb-2">
                        {item.label}
                      </label>
                      <ToggleBtn
                        toggleName={item.toggleName}
                        isOn={
                          form[
                            item.toggleName as keyof IRestaurantForm
                          ] as boolean
                        }
                        onToggle={(toggleName) =>
                          handleToggleChange(
                            toggleName as keyof IRestaurantForm
                          )
                        }
                      />
                    </li>
                  ))}
                  {form.bussinessType === "restaurant" && (
                    <li>
                      <label className="text-sm font-semibold text-black mb-2">
                        Dining
                      </label>
                      <ToggleBtn
                        toggleName={"dining"}
                        isOn={form.dining}
                        onToggle={(toggleName) =>
                          handleToggleChange(
                            toggleName as keyof IRestaurantForm
                          )
                        }
                      />
                    </li>
                  )}
                </ul>

                {/* google map */}
                <div className="w-full h-[400px] mt-10">
                  {isLoaded ? (
                    <>
                      <GoogleMap
                        center={center}
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        options={{
                          zoomControl: false,
                          streetViewControl: false,
                          mapTypeControl: false,
                        }}
                        zoom={15}
                        onClick={handleMapClick}
                      >
                        {clickedLocation && (
                          <Marker position={clickedLocation} />
                        )}
                      </GoogleMap>
                    </>
                  ) : (
                    <Spinner />
                  )}
                </div>
                <div className="flex justify-between mt-5">
                  {clickedLocation && (
                    <>
                      <div className="basis-[48%]">
                        <label className="text-sm font-semibold text-black">
                          Lattitude
                        </label>
                        <input
                          type="number"
                          required
                          readOnly
                          className="form-control text-sm w-full  py-2 pl-1 focus:outline-none rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
                          value={clickedLocation.lat}
                        />
                      </div>
                      <div className="basis-[48%]">
                        <label className="text-sm font-semibold text-black">
                          Longitude
                        </label>
                        <input
                          type="number"
                          required
                          readOnly
                          className="form-control text-sm w-full  py-2 pl-1 focus:outline-none rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
                          value={clickedLocation.lng}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* restaurant picture and docs */}

                <div className="flex justify-between">
                  <div className="flex justify-between">
                    <div className="mt-6">
                      <div className="bg-[#ededed] h-[2px] w-full mt-[30px] mb-6">
                        <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                          Restaurant Logo ?
                        </span>
                      </div>
                      <Upload
                        accept=".jpg,.png,.svg,.jpeg"
                        imgTitle="cagtegory"
                        setForm={setForm}
                        fieldName="logo"
                        existingImg={[form?.logo]}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="mt-6">
                      <div className="bg-[#ededed] h-[2px] w-full mt-[30px] mb-6">
                        <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                          Restaurant Picture ?
                        </span>
                      </div>
                      <Upload
                        accept=".jpg,.png,.svg,.jpeg"
                        imgTitle="cagtegory"
                        setForm={setForm}
                        fieldName="mainImage"
                        existingImg={[form?.mainImage]}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 w-full">
                  <div className="text-center bg-[#cec8c8] h-[1.5px] w-full mt-[30px] mb-6 ">
                    <span className="relative -top-[20px] inline-block py-[10px] px-2  text-sm font-semibold text-black mb-2 bg-white">
                      Restaurant Gallery ?
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Upload
                      accept=".jpg,.png,.svg,.jpeg"
                      imgTitle="cagtegory"
                      setForm={setForm}
                      fieldName="image"
                      multiple
                      existingImg={form?.image}
                    />
                  </div>
                </div>
              </div>
              <Buttons
                type="submit"
                onClick={handleUpdateForm}
                className="float-right"
              >
                {loading ? <Spinner btn /> : "Update"}
              </Buttons>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRestaurant;
