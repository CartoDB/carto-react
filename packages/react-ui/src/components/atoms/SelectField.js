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

const SelectField = forwardRef(
  (
    {
      children,
      // https://github.com/mui/material-ui/pull/8875#issuecomment-349771804
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
        // TODO: remove this backgroundColor before creating the patch version
        sx={{ backgroundColor: '#fbfbbc !important' }}
      >
        {label && <InputLabel id={ariaLabelledBy}>{label}</InputLabel>}

        <StyledSelect
          {...otherProps}
          labelId={ariaLabelledBy}
          name={name}
          ref={ref}
          size={size}
          displayEmpty={displayEmpty || !!placeholder}
          renderValue={customRenderValue}
          inputProps={{
            ...inputProps,
            'aria-label': ariaLabel
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

SelectField.defaultProps = {
  size: 'small'
};
SelectField.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  size: PropTypes.oneOf(['small', 'medium']),
  renderValue: PropTypes.func,
  menuProps: PropTypes.object,
  inputProps: PropTypes.object,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default SelectField;
