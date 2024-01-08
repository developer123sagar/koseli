/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Spinner } from "@/common";
import { setDeliveryDetails } from "@/redux/checkout-payment/paymentSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { google_map_api_key, url } from "@/routes";
import { Address, IDeliveryForm } from "@/types";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditInput } from "@/dashboard/component/EditRoute/EditInput";
import { ViewInputField } from "@/dashboard/component/viewRoute/ViewInputField";
import Buttons from "@/common/Button";
import { fetchDashboardData } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import HeaderWithSearch from "@/components/HeaderWithSearch";

const initialAddress: Address = {
  address: "",
  city: "",
  street: "",
  zipCode: null,
  geoLocation: {
    type: "Point",
    coordinates: [0, 0],
  },
};
interface Search {
  latitude: string | null;
  longitude: string | null;
  permission: boolean;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  selectedTimeSlot: string;
  sliderNumber: number;
  setSliderNumber: Dispatch<SetStateAction<number>>;
  setLatitude: Dispatch<SetStateAction<string | null>>;
  setLongitude: Dispatch<SetStateAction<string | null>>;
  setPermission: Dispatch<SetStateAction<boolean>>;
  setScrollDown: Dispatch<SetStateAction<boolean>>;
   
}

const ChangeDeliveryAddress = (props:Search) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { isDeliveryformSubmitted } = useAppSelector(
    (state: RootState) => state.payment
  );
  const { data } = useAppSelector((state: RootState) => state.fetchDashData);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<IDeliveryForm>({
    home: initialAddress,
    work: initialAddress,
  });

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      const [firstItem] = data;
      const { home, work } = firstItem;
      setForm({
        home: {
          address: home.address || "",
          city: home.city || "",
          street: home.street || "",
          zipCode: home.zipCode || null,
          geoLocation: {
            type: "Point",
            coordinates: home.geoLocation?.coordinates || [0, 0],
          },
        },
        work: {
          address: work.address || "",
          city: work.city || "",
          street: work.street || "",
          zipCode: work.zipCode || null,
          geoLocation: {
            type: "Point",
            coordinates: work.geoLocation?.coordinates || [0, 0],
          },
        },
      });
    }
  }, [data]);

  const [, setLocationDetails] = useState({
    city: "",
    street: "",
    zipCode: null,
  });

  const { userToken } = useAppSelector((state: RootState) => state.signin);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: google_map_api_key,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, []);
  const [clickedLocation, setClickedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [lat, setLat] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);
  const center = { lat: lat, lng: lon };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const { latLng } = e;
    const lat = latLng?.lat() as number;
    const lng = latLng?.lng() as number;
    setClickedLocation({ lat, lng });
    const updatedForm = {
      ...form,
      [currentStep === 1 ? "home" : "work"]: {
        ...form[currentStep === 1 ? "home" : "work"],
        geoLocation: {
          type: "Point",
          coordinates: [lat, lng],
        },
      },
    };
    setForm(updatedForm);
  };

  const handleLocateMe = async () => {
    setLoading(true);
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          setClickedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (
    addressType: keyof IDeliveryForm,
    address: Address
  ) => {
    setForm((prevForm) => ({
      ...prevForm,
      [addressType]: address,
    }));
  };

  const handleFormSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    if (
      currentStep !== 2 ||
      !form.home.address ||
      !form.home.city ||
      !form.home.zipCode
    ) {
      ("Please fill out the form completely before submitting.");
      return;
    }

    try {
      const res = await axios.post(`${url}/deliveryAddress`, form, {
        headers: {
          Authorization: userToken,
        },
      });
      if (res.status === 200) {
        dispatch(setDeliveryDetails());
        navigate(-1);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getLocationFromLatLng = async () => {
      if (clickedLocation) {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${clickedLocation.lat},${clickedLocation.lng}&key=${google_map_api_key}`
          );

          const result = response.data.results[0];
          if (result) {
            const addressComponents = result.address_components;

            const newLocationDetails = {
              city: "",
              street: "",
              zipCode: null,
            };
            const length = addressComponents.length - 1;

            newLocationDetails.street = addressComponents[1]?.long_name;
            newLocationDetails.city = addressComponents[2]?.long_name;
            newLocationDetails.zipCode =
              (addressComponents[length]?.types[0] === "postal_code" &&
                addressComponents[length]?.long_name) ||
              null;

            setLocationDetails(newLocationDetails);

            const updatedForm = {
              ...form,
              [currentStep === 1 ? "home" : "work"]: {
                ...form[currentStep === 1 ? "home" : "work"],
                city: newLocationDetails.city,
                street: newLocationDetails.street,
                zipCode: newLocationDetails.zipCode,
              },
            };
            setForm(updatedForm);
          }
        } catch (error) {
          console.error("Error fetching location details:", error);
        }
      }
    };

    getLocationFromLatLng();
  }, [clickedLocation, currentStep]);

  useEffect(() => {
    if (isDeliveryformSubmitted)
      dispatch(
        fetchDashboardData({ api: "deliveryAddress/user", token: userToken! })
      );
  }, [dispatch, userToken, isDeliveryformSubmitted]);

  return (
    <>
    <HeaderWithSearch
    headerLocation={true}
       sliderNumber={props.sliderNumber}
       setSliderNumber={props.setSliderNumber}
       setLongitude={props.setLongitude}
       setLatitude={props.setLatitude}
       setScrollDown={props.setScrollDown}
       setPermission={props.setPermission}
       latitude={props.latitude}
       longitude={props.longitude}
       hideSlider={true}
     />
      <div className="mt-16 ">
        <div className="w-full mx-auto   ">
          <form className="flex  flex-col  sm:flex-col md:flex-row px-1   lg:px-24">
            {currentStep === 1 && (
              <AddressForm
                title="Home"
                addressType="home"
                clickedLocation={clickedLocation}
                address={form.home}
                onAddressChange={handleAddressChange}
              />
            )}
            {currentStep === 2 && (
              <AddressForm
                title="Work"
                addressType="work"
                clickedLocation={clickedLocation}
                address={form.work}
                onAddressChange={handleAddressChange}
              />
            )}

            <div className="md:basis-[70%] md:w-[400px] w-full h-[300px]  mt-6 lg:px-8">
              {isLoaded ? (
                <>
                  <GoogleMap
                    center={center}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    options={{
                      streetViewControl: false,
                      mapTypeControl: false,
                    }}
                    zoom={15}
                    onClick={handleMapClick}
                  >
                    {clickedLocation && <Marker position={clickedLocation} />}
                  </GoogleMap>
                  <Buttons
                    type="button"
                    className="mt-2 "
                    onClick={handleLocateMe}
                  >
                    Locate Me
                  </Buttons>
                </>
              ) : (
                <Spinner />
              )}
            </div>
          </form>
          <div className="flex gap-5 w-full items-center md:justify-start justify-end pr-2 md:pr-0  mt-16 md:mt-0 sm:px-8 mb-2">
            <Buttons
              type="button"
              onClick={() => {
                if (currentStep === 1) {
                  setCurrentStep(2);
                } else {
                  handleFormSubmit();
                }
              }}
            >
              {currentStep === 1 ? (
                "Next"
              ) : (
                <>{loading ? <Spinner btn /> : "Save"}</>
              )}
            </Buttons>

            {currentStep === 2 && (
              <Buttons
                variant="secondary"
                type="button"
                onClick={() => {
                  setCurrentStep(1);
                }}
              >
                Back
              </Buttons>
            )}
          </div>
        </div>
      </div>
      </>
  
  );
};

interface Props {
  title: string;
  addressType: keyof IDeliveryForm;
  clickedLocation: { lat: number; lng: number } | null;
  address: Address;
  onAddressChange: (addressType: keyof IDeliveryForm, address: Address) => void;
}

const AddressForm: React.FC<Props> = ({
  title,
  addressType,
  clickedLocation,
  address,
  onAddressChange,
}: Props) => {
  const handleInputChange = (field: keyof Address, value: string | number) => {
    onAddressChange(addressType, {
      ...address,
      [field]: value,
      geoLocation: {
        type: "Point",
        coordinates: clickedLocation
          ? [clickedLocation.lat, clickedLocation.lng]
          : [0, 0],
      },
    });
  };

  return (
    <div className="flex px-2 md:px-8  flex-wrap">
      <div>
        <p className="font-semibold text-2xl border-b border-gray-300">
          {title} Address
        </p>
        <div className="flex justify-between  flex-wrap gap-x-4 gap-y-2 mt-8">
          <EditInput
            basis={48}
            label="Enter your location"
            value={address?.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />

          <ViewInputField label="City" value={address?.city} basis={48} />
          <ViewInputField label="Street" value={address?.street} basis={48} />
          <ViewInputField
            label="Zip Code"
            value={address?.zipCode as number}
            basis={48}
          />

          <div className="flex justify-between gap-x-4 w-full">
            {clickedLocation && (
              <>
                <ViewInputField
                  basis={48}
                  value={clickedLocation.lat}
                  label="Latitude"
                />
                <ViewInputField
                  basis={48}
                  value={clickedLocation.lng}
                  label="Longitude"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeDeliveryAddress;
