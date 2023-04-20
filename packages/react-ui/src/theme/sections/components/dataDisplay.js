import React from 'react';
import { ICON_SIZE_MEDIUM, ICON_SIZE_LARGE, ICON_SIZE_SMALL } from '../../themeConstants';
import { getSpacing } from '../../themeUtils';
import { commonPalette } from '../palette';
import { themeTypography } from '../typography';
import { PersonOutline } from '@mui/icons-material';
import { getIconPath } from '../../themeUtils';

const tooltipArrowSize = 1;
const tooltipSeparation = 0.5;
const tooltipMargin = tooltipArrowSize + tooltipSeparation;
const avatarFallbackImage = getIconPath(<PersonOutline />);
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
    styleOverrides: {
      select: {
        paddingRight: getSpacing(7.5),
        paddingLeft: getSpacing(1.5)
      },
      input: {
        height: getSpacing(4),
        width: 'auto',
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
  MuiTable: {
    defaultProps: {
      stickyHeader: true
    }
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        transition: 'background-color 0.25s ease',
        '&:not(.MuiTableRow-head) th, td': {
          border: 'none',
          '&:not(.MuiTableCell-sizeSmall)': {
            padding: getSpacing(1, 2),
            height: getSpacing(6)
          }
        },
        '&.MuiTableRow-hover:hover': {
          cursor: 'pointer'
        }
      }
    }
  },
  MuiTableCell: {
    styleOverrides: {
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
