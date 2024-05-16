import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Menu as MuiMenu, styled } from '@mui/material';
import Typography from '../atoms/Typography';
import { ICON_SIZE_MEDIUM } from '../../theme/themeConstants';

const StyledMenu = styled(MuiMenu, {
  shouldForwardProp: (prop) => !['extended', 'width', 'height'].includes(prop)
})(({ extended, width, height, theme }) => ({
  columnGap: theme.spacing(1),
  minHeight: theme.spacing(6),

  ...(extended && {
    backgroundColor: theme.palette.default.background,
    color: theme.palette.text.primary
  })
}));

const Menu = ({ subtitle, extended, width, height, children, ...otherProps }) => {
  return (
    <StyledMenu extended={extended} width={width} height={height} {...otherProps}>
      {subtitle && (
        <>
          <Divider />
          <Typography
            component='p'
            variant='caption'
            weight='strong'
            color='textSecondary'
          >
            {subtitle}
          </Typography>
        </>
      )}

      {children}
    </StyledMenu>
  );
};

Menu.defaultProps = {
  width: '100%',
  height: '100%'
};
Menu.propTypes = {
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  extended: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string
};

export default Menu;
