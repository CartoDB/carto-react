import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Avatar as MuiAvatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const Sizes = {
  large: 5,
  medium: 4,
  small: 3,
  xsmall: 2.25
};

const AvatarContainer = styled(MuiAvatar, {
  shouldForwardProp: (prop) => prop !== 'size'
})(({ size, theme }) => ({
  width: theme.spacing(Sizes[size]),
  height: theme.spacing(Sizes[size]),
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

const Avatar = forwardRef(({ size, children, ...otherProps }, ref) => {
  // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
  // https://mui.com/material-ui/guides/composition/#caveat-with-refs

  return (
    <AvatarContainer {...otherProps} ref={ref} size={size}>
      {children}
    </AvatarContainer>
  );
});

Avatar.defaultProps = {
  size: 'medium'
};
Avatar.propTypes = {
  size: PropTypes.oneOf(Object.keys(Sizes))
};

export default Avatar;
