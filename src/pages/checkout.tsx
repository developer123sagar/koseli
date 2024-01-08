import { Checkout_form } from "@/constants";
import { useEffect, useState } from "react";
import { google_map_api_key } from "@/routes";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { initialFormState } from "@/dashboard/constants/Restaurant";
import { Spinner } from "@/common";

export default function Checkout() {
  const [form, setForm] = useState(initialFormState);
  const { input } = Checkout_form;
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
  const [clickedLocation, setClickedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [lat, setLat] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);
  const center = { lat: lat, lng: lon };
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setClickedLocation({ lat, lng });
      setForm({ ...form, geo: { type: "Point", coordinates: [lat, lng] } });
    }
  };
  return (
    <>
      <div className=" admin-header w-full  mx-auto  ">
        <h1 className="flex items-center justify-center font-extrabold w-full p-4 ">
          Add Your Address
        </h1>
        <form>
          <div className="flex flex-wrap gap-2">
            {input.map((item, id) => (
              <div key={`${item.formName}..${id}`}>
                <div className=" w-72 gap-2 flex  mx-2 flex-wrap  ">
                  <label>{item.label}</label>
                  <input
                    className="form-control w-full bg-slate-50 py-3 pl-10 rounded placeholder:text-gray-500 border border-gray-200"
                    placeholder={item.placeholder}
                  ></input>
                </div>
              </div>
            ))}
           
          </div>
          {/* google map */}
          <div className="w-[90%] h-[400px] mt-10 mx-3">
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
              <Spinner/>
            )}
          </div>
          <div className="flex mx-3 justify-between mt-5">
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
                    className="form-control text-sm w-full bg-slate-50 py-2 pl-1 focus:outline-none rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
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
                    className="form-control text-sm w-full bg-slate-50 py-2 pl-1 focus:outline-none rounded placeholder:text-gray-400/50 border border-gray-200 my-1"
                    value={clickedLocation.lng}
                  />
                </div>
              </>
            )}
          </div>
          <div className="mt-6 flex justify-end pr-6 mb-2">
            <button className="border rounded font-semibold bg-[#5783db] px-8 h-[50px] text-center text-white">
              save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
