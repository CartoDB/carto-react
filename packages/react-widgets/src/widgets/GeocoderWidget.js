import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';

import { addLayer, setViewState } from '@carto/react-redux';

import { CircularProgress, InputBase, Paper, SvgIcon, styled } from '@mui/material';
import useGeocoderWidgetController from '../hooks/useGeocoderWidgetController';

const StyledPaper = styled(Paper)(({ theme: { spacing } }) => ({
  height: spacing(4.5),
  width: spacing(30),
  paddingLeft: spacing(1.5),
  borderRadius: spacing(0.5),
  display: 'flex',
  alignItems: 'center'
}));

const InputSearch = styled(InputBase)(({ theme: { spacing } }) => ({
  width: `calc(100% - ${spacing(5)})`,
  marginLeft: spacing(1)
}));

const svgStyle = {
  fill: ({ palette }) => palette.text.secondary
};

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
 * @param  {object} props
 * @param  {Function} [props.onError] - Function to handle error messages from the widget.
 */
function GeocoderWidget(props = {}) {
  const dispatch = useDispatch();
  const geocoderResult = useSelector((state) => state.carto.geocoderResult);

  const { searchText, loading, handleChange, handleInput, handleKeyPress, handleBlur } =
    useGeocoderWidgetController(props);

  useEffect(() => {
    // layer to display the geocoded direction marker
    dispatch(
      addLayer({
        id: 'geocoderLayer'
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (geocoderResult) {
      dispatch(
        setViewState({
          longitude: geocoderResult.longitude,
          latitude: geocoderResult.latitude,
          zoom: 16,
          transitionDuration: 500
        })
      );
    }
  }, [geocoderResult, dispatch]);

  return (
    <StyledPaper elevation={2}>
      {loading ? (
        <CircularProgress size={18} sx={svgStyle} />
      ) : (
        <SearchIcon sx={svgStyle} />
      )}

      <InputSearch
        type='search'
        tabIndex={-1}
        size='small'
        placeholder='Search address'
        value={searchText}
        inputProps={{ 'aria-label': 'GeocoderSearch' }}
        onChange={handleChange}
        onInput={handleInput}
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}
      />
    </StyledPaper>
  );
}

GeocoderWidget.propTypes = {
  onError: PropTypes.func
};

GeocoderWidget.defaultProps = {};

export default GeocoderWidget;
