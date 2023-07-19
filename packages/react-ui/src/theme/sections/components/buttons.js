import { getSpacing } from '../../themeUtils';
import { ICON_SIZE_MEDIUM, ICON_SIZE_LARGE } from '../../themeConstants';

const sizeSmall = getSpacing(3);
const sizeMedium = getSpacing(4);
const sizeLarge = getSpacing(6);
const radius = getSpacing(0.5);

export const buttonsOverrides = {
  // Button Base
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true
    },

    styleOverrides: {
      root: () => ({
        '& .MuiSvgIcon-root, & svg': {
          display: 'flex',
          fontSize: ICON_SIZE_MEDIUM,
          width: ICON_SIZE_MEDIUM,
          minWidth: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM
        }
      })
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
          marginLeft: theme.spacing(1)
        }
      }),

      contained: ({ theme }) => ({
        boxShadow: 'none',

        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
          backgroundColor: theme.palette.action.disabledBackground
        }
      }),
      text: ({ theme }) => ({
        minWidth: theme.spacing(7)
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
        marginRight: theme.spacing(0.75),

        '& .MuiSvgIcon-root, & svg': {
          fontSize: ICON_SIZE_MEDIUM,
          width: ICON_SIZE_MEDIUM,
          minWidth: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM
        },
        '&.MuiButton-iconSizeSmall': {
          marginRight: theme.spacing(0.5),
          marginLeft: theme.spacing(-0.5)
        }
      }),
      endIcon: ({ theme }) => ({
        marginLeft: theme.spacing(0.75),

        '& .MuiSvgIcon-root, & svg': {
          fontSize: ICON_SIZE_MEDIUM,
          width: ICON_SIZE_MEDIUM,
          minWidth: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM
        },
        '&.MuiButton-iconSizeSmall': {
          marginLeft: theme.spacing(0.5),
          marginRight: theme.spacing(-0.5)
        }
      }),

      sizeSmall: ({ theme, ownerState }) => ({
        height: sizeSmall,
        padding: theme.spacing(0, 1.5),
        ...theme.typography.caption,
        lineHeight: sizeSmall,
        fontWeight: 500,
        letterSpacing: '0.4px',

        ...(ownerState.variant === 'text' && {
          padding: theme.spacing(0, 1)
        })
      }),
      sizeMedium: ({ theme, ownerState }) => ({
        height: sizeMedium,
        padding: theme.spacing(0, 2),
        lineHeight: sizeMedium,

        ...(ownerState.variant === 'text' && {
          padding: theme.spacing(0, 1)
        })
      }),
      sizeLarge: ({ theme, ownerState }) => ({
        height: sizeLarge,
        padding: theme.spacing(0, 2.5),
        ...theme.typography.body1,
        lineHeight: sizeLarge,
        fontWeight: 500,
        letterSpacing: '0.25px',

        ...(ownerState.variant === 'text' && {
          padding: theme.spacing(0, 2)
        })
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
        borderRadius: theme.spacing(0.5),

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

      sizeSmall: () => ({
        width: sizeSmall,
        height: sizeSmall
      }),
      sizeMedium: () => ({
        width: sizeMedium,
        height: sizeMedium
      }),
      sizeLarge: () => ({
        width: sizeLarge,
        height: sizeLarge
      })
    }
  },

  // MuiToggleButton
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        minWidth: sizeMedium,
        height: sizeMedium,
        padding: theme.spacing(0, 1),
        color: theme.palette.text.secondary,
        border: 'none',
        borderRadius: radius,
        transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

        '&:hover': {
          backgroundColor: theme.palette.action.hover
        },
        // Pairing buttons separation
        '& + &': {
          marginLeft: theme.spacing(0.5)
        },
        '.MuiSvgIcon-root, & svg': {
          margin: theme.spacing(0, -0.75)
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
        borderRadius: theme.spacing(1),
        boxShadow: theme.shadows[1],
        backgroundColor: theme.palette.background.paper,

        '& .MuiToggleButtonGroup-grouped:not(:first-of-type), &.Mui-Selected, & .MuiToggleButtonGroup-grouped:not(:last-of-type)':
          {
            borderRadius: radius
          },
        '.MuiDivider-root': {
          height: sizeLarge,
          margin: theme.spacing(0, 1),
          marginLeft: theme.spacing(0.5)
        }
      }),
      // Styles applied to the children if orientation="horizontal"
      groupedHorizontal: ({ theme }) => ({
        height: sizeMedium,
        margin: theme.spacing(1),

        '&:not(:last-of-type)': {
          marginRight: theme.spacing(0.5),
          marginLeft: 0,
          borderLeft: 'none'
        },
        '&:first-of-type': {
          marginLeft: theme.spacing(1)
        },
        '&.MuiToggleButton-sizeSmall': {
          height: sizeSmall,
          margin: theme.spacing(0.5),

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
        margin: theme.spacing(1),

        '&.MuiToggleButton-root': {
          marginLeft: theme.spacing(1),
          marginBottom: theme.spacing(0.5)
        },
        '&.MuiToggleButton-sizeSmall': {
          width: sizeSmall,
          margin: theme.spacing(0.5),

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
          height: theme.spacing(7),
          paddingRight: theme.spacing(3),
          borderRadius: theme.spacing(8),

          '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1.5)
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
        width: theme.spacing(4),
        height: theme.spacing(4),
        minHeight: theme.spacing(4),

        '& .MuiSvgIcon-root, & svg': {
          fontSize: ICON_SIZE_MEDIUM,
          width: ICON_SIZE_MEDIUM,
          minWidth: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM
        },
        '&.MuiFab-extended': {
          ...theme.typography.caption,
          width: 'auto',
          height: theme.spacing(4),
          paddingRight: theme.spacing(2),

          '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
          }
        }
      }),
      sizeMedium: ({ theme }) => ({
        '&.MuiFab-extended': {
          ...theme.typography.button,
          height: theme.spacing(6)
        }
      }),

      secondary: ({ theme }) => ({
        '&:hover': {
          backgroundColor: theme.palette.secondary.light
        }
      })
    }
  }
};
