import { ToggleButtonGroupProps as MuiToggleButtonGroupProps } from '@mui/material';

export type ToggleButtonGroupProps = MuiToggleButtonGroupProps & {
  variant?: 'contained' | 'text';
};

declare const ToggleButtonGroup: (props: ToggleButtonGroupProps) => JSX.Element;
export default ToggleButtonGroup;
