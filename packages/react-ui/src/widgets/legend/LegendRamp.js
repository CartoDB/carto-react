import React from 'react';
import { Grid, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { getPalette } from '../../utils/palette';

export default function LegendRamp({ isContinuous, legend }) {
  if (!legend) {
    return null;
  }

  const { labels = [], colors = [], stats = {} } = legend;

  const palette = getPalette(colors, labels.length);

  let max = stats.max ?? labels[labels.length - 1];
  let min = stats.min ?? labels[0];

  if (!isContinuous) {
    min = '< ' + min;
    max = '≥ ' + max;
  }

  // const avgPerc = (avg / (max + min)) * 100;

  return (
    <Grid container item direction='column' spacing={1} data-testid='ramp-legend'>
      <Grid container item>
        {isContinuous ? (
          <StepsContinuous palette={palette} />
        ) : (
          <StepsDiscontinuous labels={labels} palette={palette} max={max} min={min} />
        )}
      </Grid>
      {/* <Tooltip title={'AVG: ' + avg} placement='top' arrow>
        <Box className={classes.avg} style={{ left: `${avgPerc}%` }} />
      </Tooltip> */}
      <Grid container item justify='space-between'>
        <Typography variant='overline'>{min}</Typography>
        <Typography variant='overline'>{max}</Typography>
      </Grid>
    </Grid>
  );
}

const useStylesStepsContinuous = makeStyles(() => ({
  step: {
    height: 8,
    borderRadius: 4
  }
}));

function StepsContinuous({ palette = [] }) {
  const classes = useStylesStepsContinuous();

  const backgroundImage = `linear-gradient(to right, ${palette.join()})`;

  return <Grid item xs className={classes.step} style={{ backgroundImage }} />;
}

const useStylesStepsDiscontinuous = makeStyles(() => ({
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

function StepsDiscontinuous({ labels = [], palette = [], max, min }) {
  const classes = useStylesStepsDiscontinuous();
  const rightLabels = [min, ...labels];

  return rightLabels.map((label, idx) => {
    const title =
      idx === 0
        ? min
        : idx === rightLabels.length - 1
        ? max
        : `${label} - ${rightLabels[idx + 1]}`;

    return (
      <Tooltip key={idx} title={title} placement='top' arrow>
        <Grid
          item
          xs
          className={classes.step}
          style={{ backgroundColor: palette[idx] }}
        />
      </Tooltip>
    );
  });
}
