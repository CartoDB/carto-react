import { getSpacing } from '../themeUtils';
import { commonPalette, componentsPalette } from './palette';
import { themeTypography } from './typography';

const round = (value) => Math.round(value * 1e5) / 1e5;
const pxToRem = (size) => `${round(size / themeTypography.htmlFontSize)}rem`;

themeTypography.pxToRem = pxToRem;
themeTypography.round = round;

export const themeComponentsOverrides = {
  // Button
  MuiButton: {
    contained: {
      boxShadow: 'none'
    },
    outlined: {
      border: `2px solid ${commonPalette.text.primary}`,
      padding: '4px 14px',
      '&:hover': {
        borderWidth: '2px'
      },
      '&$disabled': {
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
      '&$disabled': {
        borderWidth: '2px'
      }
    },
    containedSizeSmall: {
      padding: '2px 12px',
      fontSize: pxToRem(12)
    },
    outlinedSizeSmall: {
      padding: '2px 12px',
      fontSize: pxToRem(12)
    },
    textSizeSmall: {
      padding: '2px 12px',
      fontSize: pxToRem(12)
    },
    containedSizeLarge: {
      padding: '16px 24px',
      fontSize: pxToRem(16)
    },
    containedSecondary: {
      '&:hover': {
        backgroundColor: commonPalette.secondary.light
      }
    },
    outlinedSizeLarge: {
      padding: '16px 24px',
      fontSize: pxToRem(16)
    },
    textSizeLarge: {
      padding: '16px 24px',
      fontSize: pxToRem(16)
    },
    startIcon: {
      marginRight: 6,
      marginLeft: -4,
      '&$iconSizeSmall': {
        marginLeft: -4
      },
      '&$iconSizeLarge': {
        marginRight: 8
      }
    },
    endIcon: {
      marginRight: -4,
      marginLeft: 6,
      '&$iconSizeSmall': {
        marginRight: -4
      },
      '&$iconSizeLarge': {
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
  },
  MuiIconButton: {
    root: {
      padding: getSpacing(0.75),
      borderRadius: getSpacing(0.5),
      color: commonPalette.text.primary
    },
    sizeSmall: {
      padding: getSpacing(0.25)
    }
  },

  MuiInputBase: {
    root: {
      '&$disabled .MuiInputAdornment-root': {
        color: commonPalette.action.disabled
      },
      '&$disabled .MuiTypography-root': {
        color: commonPalette.action.disabled
      }
    }
  },
  MuiOutlinedInput: {
    root: {
      '&$disabled': {
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
      '&$marginDense': {
        paddingLeft: getSpacing(1.5)
      }
    },
    adornedEnd: {
      '&$marginDense': {
        paddingRight: getSpacing(1.5)
      }
    },

    notchedOutline: {
      border: `2px solid ${commonPalette.text.disabled}`
    },

    multiline: {
      padding: getSpacing(2.75, 2, 1.25)
    }
  },
  MuiInputLabel: {
    root: {
      ...themeTypography.body1
    },

    formControl: {
      transform: 'translate(16px, 20px) scale(1)',

      '&$shrink': {
        ...themeTypography.caption,
        transform: 'translate(16px, 8px) scale(1)'
      },

      '&$marginDense': {
        ...themeTypography.caption,
        transform: 'translate(0, -20px) scale(1)',

        '&$shrink': {
          ...themeTypography.caption,
          transform: 'translate(0, -20px) scale(1)'
        }
      }
    },

    outlined: {
      '&$shrink': {
        ...themeTypography.caption,
        transform: 'translate(16px, 8px) scale(1)'
      },

      '&$marginDense': {
        ...themeTypography.caption,
        transform: 'translate(0, -20px) scale(1)',

        '&$shrink': {
          transform: 'translate(0, -20px) scale(1)'
        }
      }
    }
  },
  MuiInputAdornment: {
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
  },
  MuiFormHelperText: {
    root: {
      ...themeTypography.caption,
      '&$contained': {
        marginTop: getSpacing(1)
      }
    },

    marginDense: {
      '&$contained': {
        marginLeft: getSpacing(0)
      }
    }
  },

  // Select
  MuiFormControl: {
    root: {
      width: '100%'
    }
  },
  MuiSelect: {
    selectMenu: {},

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
  },

  // Menu
  MuiMenuItem: {
    root: {
      ...themeTypography.body2
    }
  },

  // Autocomplete
  MuiAutocomplete: {
    inputRoot: {
      '&[class*="MuiOutlinedInput-root"]': {
        padding: getSpacing(3, 1.25, 0.5),

        '& .MuiAutocomplete-input': {
          padding: getSpacing(0, 1.25, 0.5)
        }
      },
      '&.MuiInputBase-marginDense.MuiOutlinedInput-root $input.MuiOutlinedInput-inputMarginDense':
        {
          paddingTop: getSpacing(0.25),
          paddingBottom: getSpacing(0.25)
        }
    }
  },

  // Checkbox
  MuiCheckbox: {
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
  },

  // RadioButton
  MuiRadio: {
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
  },

  // Tabs
  MuiTabs: {
    indicator: {
      height: 4,
      '&.colorPrimary': {
        backgroundColor: commonPalette.text.primary
      }
    },

    vertical: {
      '& $indicator': {
        width: 4
      },

      '& .MuiTab-root': {
        padding: getSpacing(0, 2),

        '& .MuiTab-wrapper': {
          alignItems: 'flex-start'
        }
      }
    }
  },

  // Tab
  MuiTab: {
    root: {
      padding: getSpacing(0, 1),
      marginRight: getSpacing(3),
      minWidth: '56px!important',
      '&[class*="MuiTab-labelIcon"] .MuiTab-wrapper': {
        flexFlow: 'row',
        alignItems: 'center'
      },
      '&[class*="MuiTab-labelIcon"] .MuiTab-wrapper > .MuiSvgIcon-root': {
        marginRight: getSpacing(1),
        marginBottom: 0
      }
    },
    textColorPrimary: {
      color: commonPalette.primary.main,
      opacity: 1,
      '&$selected': {
        color: commonPalette.text.primary
      },
      '&$disabled': {
        color: commonPalette.action.disabled
      }
    }
  },

  MuiDivider: {
    root: {
      backgroundColor: commonPalette.divider
    },
    light: {
      backgroundColor: commonPalette.grey[50]
    }
  },

  // Switch
  MuiSwitch: {
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

      '&$checked': {
        '& input': {
          left: getSpacing(-1.5)
        },

        transform: 'translate(13px, 1px)',
        color: commonPalette.common.white,

        '& + $track': {
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
      '&$checked': {
        color: commonPalette.common.white,

        '& + $track': {
          backgroundColor: commonPalette.primary.main,
          borderColor: 'transparent'
        },

        '&$disabled': {
          color: commonPalette.grey[100],

          '& + $track': {
            backgroundColor: commonPalette.text.disabled
          }
        }
      },

      '&$disabled': {
        color: commonPalette.text.disabled,

        '& + $track': {
          opacity: 1,
          backgroundColor: commonPalette.common.white,
          borderColor: commonPalette.text.disabled
        }
      }
    },

    colorSecondary: {
      '&$checked': {
        color: commonPalette.common.white,

        '& + $track': {
          backgroundColor: commonPalette.secondary.main,
          borderColor: 'transparent'
        },

        '&$disabled': {
          color: commonPalette.grey[100],

          '& + $track': {
            backgroundColor: commonPalette.text.disabled
          }
        }
      },

      '&$disabled': {
        color: commonPalette.text.disabled,

        '& + $track': {
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

      '& $switchBase': {
        padding: getSpacing(1.5),
        transform: 'translate(0, 1px)',

        '&$checked': {
          transform: 'translate(15px, 1px)'
        }
      },
      '& $thumb': {
        width: getSpacing(1.25),
        height: getSpacing(1.25)
      }
    }
  },

  // Breadcrumbs
  MuiBreadcrumbs: {
    li: {
      '& .MuiTypography-root': {
        ...themeTypography.body2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },
      '& .MuiSvgIcon-root': {
        fontSize: `${themeTypography.body2.lineHeight}em`,
        marginRight: getSpacing(1)
      }
    },

    separator: {
      marginLeft: getSpacing(0.5),
      marginRight: getSpacing(0.5)
    }
  },

  // Lists
  MuiList: {
    root: {
      // Indent sublevels, ugly but needed to avoid issues with hover
      '& .MuiList-root': {
        '& .MuiListItem-root': {
          paddingLeft: getSpacing(4)
        },

        '& .MuiList-root': {
          '& .MuiListItem-root': {
            paddingLeft: getSpacing(6)
          },

          '& .MuiList-root': {
            '& .MuiListItem-root': {
              paddingLeft: getSpacing(8)
            },

            '& .MuiList-root': {
              '& .MuiListItem-root': {
                paddingLeft: getSpacing(10)
              }
            }
          }
        }
      }
    }
  },

  MuiListItemIcon: {
    root: {
      minWidth: getSpacing(5.75),
      marginLeft: getSpacing(0.75),

      '& .MuiSvgIcon-root': {
        fontSize: getSpacing(3)
      }
    }
  },

  MuiListItemAvatar: {
    root: {
      '& .MuiAvatar-root': {
        height: getSpacing(4.5),
        width: getSpacing(4.5)
      },
      '& .MuiSvgIcon-root': {
        fontSize: getSpacing(2.5)
      }
    }
  },

  // Tooltip
  MuiTooltip: {
    tooltip: {
      ...themeTypography.caption,
      backgroundColor: componentsPalette.other.tooltip
    },

    arrow: {
      color: componentsPalette.other.tooltip
    }
  },

  // Dialog
  MuiDialogTitle: {
    root: {
      padding: getSpacing(3, 3, 2)
    }
  },

  MuiDialogContent: {
    root: {
      '& .MuiFormGroup-root': {
        padding: getSpacing(1, 0)
      }
    }
  },

  // Slider
  MuiSlider: {
    root: {}
  },

  // MuiToggleButtonGroup
  MuiToggleButtonGroup: {
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
  },

  MuiTablePagination: {
    select: {
      paddingRight: getSpacing(7.5),
      paddingLeft: getSpacing(1.5)
    },
    input: {
      height: getSpacing(4),
      border: `2px solid ${commonPalette.divider}`,
      borderRadius: getSpacing(0.5),
      fontWeight: themeTypography.fontWeightMedium,
      '& .MuiSelect-icon': {
        top: '50%',
        transform: 'translateY(-50%)',
        width: getSpacing(2.25),
        height: getSpacing(2.25),
        right: getSpacing(0.75)
      }
    },
    caption: {
      ...themeTypography.caption,
      '&:first-of-type': {
        color: commonPalette.text.secondary
      }
    },
    toolbar: {
      minHeight: 0,
      marginTop: getSpacing(1)
    },
    actions: {
      '& button:last-child': {
        marginLeft: getSpacing(2)
      }
    }
  },

  MuiTableCell: {
    head: {
      ...themeTypography.caption,
      color: commonPalette.text.secondary
    },
    stickyHeader: {
      backgroundColor: commonPalette.common.white
    }
  },

  // MuiToggleButton
  MuiToggleButton: {
    root: {
      width: getSpacing(4.5),
      height: getSpacing(4.5),
      border: 'none',
      borderRadius: getSpacing(0.5),
      color: commonPalette.grey[500],
      '&$selected': {
        color: commonPalette.primary.main,
        backgroundColor: commonPalette.primary.relatedLight,
        '&:hover': {
          backgroundColor: commonPalette.primary.relatedLight
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
  },

  MuiChip: {
    root: {
      backgroundColor: commonPalette.grey[100],
      '&:hover': {
        backgroundColor: commonPalette.grey[200]
      },
      '& .MuiAvatar-root': {
        backgroundColor: '#7f3c8d',
        color: commonPalette.common.white
      }
    },
    colorPrimary: {
      '&$disabled': {
        backgroundColor: commonPalette.grey[100],
        color: commonPalette.text.primary
      },
      '&:hover': {
        backgroundColor: commonPalette.primary.dark
      }
    },
    colorSecondary: {
      '&$disabled': {
        backgroundColor: commonPalette.grey[100]
      },
      '&:hover': {
        backgroundColor: commonPalette.secondary.light
      }
    },
    label: {
      fontFamily: '"Open Sans", sans-serif',
      letterSpacing: 0.25
    },
    labelSmall: {
      fontSize: themeTypography.caption.fontSize,
      fontWeight: themeTypography.fontWeightLight
    },
    outlined: {
      transition: `border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)`,
      '&$disabled': {
        backgroundColor: 'transparent'
      },
      '&:hover': {
        backgroundColor: 'transparent',
        borderColor: commonPalette.grey[200],
        '&$clickable': {
          backgroundColor: 'transparent'
        }
      }
    },
    outlinedPrimary: {
      '&:hover': {
        backgroundColor: 'transparent',
        borderColor: commonPalette.primary.dark,
        color: commonPalette.primary.dark,
        '&$clickable': {
          backgroundColor: 'transparent'
        }
      }
    },
    outlinedSecondary: {
      '&:hover': {
        backgroundColor: 'transparent',
        borderColor: commonPalette.secondary.dark,
        color: commonPalette.secondary.dark,
        '&$clickable': {
          backgroundColor: 'transparent'
        }
      }
    },
    clickable: {
      '&:focus': {
        webkitTapHighlightColor: 'none'
      }
    }
  }
};

export const themeComponentsProps = {
  MuiButtonBase: {
    disableRipple: true
  },
  MuiButton: {
    disableElevation: true
  },
  MuiTextField: {
    variant: 'outlined'
  },
  MuiSelect: {
    variant: 'outlined',
    MenuProps: {
      getContentAnchorEl: null,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left'
      }
    }
  },
  MuiOutlinedInput: {
    notched: false
  },
  MuiCheckbox: {
    size: 'small',
    color: 'primary'
  },
  MuiRadio: {
    size: 'small',
    color: 'primary'
  },
  MuiSwitch: {
    color: 'primary'
  },
  MuiInputAdornment: {
    disableTypography: true
  },
  MuiListItemText: {
    primaryTypographyProps: {
      variant: 'body2',
      style: { fontWeight: themeTypography.fontWeightBold },
      noWrap: true
    },
    secondaryTypographyProps: { variant: 'caption' }
  },
  MuiSkeleton: {
    animation: 'wave'
  },
  MuiTabs: {
    indicatorColor: 'primary',
    textColor: 'primary',
    TabIndicatorProps: {
      classes: {
        colorPrimary: 'colorPrimary'
      }
    }
  },
  MuiTypography: {
    color: 'textPrimary'
  },
  MuiDialogContentText: {
    variant: 'body2'
  },
  MuiToggleButtonGroup: {
    orientation: 'horizontal',
    exclusive: true
  },
  CircularProgress: {
    size: 40,
    thickness: 4
  },
  MuiSlider: {
    color: 'primary',
    marks: false
  },
  MuiDialog: {
    maxWidth: 'md'
  }
};
