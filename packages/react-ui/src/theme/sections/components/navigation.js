import { ICON_SIZE } from '../../themeConstants';
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
      root: ({ ownerState }) => ({
        borderBottom: `1px solid ${commonPalette.black[12]}`
      }),

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
        padding: getSpacing(0, 2),
        paddingTop: '2px',
        borderBottom: '2px solid transparent',
        ...themeTypography.subtitle2,
        color: commonPalette.text.primary,
        transition: 'border 300ms cubic-bezier(0.4, 0, 0.2, 1)',

        '&:hover': {
          borderBottomColor: commonPalette.text.primary
        },
        '&.Mui-selected': {
          pointerEvents: 'none'
        },
        '.MuiTabs-vertical &': {
          paddingTop: 0,
          borderBottom: 0,
          paddingLeft: '2px',
          borderRight: '2px solid transparent',

          '&:hover': {
            borderRightColor: commonPalette.text.primary
          }
        }
      },
      wrapped: {
        maxWidth: '240px'
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
          fontSize: ICON_SIZE,
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
