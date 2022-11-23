import { ICON_SIZE, ICON_SIZE_M } from '../../themeConstants';
import { getSpacing } from '../../themeUtils';
import { commonPalette } from '../palette';
import { themeShadows } from '../shadows';
import { themeTypography } from '../typography';

const switchSizeS = 2;
const switchSizeM = 3;
const switchSizeL = 4;

const checkboxRadioOverrides = {
  root: ({ ownerState }) => ({
    padding: getSpacing(0.5),

    ...(ownerState.size === 'small' && {
      padding: '3px' // Forced to a non-standard value to meet with design
    }),

    '&:hover, &:focus-visible': {
      backgroundColor: commonPalette.primary.background
    },
    '& + .MuiFormControlLabel-label': {
      ...themeTypography.body2,
      marginLeft: getSpacing(0.25),

      ...(ownerState.size === 'small' && {
        marginLeft: getSpacing(0.5)
      })
    },

    '& .MuiSvgIcon-root': {
      fontSize: ICON_SIZE_M,

      ...(ownerState.size === 'small' && {
        fontSize: ICON_SIZE
      })
    }
  })
};

export const formsOverrides = {
  // Checkbox
  MuiCheckbox: {
    styleOverrides: {
      ...checkboxRadioOverrides
    }
  },

  // Radio Button
  MuiRadio: {
    styleOverrides: {
      ...checkboxRadioOverrides
    }
  },

  // Text Field
  MuiTextField: {
    defaultProps: {
      InputLabelProps: {
        shrink: true
      }
    },
    styleOverrides: {
      root: {
        minWidth: '192px',

        '& legend': {
          display: 'none'
        }
      }
    }
  },

  // Input Base
  MuiInputBase: {
    styleOverrides: {
      root: {
        height: getSpacing(6),
        padding: getSpacing(0, 2),
        ...themeTypography.body1,

        '& input': {
          padding: 0
        },
        '& .MuiOutlinedInput-notchedOutline': {
          top: 0
        },

        // Variants
        '&.MuiFilledInput-root': {
          borderRadius: getSpacing(0.5),

          '&:before, &:after': {
            content: 'none'
          }
        },
        '&.MuiInput-underline': {
          marginTop: 0,
          padding: 0
        }
      },

      // size
      sizeSmall: {
        '& input': {
          ...themeTypography.body2
        }
      }
    }
  },

  // Input Adornment
  MuiInputAdornment: {
    styleOverrides: {
      root: {
        '& .MuiTypography-root': {
          ...themeTypography.body1
        },
        '&.MuiInputAdornment-sizeSmall': {
          '& .MuiTypography-root': {
            ...themeTypography.body2
          }
        },
        '& .MuiSvgIcon-root': {
          fontSize: ICON_SIZE
        }
      }
    }
  },

  // Form Helper Text
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        margin: 0,
        marginTop: getSpacing(1)
      }
    }
  },

  // Form Control
  MuiFormControl: {
    styleOverrides: {
      root: {}
    }
  },

  // Label
  MuiInputLabel: {
    styleOverrides: {
      root: {
        position: 'static',
        transform: 'none',
        marginBottom: getSpacing(1),
        ...themeTypography.caption,
        fontWeight: 500
      }
    }
  },

  // Select
  MuiSelect: {
    defaultProps: {
      variant: 'outlined',
      MenuProps: {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        }
      }
    },
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: 'transparent'
        }
      },

      select: {
        '&:focus': {
          backgroundColor: 'transparent'
        }
      }
    }
  },

  // Autocomplete
  MuiAutocomplete: {
    styleOverrides: {
      inputRoot: {
        '&[class*="MuiOutlinedInput-root"]': {
          padding: getSpacing(3, 1.25, 0.5),

          '& .MuiAutocomplete-input': {
            padding: getSpacing(0, 1.25, 0.5)
          }
        },
        '&.MuiInputBase-marginDense.MuiOutlinedInput-root .MuiInputBase-input.MuiOutlinedInput-inputMarginDense':
          {
            paddingTop: getSpacing(0.25),
            paddingBottom: getSpacing(0.25)
          }
      }
    }
  },

  // Switch
  MuiSwitch: {
    defaultProps: {
      disableRipple: true
    },

    styleOverrides: {
      root: {
        width: getSpacing(switchSizeM),
        height: getSpacing(switchSizeS),
        padding: 0,
        overflow: 'visible',

        '& + .MuiFormControlLabel-label': {
          ...themeTypography.body2,
          marginLeft: getSpacing(1),
          color: commonPalette.text.primary
        }
      },

      switchBase: {
        width: getSpacing(switchSizeL),
        height: getSpacing(switchSizeL),
        padding: getSpacing(0.5),
        borderRadius: '50%',
        color: commonPalette.text.secondary,
        transform: 'translate(-8px, -8px)',

        '&:hover': {
          backgroundColor: commonPalette.action.hover
        },
        '&.Mui-checked': {
          transform: 'translate(0, -8px)',
          color: commonPalette.common.white,

          '& input': {
            left: getSpacing(-1.5)
          },
          '& + .MuiSwitch-track': {
            opacity: 1,
            border: 0
          }
        }
      },

      thumb: {
        width: getSpacing(1),
        height: getSpacing(1),
        boxShadow: themeShadows[0],

        '.Mui-checked &': {
          boxShadow: themeShadows[1]
        },
        '.Mui-disabled &': {
          backgroundColor: commonPalette.text.disabled
        },
        '.Mui-disabled.Mui-checked &': {
          backgroundColor: commonPalette.common.white
        }
      },

      input: {
        width: getSpacing(switchSizeM),
        height: getSpacing(switchSizeS),
        left: 0
      },

      track: {
        height: 'auto',
        border: `1px solid ${commonPalette.text.secondary}`,
        borderRadius: getSpacing(2),
        opacity: 1,
        backgroundColor: commonPalette.common.white,
        transitionDuration: '300ms',

        '.MuiButtonBase-root.MuiSwitch-switchBase.Mui-disabled + &': {
          opacity: 1,
          borderColor: commonPalette.text.disabled
        },
        '.MuiButtonBase-root.Mui-checked.Mui-disabled + &': {
          backgroundColor: commonPalette.text.disabled
        }
      },

      colorPrimary: {
        '&.Mui-checked:hover': {
          backgroundColor: commonPalette.primary.background
        }
      },
      colorSecondary: {
        '&.Mui-checked:hover': {
          backgroundColor: commonPalette.secondary.background
        }
      }
    }
  },

  // Circular Progress
  CircularProgress: {
    defaultProps: {
      size: 40,
      thickness: 4
    }
  },

  // Slider
  MuiSlider: {
    defaultProps: {
      color: 'primary',
      marks: false
    }
  }
};
