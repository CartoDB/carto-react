import React from 'react';
import PropTypes from 'prop-types';
import { AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

import BurguerMenu from './BurguerMenu';
import BrandLogo from './BrandLogo';
import BrandText from './BrandText';
import SecondaryText from './SecondaryText';

const Root = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'backgroundColor'
})(({ backgroundColor, theme }) => ({
  backgroundColor: backgroundColor || theme.palette.brand.navyBlue
}));

const BrandElements = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  maxWidth: 'calc(100% - 300px)',
  overflow: 'hidden',

  [theme.breakpoints.down('sm')]: {
    minWidth: '192px'
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
  backgroundColor,
  textColor,
  ...otherProps
}) => {
  return (
    <Root backgroundColor={backgroundColor} {...otherProps}>
      <Toolbar>
        <BrandElements>
          {showBurgerMenu && (
            <BurguerMenu onClickMenu={onClickMenu} iconColor={textColor} />
          )}
          {brandLogo && <BrandLogo logo={brandLogo} />}
          {brandText && <BrandText text={brandText} textColor={textColor} />}
          {secondaryText && <SecondaryText text={secondaryText} textColor={textColor} />}
        </BrandElements>

        <Content>{children}</Content>
      </Toolbar>
    </Root>
  );
};

AppBar.propTypes = {
  brandLogo: PropTypes.element,
  brandText: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  secondaryText: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onClickMenu: PropTypes.func,
  showBurgerMenu: PropTypes.bool,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string
};

AppBar.defaultProps = {
  showBurgerMenu: false
};

export default AppBar;
