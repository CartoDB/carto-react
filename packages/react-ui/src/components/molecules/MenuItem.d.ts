import { MenuItemProps as MuiMenuItemProps } from '@mui/material';

export type MenuItemProps = MuiMenuItemProps & {
  subtitle?: boolean;
  destructive?: boolean;
  extended?: boolean;
  iconColor?: 'primary' | 'default';
};

declare const MenuItem: (props: MenuItemProps) => JSX.Element;
export default MenuItem;
