import React, { forwardRef } from 'react';
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
  '&.MuiList-root': {
    backgroundColor: '#ff970038 !important', // TODO: remove, just for QA purposes

    ...(width && {
      width: width,
      minWidth: width
    }),
    ...(height && {
      maxHeight: height
    })
  }
}));

const MenuList = forwardRef(
  ({ extended, width, height, children, ...otherProps }, ref) => {
    // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
    // https://mui.com/material-ui/guides/composition/#caveat-with-refs

    return (
      <StyledMenuList
        extended={extended}
        width={width}
        height={height}
        ref={ref}
        {...otherProps}
      >
        {children}
      </StyledMenuList>
    );
  }
);

MenuList.propTypes = {
  extended: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string
};

export default MenuList;
