import React, { forwardRef, useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';

const PasswordField = forwardRef(({ InputProps, size, ...otherProps }, ref) => {
  // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
  // https://mui.com/material-ui/guides/composition/#caveat-with-refs
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      {...otherProps}
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      size={size}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton size={size} onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
});

PasswordField.defaultProps = {
  size: 'small'
};

export default PasswordField;
