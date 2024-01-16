import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonGroup as MuiToggleButtonGroup, styled } from '@mui/material';

const StyledToggleButtonGroup = styled(MuiToggleButtonGroup, {
  shouldForwardProp: (prop) => prop !== 'variant'
})(({ variant, theme }) => ({
  boxShadow: variant === 'contained' ? 'none' : undefined,
  backgroundColor: variant === 'contained' ? theme.palette.background.default : undefined
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
