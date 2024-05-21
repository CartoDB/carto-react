import { MenuItemProps as MuiMenuItemProps } from '@mui/material';

export type MenuItemProps = MuiMenuItemProps & {
  subtitle?: boolean;
  destructive?: boolean;
};

declare const MenuItem: (props: MenuItemProps) => JSX.Element;
export default MenuItem;