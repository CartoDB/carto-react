import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem as MuiMenuItem, styled } from '@mui/material';

const StyledMenuItem = styled(MuiMenuItem, {
  shouldForwardProp: (prop) => !['subtitle', 'destructive', 'extended'].includes(prop)
})(({ subtitle, destructive, extended, theme }) => ({
  ...(subtitle && {
    pointerEvents: 'none',
    columnGap: 0,
    ...theme.typography.caption,
    fontWeight: 500,
    color: theme.palette.text.secondary,

    '&.MuiMenuItem-root': {
      minHeight: theme.spacing(3),
      paddingTop: 0,
      paddingBottom: 0,

      '&:not(:first-of-type)': {
        minHeight: theme.spacing(5),
        marginTop: theme.spacing(1),
        paddingTop: theme.spacing(1),
        borderTop: `1px solid ${theme.palette.divider}`
      }
    }
  }),
  ...(destructive && {
    color: theme.palette.error.main,

    '.MuiTypography-root': {
      color: theme.palette.error.main
    },
    'svg, & .MuiSvgIcon-root': {
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
  }),
  ...(extended && {
    '&.MuiMenuItem-root': {
      minHeight: theme.spacing(6)
    }
  })
}));

const MenuItem = ({ subtitle, destructive, extended, children, ...otherProps }) => {
  return (
    <StyledMenuItem
      subtitle={subtitle}
      destructive={destructive}
      extended={extended}
      {...otherProps}
    >
      {children}
    </StyledMenuItem>
  );
};

MenuItem.propTypes = {
  subtitle: PropTypes.bool,
  destructive: PropTypes.bool,
  extended: PropTypes.bool
};

export default MenuItem;
