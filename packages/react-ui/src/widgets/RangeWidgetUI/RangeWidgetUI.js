import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Link, Slider, TextField, styled } from '@mui/material';
import { debounce } from '@carto/react-core';
import Typography from '../../components/atoms/Typography';
import RangeSkeleton from './RangeSkeleton';

const Root = styled(Box)(() => ({
  position: 'relative'
}));

const ClearWrapper = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'row-reverse',
  height: spacing(1.5)
}));

const ClearButton = styled(Link)(() => ({
  cursor: 'pointer'
}));

const LimitTextField = styled(TextField)(({ theme: { spacing } }) => ({
  maxWidth: spacing(9),
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
}));

const StyledSlider = styled(Slider)(({ theme: { palette } }) => ({
  '& .MuiSlider-rail': {
    color: palette.text.hint
  }
}));

const SliderLimit = styled(Slider)(({ theme: { palette, spacing } }) => ({
  pointerEvents: 'none',
  position: 'absolute',
  zIndex: 1,
  left: 0,
  right: 0,
  '& .MuiSlider-rail': {
    display: 'none'
  },
  '& .MuiSlider-thumb': {
    display: 'none'
  },
  '& .MuiSlider-track': {
    color: palette.primary.main,
    opacity: 0.38
  },
  '& .MuiSlider-mark, & .MuiSlider-markActive': {
    backgroundColor: palette.primary.main,
    opacity: 0.38,
    height: spacing(1),
    width: spacing(0.25),
    top: '50%',
    transform: 'translateY(-50%)'
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
 * @param {boolean} [props.isLoading] - If true, the component will render a skeleton

 */

function RangeWidgetUI({ data, min, max, limits, onSelectedRangeChange, isLoading }) {
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

  const changeSliderValues = (newValues) => {
    setInputsValues([...newValues]);
    setSliderValues([...newValues]);
    debouncedOnSelectedRangeChange && debouncedOnSelectedRangeChange([...newValues]);
  };

  const handleInputChange = (event, index) => {
    const value = event.target.value === '' ? '' : Number(event.target.value);
    setInputsValues(Object.assign([], inputsValues, { [index]: value }));
  };

  const hasBeenModified = min !== inputsValues[0] || max !== inputsValues[1];

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
    changeSliderValues(newValues);
  };

  const resetSlider = () => {
    changeSliderValues([min, max]);
  };

  if (isLoading) {
    return <RangeSkeleton />;
  }

  return (
    <Root>
      <ClearWrapper>
        {hasBeenModified && (
          <Typography variant='caption' color='primary'>
            <ClearButton onClick={resetSlider} underline='hover'>
              Clear
            </ClearButton>
          </Typography>
        )}
      </ClearWrapper>
      <Box>
        <StyledSlider
          getAriaLabel={(index) => (index === 0 ? 'min value' : 'max value')}
          value={sliderValues}
          min={min}
          max={max}
          onChange={(_, values) => changeSliderValues(values)}
        />
        {limits && limits.length === 2 && (
          <SliderLimit
            getAriaLabel={(index) => (index === 0 ? 'min limit' : 'max limit')}
            value={limits}
            min={min}
            max={max}
            marks={limitsMarks}
          />
        )}
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} mb={1}>
        <LimitTextField
          value={inputsValues[0]}
          size='small'
          onChange={(event) => handleInputChange(event, 0)}
          onBlur={() => handleInputBlur(0)}
          inputProps={{
            min: min,
            max: max,
            type: 'number',
            'aria-label': 'min value'
          }}
        />
        <LimitTextField
          value={inputsValues[1]}
          size='small'
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
    </Root>
  );
}

RangeWidgetUI.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  limits: PropTypes.arrayOf(PropTypes.number),
  onSelectedRangeChange: PropTypes.func,
  isLoading: PropTypes.bool
};

export default RangeWidgetUI;
