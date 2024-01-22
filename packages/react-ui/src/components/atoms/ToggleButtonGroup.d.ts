import { ToggleButtonGroupProps as MuiToggleButtonGroupProps } from '@mui/material';

export type ToggleButtonGroupProps = MuiToggleButtonGroupProps & {
  variant?: 'contained' | 'floating' | 'unbounded';
  backgroundColor?: 'primary' | 'secondary' | 'transparent';
};

declare const ToggleButtonGroup: (props: ToggleButtonGroupProps) => JSX.Element;
export default ToggleButtonGroup;
