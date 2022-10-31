import { Theme, ThemeOptions, TypeText } from '@mui/material';
import { Palette, PaletteColor } from '@mui/material';

/*
  TODO: Review if this set of changes in the type of Palette and PaletteColor, to properly use theme
  from TypeScript clients, is still required and if it needs to be fully extended to reflect the new
  color structure (custom keys & props)
*/
export const cartoThemeOptions: ThemeOptions;

type Modify<T, R> = Omit<T, keyof R> & R;

type CustomMainPaletteColor = Modify<
  PaletteColor,
  {
    relatedLight: string;
    background: string;
  }
>;
type CustomFeedbackPaletteColor = Modify<
  PaletteColor,
  {
    relatedDark: string;
    relatedLight: string;
  }
>;
type CustomDefaultPaletteColor = Modify<
  PaletteColor,
  {
    background: string;
    outlinedBorder: string;
  }
>;
type CustomBrandPaletteColor = {
  navyBlue: string;
  locationRed: string;
  predictionBlue: string;
  softBlue: string;
};
type CustomTextPaletteColor = Modify<
  TypeText,
  {
    hint: string;
  }
>;
type CustomShadesPaletteColor = {
  90: string;
  60: string;
  40: string;
  25: string;
  12: string;
  8: string;
  4: string;
};

type CustomPalette = Modify<
  Palette,
  {
    primary: CustomMainPaletteColor;
    secondary: CustomMainPaletteColor;
    error: CustomFeedbackPaletteColor;
    warning: CustomFeedbackPaletteColor;
    info: CustomFeedbackPaletteColor;
    success: CustomFeedbackPaletteColor;
    default: CustomDefaultPaletteColor;
    text: CustomTextPaletteColor;
    white: CustomShadesPaletteColor;
    black: CustomShadesPaletteColor;
    brand: CustomBrandPaletteColor;
  }
>;

export type CartoTheme = Modify<
  Theme,
  {
    palette: CustomPalette;
    spacingValue: number;
  }
>;

declare module '@mui/material/styles' {
  // Check https://mui.com/material-ui/customization/theming/#custom-variables
  interface Theme {
    palette: CustomPalette;
    spacingValue: number;
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    palette?: CustomPalette;
    spacingValue?: number;
  }

  interface TypographyVariants {
    overlineDelicate: React.CSSProperties;
    code1: React.CSSProperties;
    code2: React.CSSProperties;
    code3: React.CSSProperties;
  }

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
