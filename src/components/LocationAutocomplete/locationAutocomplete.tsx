import { useRef, useCallback } from "react";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { google_map_api_key } from "@/routes";

interface LocationAutocompleteProps {
  setLatitude: React.Dispatch<React.SetStateAction<string | null>>;
  setLongitude: React.Dispatch<React.SetStateAction<string | null>>;
  setScrollDown: React.Dispatch<React.SetStateAction<boolean>>;
  setPermission: React.Dispatch<React.SetStateAction<boolean>>;
  latitude: string | null;
  longitude: string | null;
}

type Library = "places";

const libraries: Library[] = ["places"];

const LocationAutocomplete = (props: LocationAutocompleteProps) => {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);

  const handlePlaceChanged = useCallback(() => {
    const places = inputRef.current?.getPlaces();
    props?.setPermission(false);
    if (places && places.length > 0) {
      const place = places[0];
      if (place.geometry?.location) {
        props.setLatitude(place.geometry.location.lat().toString());
        props.setLongitude(place.geometry.location.lng().toString());
      }
    }
  }, [props]);

  return (
    <LoadScript googleMapsApiKey={google_map_api_key} libraries={libraries}>
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <div className="rounded  mt-[18px]">
          <input
            type="text"
            className="bg-[rgb(235,235,235)] w-[100%] h-[60px]  outline-none placeholder:pl-7 sm:placeholder:pl-0 placeholder-gray-600 font-semibold pl-[20px] sm:pl-[49px] pt-[9px] pb-[9px]"
            placeholder="Enter Your Delivery Address"
            onFocus={() => props.setScrollDown(true)}
            onChange={() => {
              props.setScrollDown(false);
            }}
          />
        </div>
      </StandaloneSearchBox>
    </LoadScript>
  );
};

export default LocationAutocomplete;
