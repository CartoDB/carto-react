import { getPixelToRem } from '../themeUtils';

const baseTypography = {
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
    lineHeight: 1.167,
    letterSpacing: '-1.5px'
  },
  h2: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: getPixelToRem(60),
    lineHeight: 1.2,
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
    lineHeight: 1.25,
    letterSpacing: '0.15px'
  },
  h5: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: getPixelToRem(24),
    lineHeight: 1.167,
    letterSpacing: '0.15px'
  },
  h6: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: getPixelToRem(18),
    lineHeight: 1.333,
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
    lineHeight: 1.538,
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
    lineHeight: 1.538,
    letterSpacing: '0.25px'
  },
  button: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: getPixelToRem(13),
    lineHeight: 1.538,
    letterSpacing: '0.25px',
    textTransform: 'inherit'
  },
  caption: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: getPixelToRem(11),
    lineHeight: 1.454,
    letterSpacing: '0.2px'
  },
  overline: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: getPixelToRem(10),
    lineHeight: 1.2,
    letterSpacing: '2px',
    textTransform: 'uppercase'
  }
};

const customTypography = {
  // TODO: Create a wrapper for the Typography component to reduce the number of variants https://app.shortcut.com/cartoteam/story/265549/
  body1Italic: {
    ...baseTypography.body1,
    fontStyle: 'italic'
  },
  body1Medium: {
    ...baseTypography.body1,
    fontWeight: 500
  },
  body1Strong: {
    ...baseTypography.body1,
    fontWeight: 600
  },
  body1StrongItalic: {
    ...baseTypography.body1,
    fontWeight: 600,
    fontStyle: 'italic'
  },
  body2Italic: {
    ...baseTypography.body2,
    fontStyle: 'italic'
  },
  body2Strong: {
    ...baseTypography.body2,
    fontWeight: 600
  },
  body2StrongItalic: {
    ...baseTypography.body2,
    fontWeight: 600,
    fontStyle: 'italic'
  },
  captionItalic: {
    ...baseTypography.caption,
    fontStyle: 'italic'
  },
  captionMedium: {
    ...baseTypography.caption,
    fontWeight: 500,
    letterSpacing: '0.4px'
  },
  captionStrong: {
    ...baseTypography.caption,
    fontWeight: 500
  },
  captionStrongItalic: {
    ...baseTypography.caption,
    fontWeight: 500,
    fontStyle: 'italic'
  },
  overlineDelicate: {
    ...baseTypography.overline,
    fontWeight: 400,
    letterSpacing: '1.2px'
  },
  code1: {
    fontFamily: '"Overpass Mono", monospace',
    fontWeight: 400,
    fontSize: getPixelToRem(16),
    lineHeight: 1.5,
    letterSpacing: 0
  },
  code1Strong: {
    fontFamily: '"Overpass Mono", monospace',
    fontWeight: 600,
    fontSize: getPixelToRem(16),
    lineHeight: 1.5,
    letterSpacing: 0
  },
  code2: {
    fontFamily: '"Overpass Mono", monospace',
    fontWeight: 400,
    fontSize: getPixelToRem(14),
    lineHeight: 1.428,
    letterSpacing: 0
  },
  code2Strong: {
    fontFamily: '"Overpass Mono", monospace',
    fontWeight: 600,
    fontSize: getPixelToRem(14),
    lineHeight: 1.428,
    letterSpacing: 0
  },
  code3: {
    fontFamily: '"Overpass Mono", monospace',
    fontWeight: 400,
    fontSize: getPixelToRem(12),
    lineHeight: 1.333,
    letterSpacing: 0
  },
  code3Strong: {
    fontFamily: '"Overpass Mono", monospace',
    fontWeight: 600,
    fontSize: getPixelToRem(12),
    lineHeight: 1.333,
    letterSpacing: 0
  }
};

export const themeTypography = {
  ...baseTypography,
  ...customTypography
};
