import React from 'react';
import { Divider, Hidden, IconButton } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { MenuOutlined } from '@mui/icons-material';

import { APPBAR_SIZE } from '../../../theme/themeConstants';

const Menu = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: APPBAR_SIZE,
  marginRight: theme.spacing(1.5)
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),

  '&.MuiButtonBase-root svg path': {
    fill: theme.palette.brand.appBarContrastText
  }
}));

const MenuDivider = styled(Divider)(({ theme }) => ({
  borderColor: alpha(theme.palette.brand.appBarContrastText, 0.12)
}));

export default function BurgerMenu({ onClickMenu }) {
  return (
    <Hidden mdUp>
      <Menu>
        <MenuButton onClick={onClickMenu}>
          <MenuOutlined />
        </MenuButton>
        <MenuDivider orientation='vertical' flexItem />
      </Menu>
    </Hidden>
  );
}
