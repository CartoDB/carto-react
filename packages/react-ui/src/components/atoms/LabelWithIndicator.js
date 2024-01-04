import React from 'react';
import PropTypes from 'prop-types';
import { Box, styled } from '@mui/material';

import Typography from './Typography';

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5)
}));

const LabelIndicator = styled(Typography)(({ theme }) => ({
  '.Mui-disabled &': {
    color: theme.palette.text.disabled
  }
}));

const LabelWithIndicator = ({ label, type }) => {
  const isRequired = type === 'required';

  return (
    <Root>
      {label}
      <LabelIndicator
        component='span'
        variant='inherit'
        color='textSecondary'
        weight='regular'
      >
        {isRequired ? '(required)' : '(optional)'}
      </LabelIndicator>
    </Root>
  );
};

LabelWithIndicator.defaultProps = {
  type: 'optional'
};
LabelWithIndicator.propTypes = {
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  type: PropTypes.oneOf(['optional' | 'required'])
};

export default LabelWithIndicator;
