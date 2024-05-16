import React from 'react';
import PropTypes from 'prop-types';
import { Divider, MenuItem as MuiMenuItem, styled } from '@mui/material';

const StyledMenuItem = styled(MuiMenuItem, {
  shouldForwardProp: (prop) => !['subtitle', 'destructive'].includes(prop)
})(({ subtitle, destructive, height, theme }) => ({
  columnGap: theme.spacing(1),
  minHeight: theme.spacing(6),

  ...(subtitle && {
    backgroundColor: theme.palette.default.background,
    color: theme.palette.text.primary
  }),
  ...(destructive && {
    color: theme.palette.error.main,

    '.MuiTypography-root': {
      color: theme.palette.error.main
    },
    svg: {
      color: theme.palette.error.main
    },

    '&:hover': {
      backgroundColor: theme.palette.error.relatedLight
    },
    '&.Mui-selected': {
      color: theme.palette.error.main,

      '.MuiTypography-root': {
        color: theme.palette.error.main
      },
      'svg, & .MuiSvgIcon-root': {
        color: theme.palette.error.main
      }
    },

    '&.Mui-disabled': {
      color: theme.palette.text.disabled,

      '.MuiTypography-root': {
        color: theme.palette.text.disabled
      },
      svg: {
        color: theme.palette.text.disabled
      }
    }
  })
}));

const MenuItem = ({ subtitle, destructive, children, ...otherProps }) => {
  return (
    <StyledMenuItem destructive={destructive} subtitle={subtitle} {...otherProps}>
      {subtitle && <Divider />}

      {children}
    </StyledMenuItem>
  );
};

MenuItem.propTypes = {
  subtitle: PropTypes.bool,
  destructive: PropTypes.bool
};

export default MenuItem;
