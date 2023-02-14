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
