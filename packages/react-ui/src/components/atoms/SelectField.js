import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, TextField } from '@mui/material';
import Typography from './Typography';

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
      renderValue,
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
        return selected.join(', ');
      },
      [isSmall, placeholder]
    );

    return (
      <TextField
        {...otherProps}
        select
        onChange={onChange}
        ref={ref}
        size={size}
        placeholder={placeholder}
        SelectProps={{
          ...selectProps,
          multiple: multiple,
          displayEmpty: displayEmpty || !!placeholder,
          size: size,
          renderValue: renderValue || defaultRenderValue,
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
        <MenuItem key='empty' disabled value={''}></MenuItem>
        {children}
      </TextField>
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
