import { ICON_SIZE, ICON_SIZE_M } from '../../themeConstants';
import { getSpacing } from '../../themeUtils';
import { commonPalette } from '../palette';
import { themeTypography } from '../typography';

const tooltipArrowSize = 1;
const tooltipSeparation = 0.5;
const tooltipMargin = tooltipArrowSize + tooltipSeparation;

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
        style: { fontWeight: themeTypography.fontWeightBold },
        noWrap: true
      },
      secondaryTypographyProps: { variant: 'caption' }
    }
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: getSpacing(5.75),
        marginLeft: getSpacing(0.75),

        '& .MuiSvgIcon-root': {
          fontSize: ICON_SIZE_M
        }
      }
    }
  },
  MuiListItemAvatar: {
    styleOverrides: {
      root: {
        '& .MuiAvatar-root': {
          height: getSpacing(4.5),
          width: getSpacing(4.5)
        },
        '& .MuiSvgIcon-root': {
          fontSize: ICON_SIZE
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

  // Dialog
  MuiDialog: {
    defaultProps: {
      maxWidth: 'md'
    }
  },
  MuiDialogTitle: {
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
    }
  },

  // Table
  MuiTablePagination: {
    styleOverrides: {
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
    }
  },
  MuiTableCell: {
    styleOverrides: {
      head: {
        ...themeTypography.caption,
        color: commonPalette.text.secondary
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
          width: ICON_SIZE_M,
          height: ICON_SIZE_M,
          margin: 0,
          color: commonPalette.secondary.contrastText,
          backgroundColor: commonPalette.background.paper
        },
        '& .MuiChip-icon': {
          margin: 0,
          marginLeft: getSpacing(0.5)
        },
        '& img': {
          width: ICON_SIZE_M,
          height: ICON_SIZE_M
        },
        '&.Mui-disabled': {
          color: commonPalette.text.disabled,
          backgroundColor: commonPalette.action.disabledBackground,

          '& .MuiChip-deleteIcon': {
            color: commonPalette.action.disabled
          }
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
        backgroundColor: commonPalette.primary.main
      },
      filledSecondary: {
        backgroundColor: commonPalette.secondary.main
      },
      outlined: {
        borderColor: commonPalette.default.outlinedBorder,

        '&.Mui-disabled': {
          borderColor: commonPalette.default.outlinedBorder,
          backgroundColor: commonPalette.background.paper
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
          width: ICON_SIZE,
          height: ICON_SIZE
        },
        '& .MuiAvatar-root': {
          width: ICON_SIZE,
          height: ICON_SIZE
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
        width: ICON_SIZE,
        height: ICON_SIZE,
        margin: 0,
        marginLeft: '2px',
        marginRight: '3px'
      },
      deleteIconSmall: {
        width: getSpacing(2),
        height: getSpacing(2),
        marginRight: 0
      },

      clickable: {}
    }
  },

  // Avatar
  MuiAvatar: {
    styleOverrides: {
      root: {
        color: commonPalette.secondary.contrastText,
        backgroundColor: commonPalette.secondary.main,
        border: `1px solid ${commonPalette.action.hover}`
      },
      size: [
        {
          props: { size: 'small' },
          style: {
            width: ICON_SIZE,
            height: ICON_SIZE
          }
        }
      ]
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
        fontSize: ICON_SIZE
      },
      sizeLarge: {
        fontSize: ICON_SIZE_M
      }
    }
  }
};
