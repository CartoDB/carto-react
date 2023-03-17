import React from 'react';
import PropTypes from 'prop-types';
import { Avatar as MuiAvatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const sizes = {
  large: 5,
  medium: 4,
  small: 3,
  xsmall: 2.25
};

const AvatarContainer = styled(MuiAvatar, {
  shouldForwardProp: (prop) => prop !== 'size'
})(({ size, theme }) => ({
  width: theme.spacing(sizes[size]),
  height: theme.spacing(sizes[size]),
  ...theme.typography.subtitle1,

  ...(size === 'large' && {
    ...theme.typography.h6
  }),
  ...(size === 'small' && {
    ...theme.typography.caption,
    fontWeight: 500
  }),
  ...(size === 'xsmall' && {
    ...theme.typography.caption,
    fontWeight: 500,

    svg: {
      width: theme.spacing(2),
      height: theme.spacing(2)
    }
  })
}));

const Avatar = ({ size, children, ...otherProps }) => {
  return (
    <AvatarContainer {...otherProps} size={size}>
      {children}
    </AvatarContainer>
  );
};

Avatar.defaultProps = {
  size: 'medium'
};
Avatar.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes))
};

export default Avatar;
