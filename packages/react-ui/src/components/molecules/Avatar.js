import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Avatar as MuiAvatar } from '@mui/material';
import { css, styled } from '@mui/material/styles';

const Sizes = {
  large: 5,
  medium: 4,
  small: 3,
  xsmall: 2.25
};

const handleSizeStyles = (size) => {
  switch (size) {
    case 'large':
      return css`
        color: #03a9f3;
        background: #000;
      `;
    case 'small':
      return css`
        color: #000;
        background: #eee;
      `;
    case 'xsmall':
      return css`
        color: #fff;
        background: #709f1d;
      `;
    default:
      return css`
        color: #fff;
        background: #f56342;
      `;
  }
};

const AvatarContainer = styled(MuiAvatar)(
  ({ theme, size }) => css`
    width: ${theme.spacing(Sizes[size])};
    height: ${theme.spacing(Sizes[size])};
    ${theme.typography.subtitle1};
    ${handleSizeStyles(size)};
    width: ${({ size }) => (size === 'xsmall' ? theme.spacing(5) : undefined)};

    svg: {
      width: ${({ size }) => (size === 'xsmall' ? theme.spacing(5) : undefined)};
      height: ${({ size }) => (size === 'xsmall' ? theme.spacing(5) : undefined)};
    }
  `
);

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
