import React from 'react';
import PropTypes from 'prop-types';
import { Menu as MuiMenu, styled } from '@mui/material';
import { ICON_SIZE_MEDIUM } from '../../theme/themeConstants';

const StyledMenu = styled(MuiMenu, {
  shouldForwardProp: (prop) => !['extended', 'width', 'height'].includes(prop)
})(({ extended, width, height, theme }) => ({
  columnGap: theme.spacing(1),
  minHeight: theme.spacing(6),

  ...(extended && {
    '.MuiMenuItem-root': {
      minHeight: theme.spacing(6)
    }
  })
}));

const Menu = ({ extended, width, height, children, ...otherProps }) => {
  return (
    <StyledMenu extended={extended} width={width} height={height} {...otherProps}>
      {children}
    </StyledMenu>
  );
};

Menu.defaultProps = {
  width: '100%',
  height: '100%'
};
Menu.propTypes = {
  extended: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string
};

export default Menu;
