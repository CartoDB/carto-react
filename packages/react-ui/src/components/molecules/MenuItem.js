import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem as MuiMenuItem, styled } from '@mui/material';

const StyledMenuItem = styled(MuiMenuItem, {
  shouldForwardProp: (prop) =>
    !['subtitle', 'destructive', 'extended', 'iconColor', 'fixed'].includes(prop)
})(({ subtitle, destructive, extended, iconColor, fixed, theme }) => ({
  ...(subtitle && {
    pointerEvents: 'none',
    columnGap: 0,
    ...theme.typography.caption,
    fontWeight: 500,
    color: theme.palette.text.secondary,

    '.MuiListItemText-root .MuiTypography-root': {
      ...theme.typography.caption,
      fontWeight: 500,
      color: theme.palette.text.secondary
    },

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

  ...(iconColor === 'primary' && {
    '.MuiListItemIcon-root svg path': {
      fill: theme.palette.text.primary
    },
    '&.Mui-selected .MuiListItemIcon-root svg path': {
      fill: theme.palette.primary.main
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
    '.MuiListItemIcon-root svg path': {
      fill: theme.palette.error.main
    },
    '&.Mui-selected .MuiListItemIcon-root svg path': {
      fill: theme.palette.error.main
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
    '&.MuiButtonBase-root.MuiMenuItem-root': {
      minHeight: theme.spacing(6)
    }
  }),
  ...(fixed && {
    '&.MuiMenuItem-root': {
      position: 'sticky',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 2,
      minHeight: theme.spacing(6),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(0.5, 1.5),
      backgroundColor: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.divider}`
    }
  }),
  ...(!fixed && {
    '.MuiList-root &:first-of-type': {
      marginTop: theme.spacing(1)
    }
  })
}));

const MenuItem = ({
  subtitle,
  destructive,
  extended,
  children,
  iconColor,
  fixed,
  ...otherProps
}) => {
  return (
    <StyledMenuItem
      subtitle={subtitle}
      destructive={destructive}
      extended={extended}
      iconColor={iconColor}
      fixed={fixed}
      {...otherProps}
    >
      {children}
    </StyledMenuItem>
  );
};

MenuItem.defaultProps = {
  iconColor: 'primary'
};
MenuItem.propTypes = {
  subtitle: PropTypes.bool,
  destructive: PropTypes.bool,
  extended: PropTypes.bool,
  iconColor: PropTypes.oneOf(['primary', 'default']),
  fixed: PropTypes.bool
};

export default MenuItem;
