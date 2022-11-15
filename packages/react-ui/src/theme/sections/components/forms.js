import { getSpacing } from '../../themeUtils';
import { commonPalette } from '../palette';
import { themeTypography } from '../typography';

const switchHeight = getSpacing(2);
const switchWidth = getSpacing(3);

const checkboxRadioOverrides = {
  root: ({ ownerState }) => ({
    padding: getSpacing(0.5),

    ...(ownerState.size === 'small' && {
      padding: '3px'
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
    styleOverrides: {
      root: {
        width: switchWidth,
        height: switchHeight,
        padding: 0,
        overflow: 'visible',

        '& + .MuiFormControlLabel-label': {
          ...themeTypography.body2,
          marginLeft: getSpacing(1),
          color: commonPalette.text.primary
        }
      },

      switchBase: {
        padding: getSpacing(0.5),
        borderRadius: '50%',
        color: commonPalette.text.secondary,

        '&.Mui-checked': {
          transform: 'translate(8px, 0)',
          color: commonPalette.common.white,

          '& input': {
            left: getSpacing(-1.5)
          },
          '& + .MuiSwitch-track': {
            opacity: 1
          }
        }
      },

      thumb: {
        width: getSpacing(1),
        height: getSpacing(1)
      },

      input: {
        width: switchWidth,
        height: switchHeight,
        left: 0
      },

      track: {
        height: 'auto',
        border: `1px solid ${commonPalette.text.secondary}`,
        borderRadius: getSpacing(2),
        opacity: 1,
        backgroundColor: commonPalette.common.white
      },

      colorPrimary: {
        '&.Mui-checked': {
          color: commonPalette.common.white,

          '& + .MuiSwitch-track': {
            backgroundColor: commonPalette.primary.main,
            borderColor: 'transparent'
          },

          '&.Mui-disabled': {
            color: commonPalette.grey[100],

            '& + .MuiSwitch-track': {
              backgroundColor: commonPalette.text.disabled
            }
          }
        },

        '&.Mui-disabled': {
          color: commonPalette.text.disabled,

          '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: commonPalette.common.white,
            borderColor: commonPalette.text.disabled
          }
        }
      },

      colorSecondary: {
        '&.Mui-checked': {
          color: commonPalette.common.white,

          '& + .MuiSwitch-track': {
            backgroundColor: commonPalette.secondary.main,
            borderColor: 'transparent'
          },

          '&.Mui-disabled': {
            color: commonPalette.grey[100],

            '& + .MuiSwitch-track': {
              backgroundColor: commonPalette.text.disabled
            }
          }
        },

        '&.Mui-disabled': {
          color: commonPalette.text.disabled,

          '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: commonPalette.common.white,
            borderColor: commonPalette.text.disabled
          }
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
