import { getSpacing } from '../../themeUtils';
import { commonPalette } from '../palette';

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
      root: {
        backgroundColor: commonPalette.black[8]
      },
      rounded: {
        borderRadius: getSpacing(0.5)
      },
      text: {
        borderRadius: getSpacing(0.5)
      },
      wave: {
        '&::after': {
          background: `linear-gradient( 90deg, transparent, ${commonPalette.black[4]}, transparent )`
        }
      }
    }
  }
};
