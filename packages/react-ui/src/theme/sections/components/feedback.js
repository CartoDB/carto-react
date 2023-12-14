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
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: theme.spacing(6),
        borderRadius: theme.spacing(1),
        alignSelf: 'start',
        width: '100%'
      }),
      icon: ({ theme }) => ({
        height: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        padding: 0,

        svg: {
          width: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM
        }
      }),
      message: ({ theme }) => ({
        paddingTop: theme.spacing(0.5),
        paddingBottom: 0
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
