import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const OptionalLabel = ({ label }) => {
  return (
    <span>
      {label}
      <Typography variant='caption' color='textSecondary' style={{ marginLeft: '4px' }}>
        {'(optional)'}
      </Typography>
    </span>
  );
};

OptionalLabel.propTypes = {
  label: PropTypes.string.isRequired
};

export default OptionalLabel;
