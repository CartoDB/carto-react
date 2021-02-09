import React from 'react';
import { Box, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core';
import Note from './Note';

function LegendRamp({ data = {}, info }) {
  return (
    <Grid container direction='column' pb={16} spacing={1}>
      <Row data={data}></Row>
      <Note>{info}</Note>
    </Grid>
  );
}

export default LegendRamp;

const useStyles = makeStyles((theme) => ({
  step: {
    height: 8
  },
  avg: {
    width: 2,
    height: 12,
    position: 'absolute',
    // TODO change color
    border: `1px solid ${theme.palette.common.white}`,
    transform: 'translateY(1px)',
    backgroundColor: theme.palette.grey[900]
  }
}));

function Row({ data: { max, min, avg, values = [] } }) {
  const classes = useStyles();

  const avgPerc = (avg / (max + min)) * 100;

  const hasStep = values.length > 2;

  return (
    <Grid container item direction='column' spacing={1}>
      <Grid container item>
        {!hasStep ? (
          <StepsContinuous values={values} />
        ) : (
          <StepsDiscontinuous values={values} max={max} />
        )}
      </Grid>
      <Tooltip title={'AVG: ' + avg} placement='top' arrow>
        <Box className={classes.avg} style={{ left: `${avgPerc}%` }} />
      </Tooltip>
      <Grid container item justify='space-between'>
        <Typography variant='overline'>{min}</Typography>
        <Typography variant='overline'>{max}</Typography>
      </Grid>
    </Grid>
  );
}

const useStylesStepsContinuous = makeStyles((theme) => ({
  step: {
    height: 8,
    borderRadius: 4
  }
}));

function StepsContinuous({ values = [] }) {
  const classes = useStylesStepsContinuous();

  const backgroundImage = `linear-gradient(to right, ${values[0].color}, ${values[1].color})`;

  return <Grid item xs className={classes.step} style={{ backgroundImage }}></Grid>;
}

const useStylesStepsDiscontinuous = makeStyles((theme) => ({
  step: {
    height: 8,
    '&:first-child': {
      borderRadius: '4px 0 0 4px'
    },
    '&:last-child': {
      borderRadius: '0 4px 4px 0'
    }
  }
}));

function StepsDiscontinuous({ values = [], max }) {
  const classes = useStylesStepsDiscontinuous();

  return values.map((value, index) => (
    <Tooltip
      key={index}
      title={value.value + ' - ' + (values[index + 1]?.value || max)}
      placement='top'
      arrow
    >
      <Grid
        item
        xs
        className={classes.step}
        style={{ backgroundColor: value.color }}
      ></Grid>
    </Tooltip>
  ));
}
