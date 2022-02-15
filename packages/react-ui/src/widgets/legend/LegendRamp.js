import React from 'react';
import { Grid, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { getPalette } from '../../utils/palette';
import PropTypes from 'prop-types';
import { getMinMax } from './LegendProportion';
import LegendProportion from './LegendProportion';

const useStyles = makeStyles(() => ({
  errorContainer: {
    maxWidth: 240
  }
}));
function LegendRamp({ isContinuous = false, legend }) {
  const classes = useStyles();

  const { labels = [], colors = [] } = legend;

  const palette = getPalette(
    colors,
    !labels.length || isContinuous ? 2 : labels.length + 1
  );

  let [min, max] = getMinMax({ labels });

  const error = Number.isNaN(min) || Number.isNaN(max);

  if (!isContinuous) {
    min = '< ' + min;
    max = '≥ ' + max;
  }

  return (
    <Grid container item direction='column' spacing={1} data-testid='ramp-legend'>
      {error ? (
        <Grid item className={classes.errorContainer}>
          <Typography variant='overline'>
            You need to specify valid numbers for the labels property
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid container item>
            {isContinuous ? (
              <StepsContinuous palette={palette} />
            ) : (
              <StepsDiscontinuous labels={labels} palette={palette} max={max} min={min} />
            )}
          </Grid>
          <Grid container item justifyContent='space-between'>
            <Typography variant='overline'>{min}</Typography>
            <Typography variant='overline'>{max}</Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}

LegendRamp.defaultProps = {
  legend: {
    labels: [],
    colors: []
  },
  isContinuous: false
};

const ColorType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.number)
]);

LegendRamp.propTypes = {
  legend: PropTypes.shape({
    ...LegendProportion.propTypes.legend,
    colors: PropTypes.oneOfType([PropTypes.arrayOf(ColorType), PropTypes.string])
  }).isRequired,
  isContinuous: PropTypes.bool
};

export default LegendRamp;

// Aux
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
  const rightLabels = labels.length ? [min, ...labels] : [min, max];

  return (
    <>
      {rightLabels.map((label, idx) => {
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
      })}
    </>
  );
}
