import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import Typography from './Typography';

const LabelWithMarker = ({ label, type }) => {
  const isRequired = type === 'required';
  const theme = useTheme();

  return (
    <>
      {label}
      <Typography
        component='span'
        variant='inherit'
        color='textSecondary'
        style={{ marginLeft: theme.spacing(0.5) }}
      >
        {isRequired ? '(required)' : '(optional)'}
      </Typography>
    </>
  );
};

LabelWithMarker.defaultProps = {
  type: 'optional'
};
LabelWithMarker.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['optional' | 'required'])
};

export default LabelWithMarker;
