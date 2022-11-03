import { getSpacing } from '../../themeUtils';
import { commonPalette } from '../palette';
import { themeTypography } from '../typography';

export const buttonsOverrides = {
  // Button
  MuiButton: {
    defaultProps: {
      disableElevation: true
    },

    styleOverrides: {
      root: {
        padding: getSpacing(0, 2)
      },
      contained: {
        boxShadow: 'none'
      },
      startIcon: {
        marginRight: 6,

        '& .MuiSvgIcon-root': {
          fontSize: 18
        },
        '&.MuiButton-iconSizeSmall': {
          marginRight: 4
        }
      },
      endIcon: {
        marginLeft: 6,

        '& .MuiSvgIcon-root': {
          fontSize: 18
        },
        '&.MuiButton-iconSizeSmall': {
          marginLeft: 4
        }
      },
      sizeSmall: {
        height: getSpacing(3),
        ...themeTypography.caption,
        fontWeight: 500,
        letterSpacing: '0.4px'
      },
      sizeMedium: {
        height: getSpacing(4)
      },
      sizeLarge: {
        height: getSpacing(6),
        ...themeTypography.body1,
        fontWeight: 500,
        letterSpacing: '0.25px'
      }
    },
    // Custom color
    variants: [
      {
        props: { variant: 'contained', color: 'default' },
        style: {
          color: commonPalette.text.primary,
          backgroundColor: commonPalette.default.main,

          '&.Mui-disabled': {
            color: commonPalette.text.disabled,
            backgroundColor: commonPalette.action.disabledBackground
          },
          '&:hover, &:focus': {
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
          '&:hover, &:focus': {
            backgroundColor: commonPalette.action.hover
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
          '&:hover, &:focus': {
            backgroundColor: commonPalette.action.hover
          }
        }
      }
    ]
  },

  // Button Base
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true
    }
  },

  // Icon Button
  MuiIconButton: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState.color === 'default' && {
          color: commonPalette.text.primary
        }),
        padding: getSpacing(0.75),
        borderRadius: getSpacing(0.5)
      }),
      sizeSmall: {
        padding: getSpacing(0.25)
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
