import { getSpacing } from '../../themeUtils';
import { APPBAR_SIZE } from '../../themeConstants';
import { commonPalette } from '../palette';
import { themeShadows } from '../shadows';

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
  }
};
