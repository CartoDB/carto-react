import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonGroup as MuiToggleButtonGroup, styled } from '@mui/material';

const StyledToggleButtonGroup = styled(MuiToggleButtonGroup, {
  shouldForwardProp: (prop) => prop !== 'variant'
})(({ variant, theme }) => ({
  ...(variant === 'contained' && {
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default
  })
}));

const ToggleButtonGroup = ({ children, variant, ...rest }) => {
  return (
    <StyledToggleButtonGroup {...rest} variant={variant}>
      {children}
    </StyledToggleButtonGroup>
  );
};

ToggleButtonGroup.defaultProps = {
  variant: 'text'
};

ToggleButtonGroup.propTypes = {
  variant: PropTypes.oneOf(['text', 'contained'])
};

export default ToggleButtonGroup;
