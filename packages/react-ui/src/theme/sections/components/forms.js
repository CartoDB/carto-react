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
      fontSize: getSpacing(3),

      ...(ownerState.size === 'small' && {
        fontSize: getSpacing(2.25)
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

  // Input Adornment
  MuiInputAdornment: {
    defaultProps: {
      disableTypography: true
    },

    styleOverrides: {
      root: {
        ...themeTypography.body1,
        alignItems: 'baseline',
        marginBottom: getSpacing(1.5),
        color: commonPalette.text.secondary,

        '&:disabled': {
          color: commonPalette.action.disabled
        },

        '& .MuiSvgIcon-root': {
          fontSize: `${themeTypography.body1.lineHeight}em`
        }
      },

      positionStart: {
        marginLeft: getSpacing(0.25)
      },

      positionEnd: {
        marginRight: getSpacing(0.25)
      },

      marginDense: {
        marginBottom: getSpacing(0),
        alignItems: 'center',
        ...themeTypography.body2,

        '& .MuiTypography-root': {
          ...themeTypography.body2
        },

        '& .MuiSvgIcon-root': {
          fontSize: `${themeTypography.body2.lineHeight}em`
        }
      }
    }
  },

  // Text Field
  MuiTextField: {
    defaultProps: {
      variant: 'outlined'
    }
  },

  // Form Helper Text
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        ...themeTypography.caption,
        '&.MuiFormHelperText-contained': {
          marginTop: getSpacing(1)
        }
      },

      marginDense: {
        '&.MuiFormHelperText-contained': {
          marginLeft: getSpacing(0)
        }
      }
    }
  },

  // Form Control
  MuiFormControl: {
    styleOverrides: {
      root: {
        width: '100%'
      }
    }
  },

  // Label
  MuiInputLabel: {
    styleOverrides: {
      root: {
        ...themeTypography.body1
      },

      formControl: {
        transform: 'translate(16px, 20px) scale(1)',

        '&.MuiInputLabel-shrink': {
          ...themeTypography.caption,
          transform: 'translate(16px, 8px) scale(1)'
        },

        '&.MuiFormControl-marginDense': {
          ...themeTypography.caption,
          transform: 'translate(0, -20px) scale(1)',

          '&.MuiInputLabel-shrink': {
            ...themeTypography.caption,
            transform: 'translate(0, -20px) scale(1)'
          }
        }
      },

      outlined: {
        '&.MuiInputLabel-shrink': {
          ...themeTypography.caption,
          transform: 'translate(16px, 8px) scale(1)'
        },

        '&.MuiFormControl-marginDense': {
          ...themeTypography.caption,
          transform: 'translate(0, -20px) scale(1)',

          '&.MuiInputLabel-shrink': {
            transform: 'translate(0, -20px) scale(1)'
          }
        }
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
        transitionDuration: '500ms',

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
