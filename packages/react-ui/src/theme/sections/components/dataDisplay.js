import React from 'react';
import { ICON_SIZE_MEDIUM, ICON_SIZE_LARGE, ICON_SIZE_SMALL } from '../../themeConstants';
import Typography from '../../../components/atoms/Typography';
import TablePaginationActions from '../../../components/molecules/Table/TablePaginationActions';

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
      root: ({ theme }) => ({
        backgroundColor: 'transparent',
        borderColor: theme.palette.divider
      }),
      light: ({ theme }) => ({
        borderColor: theme.palette.white[12]
      })
    }
  },

  // List
  MuiList: {
    styleOverrides: {
      root: ({ theme }) => ({
        // Indent sublevels, ugly but needed to avoid issues with hover
        '& .MuiList-root': {
          '& .MuiListItem-root': {
            paddingLeft: theme.spacing(4)
          },

          '& .MuiList-root': {
            '& .MuiListItem-root': {
              paddingLeft: theme.spacing(6)
            },

            '& .MuiList-root': {
              '& .MuiListItem-root': {
                paddingLeft: theme.spacing(8)
              },

              '& .MuiList-root': {
                '& .MuiListItem-root': {
                  paddingLeft: theme.spacing(10)
                }
              }
            }
          }
        }
      })
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
      root: ({ theme }) => ({
        marginRight: theme.spacing(1),

        '& .MuiSvgIcon-root': {
          fontSize: ICON_SIZE_LARGE
        },
        '.MuiMenuItem-root.MuiButtonBase-root &': {
          minWidth: theme.spacing(2.25)
        }
      })
    }
  },
  MuiListItemAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiAvatar-root': {
          height: theme.spacing(4),
          width: theme.spacing(4)
        },
        '& .MuiSvgIcon-root': {
          fontSize: ICON_SIZE_MEDIUM
        }
      })
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
      tooltip: ({ theme }) => ({
        ...theme.typography.caption,
        fontWeight: 500,
        maxWidth: '240px',
        backgroundColor: theme.palette.black[90],

        '.MuiTooltip-popper[data-popper-placement*="top"] &': {
          marginBottom: theme.spacing(tooltipSeparation),

          '&.MuiTooltip-tooltipArrow': {
            marginBottom: theme.spacing(tooltipMargin)
          }
        },
        '.MuiTooltip-popper[data-popper-placement*="right"] &': {
          marginLeft: theme.spacing(tooltipSeparation),

          '&.MuiTooltip-tooltipArrow': {
            marginLeft: theme.spacing(tooltipMargin)
          }
        },
        '.MuiTooltip-popper[data-popper-placement*="bottom"] &': {
          marginTop: theme.spacing(tooltipSeparation),

          '&.MuiTooltip-tooltipArrow': {
            marginTop: theme.spacing(tooltipMargin)
          }
        },
        '.MuiTooltip-popper[data-popper-placement*="left"] &': {
          marginRight: theme.spacing(tooltipSeparation),

          '&.MuiTooltip-tooltipArrow': {
            marginRight: theme.spacing(tooltipMargin)
          }
        }
      }),

      arrow: ({ theme }) => ({
        height: theme.spacing(tooltipArrowSize),
        color: theme.palette.black[90]
      })
    }
  },

  // Popper
  MuiPopper: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiPaper-root': {
          marginTop: theme.spacing(0.5)
        }
      })
    }
  },

  // Popover
  MuiPopover: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiPaper-root': {
          marginTop: theme.spacing(0.5)
        }
      })
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
      root: ({ theme }) => ({
        padding: theme.spacing(2)
      })
    }
  },
  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(0, 2, 2),

        '& .MuiFormGroup-root': {
          padding: theme.spacing(1, 0)
        }
      })
    }
  },
  MuiDialogContentText: {
    defaultProps: {
      variant: 'body2'
    },

    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.text.primary
      })
    }
  },
  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(2)
      })
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
      },
      ActionsComponent: TablePaginationActions
    },
    styleOverrides: {
      root: () => ({
        borderBottom: 0
      }),
      toolbar: ({ theme }) => ({
        minHeight: '0 !important',
        padding: '0 !important',
        height: theme.spacing(6)
      }),
      selectLabel: ({ theme }) => ({
        margin: 0,
        ...theme.typography.caption,
        fontWeight: theme.typography.fontWeightMedium
      }),
      selectIcon: ({ theme }) => ({
        '&.MuiSvgIcon-root': {
          right: theme.spacing(1)
        }
      }),
      input: ({ theme }) => ({
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(1),
        width: 'auto',
        paddingRight: theme.spacing(3)
      }),
      displayedRows: ({ theme }) => ({
        color: theme.palette.text.secondary
      })
    }
  },
  MuiTable: {
    defaultProps: {
      stickyHeader: true
    }
  },
  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        transition: 'background-color 0.25s ease',
        borderColor: theme.palette.divider,

        '&.MuiTableRow-hover:hover': {
          cursor: 'pointer'
        }
      })
    }
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(0.5, 2),
        height: theme.spacing(6),

        '&.MuiTableCell-sizeSmall': {
          height: theme.spacing(4)
        },
        '&.MuiTableCell-footer': {
          padding: 0
        }
      }),
      head: ({ theme }) => ({
        ...theme.typography.caption,
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.text.primary
      }),
      stickyHeader: ({ theme }) => ({
        backgroundColor: theme.palette.common.white
      })
    }
  },

  // Chip
  MuiChip: {
    defaultProps: {
      color: 'primary'
    },

    styleOverrides: {
      root: ({ theme }) => ({
        maxWidth: '192px',
        padding: theme.spacing(0, 0.5),

        '& .MuiAvatar-root': {
          width: ICON_SIZE_LARGE,
          height: ICON_SIZE_LARGE,
          margin: 0,
          color: theme.palette.secondary.contrastText,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.action.hover}`
        },
        '& .MuiChip-icon': {
          margin: 0,
          marginLeft: theme.spacing(0.5)
        },
        '& img': {
          width: ICON_SIZE_LARGE,
          height: ICON_SIZE_LARGE
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
          backgroundColor: theme.palette.action.disabledBackground,
          opacity: 1,

          '& .MuiChip-deleteIcon, & .MuiChip-icon': {
            color: theme.palette.action.disabled
          },
          '& .MuiAvatar-root': {
            opacity: 0.6
          }
        },
        '& .MuiChip-deleteIcon': {
          color: theme.palette.black[60]
        }
      }),

      // Variants
      filled: ({ theme }) => ({
        border: 0,
        backgroundColor: theme.palette.default.main,

        '& .MuiChip-iconColorPrimary': {
          color: theme.palette.primary.contrastText
        }
      }),
      filledPrimary: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,

        '& .MuiChip-deleteIcon': {
          color: theme.palette.white[60]
        }
      }),
      filledSecondary: ({ theme }) => ({
        backgroundColor: theme.palette.secondary.main
      }),
      outlined: ({ theme }) => ({
        borderColor: theme.palette.default.outlinedBorder,

        '&.Mui-disabled': {
          borderColor: theme.palette.default.outlinedBorder,
          backgroundColor: 'transparent'
        },
        '& .MuiChip-deleteIcon:hover': {
          color: theme.palette.text.primary
        }
      }),
      outlinedPrimary: ({ theme }) => ({
        borderColor: theme.palette.primary.main
      }),
      outlinedSecondary: ({ theme }) => ({
        borderColor: theme.palette.secondary.main
      }),

      // Sizes
      sizeSmall: ({ theme }) => ({
        '& img': {
          width: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM
        },
        '& .MuiAvatar-root': {
          width: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM
        },
        '& .MuiChip-icon': {
          marginLeft: theme.spacing(0.25)
        }
      }),

      // Inner elements
      label: ({ theme }) => ({
        ...theme.typography.button,
        padding: theme.spacing(0, 0.75)
      }),
      labelSmall: ({ theme }) => ({
        ...theme.typography.caption,
        fontWeight: 500,
        padding: theme.spacing(0, 0.5)
      }),
      deleteIcon: ({ theme }) => ({
        width: ICON_SIZE_MEDIUM,
        height: ICON_SIZE_MEDIUM,
        margin: 0,
        marginLeft: '2px', // Forced to a non-standard value to meet with design
        marginRight: '3px', // Forced to a non-standard value to meet with design
        transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

        '&.MuiChip-deleteIconColorDefault': {
          color: theme.palette.text.secondary,

          '&:hover': {
            color: theme.palette.text.primary
          }
        }
      }),
      deleteIconSmall: ({ theme }) => ({
        width: theme.spacing(2),
        height: theme.spacing(2),
        marginRight: 0
      }),

      clickable: ({ theme }) => ({
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
              color: theme.palette.primary.dark,
              borderColor: theme.palette.primary.dark
            },
            '&.MuiChip-colorSecondary': {
              color: theme.palette.secondary.dark,
              borderColor: theme.palette.secondary.dark
            },
            '&.MuiChip-colorDefault': {
              borderColor: theme.palette.default.dark
            }
          }
        },
        '&.MuiChip-filled': {
          '&:hover': {
            '&.MuiChip-colorSecondary': {
              backgroundColor: theme.palette.secondary.light
            },
            '&.MuiChip-colorDefault': {
              backgroundColor: theme.palette.default.dark
            }
          }
        }
      })
    }
  },

  // Avatar
  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        overflow: 'initial',
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,

        //  Default fallback image override
        // https://github.com/mui/material-ui/issues/33229
        '& .MuiAvatar-fallback': {
          path: {
            d: `path('${avatarFallbackImage}') !important`
          }
        }
      }),
      img: ({ theme }) => ({
        boxShadow: `0 0 0 1px ${theme.palette.default.outlinedBorder}`
      }),

      circular: ({ theme }) => ({
        borderRadius: avatarCircularRadius,

        '& img': {
          borderRadius: avatarCircularRadius
        }
      }),
      rounded: ({ theme }) => ({
        borderRadius: theme.spacing(avatarRoundedRadius),

        '& img': {
          borderRadius: theme.spacing(avatarRoundedRadius)
        }
      })
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
      root: () => ({
        fontSize: ICON_SIZE_MEDIUM
      }),
      fontSizeSmall: () => ({
        fontSize: ICON_SIZE_SMALL
      }),
      fontSizeLarge: () => ({
        fontSize: ICON_SIZE_LARGE
      })
    }
  }
};
