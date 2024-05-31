import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  styled
} from '@mui/material';
import Typography from './Typography';
import uniqueId from 'lodash/uniqueId';

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiInputAdornment-positionStart': {
    paddingLeft: theme.spacing(2),

    '&.MuiInputAdornment-sizeSmall': {
      paddingLeft: theme.spacing(1.5)
    }
  },
  '& .MuiInputBase-inputAdornedStart': {
    paddingLeft: '0px !important'
  },
  '& .MuiSelect-select .MuiMenuItem-root:hover': {
    backgroundColor: 'transparent'
  }
}));

const PlaceholderItem = styled(MenuItem)(() => ({
  display: 'none'
}));

const Autocomplete = forwardRef(
  (
    {
      children,
      placeholder,
      size,
      displayEmpty,
      menuProps,
      inputProps,
      labelId,
      label,
      labelSecondary,
      helperText,
      name,
      error,
      focused,
      disabled,
      fullWidth,
      required,
      'aria-label': ariaLabel,
      ...otherProps
    },
    ref
  ) => {
    // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
    // https://mui.com/material-ui/guides/composition/#caveat-with-refs

    const isSmall = size === 'small';

    // Accessibility attributes
    const [defaultId] = useState(uniqueId('select-label-'));
    const ariaLabelledBy = label ? labelId || defaultId : undefined;

    return (
      <FormControl
        size={size}
        error={error}
        focused={focused}
        disabled={disabled}
        fullWidth={fullWidth}
        required={required}
      >
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          {label && (
            <InputLabel shrink id={ariaLabelledBy}>
              {label}
            </InputLabel>
          )}
          {labelSecondary && (
            <Box display='flex' alignItems='center' ml={2} mb={0.5}>
              {labelSecondary}
            </Box>
          )}
        </Box>

        <StyledSelect
          {...otherProps}
          labelId={ariaLabelledBy}
          name={name}
          ref={ref}
          size={size}
          fullWidth={fullWidth}
          displayEmpty={displayEmpty || !!placeholder}
          inputProps={{
            ...inputProps,
            'aria-label': ariaLabel
          }}
          MenuProps={{
            ...menuProps,
            PopoverClasses: {
              paper: isSmall ? 'MuiMenu-paper-sizeSmall' : undefined
            },
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transformOrigin: {
              vertical: 0,
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

Autocomplete.propTypes = {
  creatable: PropTypes.bool
};

export default Autocomplete;
