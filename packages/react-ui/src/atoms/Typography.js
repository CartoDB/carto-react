import React from 'react';
import PropTypes from 'prop-types';
import { Typography as MuiTypography } from '@mui/material';

const FontWeight = {
  regular: 400,
  medium: 500,
  strong: 600
};

const Typography = ({ italic, weight, children, ...otherProps }) => {
  return (
    <MuiTypography
      {...otherProps}
      style={{ fontWeight: FontWeight[weight], fontStyle: italic && 'italic' }}
    >
      {children}
    </MuiTypography>
  );
};

Typography.propTypes = {
  weight: PropTypes.oneOf([FontWeight]),
  italic: PropTypes.bool
};

export default Typography;
