import { Box, Tooltip, styled } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '../../../components/atoms/Typography';
import { getPalette } from '../../../utils/palette';
import LegendProportion, { getMinMax } from './LegendProportion';

/**
 * @param {object} props
 * @param {import('../LegendWidgetUI').LegendLayerVariableBase & import('../LegendWidgetUI').LegendRamp} props.legend - legend variable data.
 * @param {boolean} [props.isContinuous] - If the legend is continuous.
 * @returns {React.ReactNode}
 */
function LegendRamp({
  isContinuous = false,
  legend = {
    labels: [],
    colors: []
  }
}) {
  const { labels = [], colors = [], showMinMax = true } = legend;

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

  if (!isContinuous && showMinMax) {
    minLabel = '< ' + minLabel;
    maxLabel = '≥ ' + maxLabel;
  }

  return (
    <Box py={2} data-testid='ramp-legend'>
      {error ? (
        <Box maxWidth={240}>
          <Typography variant='overline'>
            You need to specify valid numbers for the labels property
          </Typography>
        </Box>
      ) : (
        <>
          <Box display='flex' pb={1}>
            {isContinuous ? (
              <StepsContinuous data-testid='step-continuous' palette={palette} />
            ) : (
              <StepsDiscontinuous
                labels={formattedLabels}
                palette={palette}
                max={maxLabel}
                min={minLabel}
              />
            )}
          </Box>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='overlineDelicate' color='textSecondary'>
              {minLabel}
            </Typography>
            <Typography variant='overlineDelicate' color='textSecondary'>
              {maxLabel}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}

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

const StepsContinuous = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'palette'
})(({ palette, theme }) => ({
  display: 'block',
  flexGrow: 1,
  height: theme.spacing(1),
  borderRadius: theme.spacing(0.5),
  background: `linear-gradient(to right, ${palette.join()})`
}));

const StepGrid = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color'
})(({ color, theme }) => ({
  display: 'block',
  flexGrow: 1,
  height: theme.spacing(1),
  backgroundColor: color,
  '&:first-of-type': {
    borderRadius: theme.spacing(0.5, 0, 0, 0.5)
  },
  '&:last-of-type': {
    borderRadius: theme.spacing(0, 0.5, 0.5, 0)
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
            <StepGrid data-testid='step-discontinuous' color={palette[idx]} />
          </Tooltip>
        );
      })}
    </>
  );
}
