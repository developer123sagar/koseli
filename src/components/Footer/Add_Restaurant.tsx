import React, { ChangeEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Select, Spinner, TextEditor, ToggleBtn, Upload } from "@/common";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { google_map_api_key, url } from "@/routes";
import axios from "axios";
import {
  booleanBtn,
  days,
  initialFormState,
  inputField,
  options,
} from "@/dashboard/constants/Restaurant";
import {
  DaySchedule,
  OpenTime,
  IRestaurantForm,
  Search,
  BusinessType,
} from "@/types";
import { formatTime } from "@/helpers";
import MultipleInput from "@/common/MultipleInput";
import Buttons from "@/common/Button";
import { SelectOption } from "@/common/Select";
import { useNavigate } from "react-router-dom";
import HeaderWithSearch from "../HeaderWithSearch";
import NameMark from "@/common/NameMark";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import PDFViewer from "@/common/PDFViewer";

const Add_Restaurant = (props: Search) => {
  const [dayStates, setDayStates] = useState(
    days.map(() => ({
      open: true,
      startTime: "06:00",
      endTime: "20:00",
    }))
  );

  const [openingType, setOpeningType] = useState(true);
  const [clickedLocation, setClickedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [lat, setLat] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [lon, setLon] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<
    SelectOption[] | undefined
  >([]);
  const [form, setForm] = useState(initialFormState);
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: google_map_api_key,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, []);

  const center = { lat: lat, lng: lon };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setClickedLocation({ lat, lng });
      setForm({ ...form, geo: { type: "Point", coordinates: [lat, lng] } });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleToggleChange = (toggleName: keyof IRestaurantForm) => {
    setForm((prevForm) => ({
      ...prevForm,
      [toggleName]: !prevForm[toggleName],
    }));
  };

  const handleOpeningTypeChange = (value: boolean) => {
    setOpeningType(value);
    setForm((prevForm) => {
      const updatedOpenTime = { ...prevForm.openTime };
      updatedOpenTime.everyday.isSameTimeEveryDay = value;
      updatedOpenTime.everyday.isClosed = !value;
      if (value) {
        days.forEach((day) => {
          updatedOpenTime[day.toLowerCase()] = {
            startTime: new Date(),
            endTime: new Date(),
            isClosed: false,
          };
        });
      }
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

  const handleSelectChange = (selectedItems: SelectOption[] | undefined) => {
    setSelectedOptions(selectedItems);
    const selectedFoodItemIds =
      selectedItems?.map((option) => option.value) || [];
    setForm((prevForm) => ({
      ...prevForm,
      features: selectedFoodItemIds,
    }));
  };

  const handleTimeForDiffDay = (
    dayIndex: number,
    newValue: string,
    time: "open" | "close"
  ) => {
    if (/^\d{2}:\d{2}$/.test(newValue)) {
      const updatedForm = { ...form };
      const dayName = days[dayIndex].toLowerCase() as keyof OpenTime;
      if (!updatedForm.openTime[dayName]) {
        updatedForm.openTime[dayName] = {} as DaySchedule;
      }
      const [hours, minutes] = newValue.split(":");
      const newDate = new Date();
      newDate.setHours(parseInt(hours, 10));
      newDate.setMinutes(parseInt(minutes, 10));
      time === "open"
        ? (updatedForm.openTime[dayName].startTime = newDate)
        : (updatedForm.openTime[dayName].endTime = newDate);
      setForm(updatedForm);
    } else {
      console.error("Invalid time format");
    }
  };

  const handleTimeForSameDay = (newValue: string, time: "close" | "open") => {
    if (/^\d{2}:\d{2}$/.test(newValue)) {
      const updatedForm = { ...form };
      const [hours, minutes] = newValue.split(":");
      const newDate = new Date();
      newDate.setHours(parseInt(hours, 10));
      newDate.setMinutes(parseInt(minutes, 10));
      time === "open"
        ? (updatedForm.openTime.everyday.startTime = newDate)
        : (updatedForm.openTime.everyday.endTime = newDate);
      setForm(updatedForm);
    } else {
      console.error("Invalid time format");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/restaurant`, form);
      if (res.status === 200) {
        console.log('Form details:', form);
        setForm(initialFormState);
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
      alert("Error: ");
    }
  };

  return (
    <div className="lg:pt-34 pt-10 r-2xl:pt-0">
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
      <main className="lg:mt-10 lg:py-10 px-1 lg:px-32">
        <NameMark label="Restaurant Details" variant="primary" />

        <form onSubmit={handleFormSubmit} className="h-auto mt-8">
          <div className="flex flex-col lg:flex-row flex-wrap gap-4 justify-between">
            {inputField.map((item) => (
              <div className="w-full lg:basis-[48%]" key={item.name}>
                <EditInput
                  type={item.type}
                  label={item.name}
                  required
                  placeholder={item.placeH}
                  className="form-control text-sm w-full bg-transparent py-3 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
                  name={item.formName}
                  value={form[item.formName as keyof IRestaurantForm] as string}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:gap-10 justify-between items-center">
            <div className="my-3 w-full lg:basis-[48%]">
              <label className="text-sm font-semibold text-black">Tags</label>
              <MultipleInput
                initialTags={form.tags}
                placeholder="Add tags"
                setTags={(newTags) => setForm({ ...form, tags: newTags })}
              />
            </div>

            <div className="my-3 w-full lg:basis-[48%]">
              <label className="text-sm font-semibold text-black">
                Features
              </label>
              <Select
                multiple
                value={selectedOptions || []}
                onChange={handleSelectChange}
                options={options}
              />
            </div>
          </div>

          <div className="w-full mb-5 lg:w-[48%]">
            <h1 className={`text-[black] font-semibold text-[14px]`}>
              Business Type
            </h1>
            <select
              value={form.bussinessType}
              onChange={(e) =>
                setForm({
                  ...form,
                  bussinessType: e.target.value as BusinessType,
                })
              }
              className="form-control w-full text-sm py-3 pl-1 rounded placeholder:text-gray-500 border border-gray-200 my-1"
            >
              <option value="restaurant">Restaurant</option>
              <option value="privateBussiness">Private Business</option>
            </select>
          </div>

          {/* description  */}
          <div className="w-full">
            <label className="text-sm font-semibold text-black">
              Description
            </label>
            <TextEditor fieldName="description" setForm={setForm} />
          </div>

          {/* active hours radio button */}
          <div className="mt-12">
            <div className="text-center bg-[#ededed] h-[2px] w-full mt-[30px] mb-6">
              <span className="relative -top-[20px] inline-block p-[10px] bg-white text-sm font-semibold text-black mb-2">
                Active hours
              </span>
            </div>

            <div className="flex gap-2 lg:gap-64">
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

              <div className="flex gap-10">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-black mb-2">
                    Open Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    id="open_time"
                    className="text-sm bg-white py-2 pl-1 rounded border border-gray-200 my-1 focus:ring-0 focus:outline-none"
                    disabled={!openingType}
                    onChange={(e) =>
                      handleTimeForSameDay(e.target.value, "open")
                    }
                    value={formatTime(form.openTime.everyday.startTime)}
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
                    className="text-sm bg-white py-2 pl-1 rounded border border-gray-200 my-1 focus:ring-0 focus:outline-none"
                    onChange={(e) =>
                      handleTimeForSameDay(e.target.value, "close")
                    }
                    value={formatTime(form.openTime.everyday.endTime)}
                    disabled={!openingType}
                  />
                </div>
              </div>
            </div>
            <AnimatePresence>
              {!openingType && (
                <>
                  {days.map((day, id) => (
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
                      className="flex gap-2 lg:gap-64 mb-5"
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
                              onChange={() => handleDayOpenChange(id, true)}
                              checked={dayStates[id].open}
                            />
                            <span className="checkmark" />
                          </label>
                          <label className="container_radio text-sm font-semibold text-black my-2">
                            Close
                            <input
                              type="radio"
                              value=""
                              name={`active_hours_${id}`}
                              onChange={() => handleDayOpenChange(id, false)}
                              checked={!dayStates[id].open}
                            />
                            <span className="checkmark" />
                          </label>
                        </li>
                      </ul>
                      <div className="flex gap-10">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-black">
                            Open Time
                          </label>
                          <input
                            type="time"
                            name={`time1_${id}`}
                            id={`open_time_${id}`}
                            className="text-sm bg-white py-2 pl-1 rounded border border-gray-200 my-1 focus:ring-0 focus:outline-none"
                            value={formatTime(
                              form.openTime[days[id].toLowerCase()].startTime
                            )}
                            onChange={(e) =>
                              handleTimeForDiffDay(id, e.target.value, "open")
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
                            className="text-sm bg-white py-2 pl-1 rounded border border-gray-200 my-1 focus:ring-0 focus:outline-none"
                            value={formatTime(
                              form.openTime[days[id].toLowerCase()].endTime
                            )}
                            onChange={(e) =>
                              handleTimeForDiffDay(id, e.target.value, "close")
                            }
                            disabled={!dayStates[id].open}
                          />
                        </div>
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
                    form[item.toggleName as keyof IRestaurantForm] as boolean
                  }
                  onToggle={(toggleName) =>
                    handleToggleChange(toggleName as keyof IRestaurantForm)
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
                    handleToggleChange(toggleName as keyof IRestaurantForm)
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
                  {clickedLocation && <Marker position={clickedLocation} />}
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
                    className="form-control text-sm w-full bg-white py-2 pl-1 focus:outline-none rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
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
                    className="form-control text-sm w-full bg-white py-2 pl-1 focus:outline-none rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
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
                  <span className="relative -top-[20px] inline-block py-[10px] bg-white text-sm font-semibold text-black mb-2">
                    Restaurant Logo ?
                  </span>
                </div>
                <Upload
                  setForm={setForm}
                  accept=".jpg, .jpeg, .png"
                  fieldName="logo"
                  imgTitle="restaurnat"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="mt-6">
                <div className="bg-[#ededed] h-[2px] w-full mt-[30px] mb-6">
                  <span className="relative -top-[20px] inline-block py-[10px] bg-white text-sm font-semibold text-black mb-2">
                    Restaurant Picture ?
                  </span>
                </div>
                <Upload
                  setForm={setForm}
                  accept=".jpg, .jpeg, .png"
                  fieldName="mainImage"
                  imgTitle="restaurant"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between mb-10">
            <div className="mt-6 w-full">
              <div className="text-center bg-[#cec8c8] h-[1.5px] w-full mt-[30px] mb-6 ">
                <span className="relative -top-[20px] inline-block py-[10px] px-2 bg-white text-sm font-semibold text-black mb-2">
                  Restaurant Gallery ?
                </span>
              </div>
              <Upload
                accept=".jpg, .jpeg, .png"
                multiple
                fieldName="image"
                setForm={setForm}
                imgTitle="restaurant"
              />
            </div>
          </div>

          <div>
            <div className="h-[2px] w-full mt-[30px] mb-6">
              <span className="relative -top-[20px] inline-block py-[10px]  text-sm font-semibold text-black mb-2">
                Vat Document ?
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Upload
                accept=".pdf"
                fieldName="document"
                imgTitle="restaurant_vat"
                setForm={setForm}
                showImage={false}
              />
              {form.document && <PDFViewer src={form.document} />}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-10 mb-2">
          <Buttons type="button" onClick={handleFormSubmit}>
            {loading ? <Spinner btn /> : "Create"}
          </Buttons>
          <Buttons back type="button" variant="destructive">
            Cancel
          </Buttons>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Add_Restaurant;
