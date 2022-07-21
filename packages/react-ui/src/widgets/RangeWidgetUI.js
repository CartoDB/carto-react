import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Slider, TextField } from '@material-ui/core';
import { debounce } from '@carto/react-core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative'
  },
  sliderWithThumbRail: {
    color: theme.palette.text.hint
  },
  sliderWithThumbTrack: {
    display: 'none'
  },
  sliderNotThumb: {
    pointerEvents: 'none',
    position: 'absolute',
    left: 0,
    right: 0
  },
  sliderNotThumbThumb: {
    display: 'none'
  },
  sliderNotThumbRail: {
    display: 'none'
  },
  sliderLimits: {
    zIndex: 1
  },
  sliderLimitsTrack: {
    color: theme.palette.primary.main,
    opacity: 0.38
  },
  sliderIntersection: {
    zIndex: 2
  },
  input: {
    maxWidth: theme.spacing(9),
    margin: 0,
    '& fieldset': {
      borderWidth: 1
    }
  }
}));

/**
 * Renders a <RangeWidget /> component
 * @param  {object} props
 * @param  {number[]} props.data - Array of two numbers with the selected values
 * @param  {number} props.min - The absolute min value
 * @param  {number} props.max - The absolute max value
 * @param  {number[]} props.limits - Array of two numbers that represent a relative min and max values. It is useful to represent the min and max value taking into account other filters.
 * @param  {Function} [props.onSelectedRangeChange] - This fuction will be cal when selected values change

 */

function RangeWidgetUI({ data, min, max, limits, onSelectedRangeChange }) {
  const classes = useStyles();
  const [sliderValues, setSliderValues] = useState([min, max]);
  const [inputsValues, setInputsValues] = useState([min, max]);

  const limitsValuesIntersection = useMemo(() => {
    if (!limits || limits.length !== 2) {
      return null;
    }

    if (!sliderValues || sliderValues.length !== 2) {
      return null;
    }
    const result = [
      Math.max(limits[0], sliderValues[0]),
      Math.min(limits[1], sliderValues[1])
    ];

    if (result[0] > result[1]) {
      return null;
    }
    return result;
  }, [limits, sliderValues]);

  const debouncedOnSelectedRangeChange = useMemo(
    () => (onSelectedRangeChange ? debounce(onSelectedRangeChange, 250) : null),
    [onSelectedRangeChange]
  );

  const handleSliderChange = (_, newValues) => {
    setInputsValues([...newValues]);
    setSliderValues([...newValues]);
    debouncedOnSelectedRangeChange && debouncedOnSelectedRangeChange([...newValues]);
  };

  const handleInputChange = (event, index) => {
    const value = event.target.value === '' ? '' : Number(event.target.value);
    setInputsValues(Object.assign([], inputsValues, { [index]: value }));
  };

  useEffect(() => {
    if (!data) {
      return;
    }
    setInputsValues([...data]);
    setSliderValues([...data]);
  }, [data]);

  const handleInputBlur = (index) => {
    let value = inputsValues[index];

    if (value === '') {
      value = sliderValues[index];
    }

    if (value > max) {
      value = max;
    }

    if (value < min) {
      value = min;
    }
    const newValues = Object.assign([], inputsValues, { [index]: value }).sort(
      (a, b) => a - b
    );
    setInputsValues(newValues);
    setSliderValues([...newValues]);
    onSelectedRangeChange && onSelectedRangeChange(newValues);
  };

  return (
    <Box className={classes.root}>
      <Slider
        getAriaLabel={(index) => (index === 0 ? 'min value' : 'max value')}
        classes={{
          rail: classes.sliderWithThumbRail,
          track: classes.sliderWithThumbTrack
        }}
        value={sliderValues}
        min={min}
        max={max}
        onChange={handleSliderChange}
      />
      {limits && limits.length === 2 && (
        <Slider
          getAriaLabel={(index) => (index === 0 ? 'min limit' : 'max limit')}
          className={`${classes.sliderNotThumb} ${classes.sliderLimits}`}
          classes={{
            rail: classes.sliderNotThumbRail,
            thumb: classes.sliderNotThumbThumb,
            track: classes.sliderLimitsTrack
          }}
          value={limits}
          min={min}
          max={max}
        />
      )}
      {limitsValuesIntersection && (
        <Slider
          getAriaLabel={(index) =>
            index === 0 ? 'min intersection' : 'max intersection'
          }
          className={`${classes.sliderNotThumb} ${classes.sliderIntersection}`}
          classes={{
            rail: classes.sliderNotThumbRail,
            thumb: classes.sliderNotThumbThumb
          }}
          value={limitsValuesIntersection}
          min={min}
          max={max}
        />
      )}
      <Box display={'flex'} justifyContent={'space-between'}>
        <TextField
          className={classes.input}
          value={inputsValues[0]}
          margin='dense'
          onChange={(event) => handleInputChange(event, 0)}
          onBlur={() => handleInputBlur(0)}
          inputProps={{
            min: min,
            max: max,
            type: 'number',
            'aria-label': 'min value'
          }}
        />
        <TextField
          className={classes.input}
          value={inputsValues[1]}
          margin='dense'
          onChange={(event) => handleInputChange(event, 1)}
          onBlur={() => handleInputBlur(1)}
          inputProps={{
            min: min,
            max: max,
            type: 'number',
            'aria-label': 'max value'
          }}
        />
      </Box>
    </Box>
  );
}

RangeWidgetUI.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  limits: PropTypes.arrayOf(PropTypes.number),
  onSelectedRangeChange: PropTypes.func
};

export default RangeWidgetUI;
