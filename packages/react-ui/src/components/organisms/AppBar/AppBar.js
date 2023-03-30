import React from 'react';
import PropTypes from 'prop-types';
import { AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

import BurguerMenu from './BurguerMenu';
import BrandLogo from './BrandLogo';
import BrandText from './BrandText';
import SecondaryText from './SecondaryText';

const BrandElements = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  maxWidth: 'calc(100% - 300px)',
  overflow: 'hidden',

  [theme.breakpoints.down('sm')]: {
    minWidth: '190px'
  }
}));

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: 1,
  marginLeft: theme.spacing(1)
}));

const AppBar = ({
  children,
  brandLogo,
  brandText,
  secondaryText,
  showBurgerMenu,
  onClickMenu,
  ...otherProps
}) => {
  return (
    <MuiAppBar {...otherProps}>
      <Toolbar>
        <BrandElements>
          {showBurgerMenu && <BurguerMenu onClickMenu={onClickMenu} />}
          {brandLogo && <BrandLogo logo={brandLogo} />}
          {brandText && <BrandText text={brandText} />}
          {secondaryText && <SecondaryText text={secondaryText} />}
        </BrandElements>

        <Content>{children}</Content>
      </Toolbar>
    </MuiAppBar>
  );
};

AppBar.defaultProps = {
  showBurgerMenu: false
};

AppBar.propTypes = {
  brandLogo: PropTypes.element,
  brandText: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  secondaryText: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onClickMenu: PropTypes.func,
  showBurgerMenu: PropTypes.bool
};

export default AppBar;
