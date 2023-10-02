import { Theme } from '@mui/material';

export function getCartoColorStylePropsForItem(
  theme: Theme,
  index: number
): { backgroundColor: string; color: string };

export function getColorByCategory(
  category: string | null | undefined,
  props: { palette: string; fallbackColor: string; colorMapping: { [x: string]: string } }
): string;
