// import { Theme, ThemeOptions } from '@material-ui/core';
import { Theme, ThemeOptions } from '@mui/material';
// import { Palette, PaletteColor } from '@material-ui/core/styles/createPalette';
import { Palette, PaletteColor } from '@mui/material';

export const cartoThemeOptions: ThemeOptions;

type Modify<T, R> = Omit<T, keyof R> & R;
type CustomPaletteColor = Modify<PaletteColor, { relatedLight: string }>;
type CustomPalette = Modify<
  Palette,
  {
    primary: CustomPaletteColor;
    secondary: CustomPaletteColor;
    error: CustomPaletteColor;
    warning: CustomPaletteColor;
    info: CustomPaletteColor;
    success: CustomPaletteColor;
  }
>;

export type CartoTheme = Modify<
  Theme,
  {
    palette: CustomPalette;
  }
>;
