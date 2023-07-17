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
      customSelectProps,
      customRenderValue,
      customMenuProps,
      ...otherProps
    },
    ref
  ) => {
    // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
    // https://mui.com/material-ui/guides/composition/#caveat-with-refs

    const isSmall = size === 'small';

    return (
      <TextField
        {...otherProps}
        select
        onChange={onChange}
        ref={ref}
        size={size}
        placeholder={placeholder}
        SelectProps={{
          ...customSelectProps,
          multiple: multiple,
          displayEmpty: displayEmpty || !!placeholder,
          size: size,
          renderValue:
            customRenderValue ||
            ((selected) => {
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
            }),
          MenuProps: {
            ...customMenuProps,
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
  children: PropTypes.node,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  customSelectProps: PropTypes.object,
  customRenderValue: PropTypes.func,
  customMenuProps: PropTypes.object
};

export default SelectField;
