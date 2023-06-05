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
  }
};
