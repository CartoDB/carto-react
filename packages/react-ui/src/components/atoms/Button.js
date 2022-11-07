import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button as MuiButton } from '@mui/material';
import Typography from './Typography';

const Button = forwardRef(({ style, children, ...otherProps }, ref) => {
  // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
  // https://mui.com/material-ui/guides/composition/#caveat-with-refs

  return (
    <MuiButton {...otherProps} ref={ref} style={style}>
      <Typography variant='inherit' color='inherit' noWrap component='span'>
        {children}
      </Typography>
    </MuiButton>
  );
});

Button.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default Button;
