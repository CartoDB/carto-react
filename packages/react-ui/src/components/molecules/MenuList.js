import React from 'react';
import PropTypes from 'prop-types';
import { MenuList as MuiMenuList, styled } from '@mui/material';

const StyledMenuList = styled(MuiMenuList, {
  shouldForwardProp: (prop) => !['extended', 'width', 'height'].includes(prop)
})(({ extended, width, height, theme }) => ({
  ...(extended && {
    '.MuiMenuItem-root': {
      minHeight: theme.spacing(6)
    }
  }),
  '.MuiMenu-paper': {
    ...(width && {
      width: width,
      minWidth: width
    }),
    ...(height && {
      maxHeight: height
    })
  }
}));

const MenuList = ({ extended, width, height, children, ...otherProps }) => {
  return (
    <StyledMenuList extended={extended} width={width} height={height} {...otherProps}>
      {children}
    </StyledMenuList>
  );
};

MenuList.propTypes = {
  extended: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string
};

export default MenuList;
