import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Typography from './Typography';

const useStyles = makeStyles((theme) => ({
  indicator: {
    marginLeft: theme.spacing(0.5),

    '.Mui-disabled &': {
      color: theme.palette.text.disabled
    }
  }
}));

const LabelWithIndicator = ({ label, type }) => {
  const classes = useStyles();
  const isRequired = type === 'required';

  return (
    <>
      {label}
      <Typography
        component='span'
        variant='inherit'
        color='textSecondary'
        weight='regular'
        className={classes.indicator}
      >
        {isRequired ? '(required)' : '(optional)'}
      </Typography>
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
