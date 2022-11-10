import { getSpacing } from '../../themeUtils';
import { commonPalette } from '../palette';
import { themeTypography } from '../typography';
import { themeShadows } from '../shadows';

const sizeSmall = getSpacing(3);
const sizeMedium = getSpacing(4);
const sizeLarge = getSpacing(6);
const iconSize = getSpacing(2.25);
const radius = getSpacing(0.5);

export const buttonsOverrides = {
  // Button Base
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
      disableElevation: true
    },

    styleOverrides: {
      root: {
        '& .MuiSvgIcon-root': {
          display: 'flex',
          fontSize: iconSize
        }
      }
    }
  },

  // Button
  MuiButton: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        maxWidth: '192px',

        '&:hover, &:focus-visible': {
          boxShadow: themeShadows[0],

          ...(ownerState.variant !== 'contained' && {
            ...(ownerState.color === 'primary' && {
              backgroundColor: commonPalette.primary.background
            }),
            ...(ownerState.color === 'secondary' && {
              backgroundColor: commonPalette.secondary.background
            }),

            ...(ownerState.color === 'error' && {
              background: commonPalette.error.relatedLight
            })
          }),
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'secondary' && {
              backgroundColor: commonPalette.secondary.light
            })
        },
        // Pairing buttons separation
        '& + &': {
          marginLeft: getSpacing(1)
        }
      }),

      contained: {
        boxShadow: 'none',

        '&.Mui-disabled': {
          color: commonPalette.text.disabled,
          backgroundColor: commonPalette.action.disabledBackground
        }
      },
      outlined: {
        '&.Mui-disabled': {
          color: commonPalette.text.disabled,
          borderColor: commonPalette.default.outlinedBorder
        }
      },
      outlinedPrimary: {
        borderColor: commonPalette.primary.main
      },
      outlinedSecondary: {
        borderColor: commonPalette.secondary.main
      },
      outlinedError: {
        borderColor: commonPalette.error.main
      },
      containedPrimary: {
        '&:hover, &:focus-visible': {
          backgroundColor: commonPalette.primary.dark
        }
      },
      containedError: {
        '&:hover, &:focus-visible': {
          backgroundColor: commonPalette.error.dark
        }
      },

      startIcon: {
        marginRight: getSpacing(0.75),

        '& .MuiSvgIcon-root': {
          fontSize: iconSize
        },
        '&.MuiButton-iconSizeSmall': {
          marginRight: getSpacing(0.5),
          marginLeft: getSpacing(-0.5)
        }
      },
      endIcon: {
        marginLeft: getSpacing(0.75),

        '& .MuiSvgIcon-root': {
          fontSize: iconSize
        },
        '&.MuiButton-iconSizeSmall': {
          marginLeft: getSpacing(0.5),
          marginRight: getSpacing(-0.5)
        }
      },

      sizeSmall: {
        height: sizeSmall,
        padding: getSpacing(0, 1.5),
        ...themeTypography.caption,
        lineHeight: sizeSmall,
        fontWeight: 500,
        letterSpacing: '0.4px'
      },
      sizeMedium: {
        height: sizeMedium,
        padding: getSpacing(0, 2),
        lineHeight: sizeMedium
      },
      sizeLarge: {
        height: sizeLarge,
        padding: getSpacing(0, 2.5),
        ...themeTypography.body1,
        lineHeight: sizeLarge,
        fontWeight: 500,
        letterSpacing: '0.25px'
      }
    },

    variants: [
      // Custom color and its variants
      {
        props: { variant: 'contained', color: 'default' },
        style: {
          color: commonPalette.text.primary,
          backgroundColor: commonPalette.default.main,
          borderColor: commonPalette.text.primary,

          '&.Mui-disabled': {
            color: commonPalette.text.disabled,
            backgroundColor: commonPalette.action.disabledBackground
          },
          '&:hover, &:focus-visible': {
            backgroundColor: commonPalette.default.dark
          }
        }
      },
      {
        props: { variant: 'outlined', color: 'default' },
        style: {
          color: commonPalette.text.primary,
          borderColor: commonPalette.text.primary,

          '&.Mui-disabled': {
            color: commonPalette.text.disabled,
            borderColor: commonPalette.default.outlinedBorder
          },
          '&:hover, &:focus-visible': {
            backgroundColor: commonPalette.action.hover,
            borderColor: commonPalette.text.primary
          }
        }
      },
      {
        props: { variant: 'text', color: 'default' },
        style: {
          color: commonPalette.text.primary,

          '&.Mui-disabled': {
            color: commonPalette.text.disabled
          },
          '&:hover, &:focus-visible': {
            backgroundColor: commonPalette.action.hover
          }
        }
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
      root: ({ ownerState }) => ({
        '& .MuiButton-root + .MuiButton-root': {
          marginLeft: 0
        },

        ...(ownerState.variant === 'text' && {
          boxShadow: themeShadows[1],
          borderColor: commonPalette.default.dark,

          '& .MuiButtonGroup-grouped:not(:last-of-type)': {
            borderColor: commonPalette.default.dark
          }
        }),
        ...(ownerState.variant === 'outlined' && {
          ...(ownerState.color === 'default' && {
            '& .MuiButtonBase-root.Mui-disabled': {
              borderColor: commonPalette.text.primary
            }
          }),
          ...(ownerState.color === 'primary' && {
            '& .MuiButtonBase-root.Mui-disabled': {
              borderColor: commonPalette.primary.main
            }
          }),
          ...(ownerState.color === 'secondary' && {
            '& .MuiButtonBase-root.Mui-disabled': {
              borderColor: commonPalette.secondary.main
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
              borderRightColor: commonPalette.default.dark,

              '&.Mui-disabled': {
                ...(ownerState.color === 'default' && {
                  borderColor: commonPalette.default.dark
                }),
                ...(ownerState.color === 'primary' && {
                  borderColor: commonPalette.primary.dark
                }),
                ...(ownerState.color === 'secondary' && {
                  borderColor: commonPalette.secondary.dark
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
      root: ({ ownerState }) => ({
        borderRadius: getSpacing(0.5),

        ...(ownerState.color === 'default' && {
          color: commonPalette.text.secondary
        }),
        '& .MuiSvgIcon-root': {
          fontSize: iconSize
        },
        '&:hover, &:focus-visible': {
          ...(ownerState.color === 'default' && {
            backgroundColor: commonPalette.action.hover
          }),
          ...(ownerState.color === 'primary' && {
            backgroundColor: commonPalette.primary.background
          }),
          ...(ownerState.color === 'secondary' && {
            backgroundColor: commonPalette.secondary.background
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
      root: {
        minWidth: sizeMedium,
        height: sizeMedium,
        color: commonPalette.text.secondary,
        border: 'none',
        borderRadius: radius,

        // Pairing buttons separation
        '& + &': {
          marginLeft: getSpacing(0.5)
        },
        '&.Mui-selected': {
          color: commonPalette.primary.main,
          backgroundColor: commonPalette.primary.background,

          '&:hover': {
            backgroundColor: commonPalette.action.hover
          }
        }
      },
      sizeSmall: {
        minWidth: sizeSmall,
        height: sizeSmall
      }
    }
  },

  // MuiToggleButtonGroup
  MuiToggleButtonGroup: {
    defaultProps: {
      orientation: 'horizontal',
      exclusive: true
    },

    styleOverrides: {
      root: {
        minWidth: sizeLarge,
        minHeight: sizeLarge,
        borderRadius: getSpacing(1),
        boxShadow: themeShadows[1],

        '& .MuiToggleButtonGroup-grouped:not(:first-of-type), &.Mui-Selected': {
          borderRadius: radius
        },
        '& .MuiToggleButtonGroup-grouped:not(:last-of-type)': {
          marginRight: getSpacing(0.5),
          borderRadius: radius
        },
        '.MuiDivider-root': { margin: getSpacing(1, 0) }
      },
      groupedHorizontal: {
        height: sizeLarge,

        '& .MuiToggleButton-root': {
          height: sizeMedium
        }
      },
      groupedVertical: {
        width: sizeLarge,

        '& .MuiToggleButton-root': {
          width: sizeMedium
        }
      }
    }
  },

  // FAB button
  MuiFab: {
    styleOverrides: {
      root: {
        '&:focus': {
          boxShadow: themeShadows[6]
        },

        '& .MuiSvgIcon-root': {
          width: getSpacing(3),
          height: getSpacing(3)
        },
        '&.MuiFab-extended': {
          ...themeTypography.body1,
          fontWeight: 500,
          width: 'auto',
          height: getSpacing(7),
          paddingRight: getSpacing(3),
          borderRadius: getSpacing(8),

          '& .MuiSvgIcon-root': {
            marginRight: getSpacing(1.5)
          }
        }
      },

      sizeSmall: {
        width: getSpacing(4),
        height: getSpacing(4),
        minHeight: getSpacing(4),

        '& .MuiSvgIcon-root': {
          width: iconSize,
          height: iconSize
        },
        '&.MuiFab-extended': {
          ...themeTypography.caption,
          width: 'auto',
          height: getSpacing(4),
          paddingRight: getSpacing(2),

          '& .MuiSvgIcon-root': {
            marginRight: getSpacing(1)
          }
        }
      },
      sizeMedium: {
        '&.MuiFab-extended': {
          ...themeTypography.button,
          height: getSpacing(6)
        }
      },

      secondary: {
        '&:hover': {
          backgroundColor: commonPalette.secondary.light
        }
      }
    }
  }
};
