import { getPixelToRem, getSpacing } from '../../themeUtils';
import { commonPalette } from '../palette';

export const buttonsOverrides = {
  // Button
  MuiButton: {
    defaultProps: {
      disableElevation: true
    },

    styleOverrides: {
      contained: {
        boxShadow: 'none'
      },
      outlined: {
        border: `2px solid ${commonPalette.text.primary}`,
        padding: '4px 14px',
        '&:hover': {
          borderWidth: '2px'
        },
        '&.Mui-disabled': {
          borderWidth: '2px'
        }
      },
      outlinedPrimary: {
        border: `2px solid ${commonPalette.primary.main}`,
        '&:hover': {
          borderWidth: '2px'
        }
      },
      outlinedSecondary: {
        border: `2px solid ${commonPalette.secondary.main}`,
        '&:hover': {
          borderWidth: '2px'
        },
        '&.Mui-disabled': {
          borderWidth: '2px'
        }
      },
      containedSizeSmall: {
        padding: '2px 12px',
        fontSize: getPixelToRem(12)
      },
      outlinedSizeSmall: {
        padding: '2px 12px',
        fontSize: getPixelToRem(12)
      },
      textSizeSmall: {
        padding: '2px 12px',
        fontSize: getPixelToRem(12)
      },
      containedSizeLarge: {
        padding: '16px 24px',
        fontSize: getPixelToRem(16)
      },
      containedSecondary: {
        '&:hover': {
          backgroundColor: commonPalette.secondary.light
        }
      },
      outlinedSizeLarge: {
        padding: '16px 24px',
        fontSize: getPixelToRem(16)
      },
      textSizeLarge: {
        padding: '16px 24px',
        fontSize: getPixelToRem(16)
      },
      startIcon: {
        marginRight: 6,
        marginLeft: -4,
        '&.MuiButton-iconSizeSmall': {
          marginLeft: -4
        },
        '&.MuiButton-iconSizeLarge': {
          marginRight: 8
        }
      },
      endIcon: {
        marginRight: -4,
        marginLeft: 6,
        '&.MuiButton-iconSizeSmall': {
          marginRight: -4
        },
        '&.MuiButton-iconSizeLarge': {
          marginLeft: 8
        }
      },
      iconSizeSmall: {
        '& > *:first-child': {
          fontSize: 20
        }
      },
      iconSizeMedium: {
        '& > *:first-child': {
          fontSize: 24
        }
      },
      iconSizeLarge: {
        '& > *:first-child': {
          fontSize: 24
        }
      }
    }
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
      root: {
        padding: getSpacing(0.75),
        borderRadius: getSpacing(0.5),
        color: commonPalette.text.primary
      },
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
