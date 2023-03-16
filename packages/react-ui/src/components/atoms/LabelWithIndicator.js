import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';

import Typography from './Typography';

const LabelIndicator = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(0.5),
  '.Mui-disabled &': {
    color: theme.palette.text.disabled
  }
}));

const LabelWithIndicator = ({ label, type }) => {
  const isRequired = type === 'required';

  return (
    <>
      {label}
      <LabelIndicator
        component='span'
        variant='inherit'
        color='textSecondary'
        weight='regular'
      >
        {isRequired ? '(required)' : '(optional)'}
      </LabelIndicator>
    </>
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
