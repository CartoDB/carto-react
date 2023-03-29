import React from 'react';
import PropTypes from 'prop-types';
import { Avatar as MuiAvatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ICON_SIZE_SMALL } from '../../theme/themeConstants';

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
      width: ICON_SIZE_SMALL,
      height: ICON_SIZE_SMALL
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
