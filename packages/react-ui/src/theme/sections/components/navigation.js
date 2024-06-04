import { ICON_SIZE_LARGE, ICON_SIZE_MEDIUM } from '../../themeConstants';

export const navigationOverrides = {
  // Menu
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        '&.MuiMenu-paper': {
          minWidth: theme.spacing(8), // 64px, defined by design
          maxHeight: theme.spacing(39), // 312px, defined by design

          '&:focus-visible': {
            outline: 'none !important',
            boxShadow: 'none !important'
          }
        }
      })
    }
  },

  // Menu Item
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.body2,
        columnGap: theme.spacing(1),
        minHeight: theme.spacing(4),
        padding: theme.spacing(0.75, 1, 0.75, 1.5),
        whiteSpace: 'normal',
        transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

        [theme.breakpoints.up('sm')]: {
          // Overrides an unwanted Mui default style
          '&.MuiButtonBase-root': {
            minHeight: theme.spacing(4)
          }
        },
        '&:hover': {
          '.MuiAvatar-root, .MuiChip-root, .CartoTag-root': {
            cursor: 'pointer'
          }
        },

        '&:focus-visible': {
          // Solves a known Mui issue: https://github.com/mui/material-ui/issues/23747
          backgroundColor: 'transparent',
          outline: `none !important`,
          boxShadow: `inset 0 0 0 2px ${theme.palette.primary.main} !important`,
          borderRadius: theme.shape.borderRadius,

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
          },
          '.MuiTypography-caption': {
            // secondary text
            color: theme.palette.text.secondary
          }
        },
        '&.Mui-disabled': {
          opacity: 1,
          color: theme.palette.text.disabled,
          backgroundColor: theme.palette.background.paper,

          '&:empty': {
            height: 0,
            minHeight: 0,
            padding: 0
          },

          '.MuiTypography-root': {
            color: theme.palette.text.disabled
          },
          svg: {
            color: theme.palette.text.disabled
          },
          '.MuiListItemIcon-root svg path': {
            fill: theme.palette.text.disabled
          },
          '.MuiAvatar-root': {
            color: theme.palette.text.disabled,
            backgroundColor: theme.palette.action.disabledBackground
          }
        },
        '& > .MuiSvgIcon-root': {
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

        '.MuiTypography-root': {
          ...theme.typography.caption,
          fontWeight: 500
        },

        [theme.breakpoints.up('sm')]: {
          // Overrides an unwanted Mui default style
          '&.MuiButtonBase-root': {
            minHeight: theme.spacing(3)
          }
        }
      })
    }
  },

  // List
  MuiList: {
    styleOverrides: {
      root: ({ theme }) => ({
        '.MuiPopover-root &, .MuiPopper-root &': {
          minWidth: theme.spacing(8), // 64px, defined by design
          maxHeight: theme.spacing(39), // 312px, defined by design
          overflowY: 'auto',

          '&:focus-visible': {
            outline: 'none !important',
            boxShadow: 'none !important'
          }
        },
        '.MuiDivider-root': {
          margin: theme.spacing(1, 0)
        },

        // Indent sublevels, ugly but needed to avoid issues with hover
        '& .MuiList-root': {
          paddingTop: 0,
          paddingBottom: 0,

          '& .MuiListItem-root': {
            paddingLeft: theme.spacing(4)
          },

          '& .MuiList-root': {
            '& .MuiListItem-root': {
              paddingLeft: theme.spacing(6)
            },

            '& .MuiList-root': {
              '& .MuiListItem-root': {
                paddingLeft: theme.spacing(8)
              },

              '& .MuiList-root': {
                '& .MuiListItem-root': {
                  paddingLeft: theme.spacing(10)
                }
              }
            }
          }
        },

        '& .MuiListItemButton-root': {
          '&:focus-visible': {
            backgroundColor: 'transparent'
          }
        }
      })
    }
  },

  // List Item
  MuiListItemText: {
    defaultProps: {
      primaryTypographyProps: {
        variant: 'body2',
        noWrap: true,
        component: 'div'
      },
      secondaryTypographyProps: { variant: 'caption' }
    },
    styleOverrides: {
      root: ({ theme }) => ({
        paddingRight: theme.spacing(2),

        '& + .MuiBox-root': {
          marginRight: theme.spacing(1)
        }
      })
    }
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiSvgIcon-root': {
          fontSize: ICON_SIZE_LARGE
        },
        '.MuiMenuItem-root.MuiButtonBase-root &': {
          minWidth: ICON_SIZE_MEDIUM
        }
      })
    }
  },
  MuiListItemAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiAvatar-root': {
          height: theme.spacing(4),
          width: theme.spacing(4)
        },
        '& .MuiSvgIcon-root': {
          fontSize: ICON_SIZE_MEDIUM
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
          boxShadow: `inset 0 0 0 2px ${theme.palette.primary.main} !important`,
          borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`
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
