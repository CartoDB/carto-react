import { MenuProps as MuiMenuProps } from '@mui/material';

export type MenuProps = MuiMenuProps & {
  subtitle?: React.ReactNode | string;
  extended?: boolean;
  width?: string;
  height?: string;
};

declare const Menu: (props: MenuProps) => JSX.Element;
export default Menu;
