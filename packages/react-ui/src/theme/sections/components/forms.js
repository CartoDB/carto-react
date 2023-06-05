import React from 'react';
import { ICON_SIZE_MEDIUM, ICON_SIZE_LARGE } from '../../themeConstants';
import ArrowDropIcon from '../../../assets/icons/ArrowDropIcon';

const switchSizeS = 2;
const switchSizeM = 3;
const switchSizeL = 4;

const checkboxRadioOverrides = {
  root: ({ ownerState, theme }) => ({
    padding: theme.spacing(0.5),

    ...(ownerState.size === 'small' && {
      padding: '3px' // Forced to a non-standard value to meet with design
    }),

    '&:hover, &:focus-visible': {
      backgroundColor: theme.palette.primary.background
    },
    '& + .MuiFormControlLabel-label': {
      ...theme.typography.body2,
      marginLeft: theme.spacing(0.25),

      ...(ownerState.size === 'small' && {
        marginLeft: theme.spacing(0.5)
      })
    },

    '& .MuiSvgIcon-root': {
      fontSize: ICON_SIZE_LARGE,

      ...(ownerState.size === 'small' && {
        fontSize: ICON_SIZE_MEDIUM
      })
    }
  })
};

const LabelOverrides = {
  root: ({ theme }) => ({
    position: 'static',
    transform: 'none',
    marginBottom: theme.spacing(1),
    ...theme.typography.caption,
    fontWeight: 500,
    color: theme.palette.text.primary
  }),
  sizeSmall: ({ theme }) => ({
    marginBottom: theme.spacing(0.5)
  }),
  standard: () => ({
    marginBottom: 0
  }),
  // Temporal workaroud to give a faster solution for a Workflows demand: https://app.shortcut.com/cartoteam/story/294539/distinction-among-parameters-optional-inputs-units-in-the-ui
  // These styles avoid (by now) the need to review current forms and change those with a required mark.
  // TODO: remored asterisk completely and use instead LabelWithIndicator component to mark also required ones.
  asterisk: ({ theme }) => ({
    '&, &.Mui-error': {
      color: 'transparent'
    },
    '&::after': {
      content: '"(required)"',
      marginLeft: theme.spacing(-0.5),
      color: theme.palette.text.secondary,
      fontWeight: 400,

      '.Mui-disabled &': {
        color: theme.palette.text.disabled
      }
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
      fullWidth: true,
      size: 'small',

      InputLabelProps: {
        shrink: true
      },
      SelectProps: {
        IconComponent: ArrowDropIcon,
        size: 'small'
      }
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        '& legend': {
          display: 'none'
        },

        // Select bool
        ...(ownerState.select === true && {
          '& .MuiInputBase-root': {
            padding: 0,

            '&.MuiOutlinedInput-root, &.MuiFilledInput-root': {
              padding: 0
            },
            '& .MuiInputAdornment-positionEnd': {
              marginRight: theme.spacing(3)
            },
            '& .MuiSelect-select': {
              padding: theme.spacing(1.5),

              '&.MuiInputBase-input': {
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(5),

                '&.MuiSelect-standard': {
                  paddingLeft: 0
                }
              },
              '&:focus': {
                background: 'transparent'
              },
              '& .MuiTypography-root': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }
            },
            '& .MuiSelect-icon': {
              right: theme.spacing(2),
              color: theme.palette.text.secondary
            },
            '& .MuiSelect-iconStandard': {
              right: 0
            }
          },

          '& .MuiInputBase-sizeSmall': {
            '&.MuiInputBase-root.MuiFilledInput-root': {
              padding: 0
            },
            '& .MuiSelect-select': {
              ...theme.typography.body2,
              padding: theme.spacing(0.75),

              '&.MuiInputBase-input': {
                paddingLeft: theme.spacing(1.5),
                paddingRight: theme.spacing(4)
              }
            },
            '&.MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
              padding: 0
            },
            '& .MuiSelect-icon': {
              right: theme.spacing(1.5)
            }
          }
        })
      })
    }
  },

  // Input Base
  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: theme.spacing(6),
        padding: theme.spacing(0, 2),
        ...theme.typography.body1,

        '& input': {
          padding: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',

          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.hint
          }
        },

        '&.MuiInputBase-formControl::after': {
          top: 0,
          transform: 'none',
          opacity: 0
        },
        '&.MuiInputBase-formControl.Mui-focused::after': {
          transform: 'none',
          opacity: 1
        },
        '& legend': { display: 'none' },

        // Variants
        '&.MuiFilledInput-root': {
          padding: theme.spacing(0, 2),
          borderRadius: theme.spacing(0.5),
          backgroundColor: theme.palette.default.background,

          '&:hover': {
            backgroundColor: theme.palette.default.background
          },
          '&::before': {
            top: 0,
            borderRadius: theme.spacing(0.5),
            border: '1px solid transparent',
            transition: 'border 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
          },
          '&:hover:not(.Mui-disabled)::before': {
            borderColor: theme.palette.text.primary
          },
          '&::after': {
            borderRadius: theme.spacing(0.5),
            border: '1px solid transparent'
          },
          '&.MuiInputBase-sizeSmall': {
            padding: theme.spacing(0, 1.5)
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.background.paper,

            '&::after': {
              border: `2px solid ${theme.palette.primary.main}`
            }
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.default.background,

            '&::before': {
              borderBottomStyle: 'solid'
            }
          },
          '&.Mui-error::after': {
            opacity: 1,
            border: `2px solid ${theme.palette.error.light}`
          }
        },

        '&.MuiOutlinedInput-root': {
          padding: theme.spacing(0, 2),

          '&.MuiInputBase-sizeSmall': {
            padding: theme.spacing(0, 1.5)
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.background.paper
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.default.background
          },
          '& .MuiOutlinedInput-notchedOutline': {
            top: 0,
            borderColor: theme.palette.default.outlinedBorder,
            transition: 'border 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            transition: 'none'
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            border: `2px solid ${theme.palette.error.light}`
          }
        },

        '&.MuiInput-underline': {
          marginTop: 0,
          padding: 0,

          '&::before': {
            borderColor: theme.palette.default.outlinedBorder
          },
          '&:hover:not(.Mui-disabled)::before': {
            borderBottom: `1px solid ${theme.palette.text.primary}`
          },
          '&:not(.Mui-disabled)::after': {
            borderBottom: '1px solid transparent'
          },
          '&.Mui-focused::after': {
            borderBottom: `2px solid ${theme.palette.primary.main}`
          },
          '&.Mui-error::after': {
            opacity: 1,
            borderBottom: `2px solid ${theme.palette.error.light}`
          },
          '&.Mui-disabled::before': {
            borderBottomStyle: 'solid'
          }
        },

        // TextArea (multiline)
        '&.MuiInputBase-multiline': {
          height: 'auto',
          minHeight: theme.spacing(12),
          alignItems: 'flex-start',
          padding: theme.spacing(0, 0.25),

          '& textarea': {
            padding: theme.spacing(1.5, 1.75),
            ...theme.typography.body1,

            '&::placeholder, &.Mui-disabled::placeholder': {
              opacity: 1,
              color: theme.palette.text.hint
            }
          },

          '&.MuiInputBase-sizeSmall': {
            minHeight: theme.spacing(9),
            padding: theme.spacing(0, 0.25),

            '& textarea': {
              padding: theme.spacing(1, 1.25),
              ...theme.typography.body2
            }
          }
        },

        // Select Multiple selection
        '&.MuiInputBase-root .MuiSelect-multiple.MuiInputBase-input': {
          paddingLeft: 0,
          paddingRight: theme.spacing(3)
        }
      }),

      // size
      sizeSmall: ({ theme }) => ({
        height: theme.spacing(4),
        padding: theme.spacing(0, 1.5),

        '& input': {
          ...theme.typography.body2
        }
      })
    }
  },

  // Input Adornment
  MuiInputAdornment: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiTypography-root': {
          ...theme.typography.body1,
          color: theme.palette.text.secondary
        },
        '&.MuiInputAdornment-sizeSmall': {
          '& .MuiTypography-root': {
            ...theme.typography.body2
          }
        },
        '&.MuiInputAdornment-positionStart.MuiInputAdornment-root:not(.MuiInputAdornment-hiddenLabel)':
          {
            marginTop: 0
          },
        '& .MuiSvgIcon-root, & svg': {
          fontSize: ICON_SIZE_MEDIUM,
          width: ICON_SIZE_MEDIUM,
          minWidth: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM,
          color: theme.palette.text.secondary
        },
        '.Mui-disabled &': {
          '& .MuiTypography-root, & .MuiSvgIcon-root': {
            color: theme.palette.text.disabled
          }
        }
      })
    }
  },

  // Form Control
  MuiFormControl: {
    defaultProps: {
      fullWidth: true
    }
  },

  // Form Control Label (radio, checkbox and switch wrapper)
  MuiFormControlLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginLeft: theme.spacing(-0.5),

        '& .MuiSwitch-root': {
          marginLeft: theme.spacing(0.5)
        }
      })
    }
  },

  // Form Helper Text
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        margin: 0,
        marginTop: theme.spacing(1)
      })
    }
  },

  // Label
  MuiInputLabel: {
    styleOverrides: {
      ...LabelOverrides
    }
  },
  MuiFormLabel: {
    styleOverrides: {
      ...LabelOverrides
    }
  },

  // Select
  MuiSelect: {
    defaultProps: {
      IconComponent: ArrowDropIcon,
      fullWidth: true,
      size: 'small'
    },

    styleOverrides: {
      root: ({ theme }) => ({
        padding: 0,

        '& .MuiSelect-icon': {
          right: theme.spacing(2),
          color: theme.palette.text.secondary
        },
        '& .MuiSelect-iconStandard': {
          right: 0
        },
        '& legend': {
          display: 'none'
        },

        // Variants
        '&.MuiOutlinedInput-root, &.MuiFilledInput-root': {
          padding: 0
        },
        '&.MuiFilledInput-root, &.MuiInput-underline': {
          '&.Mui-focused::after': {
            height: '100%',
            transition: 'none'
          }
        },

        // Size Small
        '&.MuiInputBase-sizeSmall': {
          ...theme.typography.body2,

          '& .MuiSelect-select': {
            '&.MuiInputBase-input': {
              paddingLeft: theme.spacing(1.5),
              paddingRight: theme.spacing(4)
            },
            '&.MuiSelect-standard': {
              paddingLeft: 0
            }
          },
          '&.MuiOutlinedInput-root.MuiInputBase-sizeSmall, &.MuiFilledInput-root.MuiInputBase-sizeSmall':
            {
              padding: 0
            },
          '& .MuiSelect-icon': {
            right: theme.spacing(1.5)
          }
        }
      }),
      select: ({ theme }) => ({
        padding: theme.spacing(1.5),

        '&.MuiInputBase-input': {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(5),

          '&.MuiSelect-standard': {
            paddingLeft: 0
          }
        },
        '&:focus': {
          background: 'transparent'
        },
        '& .MuiTypography-root': {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        },

        '&.MuiInputBase-inputSizeSmall': {
          padding: theme.spacing(0.75)
        }
      })
    }
  },

  // Autocomplete
  MuiAutocomplete: {
    defaultProps: {
      popupIcon: <ArrowDropIcon />
    },

    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiInputBase-root .MuiAutocomplete-endAdornment': {
          top: theme.spacing(1),
          right: theme.spacing(1.5)
        },
        '& .MuiInputBase-sizeSmall .MuiAutocomplete-endAdornment': {
          top: 0,
          right: theme.spacing(0.75)
        },
        '& .MuiFormLabel-root': {
          pointerEvents: 'auto'
        }
      }),

      inputRoot: () => ({
        '&[class*="MuiOutlinedInput-root"]': {
          '& .MuiAutocomplete-input': {
            padding: 0
          }
        },
        '& .MuiAutocomplete-popupIndicator:hover, & .MuiAutocomplete-popupIndicator:focus-visible':
          {
            backgroundColor: 'transparent'
          }
      }),

      listbox: ({ theme }) => ({
        '& .MuiAutocomplete-option': {
          minHeight: theme.spacing(4),
          padding: theme.spacing(0, 2)
        }
      }),

      option: ({ theme }) => ({
        ...theme.typography.body2
      })
    }
  },

  // Switch
  MuiSwitch: {
    defaultProps: {
      disableRipple: true
    },

    styleOverrides: {
      root: ({ theme }) => ({
        width: theme.spacing(switchSizeM),
        height: theme.spacing(switchSizeS),
        padding: 0,
        overflow: 'visible',

        '& + .MuiTypography-root': {
          marginLeft: theme.spacing(1),
          color: theme.palette.text.primary
        },
        '& + .MuiFormControlLabel-label': {
          ...theme.typography.body2
        }
      }),

      switchBase: ({ theme }) => ({
        width: theme.spacing(switchSizeL),
        height: theme.spacing(switchSizeL),
        padding: theme.spacing(0.5),
        borderRadius: '50%',
        color: theme.palette.text.secondary,
        transform: 'translate(-8px, -8px)',

        '&:hover': {
          backgroundColor: theme.palette.action.hover
        },
        '&.MuiSwitch-switchBase input': {
          top: theme.spacing(1),
          left: theme.spacing(1)
        },
        '&.Mui-checked': {
          transform: 'translate(0, -8px)',
          color: theme.palette.common.white,

          '&.MuiSwitch-switchBase input': {
            left: 0
          },
          '& + .MuiSwitch-track': {
            opacity: 1,
            border: 0
          }
        }
      }),

      thumb: ({ theme }) => ({
        width: theme.spacing(1),
        height: theme.spacing(1),
        boxShadow: theme.shadows[0],

        '.Mui-checked &': {
          boxShadow: theme.shadows[1]
        },
        '.Mui-disabled &': {
          backgroundColor: theme.palette.text.disabled
        },
        '.Mui-disabled.Mui-checked &': {
          backgroundColor: theme.palette.common.white
        }
      }),

      input: ({ theme }) => ({
        width: theme.spacing(switchSizeM),
        height: theme.spacing(switchSizeS),
        left: 0
      }),

      track: ({ theme }) => ({
        height: 'auto',
        border: `1px solid ${theme.palette.text.secondary}`,
        borderRadius: theme.spacing(2),
        opacity: 1,
        backgroundColor: theme.palette.common.white,
        transitionDuration: '300ms',

        '.MuiButtonBase-root.MuiSwitch-switchBase.Mui-disabled + &': {
          opacity: 1,
          borderColor: theme.palette.text.disabled
        },
        '.MuiButtonBase-root.Mui-checked.Mui-disabled + &': {
          backgroundColor: theme.palette.text.disabled
        }
      }),

      colorPrimary: ({ theme }) => ({
        '&.Mui-checked:hover': {
          backgroundColor: theme.palette.primary.background
        }
      }),
      colorSecondary: ({ theme }) => ({
        '&.Mui-checked:hover': {
          backgroundColor: theme.palette.secondary.background
        }
      })
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
      marks: false,
      size: 'small'
    },

    styleOverrides: {
      thumb: ({ theme }) => ({
        '&:hover, &.Mui-focusVisible': {
          boxShadow: `0 0 0 ${theme.spacing(1)} ${theme.palette.primary.background}`
        }
      })
    }
  }
};
