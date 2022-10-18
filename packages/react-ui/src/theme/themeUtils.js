import createSpacing from '@material-ui/core/styles/createSpacing';
import { SPACING } from './themeConstants';

export const spacing = createSpacing(SPACING);
console.log(spacing);

// Convert pixels to rem
export function getPixelToRem(px) {
  const fontBase = 16;
  const rem = (1 / fontBase) * px + 'rem';

  return rem;
}
