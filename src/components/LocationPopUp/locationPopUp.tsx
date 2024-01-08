import React, { useEffect } from "react";

interface LocationPopUp {
  setLatitude: React.Dispatch<React.SetStateAction<string | null>>;
  setLongitude: React.Dispatch<React.SetStateAction<string | null>>;
  setPermission: React.Dispatch<React.SetStateAction<boolean>>;
  permission: boolean;
  askPermission: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAskPermission: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationPopup = (props: LocationPopUp) => {
  const requestGeolocationPermission = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      props.setLatitude(latitude.toString());
      props.setLongitude(longitude.toString());

      props.setLoading(false);
      props.setAskPermission(false);
    });
  };

  useEffect(() => {
    const checkPermission = () => {
      props.setLoading(true);
      requestGeolocationPermission();
    };
    if (props.askPermission) checkPermission();
  }, [props.askPermission]);

  return <></>;
};

export default LocationPopup;
