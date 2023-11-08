import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { TextField, styled } from '@mui/material';
import Typography from './Typography';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputAdornment-root.MuiInputAdornment-positionStart': {
    paddingLeft: `8px !important`
  },
  '& .MuiInputBase-inputAdornedStart': {
    paddingLeft: `0px !important`
  }
}));

const SelectField = forwardRef(
  (
    {
      children,
      onChange,
      placeholder,
      size,
      multiple,
      displayEmpty,
      selectProps,
      renderValue: customRenderValue,
      menuProps,
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

    return (
      <StyledTextField
        {...otherProps}
        select
        onChange={onChange}
        ref={ref}
        size={size}
        SelectProps={{
          ...selectProps,
          multiple: multiple,
          displayEmpty: displayEmpty || !!placeholder,
          size: size,
          renderValue: renderValue,
          MenuProps: {
            ...menuProps,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transformOrigin: {
              vertical: -4,
              horizontal: 'left'
            }
          }
        }}
      >
        {children}
      </StyledTextField>
    );
  }
);

SelectField.defaultProps = {
  multiple: false,
  size: 'small'
};
SelectField.propTypes = {
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  selectProps: PropTypes.object,
  renderValue: PropTypes.func,
  menuProps: PropTypes.object
};

export default SelectField;
