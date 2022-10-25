import { Theme, ThemeOptions } from '@mui/material';
import { Palette, PaletteColor } from '@mui/material';

/*
  TODO: Review if this set of changes in the type of Palette and PaletteColor, to properly use theme
  from TypeScript clients, is still required and if it needs to be fully extended to reflect the new
  color structure (custom keys & props)
*/
export const cartoThemeOptions: ThemeOptions;

type Modify<T, R> = Omit<T, keyof R> & R;
type CustomPaletteColor = Modify<
  PaletteColor,
  {
    relatedDark: string;
    relatedLight: string;
    background: string;
    outlinedBorder: string;
    hint: string;
    navyBlue: string;
    locationRed: string;
    predictionBlue: string;
    softBlue: string;
  }
>;
type CustomPalette = Modify<
  Palette,
  {
    primary: CustomPaletteColor;
    secondary: CustomPaletteColor;
    error: CustomPaletteColor;
    warning: CustomPaletteColor;
    info: CustomPaletteColor;
    success: CustomPaletteColor;
    text: CustomPaletteColor;
    default: CustomPaletteColor;
    white: CustomPaletteColor;
    black: CustomPaletteColor;
    brand: CustomPaletteColor;
  }
>;

export type CartoTheme = Modify<
  Theme,
  {
    palette: CustomPalette;
  }
>;

declare module '@mui/material/styles' {
  interface TypographyVariants {
    overlineDelicate: React.CSSProperties;
    code1: React.CSSProperties;
    code2: React.CSSProperties;
    code3: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    overlineDelicate?: React.CSSProperties;
    code1?: React.CSSProperties;
    code2?: React.CSSProperties;
    code3?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    overlineDelicate: true;
    code1: true;
    code2: true;
    code3: true;
  }
}
