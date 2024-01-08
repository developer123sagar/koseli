import { ImageSlider, Spinner, TextEditor, ToggleBtn } from "@/common";
import { booleanBtn, days, inputField } from "@/dashboard/constants/Restaurant";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl, google_map_api_key } from "@/routes";
import { IRestaurant } from "@/types";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatTime } from "@/helpers";
import NameMark from "@/common/NameMark";
import Buttons from "@/common/Button";
import { changeStatus } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { useNavigate } from "react-router-dom";
import PDFViewer from "@/common/PDFViewer";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";

const ViewRestaurant = () => {
  const selectedItem = useAppSelector(
    (state: RootState) => state.fetchDashData.selectedItem
  );

  const { loading } = useAppSelector((state: RootState) => state.fetchDashData);
  const { token } = useAppSelector((state: RootState) => state.signin);

  const [lat, setLat] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);
  const [status, setStatus] = useState("accept");

  useEffect(() => {
    setLat(selectedItem!.geo.coordinates[0]);
    setLon(selectedItem!.geo.coordinates[1]);
  }, [selectedItem]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: google_map_api_key,
  });

  const center = { lat: lat, lng: lon };

  const urlParams = new URLSearchParams(window.location.search);
  const isRestroStatusChange =
    urlParams.get("statuschange") === "true" || false;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log(selectedItem);
  return (
    <main className="mt-16 w-full">
      <NameMark
        label={`${selectedItem?.name} Restaurant Details` || ""}
        variant="primary"
      />

      <div className="w-full h-auto mt-6">
        <div className="flex flex-wrap justify-between gap-4 mb-2">
          {inputField.map((item, id) => (
            <ViewInputField
              label={item.name}
              key={item.name + id}
              value={
                selectedItem![item.formName as keyof IRestaurant] as string
              }
              basis={48}
            />
          ))}
          <ViewInputField
            label="Business Type"
            basis={48}
            value={selectedItem?.bussinessType}
          />
        </div>

        <label htmlFor="description" className="my-4">
          Description
        </label>
        <TextEditor existingDescription={selectedItem?.description} disabled />

        {/* active hours radio button */}
        {selectedItem?.openTime && (
          <div className="mt-12">
            <div className="text-center bg-[#ededed] h-[2px] w-full mt-[30px] mb-6">
              <span className="relative -top-[20px] inline-block p-[10px] bg-white text-sm font-semibold text-black mb-2">
                Active hours
              </span>
            </div>
            <div className="flex gap-64">
              <div>
                <label className="text-sm font-semibold text-black mb-2">
                  Opening Type:
                </label>
                <label className="container_radio w-[150px] text-sm font-semibold text-black my-2">
                  Same Time Every Day
                  <input
                    type="radio"
                    disabled
                    name="active hours"
                    checked={selectedItem?.openTime?.isSameTimeEveryDay}
                  />
                  <span className="checkmark" />
                </label>
                <label className="container_radio w-[150px] text-sm font-semibold text-black mb-2">
                  Different Time Every Day
                  <input
                    type="radio"
                    name="active hours"
                    disabled
                    checked={!selectedItem?.openTime?.isSameTimeEveryDay}
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
                    className="text-sm bg-transparent py-2 pl-1 rounded border border-gray-200 my-1 focus:ring-0 focus:outline-none"
                    disabled
                    value={formatTime(
                      new Date(selectedItem!.openTime?.everyday?.startTime)
                    )}
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
                    className="text-sm bg-transparent py-2 pl-1 rounded border border-gray-200 my-1 focus:ring-0 focus:outline-none"
                    value={formatTime(
                      new Date(selectedItem!.openTime?.everyday?.endTime)
                    )}
                    disabled
                  />
                </div>
              </div>
            </div>
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
                className="flex gap-64 mb-5"
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
                        checked={
                          !selectedItem?.openTime[day?.toLowerCase()]?.isClosed
                        }
                        disabled
                      />
                      <span className="checkmark" />
                    </label>
                    <label className="container_radio text-sm font-semibold text-black my-2">
                      Close
                      <input
                        type="radio"
                        value=""
                        name={`active_hours_${id}`}
                        checked={
                          selectedItem?.openTime[day.toLowerCase()].isClosed
                        }
                        disabled
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
                      className="text-sm bg-transparent py-2 pl-1 rounded border border-gray-200 my-1 focus:ring-0 focus:outline-none"
                      value={formatTime(
                        new Date(
                          selectedItem!.openTime[day.toLowerCase()].startTime
                        )
                      )}
                      disabled
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
                      className="text-sm bg-transparent py-2 pl-1 rounded border border-gray-200 my-1 focus:ring-0 focus:outline-none"
                      value={formatTime(
                        new Date(
                          selectedItem!.openTime[day.toLowerCase()].endTime
                        )
                      )}
                      disabled
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* toggle button */}
        <ul className="w-full flex justify-between mt-10">
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
                  selectedItem![item.toggleName as keyof IRestaurant] as boolean
                }
              />
            </li>
          ))}
        </ul>

        {/* google map */}
        <div className="w-full h-[500px]  mt-10">
          {isLoaded && (
            <GoogleMap
              center={center}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
              }}
              zoom={15}
            >
              <Marker position={center} />
            </GoogleMap>
          )}
        </div>
        <div className="flex justify-between mt-5">
          {selectedItem?.geo.coordinates && (
            <>
              <div className="basis-[48%]">
                <label className="text-sm font-semibold text-black">
                  Lattitude
                </label>
                <input
                  type="number"
                  readOnly
                  disabled
                  className="form-control text-sm w-full bg-transparent py-2 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
                  value={selectedItem.geo.coordinates[0]}
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
                  disabled
                  className="form-control text-sm w-full bg-transparent py-2 pl-1 rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
                  value={selectedItem.geo.coordinates[1]}
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
                <span className="relative -top-[20px] inline-block py-[10px text-sm font-semibold text-black mb-2">
                  Restaurant Logo ?
                </span>
              </div>
              <img
                src={`${baseImgUrl}/${selectedItem?.logo}`}
                alt={selectedItem?.name}
                className="w-20 h-20 object-cover"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="mt-6">
              <div className="bg-[#ededed] h-[2px] w-full mt-[30px] mb-6">
                <span className="relative -top-[20px] inline-block py-[10px text-sm font-semibold text-black mb-2">
                  Restaurant Picture ?
                </span>
              </div>
              <img
                src={`${baseImgUrl}/${selectedItem?.mainImage}`}
                alt={selectedItem?.name}
                className="w-40 h-40 object-cover"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <div className="text-center bg-[#cec8c8] h-[1.5px] w-full mt-[30px] mb-6 ">
            <span className="relative -top-[20px] inline-block bg-white py-[10px] px-2 text-sm font-semibold text-black mb-2">
              Restaurant Gallery ?
            </span>
          </div>
          <ImageSlider images={selectedItem?.image} height={20} />
        </div>
        {selectedItem?.document && (
          <div className="mt-6">
            <div className="w-full mb-2">
              <span className=" text-sm font-semibold text-black mb-2">
                Vat Document ?
              </span>
            </div>
            <PDFViewer src={selectedItem?.document} />
          </div>
        )}
      </div>
      {isRestroStatusChange && (
        <>
          <div className="mt-16">
            <h2 className="font-bold my-2">Change Status</h2>
            <select
              name="changeStatus"
              onChange={(e) => setStatus(e.target.value)}
              className="form-control text-sm w-[30%] py-3 pl-1 rounded placeholder:text-gray-500 border border-gray-200 my-1"
            >
              <option value="accept">Accept</option>
              <option value="reject">Reject</option>
              <option value="insufficient-information">
                Insufficient information
              </option>
            </select>
          </div>

          <Buttons
            type="button"
            className="float-right"
            onClick={() =>
              dispatch(
                changeStatus({
                  api: `restaurant/status/${status}`,
                  id: selectedItem?._id,
                  token: token!,
                })
              ).then((res) => {
                if (changeStatus.fulfilled.match(res)) {
                  navigate("/dashboard/restaurant/active");
                }
              })
            }
          >
            {loading ? <Spinner btn /> : "Change Status"}
          </Buttons>
        </>
      )}
    </main>
  );
};

export default ViewRestaurant;
