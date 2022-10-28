import { createSpacing } from '@mui/system';
import { SPACING } from './themeConstants';

// Create spacing for theming
export const getSpacing = createSpacing(SPACING);

// Convert pixels to rem
export function getPixelToRem(px) {
  const fontBase = 16;
  const rem = (1 / fontBase) * px + 'rem';

  return rem;
}

// Lighten and darken color design formula.
// The Mui lighten / darken function doesn't get the same color as designers use
export function getMixedColor(color, baseColor, alpha) {
  const getRgbaBaseColor = (baseColor, alpha = 1) => {
    const [r, g, b] = baseColor.match(/\w\w/g).map((x) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  };
  const rgbaBaseColorValue = getRgbaBaseColor(baseColor, alpha);
  const colorResult = `linear-gradient(0deg, ${rgbaBaseColorValue}, ${rgbaBaseColorValue}), ${color}`;

  return colorResult;
}
