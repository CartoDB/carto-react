// salto de borde y colores ok
import { getSpacing } from '../../themeUtils';
import { commonPalette } from '../palette';
import { themeTypography } from '../typography';
import { themeShadows } from '../shadows';

const sizeSmall = getSpacing(3);
const sizeMedium = getSpacing(4);
const sizeLarge = getSpacing(6);
const iconSize = getSpacing(2.25);

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
        maxWidth: '192px',

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
            ownerState.variant !== 'contained' && {
              background: commonPalette.error.relatedLight
            })
        },
        '& + &': {
          marginLeft: getSpacing(1)
        },
        '& .MuiSvgIcon-root': {
          fontSize: iconSize
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
          fontSize: iconSize
        },
        '&.MuiButton-iconSizeSmall': {
          marginRight: 4,
          marginLeft: -4
        }
      },
      endIcon: {
        marginLeft: 6,

        '& .MuiSvgIcon-root': {
          fontSize: iconSize
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
    defaultProps: {
      disableRipple: true
    },

    styleOverrides: {
      root: ({ ownerState }) => ({
        boxShadow: themeShadows[0],

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
          '& .MuiButtonGroup-grouped:not(:last-of-type):hover, & .Mui-disabled:not(:last-of-type)':
            {
              borderRightColor: 'transparent'
            }
        })
      })
    },
    variants: [
      // Custom color and its variants
      {
        props: { variant: 'contained', color: 'default' },
        style: {
          '& .MuiButton-root': {
            borderColor: commonPalette.default.main
          },
          '& .MuiButtonGroup-grouped:not(:last-of-type)': {
            borderColor: commonPalette.default.main,
            borderRightColor: commonPalette.default.dark
          },
          '& .MuiButtonGroup-grouped:hover, & .MuiButtonGroup-grouped:focus-visible': {
            borderColor: commonPalette.default.dark
          }
        }
      }
    ]
  },

  // Icon Button
  MuiIconButton: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        borderRadius: getSpacing(0.5),

        '& .MuiSvgIcon-root': {
          fontSize: iconSize
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
  },

  // FAB button
  MuiFab: {
    styleOverrides: {
      root: {
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
          ...themeTypography.body2,
          fontWeight: 600,
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
          ...themeTypography.body2,
          fontWeight: 600,
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
