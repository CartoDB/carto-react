import { ICON_SIZE_MEDIUM } from '../../themeConstants';

export const navigationOverrides = {
  // Menu
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.body2,
        minHeight: theme.spacing(4),
        whiteSpace: 'normal',
        transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

        [theme.breakpoints.up('sm')]: {
          // Overrides an unwanted Mui default style
          '&.MuiButtonBase-root': {
            minHeight: theme.spacing(4)
          }
        },
        '&:focus-visible': {
          // Solves a known Mui issue: https://github.com/mui/material-ui/issues/23747
          backgroundColor: 'transparent',

          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        },
        '&.Mui-selected': {
          color: theme.palette.primary.main,

          '&:focus-visible': {
            // Solves a known Mui issue: https://github.com/mui/material-ui/issues/23747
            backgroundColor: theme.palette.primary.background
          },
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          },
          '& .MuiTypography-root, & .MuiSvgIcon-root': {
            color: theme.palette.primary.main
          }
        },
        '&.Mui-disabled:empty': {
          height: 0,
          minHeight: 0,
          padding: 0
        },
        '& .MuiCheckbox-root, & > .MuiSvgIcon-root': {
          marginRight: theme.spacing(1)
        },
        '.MuiMenu-paper-sizeSmall &': {
          paddingLeft: theme.spacing(1.5),
          paddingRight: theme.spacing(1.5)
        }
      }),
      dense: ({ theme }) => ({
        minHeight: theme.spacing(3),
        paddingTop: 0,
        paddingBottom: 0,

        [theme.breakpoints.up('sm')]: {
          // Overrides an unwanted Mui default style
          '&.MuiButtonBase-root': {
            minHeight: theme.spacing(3)
          }
        }
      })
    }
  },

  // Tabs
  MuiTabs: {
    defaultProps: {
      TabIndicatorProps: {
        classes: {
          colorPrimary: 'colorPrimary'
        }
      }
    },
    styleOverrides: {
      root: ({ theme }) => ({
        boxSizing: 'content-box',
        boxShadow: `0 1px 0 0 ${theme.palette.black[12]}`
      }),

      vertical: () => ({
        borderBottom: 0
      })
    }
  },

  // Tab
  MuiTab: {
    defaultProps: {
      iconPosition: 'start'
    },

    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: theme.spacing(6),
        minWidth: theme.spacing(6),
        padding: theme.spacing(0, 2),
        paddingTop: '2px',
        borderBottom: '2px solid transparent',
        ...theme.typography.subtitle2,
        color: theme.palette.text.primary,
        transition: 'border 300ms cubic-bezier(0.4, 0, 0.2, 1)',

        '&:hover': {
          borderBottomColor: theme.palette.text.primary
        },
        '&:focus-visible': {
          outline: `none !important`,
          boxShadow: ` inset 0 0 0 2px ${theme.palette.primary.main} !important`
        },
        '&.Mui-selected': {
          pointerEvents: 'none',

          '& svg:not(.doNotFillIcon) path': {
            fill: theme.palette.primary.main
          }
        },
        '.MuiTabs-vertical &': {
          paddingTop: 0,
          borderBottom: 0,
          paddingLeft: '2px',
          borderRight: '2px solid transparent',

          '&:hover': {
            borderRightColor: theme.palette.text.primary
          }
        }
      }),
      wrapped: () => ({
        maxWidth: '240px'
      })
    }
  },

  // Breadcrumbs
  MuiBreadcrumbs: {
    styleOverrides: {
      li: ({ theme }) => ({
        '& .MuiTypography-root': {
          ...theme.typography.body2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        },
        '& .MuiSvgIcon-root': {
          fontSize: ICON_SIZE_MEDIUM,
          marginRight: theme.spacing(1)
        }
      }),

      separator: ({ theme }) => ({
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5)
      })
    }
  },

  // Links
  MuiLink: {
    defaultProps: {
      underline: 'hover'
    },

    styleOverrides: {
      root: () => ({
        cursor: 'pointer'
      })
    }
  }
};
