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
  sliderLimit: {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0
  },
  sliderLimitThumb: {
    display: 'none'
  },
  sliderLimitRail: {
    display: 'none'
  },
  sliderLimitMarks: {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.38,
    height: theme.spacing(1),
    width: theme.spacing(0.25),
    top: '50%',
    transform: 'translateY(-50%)'
  },
  sliderLimitsTrack: {
    color: theme.palette.primary.main,
    opacity: 0.38
  },
  input: {
    maxWidth: theme.spacing(9),
    margin: 0,
    '& fieldset': {
      borderWidth: 1
    },
    '& input': {
      '&[type=number]': {
        appearance: 'textfield'
      },
      '&::-webkit-outer-spin-button': {
        appearance: 'none',
        margin: 0
      },
      '&::-webkit-inner-spin-button': {
        appearance: 'none',
        margin: 0
      }
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

  const limitsMarks = useMemo(() => {
    if (!limits || limits.length !== 2) {
      return undefined;
    }

    if (limits[0] === limits[1]) {
      return [{ value: limits[0] }];
    }
    const result = [
      { value: Math.max(limits[0], min) },
      { value: Math.min(limits[1], max) }
    ];

    if (result[0].value > result[1].value) {
      return undefined;
    }
    return result;
  }, [limits, max, min]);

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
          rail: classes.sliderWithThumbRail
        }}
        value={sliderValues}
        min={min}
        max={max}
        onChange={handleSliderChange}
      />
      {limits && limits.length === 2 && (
        <Slider
          getAriaLabel={(index) => (index === 0 ? 'min limit' : 'max limit')}
          className={classes.sliderLimit}
          classes={{
            rail: classes.sliderLimitRail,
            thumb: classes.sliderLimitThumb,
            track: classes.sliderLimitsTrack,
            mark: classes.sliderLimitMarks,
            markActive: classes.sliderLimitMarks
          }}
          value={limits}
          min={min}
          max={max}
          marks={limitsMarks}
        />
      )}
      <Box display={'flex'} justifyContent={'space-between'} mb={1}>
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
