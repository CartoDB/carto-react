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
      inputProps,
      labelId,
      label,
      helperText,
      name,
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

    // Based on default renderValue from MUI
    // https://github.com/mui/material-ui/blob/22cf8461ca3fc89a9f40cb860458374922afb6e2/packages/mui-base/src/Select/Select.tsx#L23
    const placeholderRenderValue = React.useCallback(
      (selected) => {
        /*         const childrenArray = React.Children.toArray(children);

        const item = childrenArray.find(({ value }) => value === selected);

        console.log('selected', selected);
        console.log('childrenArray', childrenArray);
        console.log('item', item); */

        if (selected.length === 0 || selected === null) {
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
        }

        return selected?.label || null;
      },
      [isSmall, placeholder]
    );

    // Use the custom renderValue function if provided, or use the default
    const renderValue = customRenderValue
      ? customRenderValue
      : placeholder
      ? placeholderRenderValue
      : undefined;

    // Accessibility: label id
    const [id] = useState(uniqueId('select-label-'));

    return (
      <FormControl
        size={size}
        error={error}
        focused={focused}
        disabled={disabled}
        sx={{ backgroundColor: 'yellow !important' }}
      >
        {label && <InputLabel id={labelId || id}>{label}</InputLabel>}

        <StyledSelect
          {...otherProps}
          labelId={labelId || id}
          ref={ref}
          size={size}
          displayEmpty={displayEmpty || !!placeholder}
          renderValue={renderValue}
          inputProps={{
            ...inputProps,
            children
          }}
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
        />

        {helperText && (
          <FormHelperText aria-label={`${name}-helper`}>{helperText}</FormHelperText>
        )}
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
  inputProps: PropTypes.object,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default SelectField2;
