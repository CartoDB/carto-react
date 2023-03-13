import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Avatar as MuiAvatar } from '@mui/material';
import { css, styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/system';
import { themeTypography } from '../../theme/sections/typography';
import { getSpacing } from '../../theme/themeUtils';

const Sizes = {
  large: 5,
  medium: 4,
  small: 3,
  xsmall: 2.25
};

const avatarTheme = createTheme({
  components: {
    AvatarWrapper: {
      styleOverrides: {
        root: {
          color: 'darkslategray'
        },
        large: {
          ...themeTypography.h6
        },
        medium: {
          ...themeTypography.subtitle1
        },
        small: {
          ...themeTypography.caption,
          fontWeight: 500
        },
        xsmall: {
          ...themeTypography.caption,
          fontWeight: 500,

          '& svg': {
            width: getSpacing(2),
            height: getSpacing(2)
          }
        }
      }
    }
  }
});

const AvatarWrapper = styled('div', {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'sx',
  name: 'AvatarWrapper',
  slot: 'Root',
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.size === 'large' && styles.large,
    props.size === 'medium' && styles.medium,
    props.size === 'small' && styles.small,
    props.size === 'xsmall' && styles.xsmall
  ]
})(({ theme }) => ({
  backgroundColor: 'aliceblue',
  padding: theme.spacing(1)
}));

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

    svg {
      width: ${size === 'xsmall' ? theme.spacing(2) : theme.spacing(2.25)};
      height: ${size === 'xsmall' ? theme.spacing(2) : theme.spacing(2.25)};
    }
  `
);

const Avatar = forwardRef(({ size, children, ...otherProps }, ref) => {
  // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
  // https://mui.com/material-ui/guides/composition/#caveat-with-refs

  return (
    <>
      <AvatarContainer {...otherProps} ref={ref} size={size}>
        {children}
      </AvatarContainer>
      <ThemeProvider theme={avatarTheme}>
        <AvatarWrapper size={size}>Primary</AvatarWrapper>
        <AvatarWrapper size={size}>Secondary</AvatarWrapper>
      </ThemeProvider>
    </>
  );
});

Avatar.defaultProps = {
  size: 'medium'
};
Avatar.propTypes = {
  size: PropTypes.oneOf(Object.keys(Sizes))
};

export default Avatar;
