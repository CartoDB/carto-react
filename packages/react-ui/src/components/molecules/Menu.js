import React from 'react';
import PropTypes from 'prop-types';
import { Menu as MuiMenu, styled } from '@mui/material';

const StyledMenu = styled(MuiMenu, {
  shouldForwardProp: (prop) => !['extended', 'width', 'height'].includes(prop)
})(({ extended, width, height, theme }) => ({
  '.MuiMenu-list': {
    backgroundColor: '#ff970038 !important', // TODO: remove, just for QA purposes

    '& .MuiList-root': {
      backgroundColor: 'transparent !important' // TODO: remove, just for QA purposes,
    }
  },
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

const Menu = ({ extended, width, height, children, ...otherProps }) => {
  return (
    <StyledMenu extended={extended} width={width} height={height} {...otherProps}>
      {children}
    </StyledMenu>
  );
};

Menu.propTypes = {
  extended: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string
};

export default Menu;
