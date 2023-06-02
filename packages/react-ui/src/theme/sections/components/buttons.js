import { createTheme } from '@mui/material/styles';
import { getSpacing } from '../../themeUtils';
import { ICON_SIZE_MEDIUM, ICON_SIZE_LARGE } from '../../themeConstants';

const sizeSmall = getSpacing(3);
const sizeMedium = getSpacing(4);
const sizeLarge = getSpacing(6);
const radius = getSpacing(0.5);

export const buttonsOverrides = createTheme({
  // Button Base
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true
    },

    styleOverrides: {
      root: {
        '& .MuiSvgIcon-root, & svg': {
          display: 'flex',
          fontSize: ICON_SIZE_MEDIUM,
          width: ICON_SIZE_MEDIUM,
          minWidth: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM
        }
      }
    }
  },

  // Button
  MuiButton: {
    defaultProps: {
      disableElevation: true
    },

    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        // maxWidth: '192px', TODO temporary disabled waiting for a design definition

        '&:hover, &:focus-visible': {
          boxShadow: theme.shadows[0],

          ...(ownerState.variant !== 'contained' && {
            ...(ownerState.color === 'primary' && {
              backgroundColor: theme.palette.primary.background
            }),
            ...(ownerState.color === 'secondary' && {
              backgroundColor: theme.palette.secondary.background
            }),

            ...(ownerState.color === 'error' && {
              background: theme.palette.error.relatedLight
            })
          }),
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'secondary' && {
              backgroundColor: theme.palette.secondary.light
            })
        },
        '& svg:not(.doNotFillIcon) path': {
          fill: 'currentColor'
        },
        // Pairing buttons separation
        '& + .MuiButtonBase-root': {
          marginLeft: getSpacing(1)
        }
      }),

      contained: ({ theme }) => ({
        boxShadow: 'none',

        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
          backgroundColor: theme.palette.action.disabledBackground
        }
      }),
      outlined: ({ theme }) => ({
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
          borderColor: theme.palette.default.outlinedBorder
        }
      }),
      outlinedPrimary: ({ theme }) => ({
        borderColor: theme.palette.primary.main
      }),
      outlinedSecondary: ({ theme }) => ({
        borderColor: theme.palette.secondary.main
      }),
      outlinedError: ({ theme }) => ({
        borderColor: theme.palette.error.main
      }),
      containedPrimary: ({ theme }) => ({
        '&:hover, &:focus-visible': {
          backgroundColor: theme.palette.primary.dark
        }
      }),
      containedError: ({ theme }) => ({
        '&:hover, &:focus-visible': {
          backgroundColor: theme.palette.error.dark
        }
      }),

      startIcon: ({ theme }) => ({
        marginRight: getSpacing(0.75),

        '& .MuiSvgIcon-root, & svg': {
          fontSize: ICON_SIZE_MEDIUM,
          width: ICON_SIZE_MEDIUM,
          minWidth: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM
        },
        '&.MuiButton-iconSizeSmall': {
          marginRight: getSpacing(0.5),
          marginLeft: getSpacing(-0.5)
        }
      }),
      endIcon: ({ theme }) => ({
        marginLeft: getSpacing(0.75),

        '& .MuiSvgIcon-root, & svg': {
          fontSize: ICON_SIZE_MEDIUM,
          width: ICON_SIZE_MEDIUM,
          minWidth: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM
        },
        '&.MuiButton-iconSizeSmall': {
          marginLeft: getSpacing(0.5),
          marginRight: getSpacing(-0.5)
        }
      }),

      sizeSmall: ({ theme }) => ({
        height: sizeSmall,
        padding: getSpacing(0, 1.5),
        ...theme.typography.caption,
        lineHeight: sizeSmall,
        fontWeight: 500,
        letterSpacing: '0.4px'
      }),
      sizeMedium: ({ theme }) => ({
        height: sizeMedium,
        padding: getSpacing(0, 2),
        lineHeight: sizeMedium
      }),
      sizeLarge: ({ theme }) => ({
        height: sizeLarge,
        padding: getSpacing(0, 2.5),
        ...theme.typography.body1,
        lineHeight: sizeLarge,
        fontWeight: 500,
        letterSpacing: '0.25px'
      })
    },

    variants: [
      // Custom color and its variants
      {
        props: { variant: 'contained', color: 'default' },
        style: ({ theme }) => ({
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.default.main,
          borderColor: theme.palette.text.primary,

          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
            backgroundColor: theme.palette.action.disabledBackground
          },
          '&:hover, &:focus-visible': {
            backgroundColor: theme.palette.default.dark
          }
        })
      },
      {
        props: { variant: 'outlined', color: 'default' },
        style: ({ theme }) => ({
          color: theme.palette.text.primary,
          borderColor: theme.palette.text.primary,

          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
            borderColor: theme.palette.default.outlinedBorder
          },
          '&:hover, &:focus-visible': {
            backgroundColor: theme.palette.action.hover,
            borderColor: theme.palette.text.primary
          }
        })
      },
      {
        props: { variant: 'text', color: 'default' },
        style: ({ theme }) => ({
          color: theme.palette.text.primary,

          '&.Mui-disabled': {
            color: theme.palette.text.disabled
          },
          '&:hover, &:focus-visible': {
            backgroundColor: theme.palette.action.hover
          }
        })
      }
    ]
  },

  // Mui Button Group
  MuiButtonGroup: {
    defaultProps: {
      disableRipple: true,
      disableElevation: true
    },

    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        '& .MuiButton-root + .MuiButton-root': {
          marginLeft: 0
        },

        ...(ownerState.variant === 'text' && {
          boxShadow: theme.shadows[1],
          borderColor: theme.palette.default.dark,

          '& .MuiButtonGroup-grouped:not(:last-of-type)': {
            borderColor: theme.palette.default.dark
          }
        }),
        ...(ownerState.variant === 'outlined' && {
          ...(ownerState.color === 'default' && {
            '& .MuiButtonBase-root.Mui-disabled': {
              borderColor: theme.palette.text.primary
            }
          }),
          ...(ownerState.color === 'primary' && {
            '& .MuiButtonBase-root.Mui-disabled': {
              borderColor: theme.palette.primary.main
            }
          }),
          ...(ownerState.color === 'secondary' && {
            '& .MuiButtonBase-root.Mui-disabled': {
              borderColor: theme.palette.secondary.main
            }
          }),
          ...(ownerState.orientation !== 'vertical' && {
            '& .MuiButtonGroup-grouped:not(:last-of-type):hover, & .Mui-disabled:not(:last-of-type)':
              {
                borderRightColor: 'transparent'
              }
          })
        }),
        ...(ownerState.variant === 'contained' && {
          ...(ownerState.color === 'default' && {
            '& .MuiButtonGroup-grouped:not(:last-of-type)': {
              borderRightColor: theme.palette.default.dark,

              '&.Mui-disabled': {
                ...(ownerState.color === 'default' && {
                  borderColor: theme.palette.default.dark
                }),
                ...(ownerState.color === 'primary' && {
                  borderColor: theme.palette.primary.dark
                }),
                ...(ownerState.color === 'secondary' && {
                  borderColor: theme.palette.secondary.dark
                })
              }
            }
          })
        })
      })
    }
  },

  // Icon Button
  MuiIconButton: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        borderRadius: getSpacing(0.5),

        ...(ownerState.color === 'default' && {
          color: theme.palette.text.secondary
        }),
        '& .MuiSvgIcon-root, & svg': {
          fontSize: ICON_SIZE_MEDIUM,
          width: ICON_SIZE_MEDIUM,
          minWidth: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM
        },
        '& svg:not(.doNotFillIcon) path': {
          fill: 'currentColor'
        },
        '&:hover, &:focus-visible': {
          ...(ownerState.color === 'default' && {
            backgroundColor: theme.palette.action.hover
          }),
          ...(ownerState.color === 'primary' && {
            backgroundColor: theme.palette.primary.background
          }),
          ...(ownerState.color === 'secondary' && {
            backgroundColor: theme.palette.secondary.background
          })
        }
      }),

      sizeSmall: {
        width: sizeSmall,
        height: sizeSmall
      },
      sizeMedium: {
        width: sizeMedium,
        height: sizeMedium
      },
      sizeLarge: {
        width: sizeLarge,
        height: sizeLarge
      }
    }
  },

  // MuiToggleButton
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        minWidth: sizeMedium,
        height: sizeMedium,
        padding: getSpacing(0, 1),
        color: theme.palette.text.secondary,
        border: 'none',
        borderRadius: radius,
        transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

        '&:hover': {
          backgroundColor: theme.palette.action.hover
        },
        // Pairing buttons separation
        '& + &': {
          marginLeft: getSpacing(0.5)
        },
        '.MuiSvgIcon-root, & svg': {
          margin: getSpacing(0, -0.75)
        },
        '&.Mui-selected': {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.background,

          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        },
        '&.Mui-disabled': {
          border: 'none'
        }
      }),
      sizeLarge: ({ theme }) => ({
        minWidth: sizeLarge,
        height: sizeLarge,
        ...theme.typography.body1
      }),
      sizeSmall: ({ theme }) => ({
        minWidth: sizeSmall,
        height: sizeSmall,
        ...theme.typography.caption,
        fontWeight: 500
      })
    }
  },

  // MuiToggleButtonGroup
  MuiToggleButtonGroup: {
    defaultProps: {
      orientation: 'horizontal',
      exclusive: true
    },

    styleOverrides: {
      root: ({ theme }) => ({
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: getSpacing(1),
        boxShadow: theme.shadows[1],
        backgroundColor: theme.palette.background.paper,

        '& .MuiToggleButtonGroup-grouped:not(:first-of-type), &.Mui-Selected, & .MuiToggleButtonGroup-grouped:not(:last-of-type)':
          {
            borderRadius: radius
          },
        '.MuiDivider-root': {
          height: sizeLarge,
          margin: getSpacing(0, 1),
          marginLeft: getSpacing(0.5)
        }
      }),
      // Styles applied to the children if orientation="horizontal"
      groupedHorizontal: ({ theme }) => ({
        height: sizeMedium,
        margin: getSpacing(1),

        '&:not(:last-of-type)': {
          marginRight: getSpacing(0.5),
          marginLeft: 0,
          borderLeft: 'none'
        },
        '&:first-of-type': {
          marginLeft: getSpacing(1)
        },
        '&.MuiToggleButton-sizeSmall': {
          height: sizeSmall,
          margin: getSpacing(0.5),

          '&:not(:first-of-type)': {
            marginLeft: 0
          },
          '& + .MuiDivider-root': {
            height: sizeMedium
          }
        }
      }),
      // Styles applied to the children if orientation="vertical"
      groupedVertical: ({ theme }) => ({
        width: sizeMedium,
        margin: getSpacing(1),

        '&.MuiToggleButton-root': {
          marginLeft: getSpacing(1),
          marginBottom: getSpacing(0.5)
        },
        '&.MuiToggleButton-sizeSmall': {
          width: sizeSmall,
          margin: getSpacing(0.5),

          '&:not(:first-of-type)': {
            marginTop: 0
          }
        }
      })
    }
  },

  // FAB button
  MuiFab: {
    defaultProps: {
      color: 'primary'
    },

    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        '&:focus': {
          boxShadow: theme.shadows[6]
        },

        '& .MuiSvgIcon-root, & svg': {
          fontSize: ICON_SIZE_LARGE,
          width: ICON_SIZE_LARGE,
          minWidth: ICON_SIZE_LARGE,
          height: ICON_SIZE_LARGE
        },
        '&.MuiFab-extended': {
          ...theme.typography.body1,
          fontWeight: 500,
          width: 'auto',
          height: getSpacing(7),
          paddingRight: getSpacing(3),
          borderRadius: getSpacing(8),

          '& .MuiSvgIcon-root': {
            marginRight: getSpacing(1.5)
          }
        },

        ...(ownerState.color === 'default' && {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,

          '&:hover, &:focus-visible': {
            backgroundColor: theme.palette.default.light
          }
        })
      }),

      sizeSmall: ({ theme }) => ({
        width: getSpacing(4),
        height: getSpacing(4),
        minHeight: getSpacing(4),

        '& .MuiSvgIcon-root, & svg': {
          fontSize: ICON_SIZE_MEDIUM,
          width: ICON_SIZE_MEDIUM,
          minWidth: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM
        },
        '&.MuiFab-extended': {
          ...theme.typography.caption,
          width: 'auto',
          height: getSpacing(4),
          paddingRight: getSpacing(2),

          '& .MuiSvgIcon-root': {
            marginRight: getSpacing(1)
          }
        }
      }),
      sizeMedium: ({ theme }) => ({
        '&.MuiFab-extended': {
          ...theme.typography.button,
          height: getSpacing(6)
        }
      }),

      secondary: ({ theme }) => ({
        '&:hover': {
          backgroundColor: theme.palette.secondary.light
        }
      })
    }
  }
});
