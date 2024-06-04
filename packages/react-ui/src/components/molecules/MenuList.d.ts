import { MenuListProps as MuiMenuListProps } from '@mui/material';

export type MenuListProps = MuiMenuListProps & {
  extended?: boolean;
  width?: string;
  height?: string;
};

declare const MenuList: (props: MenuListProps) => JSX.Element;
export default MenuList;
