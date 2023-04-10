import { getSpacing } from '../../themeUtils';
import { APPBAR_SIZE } from '../../themeConstants';
import { commonPalette } from '../palette';
import { themeShadows } from '../shadows';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { themeTypography } from '../typography';

export const surfacesOverrides = {
  // AppBar
  MuiAppBar: {
    styleOverrides: {
      root: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: APPBAR_SIZE,
        backgroundColor: commonPalette.brand.navyBlue,
        color: commonPalette.common.white,
        boxShadow: themeShadows[0],

        '& .MuiToolbar-root': {
          justifyContent: 'space-between',
          width: '100%',
          padding: getSpacing(0, 1),
          minHeight: APPBAR_SIZE
        },
        '& .MuiTypography-root': {
          color: commonPalette.common.white
        },
        '& .MuiIconButton-root path': {
          fill: commonPalette.common.white
        },
        '& .MuiAvatar-root': {
          width: getSpacing(4),
          height: getSpacing(4)
        }
      }
    }
  },

  // MuiAccordion
  MuiAccordion: {
    defaultProps: {
      disableGutters: true,
      elevation: 0
    },
    styleOverrides: {
      root: {
        ...themeTypography.body2,
        backgroundColor: 'transparent',
        borderBottom: `1px solid ${commonPalette.divider}`,

        '&:last-of-type': {
          borderBottomColor: 'transparent'
        },
        '&::before': {
          content: 'none'
        },
        '&.Mui-disabled': {
          backgroundColor: 'inherit'
        }
      }
    }
  },
  // MuiAccordionSummary
  MuiAccordionSummary: {
    defaultProps: {
      expandIcon: <ExpandMoreOutlined />
    },
    styleOverrides: {
      root: {
        ...themeTypography.button,

        '&.Mui-disabled': {
          opacity: 1,
          color: commonPalette.text.disabled
        }
      },
      expandIconWrapper: {
        '& svg': {
          color: commonPalette.text.secondary,

          '.Mui-disabled &': {
            color: commonPalette.text.disabled
          }
        }
      }
    }
  }
};
