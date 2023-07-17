import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, TextField } from '@mui/material';
import Typography from './Typography';

const SelectField = forwardRef(
  (
    { children, onChange, placeholder, size, multiple, customRenderValue, ...otherProps },
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
          multiple: multiple,
          displayEmpty: !!placeholder,
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
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  customRenderValue: PropTypes.func
};

export default SelectField;
