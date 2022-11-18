import { getSpacing } from '../../themeUtils';
import { commonPalette } from '../palette';
import { themeTypography } from '../typography';

export const navigationOverrides = {
  // Menu
  MuiMenuItem: {
    styleOverrides: {
      root: {
        ...themeTypography.body2
      }
    }
  },

  // Tabs
  MuiTabs: {
    defaultProps: {
      iconPosition: 'start',
      TabIndicatorProps: {
        classes: {
          colorPrimary: 'colorPrimary'
        }
      }
    },
    styleOverrides: {
      root: {
        borderBottom: `1px solid ${commonPalette.black[12]}`
      },

      vertical: {
        borderBottom: 0
      }
    }
  },

  // Tab
  MuiTab: {
    defaultProps: {
      iconPosition: 'start'
    },

    styleOverrides: {
      root: {
        minHeight: getSpacing(6),
        minWidth: getSpacing(6),
        padding: getSpacing(0, 1.875), // Forced to a non-standard value to meet with design
        color: commonPalette.text.primary,

        '&.Mui-disabled': {
          color: commonPalette.text.disabled
        }
      }
    }
  },

  // Breadcrumbs
  MuiBreadcrumbs: {
    styleOverrides: {
      li: {
        '& .MuiTypography-root': {
          ...themeTypography.body2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        },
        '& .MuiSvgIcon-root': {
          fontSize: `${themeTypography.body2.lineHeight}em`,
          marginRight: getSpacing(1)
        }
      },

      separator: {
        marginLeft: getSpacing(0.5),
        marginRight: getSpacing(0.5)
      }
    }
  }
};
