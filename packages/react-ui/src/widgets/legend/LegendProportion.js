import React from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  circles: {
    position: 'relative',
    marginBottom: 4
  },
  avg: {
    width: 12,
    height: 2,
    position: 'absolute',
    // TODO change color
    border: `1px solid ${theme.palette.grey[900]}`,
    borderRadius: 4,
    backgroundColor: theme.palette.grey[900],
    right: 0,
    boxSizing: 'border-box'
  },
  errorContainer: {
    maxWidth: 240
  }
}));

function LegendProportion({ legend }) {
  const classes = useStyles();

  const { min, max, error } = calculateRange(legend);
  const [step1, step2] = !error ? calculateSteps(min, max) : [0, 0];

  return (
    <Grid container item direction='row' spacing={2} data-testid='proportion-legend'>
      <Grid container item xs={6} justifyContent='flex-end' className={classes.circles}>
        <Circle index={0}></Circle>
        <Circle index={1}></Circle>
        <Circle index={2}></Circle>
        <Circle index={3}></Circle>
      </Grid>
      <Grid
        container
        item
        direction='column'
        justifyContent='space-between'
        xs={6}
        spacing={1}
      >
        {error ? (
          <Grid item className={classes.errorContainer}>
            <Typography variant='overline'>
              You need to specify valid numbers for the labels property
            </Typography>
          </Grid>
        ) : (
          <>
            <Grid item>
              <Typography variant='overline'>Max: {max}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='overline'>{step2}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='overline'>{step1}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='overline'>Min: {min}</Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}

LegendProportion.defaultProps = {
  legend: {}
};

const TypeNumberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
LegendProportion.propTypes = {
  legend: PropTypes.shape({
    labels: PropTypes.arrayOf(TypeNumberOrString),
    stats: PropTypes.shape({
      min: TypeNumberOrString,
      max: TypeNumberOrString
    })
  }).isRequired
};

export default LegendProportion;

// Aux

function calculateRange({ labels, stats }) {
  let max;
  let min;
  let error = false;

  if (stats) {
    min = stats.min;
    max = stats.max;
  } else if (labels) {
    min = labels[0];
    max = labels[labels.length - 1];
  } else {
    error = true;
  }

  if (!Number.isFinite(min)) {
    min = parseInt(min, 10);
  }

  if (!Number.isFinite(max)) {
    max = parseInt(max, 10);
  }

  if (Number.isNaN(min) || Number.isNaN(max)) {
    error = true;
  }

  return { min, max, error };
}

function calculateSteps(min, max) {
  const gap = (max + min) / 4;
  const step1 = min + gap;
  const step2 = max - gap;

  return [step1, step2];
}

const useStylesCircle = makeStyles((theme) => ({
  circle: {
    border: `solid 1px ${theme.palette.grey[100]}`,
    backgroundColor: theme.palette.grey[50],
    borderRadius: '50%',
    position: 'absolute',
    right: 0,
    bottom: 0
  }
}));

function Circle({ index = 0 }) {
  const classes = useStylesCircle();

  const sizes = {
    0: 96,
    1: 72,
    2: 48,
    3: 24
  };

  const width = sizes[index];
  const height = sizes[index];

  return (
    <Box component='span' className={classes.circle} style={{ width, height }}></Box>
  );
}
