import { Theme, ThemeOptions, TypeText } from '@mui/material';
import { Palette, PaletteColor } from '@mui/material';

export const cartoThemeOptions: ThemeOptions;
export const theme: CartoTheme;

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

// If we get every client to use 'default' theme types, module augmentation probably would allow us omiting this export
export type CartoTheme = Modify<
  Theme,
  {
    palette: CustomPalette;
    spacingValue: number;
  }
>;

/*
  Module augmentation, to allow a better experience when using carto-react from
  TypeScript clients (eg: *makeStyles* using 'DefaultTheme' | *useTheme* using 'Theme')
*/

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends CartoTheme {}
}

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

// Update the Buttons's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    default: true;
  }
}

// Update the FAB's color prop options
declare module '@mui/material/Fab' {
  interface FabPropsColorOverrides {
    default: true;
  }
}
