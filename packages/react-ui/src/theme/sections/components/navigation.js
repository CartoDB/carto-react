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
      indicatorColor: 'primary',
      textColor: 'primary',
      TabIndicatorProps: {
        classes: {
          colorPrimary: 'colorPrimary'
        }
      }
    },
    styleOverrides: {
      indicator: {
        height: 4,
        '&.colorPrimary': {
          backgroundColor: commonPalette.text.primary
        }
      },

      vertical: {
        '& .MuiTabs-indicator': {
          width: 4
        },

        '& .MuiTab-root': {
          padding: getSpacing(0, 2),

          '& .MuiTab-wrapper': {
            alignItems: 'flex-start'
          }
        }
      }
    }
  },

  // Tab
  MuiTab: {
    styleOverrides: {
      root: {
        padding: getSpacing(0, 1),
        marginRight: getSpacing(3),
        minWidth: '56px!important',
        '&[class*="MuiTab-labelIcon"] .MuiTab-wrapper': {
          flexFlow: 'row',
          alignItems: 'center'
        },
        '&[class*="MuiTab-labelIcon"] .MuiTab-wrapper > .MuiSvgIcon-root': {
          marginRight: getSpacing(1),
          marginBottom: 0
        }
      },
      textColorPrimary: {
        color: commonPalette.primary.main,
        opacity: 1,
        '&.Mui-selected': {
          color: commonPalette.text.primary
        },
        '&.Mui-disabled': {
          color: commonPalette.action.disabled
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
