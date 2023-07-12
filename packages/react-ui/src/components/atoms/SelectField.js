import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, MenuItem, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

import Typography from './Typography';

const BoxContent = styled(Box)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

const SelectField = forwardRef(
  ({ children, onChange, placeholder, size, customSelectProps, ...otherProps }, ref) => {
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
        SelectProps={{
          ...customSelectProps,
          displayEmpty: !!placeholder,
          size: size,
          renderValue: (selected) => {
            if (selected.length === 0) {
              return (
                <BoxContent>
                  <Typography
                    variant={isSmall ? 'body2' : 'body1'}
                    color='text.hint'
                    component='span'
                  >
                    {placeholder}
                  </Typography>
                </BoxContent>
              );
            }
            return selected.join(', ');
          },
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
  size: 'small'
};
SelectField.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  customSelectProps: PropTypes.object
};

export default SelectField;
