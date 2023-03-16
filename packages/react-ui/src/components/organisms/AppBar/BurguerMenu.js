import React from 'react';
import { Divider, Hidden, IconButton } from '@mui/material';
import { styled } from '@mui/material';
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
    fill: theme.palette.background.paper
  }
}));

export default function BurguerMenu({ onClickMenu }) {
  return (
    <Hidden mdUp>
      <Menu>
        <MenuButton onClick={onClickMenu}>
          <MenuOutlined />
        </MenuButton>
        <Divider orientation='vertical' flexItem light />
      </Menu>
    </Hidden>
  );
}
