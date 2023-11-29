import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  styled
} from '@mui/material';
import Typography from './Typography';
import uniqueId from 'lodash/uniqueId';

const StyledSelect = styled(Select)(() => ({
  '& .MuiInputAdornment-root.MuiInputAdornment-positionStart': {
    paddingLeft: `8px !important`
  },
  '& .MuiInputBase-inputAdornedStart': {
    paddingLeft: `0px !important`
  }
}));

const PlaceholderItem = styled(MenuItem)(() => ({
  display: 'none'
}));

const SelectField2 = forwardRef(
  (
    {
      children,
      // https://github.com/mui/material-ui/pull/8875#issuecomment-349771804
      placeholder,
      size,
      displayEmpty,
      renderValue: customRenderValue,
      menuProps,
      //inputProps,
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
    /*     const placeholderRenderValue = React.useCallback(
      (selected) => {
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
    ); */

    // Use the custom renderValue function if provided, or use the default
    /*     const renderValue = customRenderValue
      ? customRenderValue
      : placeholder
      ? placeholderRenderValue
      : undefined; */

    // Accessibility: label id
    const [id] = useState(uniqueId('select-label-'));

    return (
      <FormControl
        size={size}
        error={error}
        focused={focused}
        disabled={disabled}
        sx={{ backgroundColor: '#fbfbbc !important' }}
      >
        {label && <InputLabel id={labelId || id}>{label}</InputLabel>}

        <StyledSelect
          {...otherProps}
          labelId={labelId || id}
          ref={ref}
          size={size}
          displayEmpty={displayEmpty || !!placeholder}
          renderValue={customRenderValue}
          // inputProps={{
          //   ...inputProps,
          //   children
          // }}
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
          {placeholder && (
            <PlaceholderItem disabled value=''>
              <Typography
                variant={isSmall ? 'body2' : 'body1'}
                color='text.hint'
                component='span'
                noWrap
              >
                {placeholder}
              </Typography>
            </PlaceholderItem>
          )}
          {children}
        </StyledSelect>

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
  //inputProps: PropTypes.object,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default SelectField2;
