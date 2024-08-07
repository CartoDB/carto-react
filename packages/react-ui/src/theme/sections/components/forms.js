import React from 'react';
import { ICON_SIZE_MEDIUM } from '../../themeConstants';
import ArrowDropIcon from '../../../assets/icons/ArrowDropIcon';
import CancelIcon from '@mui/icons-material/Cancel';

const controlSizeS = 2.25;
const controlSizeM = 3;

const switchSizeS = 2;
const switchSizeM = 3;
const switchSizeL = 4;

const checkboxRadioOverrides = {
  root: ({ ownerState, theme }) => ({
    padding: theme.spacing(0.5),

    ...(ownerState.size === 'small' && {
      padding: '3px' // Forced to a non-standard value to meet with design
    }),
    ...(ownerState.readOnly === true && {
      pointerEvents: 'none',
      color: theme.palette.text.disabled,

      '&.Mui-checked': {
        color: theme.palette.text.disabled
      }
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
      fontSize: theme.spacing(controlSizeM),
      width: theme.spacing(controlSizeM),
      minWidth: theme.spacing(controlSizeM),
      height: theme.spacing(controlSizeM),

      ...(ownerState.size === 'small' && {
        fontSize: theme.spacing(controlSizeS),
        width: theme.spacing(controlSizeS),
        minWidth: theme.spacing(controlSizeS),
        height: theme.spacing(controlSizeS)
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
    defaultProps: {
      size: 'small'
    },
    styleOverrides: {
      ...checkboxRadioOverrides
    }
  },

  // Radio Button
  MuiRadio: {
    defaultProps: {
      size: 'small'
    },
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
        ...theme.typography.body1,

        '& input': {
          padding: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',

          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.hint
          },
          '&:read-only::placeholder': {
            color: theme.palette.text.disabled
          },
          '&.Mui-disabled::placeholder': {
            color: theme.palette.text.disabled
          },
          // Remove focus on keyboard navigation as the parent element has focus
          '&:focus-visible': {
            outline: 'none !important',
            boxShadow: 'none !important'
          }
        },

        '&.Mui-disabled': {
          cursor: 'not-allowed',

          '& .Mui-disabled': {
            cursor: 'not-allowed'
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
        '& .MuiButtonBase-root.MuiMenuItem-root': {
          padding: 0,

          '&:hover': {
            backgroundColor: 'transparent'
          },
          [theme.breakpoints.up('sm')]: {
            minHeight: 'initial'
          }
        },

        // Variants
        '&.MuiFilledInput-root': {
          padding: theme.spacing(1, 2),
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
            padding: theme.spacing(0.5, 1.5)
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
          },
          '&.Mui-readOnly': {
            '&.Mui-focused': {
              backgroundColor: theme.palette.default.background
            }
          }
        },

        '&.MuiOutlinedInput-root': {
          padding: theme.spacing(1, 2),

          '&.MuiInputBase-sizeSmall': {
            padding: theme.spacing(0.5, 1.5)
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.background.paper
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.default.background
          },
          '&.Mui-readOnly': {
            backgroundColor: theme.palette.default.background,

            '&.Mui-focused': {
              backgroundColor: theme.palette.default.background
            }
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

            '&::placeholder': {
              opacity: 1,
              color: theme.palette.text.hint
            },
            '&.Mui-disabled::placeholder': {
              color: theme.palette.text.disabled
            },
            // Remove focus on keyboard navigation as the parent element has focus
            '&:focus-visible': {
              outline: 'none !important',
              boxShadow: 'none !important'
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
      root: ({ ownerState, theme }) => ({
        marginLeft: theme.spacing(-0.5),

        '& .MuiSwitch-root': {
          marginLeft: theme.spacing(0.5)
        },

        ...(ownerState.readOnly === true && {
          pointerEvents: 'none'
        })
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
        '&.Mui-disabled .MuiSelect-icon, &.Mui-readOnly .MuiSelect-icon': {
          color: theme.palette.text.disabled
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
        // Remove focus on keyboard navigation as the parent element has focus
        '&:focus-visible': {
          outline: 'none !important',
          boxShadow: 'none !important'
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
      size: 'small',
      fullWidth: true,
      popupIcon: <ArrowDropIcon />,
      clearIcon: <CancelIcon data-testid='cancel-icon-autocomplete' />,
      ChipProps: { color: 'default' },
      limitTags: 1,
      componentsProps: {
        paper: {
          elevation: 8
        }
      }
    },

    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        '&.MuiAutocomplete-root .MuiFormControl-root': {
          //Needed to overide Mui default styles
          '.MuiInputBase-root': {
            gap: theme.spacing(0.5),
            height: 'auto',
            minHeight: theme.spacing(6),
            padding: theme.spacing(1, 2),
            paddingRight: theme.spacing(5),

            '.MuiInputBase-input': {
              padding: 0
            },

            // Multiple
            ...(ownerState.multiple === true && {
              paddingLeft: theme.spacing(1),

              '.MuiInputBase-input': {
                padding: 0,
                marginLeft: theme.spacing(1)
              }
            }),
            ...(ownerState.size === 'small' && {
              minHeight: theme.spacing(4),
              padding: theme.spacing(0.5, 1.5),
              paddingRight: theme.spacing(4),

              ...(ownerState.multiple === true && {
                paddingLeft: theme.spacing(0.5)
              })
            }),
            ...(ownerState.readOnly === true && {
              backgroundColor: theme.palette.default.background
            }),

            '&.Mui-disabled': {
              pointerEvents: 'none'
            }
          },

          // Variants
          '.MuiFilledInput-root .MuiAutocomplete-tag': {
            backgroundColor: 'transparent',
            border: `1px solid ${theme.palette.default.main}`
          }
        },
        '&.MuiAutocomplete-hasClearIcon .MuiFormControl-root .MuiInputBase-root': {
          paddingRight: theme.spacing(8.5),

          ...(ownerState.size === 'small' && {
            paddingRight: theme.spacing(7)
          })
        }
      }),

      endAdornment: ({ theme }) => ({
        transform: 'none',
        top: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: theme.spacing(1),

        '.MuiAutocomplete-hasClearIcon &': {
          top: theme.spacing(1)
        },

        '.MuiInputBase-sizeSmall &': {
          top: theme.spacing(0.5),
          width: theme.spacing(3),
          height: theme.spacing(3),
          marginRight: theme.spacing(0.5)
        }
      }),

      clearIndicator: ({ ownerState, theme }) => ({
        marginRight: 0,
        color: theme.palette.text.hint,

        ...(ownerState.size === 'small' && {
          width: theme.spacing(3),
          height: theme.spacing(3)
        })
      }),

      popupIndicator: ({ theme }) => ({
        width: ICON_SIZE_MEDIUM,
        height: ICON_SIZE_MEDIUM,
        cursor: 'text',

        '&:hover': {
          backgroundColor: 'transparent'
        },
        '&.MuiButtonBase-root': {
          color: theme.palette.text.secondary
        },
        '.Mui-disabled &': {
          color: theme.palette.text.disabled
        },
        'input:read-only + .MuiAutocomplete-endAdornment &': {
          color: theme.palette.text.disabled
        }
      }),

      tag: ({ ownerState, theme }) => ({
        margin: 0,

        '&:not(.MuiButtonBase-root)': {
          display: 'flex',
          alignItems: 'center',
          height: theme.spacing(4),
          padding: theme.spacing(0, 1.5),
          backgroundColor: theme.palette.default.main,
          borderRadius: theme.spacing(2),
          ...theme.typography.button,
          fontWeight: theme.typography.fontWeightMedium,

          ...(ownerState.size === 'small' && {
            height: theme.spacing(3),
            padding: theme.spacing(0, 1),
            borderRadius: theme.spacing(1.5),
            ...theme.typography.caption,
            fontWeight: theme.typography.fontWeightMedium
          })
        }
      }),

      option: ({ ownerState, theme }) => ({
        '&.MuiAutocomplete-option': {
          minHeight: theme.spacing(4),
          padding: theme.spacing(0.5, 2),
          ...theme.typography.body2,
          transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

          '&:hover': {
            backgroundColor: theme.palette.action.hover
          },
          '&[aria-selected="true"]': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.background,

            '.MuiTypography-root': {
              color: theme.palette.primary.main
            },
            '.MuiTypography-caption': {
              color: theme.palette.text.secondary
            },
            '&.Mui-focused:hover': {
              backgroundColor: theme.palette.action.hover
            }
          },
          '&:first-of-type': {
            marginTop: theme.spacing(1)
          },

          ...(ownerState.size === 'small' && {
            padding: theme.spacing(0.5, 1.5)
          })
        }
      }),

      noOptions: ({ ownerState, theme }) => ({
        padding: theme.spacing(2.5, 2),
        ...theme.typography.body2,
        color: theme.palette.text.secondary,

        ...(ownerState.size === 'small' && {
          padding: theme.spacing(2, 1.5)
        })
      }),

      listbox: ({ ownerState, theme }) => ({
        paddingTop: 0,

        '.MuiDivider-root': {
          display: 'none'
        },
        '.MuiButtonBase-root + .MuiDivider-root': {
          display: 'block'
        },
        '.MuiMenuItem-root:first-of-type': {
          marginTop: theme.spacing(1)
        }
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

      switchBase: ({ ownerState, theme }) => ({
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
        },

        ...(ownerState.readOnly === true && {
          color: theme.palette.text.disabled
        })
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

      track: ({ ownerState, theme }) => ({
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
        },

        '.MuiButtonBase-root.MuiSwitch-switchBase[readOnly] + &': {
          borderColor: theme.palette.text.disabled
        },
        '[readOnly] .MuiButtonBase-root.Mui-checked + &': {
          backgroundColor: theme.palette.text.disabled
        },

        ...(ownerState.readOnly === true && {
          borderColor: theme.palette.text.disabled
        })
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
