import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem as MuiMenuItem, styled } from '@mui/material';

const StyledMenuItem = styled(MuiMenuItem, {
  shouldForwardProp: (prop) =>
    !['subtitle', 'destructive', 'extended', 'iconColor', 'fixed'].includes(prop)
})(({ dense, subtitle, destructive, extended, iconColor, fixed, theme }) => ({
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
      marginTop: theme.spacing(1),

      '&:not(:first-of-type)': {
        minHeight: theme.spacing(5),
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
    },
    '.MuiAutocomplete-listbox &[aria-selected="true"] svg path': {
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
    },
    '.MuiAutocomplete-listbox &.MuiAutocomplete-option:first-of-type': {
      minHeight: theme.spacing(6),
      marginTop: 0,

      '&:hover': {
        backgroundColor: theme.palette.background.paper
      }
    }
  }),
  ...(!fixed && {
    '.MuiList-root &:first-of-type': {
      marginTop: theme.spacing(1)
    }
  }),
  ...(dense && {
    '&.MuiButtonBase-root.MuiMenuItem-root': {
      minHeight: theme.spacing(3),
      padding: theme.spacing(0.25, 1.5)
    }
  })
}));

const MenuItem = ({
  subtitle,
  destructive,
  extended,
  children,
  iconColor = 'primary',
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

MenuItem.propTypes = {
  subtitle: PropTypes.bool,
  destructive: PropTypes.bool,
  extended: PropTypes.bool,
  iconColor: PropTypes.oneOf(['primary', 'default']),
  fixed: PropTypes.bool
};

export default MenuItem;
