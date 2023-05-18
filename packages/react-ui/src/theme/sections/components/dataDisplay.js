import { ICON_SIZE_MEDIUM, ICON_SIZE_LARGE, ICON_SIZE_SMALL } from '../../themeConstants';
import { getSpacing } from '../../themeUtils';
import { commonPalette } from '../palette';
import { themeTypography } from '../typography';
import Typography from '../../../components/atoms/Typography';

const tooltipArrowSize = 1;
const tooltipSeparation = 0.5;
const tooltipMargin = tooltipArrowSize + tooltipSeparation;
// PersonOutline path: https://github.com/mui/material-ui/blob/master/packages/mui-icons-material/material-icons/person_outline_24px.svg?short_path=edcd654
const avatarFallbackImage =
  'M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z';
const avatarCircularRadius = '50%';
const avatarRoundedRadius = 0.5;

export const dataDisplayOverrides = {
  // Divider
  MuiDivider: {
    styleOverrides: {
      root: {
        backgroundColor: 'transparent',
        borderColor: commonPalette.divider
      },
      light: {
        borderColor: commonPalette.white[12]
      }
    }
  },

  // List
  MuiList: {
    styleOverrides: {
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
    }
  },

  // List Item
  MuiListItemText: {
    defaultProps: {
      primaryTypographyProps: {
        variant: 'body2',
        noWrap: true
      },
      secondaryTypographyProps: { variant: 'caption' }
    }
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        marginRight: getSpacing(1),

        '& .MuiSvgIcon-root': {
          fontSize: ICON_SIZE_LARGE
        },
        '.MuiMenuItem-root.MuiButtonBase-root &': {
          minWidth: getSpacing(2.25)
        }
      }
    }
  },
  MuiListItemAvatar: {
    styleOverrides: {
      root: {
        '& .MuiAvatar-root': {
          height: getSpacing(4),
          width: getSpacing(4)
        },
        '& .MuiSvgIcon-root': {
          fontSize: ICON_SIZE_MEDIUM
        }
      }
    }
  },

  // Tooltip
  MuiTooltip: {
    defaultProps: {
      arrow: true,
      placement: 'top',
      enterDelay: 1000,
      leaveDelay: 200
    },

    styleOverrides: {
      tooltip: {
        ...themeTypography.caption,
        fontWeight: 500,
        maxWidth: '240px',
        backgroundColor: commonPalette.black[90],

        '.MuiTooltip-popper[data-popper-placement*="top"] &': {
          marginBottom: getSpacing(tooltipSeparation),

          '&.MuiTooltip-tooltipArrow': {
            marginBottom: getSpacing(tooltipMargin)
          }
        },
        '.MuiTooltip-popper[data-popper-placement*="right"] &': {
          marginLeft: getSpacing(tooltipSeparation),

          '&.MuiTooltip-tooltipArrow': {
            marginLeft: getSpacing(tooltipMargin)
          }
        },
        '.MuiTooltip-popper[data-popper-placement*="bottom"] &': {
          marginTop: getSpacing(tooltipSeparation),

          '&.MuiTooltip-tooltipArrow': {
            marginTop: getSpacing(tooltipMargin)
          }
        },
        '.MuiTooltip-popper[data-popper-placement*="left"] &': {
          marginRight: getSpacing(tooltipSeparation),

          '&.MuiTooltip-tooltipArrow': {
            marginRight: getSpacing(tooltipMargin)
          }
        }
      },

      arrow: {
        height: getSpacing(tooltipArrowSize),
        color: commonPalette.black[90]
      }
    }
  },

  // Popper
  MuiPopper: {
    styleOverrides: {
      root: {
        '& .MuiPaper-root': {
          marginTop: getSpacing(0.5)
        }
      }
    }
  },

  // Popover
  MuiPopover: {
    styleOverrides: {
      root: {
        '& .MuiPaper-root': {
          marginTop: getSpacing(0.5)
        }
      }
    }
  },

  // Dialog
  MuiDialog: {
    defaultProps: {
      maxWidth: 'md'
    }
  },
  MuiDialogTitle: {
    defaultProps: {
      variant: 'subtitle1'
    },

    styleOverrides: {
      root: {
        padding: getSpacing(3, 3, 2)
      }
    }
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        '& .MuiFormGroup-root': {
          padding: getSpacing(1, 0)
        }
      }
    }
  },
  MuiDialogContentText: {
    defaultProps: {
      variant: 'body2'
    },

    styleOverrides: {
      root: {
        color: commonPalette.text.primary
      }
    }
  },

  // Table
  MuiTablePagination: {
    defaultProps: {
      SelectProps: {
        variant: 'outlined',
        size: 'small'
      },
      labelDisplayedRows: ({ from, to, count }) => {
        return (
          <>
            <Typography
              component='span'
              variant='inherit'
              weight='strong'
              color='textPrimary'
            >
              {`${from}-${to}`}
            </Typography>
            {` of ${count}`}
          </>
        );
      }
    },
    styleOverrides: {
      root: {
        borderBottom: 0
      },
      toolbar: {
        minHeight: '0 !important',
        padding: '0 !important',
        height: getSpacing(6)
      },
      selectLabel: {
        margin: 0,
        ...themeTypography.caption,
        fontWeight: themeTypography.fontWeightMedium
      },
      selectIcon: {
        '&.MuiSvgIcon-root': {
          right: getSpacing(1)
        }
      },
      input: {
        marginRight: getSpacing(2),
        marginLeft: getSpacing(1),
        width: 'auto',
        paddingRight: getSpacing(3)
      },
      displayedRows: {
        color: commonPalette.text.secondary
      },
      actions: {
        marginLeft: getSpacing(1),

        '.MuiIconButton-root': {
          '&:not(.Mui-disabled)': {
            color: commonPalette.text.secondary
          },
          '& + .MuiIconButton-root': {
            marginLeft: getSpacing(0.5)
          }
        }
      }
    }
  },
  MuiTable: {
    defaultProps: {
      stickyHeader: true
    }
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        transition: 'background-color 0.25s ease',
        borderColor: commonPalette.divider,

        '&.MuiTableRow-hover:hover': {
          cursor: 'pointer'
        }
      }
    }
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        padding: getSpacing(0.5, 2),
        height: getSpacing(6),

        '&.MuiTableCell-sizeSmall': {
          height: getSpacing(4)
        },
        '&.MuiTableCell-footer': {
          padding: 0
        }
      },
      head: {
        ...themeTypography.caption,
        fontWeight: themeTypography.fontWeightMedium,
        color: commonPalette.text.primary
      },
      stickyHeader: {
        backgroundColor: commonPalette.common.white
      }
    }
  },

  // Chip
  MuiChip: {
    defaultProps: {
      color: 'primary'
    },

    styleOverrides: {
      root: {
        maxWidth: '192px',
        padding: getSpacing(0, 0.5),

        '& .MuiAvatar-root': {
          width: ICON_SIZE_LARGE,
          height: ICON_SIZE_LARGE,
          margin: 0,
          color: commonPalette.secondary.contrastText,
          backgroundColor: commonPalette.background.paper,
          border: `1px solid ${commonPalette.action.hover}`
        },
        '& .MuiChip-icon': {
          margin: 0,
          marginLeft: getSpacing(0.5)
        },
        '& img': {
          width: ICON_SIZE_LARGE,
          height: ICON_SIZE_LARGE
        },
        '&.Mui-disabled': {
          color: commonPalette.text.disabled,
          backgroundColor: commonPalette.action.disabledBackground,
          opacity: 1,

          '& .MuiChip-deleteIcon, & .MuiChip-icon': {
            color: commonPalette.action.disabled
          },
          '& .MuiAvatar-root': {
            opacity: 0.6
          }
        },
        '& .MuiChip-deleteIcon': {
          color: commonPalette.black[60]
        }
      },

      // Variants
      filled: {
        border: 0,
        backgroundColor: commonPalette.default.main,

        '& .MuiChip-iconColorPrimary': {
          color: commonPalette.primary.contrastText
        }
      },
      filledPrimary: {
        backgroundColor: commonPalette.primary.main,

        '& .MuiChip-deleteIcon': {
          color: commonPalette.white[60]
        }
      },
      filledSecondary: {
        backgroundColor: commonPalette.secondary.main
      },
      outlined: {
        borderColor: commonPalette.default.outlinedBorder,

        '&.Mui-disabled': {
          borderColor: commonPalette.default.outlinedBorder,
          backgroundColor: 'transparent'
        },
        '& .MuiChip-deleteIcon:hover': {
          color: commonPalette.text.primary
        }
      },
      outlinedPrimary: {
        borderColor: commonPalette.primary.main
      },
      outlinedSecondary: {
        borderColor: commonPalette.secondary.main
      },

      // Sizes
      sizeSmall: {
        '& img': {
          width: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM
        },
        '& .MuiAvatar-root': {
          width: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM
        },
        '& .MuiChip-icon': {
          marginLeft: getSpacing(0.25)
        }
      },

      // Inner elements
      label: {
        ...themeTypography.button,
        padding: getSpacing(0, 0.75)
      },
      labelSmall: {
        ...themeTypography.caption,
        fontWeight: 500,
        padding: getSpacing(0, 0.5)
      },
      deleteIcon: {
        width: ICON_SIZE_MEDIUM,
        height: ICON_SIZE_MEDIUM,
        margin: 0,
        marginLeft: '2px', // Forced to a non-standard value to meet with design
        marginRight: '3px', // Forced to a non-standard value to meet with design
        transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

        '&.MuiChip-deleteIconColorDefault': {
          color: commonPalette.text.secondary,

          '&:hover': {
            color: commonPalette.text.primary
          }
        }
      },
      deleteIconSmall: {
        width: getSpacing(2),
        height: getSpacing(2),
        marginRight: 0
      },

      clickable: {
        '&:active': {
          boxShadow: 'none'
        },

        '&.MuiChip-outlined': {
          transitionProperty: 'background, color, border-color',
          transitionDuration: '300ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',

          '&:hover': {
            backgroundColor: 'transparent',

            '&.MuiChip-colorPrimary': {
              color: commonPalette.primary.dark,
              borderColor: commonPalette.primary.dark
            },
            '&.MuiChip-colorSecondary': {
              color: commonPalette.secondary.dark,
              borderColor: commonPalette.secondary.dark
            },
            '&.MuiChip-colorDefault': {
              borderColor: commonPalette.default.dark
            }
          }
        },
        '&.MuiChip-filled': {
          '&:hover': {
            '&.MuiChip-colorSecondary': {
              backgroundColor: commonPalette.secondary.light
            },
            '&.MuiChip-colorDefault': {
              backgroundColor: commonPalette.default.dark
            }
          }
        }
      }
    }
  },

  // Avatar
  MuiAvatar: {
    styleOverrides: {
      root: {
        overflow: 'initial',
        color: commonPalette.secondary.contrastText,
        backgroundColor: commonPalette.secondary.main,

        //  Default fallback image override
        // https://github.com/mui/material-ui/issues/33229
        '& .MuiAvatar-fallback': {
          path: {
            d: `path('${avatarFallbackImage}') !important`
          }
        }
      },
      img: {
        boxShadow: `0 0 0 1px ${commonPalette.default.outlinedBorder}`
      },

      circular: {
        borderRadius: avatarCircularRadius,

        '& img': {
          borderRadius: avatarCircularRadius
        }
      },
      rounded: {
        borderRadius: getSpacing(avatarRoundedRadius),

        '& img': {
          borderRadius: getSpacing(avatarRoundedRadius)
        }
      }
    }
  },

  // Skeleton
  MuiSkeleton: {
    defaultProps: {
      animation: 'wave'
    }
  },

  // Typography
  MuiTypography: {
    defaultProps: {
      color: 'textPrimary'
    }
  },

  // Svg Icons
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        fontSize: ICON_SIZE_MEDIUM
      },
      fontSizeSmall: {
        fontSize: ICON_SIZE_SMALL
      },
      fontSizeLarge: {
        fontSize: ICON_SIZE_LARGE
      }
    }
  }
};
