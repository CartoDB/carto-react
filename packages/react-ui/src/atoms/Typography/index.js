import React from 'react';
import PropTypes from 'prop-types';
import { Typography as MuiTypography } from '@mui/material';

const Typography = ({ italic = false, weight, children, ...otherProps }) => {
  return (
    <MuiTypography {...otherProps}>
      <span style={{ fontWeight: weight, fontStyle: italic && 'italic' }}>
        {children}
      </span>
    </MuiTypography>
  );
};

Typography.propTypes = {
  weight: PropTypes.oneOf([400 | 500 | 600]),
  italic: PropTypes.bool
};

export default Typography;
