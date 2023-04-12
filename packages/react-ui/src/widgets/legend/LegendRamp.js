import { Grid, Tooltip, styled } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '../../components/atoms/Typography';
import { getPalette } from '../../utils/palette';
import LegendProportion, { getMinMax } from './LegendProportion';

function LegendRamp({ isContinuous = false, legend }) {
  const { labels = [], colors = [] } = legend;

  const palette = getPalette(
    colors,
    !labels.length || isContinuous ? 2 : labels.length + 1
  );

  // If labels is complex, its type is { value: number, label: string }[]
  const isComplexLabels = !!labels[0]?.label;

  const values = isComplexLabels ? labels.map(({ value }) => value) : labels;
  const formattedLabels = isComplexLabels ? labels.map(({ label }) => label) : labels;

  const [min, max] = getMinMax({ labels: values });

  const error = Number.isNaN(min) || Number.isNaN(max);

  let maxLabel = formattedLabels[formattedLabels.length - 1];
  let minLabel = formattedLabels[0];

  if (!isContinuous) {
    minLabel = '< ' + minLabel;
    maxLabel = '≥ ' + maxLabel;
  }

  return (
    <Grid container item direction='column' spacing={1} data-testid='ramp-legend'>
      {error ? (
        <Grid item xs maxWidth={240}>
          <Typography variant='overline'>
            You need to specify valid numbers for the labels property
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid container item>
            {isContinuous ? (
              <StepsContinuous className="step" item xs palette={palette} />
            ) : (
              <StepsDiscontinuous
                labels={formattedLabels}
                palette={palette}
                max={maxLabel}
                min={minLabel}
              />
            )}
          </Grid>
          <Grid container item justifyContent='space-between'>
            <Typography variant='overline'>{minLabel}</Typography>
            <Typography variant='overline'>{maxLabel}</Typography>
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

const StepsContinuous = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'palette'
})(({ palette }) => ({
  height: 8,
  borderRadius: 4,
  background: `linear-gradient(to right, ${palette.join()})`
}));

const StepGrid = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'color'
})(({ color }) => ({
  height: 8,
  backgroundColor: color,
  '&:first-of-type': {
    borderRadius: '4px 0 0 4px'
  },
  '&:last-of-type': {
    borderRadius: '0 4px 4px 0'
  }
}));

function StepsDiscontinuous({ labels = [], palette = [], max, min }) {
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
          <Tooltip key={idx} title={title}>
            <StepGrid className="step" item xs color={palette[idx]} />
          </Tooltip>
        );
      })}
    </>
  );
}
