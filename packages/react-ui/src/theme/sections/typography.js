import { getPixelToRem } from '../themeUtils';

export const themeTypography = {
  htmlFontSize: 16,
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  lineHeight: 1.5,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  fontSmoothing: 'antialiased',
  h1: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: getPixelToRem(96),
    lineHeight: 1.084,
    letterSpacing: '-1.5px'
  },
  h2: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: getPixelToRem(72),
    lineHeight: 1.125,
    letterSpacing: '-0.5px'
  },
  h3: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: getPixelToRem(48),
    lineHeight: 1.167,
    letterSpacing: 0
  },
  h4: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: getPixelToRem(32),
    lineHeight: 1.177,
    letterSpacing: '0.15px'
  },
  h5: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: getPixelToRem(24),
    lineHeight: 1.334,
    letterSpacing: '0.15px'
  },
  h6: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: getPixelToRem(18),
    lineHeight: 1.2,
    letterSpacing: '0.15px'
  },
  subtitle1: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: getPixelToRem(16),
    lineHeight: 1.5,
    letterSpacing: '0.15px'
  },
  subtitle2: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: getPixelToRem(13),
    lineHeight: 1.715,
    letterSpacing: '0.1px'
  },
  body1: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: getPixelToRem(16),
    lineHeight: 1.5,
    letterSpacing: '0.4px'
  },
  body2: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: getPixelToRem(13),
    lineHeight: 1.429,
    letterSpacing: '0.25px'
  },
  button: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: getPixelToRem(13),
    lineHeight: 1.715,
    letterSpacing: '0.25px',
    textTransform: 'inherit'
  },
  caption: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: getPixelToRem(11),
    lineHeight: 1.334,
    letterSpacing: '0.2px'
  },
  overline: {
    fontFamily: '"Overpass Mono", monospace',
    fontWeight: 600,
    fontSize: getPixelToRem(10),
    lineHeight: 1.6,
    letterSpacing: '2px',
    textTransform: 'uppercase'
  },
  // Custom fonts
  charts: {
    // TODO: design is going to create a new variant (more reusable) to replace this
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: getPixelToRem(10),
    lineHeight: 1.6,
    letterSpacing: '0.150em'
  }
};
