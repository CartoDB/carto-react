import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';

import { geocodeStreetPoint } from './models';
import { selectOAuthCredentials } from '../redux/oauthSlice';
import { addLayer, setViewState } from '../redux/cartoSlice';

import { CircularProgress, IconButton, InputBase, Paper, SvgIcon } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const DEFAULT_COUNTRY = ''; // 'SPAIN', 'USA'

const setGeocoderResult = (payload) => ({
  type: 'carto/setGeocoderResult',
  payload,
});

const useStyles = makeStyles((theme) => ({
  paperInput: {
    height: theme.spacing(4.5),
    width: theme.spacing(30),
    paddingLeft: theme.spacing(1.5),
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fill: theme.palette.text.secondary,
    height: '1em',
    fontSize: `${theme.typography.body2.lineHeight}em`,

  },
  clear: {
    ...theme.typography.body2
  },
  input: {
    ...theme.typography.body2,
    width: 'calc(100% - 64px)',
    marginLeft: theme.spacing(1)
  },
}));

const SearchIcon = (args) => (
  <SvgIcon {...args}>
    <path
      d='M11,4 C14.8659932,4 18,7.13400675 18,11 C18,12.7003211 17.3937669,14.2590489 16.3856562,15.4718279 L19.4748737,18.5606602 L18.0606602,19.9748737 L14.8998887,16.8138615 C13.7854137,17.5629194 12.4437497,18 11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 Z M11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 Z'
      fill='inherit'
    ></path>
  </SvgIcon>
);

/**
 * Renders a <GeocoderWidget /> component
 * @param  props
 * @param  {Object} [props.className] - Material-UI withStyle class for styling
 * @param  {errorCallback} [props.onError] - Function to handle error messages from the widget.
 */
function GeocoderWidget(props) {
  const inputRef = useRef();
  const oauthCredentials = useSelector(selectOAuthCredentials);
  const globalCredentials = useSelector((state) => state.carto.credentials);
  const credentials = oauthCredentials || globalCredentials;
  // Component local state and events handling
  const [result, setResult] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  // Actions dispatched
  const dispatch = useDispatch();

  useEffect(() => {
    // layer to display the geocoded direction marker
    dispatch(
      addLayer({
        id: 'geocoderLayer',
      })
    );
  }, [dispatch]);

  const classes = useStyles();

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleInput = (e) => {
    if (e.target.value === '') {
      updateMarker(null);
      setResult(null);
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
        setLoading(true);
        const result = await geocodeStreetPoint(credentials, {
          searchText,
          country: DEFAULT_COUNTRY,
        });
        if (result) {
          zoomToResult(result);
          updateMarker(result);
          setResult(result);
        }
      } catch (e) {
        handleGeocodeError(e);
      } finally {
        setLoading(false);
      }
    }
  }

  const zoomToResult = (result) => {
    dispatch(
      setViewState({
        longitude: result.longitude,
        latitude: result.latitude,
        zoom: 16,
        transitionDuration: 500,
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

  return (
    <Paper className={`${props.className} ${classes.paperInput}`} elevation={2}>
      {loading ? <CircularProgress size={20} className={classes.icon} /> : <SearchIcon className={classes.icon}/>}
      <InputBase
        type="search"
        tabIndex={-1}
        inputRef={inputRef}
        size='small'
        placeholder='Search address'
        className={classes.input}
        value={searchText}
        onChange={handleChange}
        onInput={handleInput}
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}/>
    </Paper>
  );
};

GeocoderWidget.propTypes = {
  className: PropTypes.string,
  onError: PropTypes.func
};

GeocoderWidget.defaultProps = {};

export default GeocoderWidget;
