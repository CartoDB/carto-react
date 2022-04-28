import { selectOAuthCredentials, setViewState } from '@carto/react-redux/';
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
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 * @param  {Boolean=} [props.zoomToResult] - Optional, default true. Whether control should zoom map on result.
 */
export default function useGeocoderWidgetController(props) {
  const oauthCredentials = useSelector(selectOAuthCredentials);
  const globalCredentials = useSelector((state) => state.carto.credentials);
  const credentials = oauthCredentials || globalCredentials;
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
    if (credentials) {
      try {
        setIsLoading(true);
        const result = await geocodeStreetPoint(credentials, {
          searchText,
          country: DEFAULT_COUNTRY
        });
        if (result) {
          if (props.zoomToResult !== false) {
            zoomToResult(result);
          }
          updateMarker(result);
        }
      } catch (e) {
        handleGeocodeError(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const zoomToResult = (result) => {
    dispatch(
      setViewState({
        longitude: result.longitude,
        latitude: result.latitude,
        zoom: 16,
        transitionDuration: 500
      })
    );
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
