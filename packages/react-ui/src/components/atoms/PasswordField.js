import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';

const PasswordField = forwardRef(({ style, ...otherProps }, ref) => {
  // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
  // https://mui.com/material-ui/guides/composition/#caveat-with-refs
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      {...otherProps}
      ref={ref}
      style={style}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
});

PasswordField.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default PasswordField;
