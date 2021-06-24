import React from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';

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
  }
}));

function calculateRange({ labels, stats }) {
  let max, min;
  if (stats) {
    min = stats.min;
    max = stats.max;
  } else {
    min = labels[0];
    max = labels[labels.length - 1];
  }

  return [min, max];
}

function calculateSteps([min, max]) {
  const gap = (max + min) / 4;
  const step1 = min + gap;
  const step2 = max - gap;

  return [step1, step2];
}

export default function LegendProportion({ legend }) {
  const classes = useStyles();

  const [min, max] = calculateRange(legend);
  const [step1, step2] = calculateSteps([min, max]);

  return (
    <Grid container item direction='row' spacing={2} data-testid='proportion-legend'>
      <Grid container item xs={6} justify='flex-end' className={classes.circles}>
        <Circle index={0}></Circle>
        <Circle index={1}></Circle>
        <Circle index={2}></Circle>
        <Circle index={3}></Circle>
        {/* <Tooltip title={'AVG: ' + avg} placement='top' arrow>
          <Box className={classes.avg} style={{ bottom: `${avgPerc}%` }} />
        </Tooltip> */}
      </Grid>
      <Grid container item direction='column' justify='space-between' xs={6} spacing={1}>
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
      </Grid>
    </Grid>
  );
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
