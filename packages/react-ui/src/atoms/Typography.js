import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Typography as MuiTypography } from '@mui/material';

const FontWeight = {
  regular: 400,
  medium: 500,
  strong: 600
};

const Typography = forwardRef(
  ({ italic, weight, style, children, ...otherProps }, ref) => {
    // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
    // https://mui.com/material-ui/guides/composition/#caveat-with-refs
    const fontConfiguration = {
      fontWeight: FontWeight[weight],
      fontStyle: italic && 'italic'
    };

    return (
      <MuiTypography
        {...otherProps}
        ref={ref}
        style={{
          ...fontConfiguration,
          ...style
        }}
      >
        {children}
      </MuiTypography>
    );
  }
);

Typography.propTypes = {
  weight: PropTypes.oneOf(Object.keys(FontWeight)),
  italic: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default Typography;
