import * as React from 'react';
import { AppBarTypeMap as MuiAppBarTypeMap } from '@mui/material/AppBar';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';

export type AppBarTypeMap<D extends React.ElementType<any> = 'header'> = MuiAppBarTypeMap<
  {
    brandLogo?: React.ReactNode;
    brandText?: React.ReactNode;
    secondaryText?: React.ReactNode;
    onClickMenu?: (event: React.MouseEvent) => void;
    showBurgerMenu?: boolean;
  },
  D
>;

export type AppBarProps<D extends React.ElementType = AppBarTypeMap['defaultComponent']> =
  OverrideProps<AppBarTypeMap<D>, D>;

declare const AppBar: OverridableComponent<AppBarTypeMap>;

export default AppBar;
