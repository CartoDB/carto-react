import { Theme, ThemeOptions } from '@mui/material';
import { Palette, PaletteColor } from '@mui/material'

/*
  TODO: Review if this set of changes in the type of Palette and PaletteColor, to properly use theme
  from TypeScript clients, is still required and if it needs to be fully extended to reflect the new
  color structure (custom keys & props)
*/
export const cartoThemeOptions: ThemeOptions;

type Modify<T, R> = Omit<T, keyof R> & R
type CustomPaletteColor = Modify<PaletteColor, { contrastText: string, relatedLight: string, background: string }>
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
