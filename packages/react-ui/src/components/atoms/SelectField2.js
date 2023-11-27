import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, InputLabel, Select, styled } from '@mui/material';
import Typography from './Typography';
import uniqueId from 'lodash/uniqueId';

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiInputAdornment-root.MuiInputAdornment-positionStart': {
    paddingLeft: `8px !important`
  },
  '& .MuiInputBase-inputAdornedStart': {
    paddingLeft: `0px !important`
  }
}));

const SelectField2 = forwardRef(
  (
    {
      children,
      placeholder,
      size,
      displayEmpty,
      renderValue: customRenderValue,
      menuProps,
      labelId,
      label,
      helperText,
      error,
      focused,
      disabled,
      ...otherProps
    },
    ref
  ) => {
    // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
    // https://mui.com/material-ui/guides/composition/#caveat-with-refs

    const isSmall = size === 'small';

    const defaultRenderValue = React.useCallback(
      (selected) => {
        if (selected.length === 0) {
          return (
            <Typography
              variant={isSmall ? 'body2' : 'body1'}
              color='text.hint'
              component='span'
              noWrap
            >
              {placeholder}
            </Typography>
          );
        }
        if (Array.isArray(selected)) {
          return selected.join(', ');
        } else if (selected && typeof selected === 'object') {
          // Check if selected is an object and has a 'label' property
          if ('label' in selected) {
            return selected.label;
          }
        } else {
          return selected || '';
        }
      },
      [isSmall, placeholder]
    );

    // Use the custom renderValue function if provided, or use the default
    const renderValue = customRenderValue || defaultRenderValue;

    // Accessibility: label id
    const [id] = useState(uniqueId('select-label-'));

    return (
      <FormControl size={size} error={error} focused={focused} disabled={disabled}>
        {label && <InputLabel id={labelId || id}>{label}</InputLabel>}

        <StyledSelect
          {...otherProps}
          labelId={labelId || id}
          ref={ref}
          size={size}
          displayEmpty={displayEmpty || !!placeholder}
          renderValue={renderValue}
          MenuProps={{
            ...menuProps,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transformOrigin: {
              vertical: -4,
              horizontal: 'left'
            }
          }}
        >
          {children}
        </StyledSelect>

        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);

SelectField2.defaultProps = {
  size: 'small'
};
SelectField2.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  size: PropTypes.oneOf(['small', 'medium']),
  renderValue: PropTypes.func,
  menuProps: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default SelectField2;
