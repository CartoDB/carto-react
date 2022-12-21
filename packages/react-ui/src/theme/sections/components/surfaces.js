import { commonPalette } from '../palette';
import { themeShadows } from '../shadows';

export const surfacesOverrides = {
  // AppBar
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: commonPalette.brand.navyBlue,
        color: commonPalette.common.white,
        boxShadow: themeShadows[0]
      }
    }
  }
};
