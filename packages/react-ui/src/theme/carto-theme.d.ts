import { Theme, ThemeOptions } from '@material-ui/core';
import { Palette, PaletteColor } from '@material-ui/core/styles/createPalette';

export const cartoThemeOptions: ThemeOptions;

type Modify<T, R> = Omit<T, keyof R> & R
type CustomPaletteColor = Modify<PaletteColor, { relatedLight: string }>
type CustomPalette = Modify<Palette, {
  primary: CustomPaletteColor,
  secondary: CustomPaletteColor,
  error: CustomPaletteColor,
  warning: CustomPaletteColor,
  info: CustomPaletteColor,
  success: CustomPaletteColor,
}>

export type CartoTheme = Modify<Theme, {
  palette: CustomPalette
}>
