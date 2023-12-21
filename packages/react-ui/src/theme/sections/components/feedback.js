import React from 'react';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { ICON_SIZE_MEDIUM } from '../../themeConstants';

export const feedbackOverrides = {
  // SnackBar
  MuiSnackbar: {
    defaultProps: {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center'
      }
    }
  },

  // Skeleton
  MuiSkeleton: {
    defaultProps: {
      animation: 'wave',
      variant: 'rounded'
    },

    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.black[8]
      }),
      rounded: ({ theme }) => ({
        borderRadius: theme.spacing(0.5)
      }),
      text: ({ theme }) => ({
        borderRadius: theme.spacing(0.5)
      }),
      wave: ({ theme }) => ({
        '&::after': {
          background: `linear-gradient( 90deg, transparent, ${theme.palette.black[4]}, transparent )`
        }
      })
    }
  },

  // Alert
  MuiAlert: {
    defaultProps: {
      iconMapping: {
        success: <CheckCircleOutlinedIcon />
      }
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.spacing(1),
        alignSelf: 'start',
        width: '100%',
        padding: theme.spacing(1.5)
      }),
      icon: ({ theme }) => ({
        height: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        padding: 0,
        marginRight: theme.spacing(1),

        svg: {
          width: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM
        }
      }),
      message: ({ theme }) => ({
        paddingTop: theme.spacing(0.5),
        paddingBottom: 0,
        ...theme.typography.caption
      })
    }
  },

  // AlertTitle
  MuiAlertTitle: {
    defaultProps: {
      variant: 'body2'
    },
    styleOverrides: {
      root: ({ theme }) => ({
        marginBottom: theme.spacing(0.5),
        fontWeight: theme.typography.fontWeightBold,
        color: 'inherit'
      })
    }
  }
};
