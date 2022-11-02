import { getSpacing } from '../../themeUtils';
import { commonPalette } from '../palette';
import { themeTypography } from '../typography';

export const formsOverrides = {
  // Input
  MuiInputBase: {
    styleOverrides: {
      root: {
        '&.Mui-disabled .MuiInputAdornment-root': {
          color: commonPalette.action.disabled
        },
        '&.Mui-disabled .MuiTypography-root': {
          color: commonPalette.action.disabled
        }
      }
    }
  },

  // Outlined Input
  MuiOutlinedInput: {
    defaultProps: {
      notched: false
    },
    styleOverrides: {
      root: {
        '&.Mui-disabled': {
          backgroundColor: commonPalette.action.hover
        }
      },

      input: {
        ...themeTypography.body1,
        height: `${themeTypography.body1.lineHeight}em`,
        padding: getSpacing(3, 2, 1)
      },

      inputMarginDense: {
        ...themeTypography.body2,
        height: `${themeTypography.body2.lineHeight}em`,
        padding: getSpacing(1, 1.5),
        paddingTop: getSpacing(1),
        paddingBottom: getSpacing(1)
      },

      adornedStart: {
        '&.MuiFormControl-marginDense': {
          paddingLeft: getSpacing(1.5)
        }
      },
      adornedEnd: {
        '&.MuiFormControl-marginDense': {
          paddingRight: getSpacing(1.5)
        }
      },

      notchedOutline: {
        border: `2px solid ${commonPalette.text.disabled}`
      },

      multiline: {
        padding: getSpacing(2.75, 2, 1.25)
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

  // Checkbox
  MuiCheckbox: {
    defaultProps: {
      size: 'small'
    },
    styleOverrides: {
      root: {
        ...themeTypography.body2,
        padding: getSpacing(0.75),
        borderRadius: '50%',

        '& + .MuiFormControlLabel-label': {
          ...themeTypography.body2,
          marginLeft: getSpacing(0.25),
          color: commonPalette.text.primary
        },

        '& .MuiSvgIcon-root': {
          fontSize: getSpacing(3)
        }
      }
    }
  },

  // Radio Button
  MuiRadio: {
    defaultProps: {
      size: 'small'
    },
    styleOverrides: {
      root: {
        ...themeTypography.body2,
        padding: getSpacing(0.75),
        borderRadius: '50%',

        '& + .MuiFormControlLabel-label': {
          ...themeTypography.body2,
          marginLeft: getSpacing(0.25),
          color: commonPalette.text.primary
        },

        '& .MuiSvgIcon-root': {
          fontSize: getSpacing(3)
        }
      }
    }
  },

  // Switch
  MuiSwitch: {
    styleOverrides: {
      root: {
        height: getSpacing(4.5),
        width: getSpacing(6),
        padding: getSpacing(1),
        overflow: 'visible',

        '& + .MuiFormControlLabel-label': {
          ...themeTypography.body2,
          marginLeft: getSpacing(0.25),
          color: commonPalette.text.primary
        }
      },

      switchBase: {
        padding: getSpacing(1.5),
        borderRadius: '50%',
        transform: 'translate(1px, 1px)',
        color: commonPalette.text.secondary,

        '&.Mui-checked': {
          '& input': {
            left: getSpacing(-1.5)
          },

          transform: 'translate(13px, 1px)',
          color: commonPalette.common.white,

          '& + .MuiSwitch-track': {
            opacity: 1
          }
        }
      },

      thumb: {
        width: getSpacing(1.25),
        height: getSpacing(1.25),
        boxShadow: 'none'
      },

      input: {
        width: getSpacing(6),
        left: 0
      },

      track: {
        height: 'auto',
        border: `2px solid ${commonPalette.text.secondary}`,
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
      },

      sizeSmall: {
        height: getSpacing(4.5),
        width: getSpacing(6),
        padding: getSpacing(1),

        '& .MuiSwitch-switchBase': {
          padding: getSpacing(1.5),
          transform: 'translate(0, 1px)',

          '&.Mui-checked': {
            transform: 'translate(15px, 1px)'
          }
        },
        '& .MuiSwitch-thumb': {
          width: getSpacing(1.25),
          height: getSpacing(1.25)
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
