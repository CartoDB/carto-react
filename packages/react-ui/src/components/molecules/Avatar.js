import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Avatar as MuiAvatar } from '@mui/material';
import { styled } from '@mui/system';

const Sizes = {
  large: 40,
  medium: 32,
  small: 24,
  xsmall: 18
};

const AvatarContainer = styled(MuiAvatar)(({ theme, size }) => ({
  width: Sizes[size],
  height: Sizes[size],

  '& svg': {
    width: size === 'xsmall' ? theme.spacing(2) : Sizes[size],
    height: size === 'xsmall' ? theme.spacing(2) : Sizes[size]
  }
}));

const Avatar = forwardRef(({ size, style, children, ...otherProps }, ref) => {
  // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
  // https://mui.com/material-ui/guides/composition/#caveat-with-refs
  const fontConfiguration = {
    width: Sizes[size],
    height: Sizes[size]
  };

  return (
    <AvatarContainer size={size}>
      <MuiAvatar
        {...otherProps}
        ref={ref}
        style={{
          ...fontConfiguration,
          ...style
        }}
      >
        {children}
      </MuiAvatar>
    </AvatarContainer>
  );
});

Avatar.defaultProps = {
  size: 'medium'
};
Avatar.propTypes = {
  size: PropTypes.oneOf(Object.keys(Sizes)),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default Avatar;
