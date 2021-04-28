import React from 'react';
import { Box, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core';
import Note from './Note';

function LegendProportion({ data = {}, info }) {
  return (
    <Grid container direction='column' pb={16} spacing={1}>
      <Row data={data}></Row>
      <Note>{info}</Note>
    </Grid>
  );
}

export default LegendProportion;

const useStyles = makeStyles((theme) => ({
  circles: {
    position: 'relative'
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

function Row({ data: { max, min, avg, values = [] } }) {
  const classes = useStyles();

  const gap = (max + min) / 4;

  const avgPerc = (avg / (max + min)) * 100;

  const step1 = min + gap;
  const step2 = max - gap;

  return (
    <Grid container item direction='row' spacing={2}>
      <Grid container item xs={6} justify='flex-end' className={classes.circles}>
        <Circle index={0}></Circle>
        <Circle index={1}></Circle>
        <Circle index={2}></Circle>
        <Circle index={3}></Circle>
        <Tooltip title={'AVG: ' + avg} placement='top' arrow>
          <Box className={classes.avg} style={{ bottom: `${avgPerc}%` }} />
        </Tooltip>
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
  root: {
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

  return <Box component='span' className={classes.root} style={{ width, height }}></Box>;
}
