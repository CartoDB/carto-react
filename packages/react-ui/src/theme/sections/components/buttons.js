import { getSpacing } from '../../themeUtils';
import { commonPalette } from '../palette';
import { themeTypography } from '../typography';
import { themeShadows } from '../shadows';

const sizeSmall = getSpacing(3);
const sizeMedium = getSpacing(4);
const sizeLarge = getSpacing(6);

export const buttonsOverrides = {
  // Button Base
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true
    }
  },

  // Button
  MuiButton: {
    defaultProps: {
      disableElevation: true
    },

    styleOverrides: {
      root: ({ ownerState }) => ({
        '&:hover, &:focus-visible': {
          ...(ownerState.color === 'primary' &&
            ownerState.variant !== 'contained' && {
              backgroundColor: commonPalette.primary.background
            }),
          ...(ownerState.color === 'secondary' &&
            ownerState.variant !== 'contained' && {
              backgroundColor: commonPalette.secondary.background
            }),
          ...(ownerState.color === 'secondary' &&
            ownerState.variant === 'contained' && {
              backgroundColor: commonPalette.secondary.light
            }),
          ...(ownerState.color === 'error' &&
            ownerState.variant !== 'contained' &&
            {
              // background: commonPalette.error.relatedLight // TODO discuss with design the linear-gradient issue
            })
        },
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

      startIcon: {
        marginRight: 6,

        '& .MuiSvgIcon-root': {
          fontSize: 18
        },
        '&.MuiButton-iconSizeSmall': {
          marginRight: 4,
          marginLeft: -4
        }
      },
      endIcon: {
        marginLeft: 6,

        '& .MuiSvgIcon-root': {
          fontSize: 18
        },
        '&.MuiButton-iconSizeSmall': {
          marginLeft: 4,
          marginRight: -4
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
          border: `1px solid ${commonPalette.text.primary}`,

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
    styleOverrides: {
      root: ({ ownerState }) => ({
        boxShadow: themeShadows[0],

        ...(ownerState.variant === 'text' && {
          boxShadow: themeShadows[1],
          '& .MuiButtonGroup-grouped:not(:last-of-type)': {
            borderColor: commonPalette.default.dark
          }
        }),
        ...(ownerState.variant === 'outlined' && {
          '& .MuiButtonBase-root.Mui-disabled': {
            borderColor: 'inherit'
          }
        })
      })
    }
  },

  // Icon Button
  MuiIconButton: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        borderRadius: getSpacing(0.5),

        '& .MuiSvgIcon-root': {
          fontSize: 18
        },

        ...(ownerState.color === 'default' && {
          color: commonPalette.text.secondary,

          '&:hover, &:focus-visible': {
            backgroundColor: commonPalette.action.hover
          }
        }),
        ...(ownerState.color === 'primary' && {
          '&:hover, &:focus-visible': {
            backgroundColor: commonPalette.primary.background
          }
        }),
        ...(ownerState.color === 'secondary' && {
          '&:hover, &:focus-visible': {
            backgroundColor: commonPalette.secondary.background
          }
        })
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
        width: getSpacing(4.5),
        height: getSpacing(4.5),
        border: 'none',
        borderRadius: getSpacing(0.5),
        color: commonPalette.grey[500],

        '&.Mui-selected': {
          color: commonPalette.primary.main,
          backgroundColor: commonPalette.primary.background,

          '&:hover': {
            backgroundColor: commonPalette.primary.background
          }
        }
      },
      sizeSmall: {
        width: getSpacing(3),
        height: getSpacing(3),

        '& .MuiSvgIcon-root': {
          maxWidth: getSpacing(2.5),
          maxHeight: getSpacing(2.5)
        }
      },
      sizeLarge: {
        width: getSpacing(7),
        height: getSpacing(7)
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
      groupedHorizontal: {
        '&:not(:last-child)': {
          marginRight: getSpacing(0.25),
          borderTopRightRadius: getSpacing(0.5),
          borderBottomRightRadius: getSpacing(0.5)
        },
        '&:not(:first-child)': {
          marginLeft: 0,
          borderLeft: 'none',
          borderTopLeftRadius: getSpacing(0.5),
          borderBottomLeftRadius: getSpacing(0.5)
        }
      },
      groupedVertical: {
        '&:not(:last-child)': {
          marginBottom: getSpacing(0.25),
          borderBottomLeftRadius: getSpacing(0.5),
          borderBottomRightRadius: getSpacing(0.5)
        },
        '&:not(:first-child)': {
          borderTopLeftRadius: getSpacing(0.5),
          borderTopRightRadius: getSpacing(0.5)
        }
      }
    }
  }
};
