import axios from "axios";

interface AddressComponent {
  long_name: string;
  types: string[];
}

interface GeocodeResult {
  status: string;
  results: {
    address_components: AddressComponent[];
  }[];
}

  export const getAddressFromLatLng = async (lat:string|null, lng:string|null, apiKey:string|null) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
  
      if (response.data.status === 'OK') {
        const formattedAddress = response.data.results[0].formatted_address;
        
        return formattedAddress;
      } else {
        throw new Error('Geocoding request failed');
      }
    } catch (error) {

      console.error('Error fetching address:', error);
      throw error;
    }
  };

  export const getShortAddressFromLatLng = async (
    lat: string | null,
    lng: string | null,
    apiKey: string | null
  ): Promise<string> => {
    try {
      const response = await axios.get<GeocodeResult>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
  
      if (response.data.status === 'OK') {
        const addressComponents: AddressComponent[] = response.data.results[0].address_components;
        const city = addressComponents.find(component => component.types.includes('locality'))?.long_name || '';
        const country = addressComponents.find(component => component.types.includes('country'))?.long_name || '';
        const shortLocation = `${city},${country}`;
        return shortLocation;
      } else {
        throw new Error('Geocoding request failed');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      throw error;
    }
  };

  export default getAddressFromLatLng;