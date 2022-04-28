import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { geocodeStreetPoint } from '../models/GeocodingModel';

const DEFAULT_COUNTRY = ''; // 'SPAIN', 'USA'

const setGeocoderResult = (payload) => ({
  type: 'carto/setGeocoderResult',
  payload
});

/**
 * Controller for <GeocoderWidget /> component.
 *
 * @param  {object} props
 * @param  {Function=} [props.onError] - Function to handle error messages from the widget.
 */
export default function useGeocoderWidgetController(props = {}) {
  const credentials = useSelector((state) => state.carto.credentials);
  // Component local state and events handling
  const [searchText, setSearchText] = useState('');
  const [loading, setIsLoading] = useState(false);

  // Actions dispatched
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleInput = (e) => {
    if (e.target.value === '') {
      updateMarker(null);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.keyCode === 13) {
      // Force blur to hide virtual keyboards on mobile and search
      e.target.blur();
    }
  };

  // Needed to handle keyboard "Done" button on iOS
  const handleBlur = async () => {
    if (searchText.length) {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (!credentials) {
      return;
    }
    try {
      setIsLoading(true);
      const result = await geocodeStreetPoint(credentials, {
        searchText,
        country: DEFAULT_COUNTRY
      });
      if (result) {
        updateMarker(result);
      }
    } catch (e) {
      handleGeocodeError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMarker = (result) => {
    dispatch(setGeocoderResult(result));
  };

  const handleGeocodeError = (error) => {
    if (props.onError) {
      props.onError(error);
    }
  };

  return {
    searchText,
    loading,
    handleChange,
    handleInput,
    handleKeyPress,
    handleBlur
  };
}
