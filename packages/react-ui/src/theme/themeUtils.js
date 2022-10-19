import { createSpacing } from '@mui/system';
import { SPACING } from './themeConstants';

export const spacing = createSpacing(SPACING);

// Convert pixels to rem
export function getPixelToRem(px) {
  const fontBase = 16;
  const rem = (1 / fontBase) * px + 'rem';

  return rem;
}
