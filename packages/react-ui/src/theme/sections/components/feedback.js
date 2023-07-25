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
        borderRadius: theme.spacing(1),
        alignSelf: 'start',
        width: '100%'
      }),
      icon: ({ theme }) => ({
        svg: {
          width: ICON_SIZE_MEDIUM,
          height: ICON_SIZE_MEDIUM
        }
      })
    }
  },

  // AlertTitle
  MuiAlertTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.body2,
        fontWeight: theme.typography.fontWeightBold,
        color: 'inherit'
      })
    }
  }
};
