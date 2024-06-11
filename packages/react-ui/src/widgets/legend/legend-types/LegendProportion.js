import React from 'react';
import { Box, styled } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '../../../components/atoms/Typography';
import { useIntl } from 'react-intl';
import useImperativeIntl from '../../../hooks/useImperativeIntl';

const sizes = {
  0: 12,
  1: 9,
  2: 6,
  3: 3
};

const Circle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'index'
})(({ index = 0, theme }) => {
  const width = theme.spacing(sizes[index]);
  const height = theme.spacing(sizes[index]);

  return {
    border: `solid 1px ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
    borderRadius: '50%',
    position: 'absolute',
    right: 0,
    bottom: 0,
    width,
    height
  };
});

const CircleGrid = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  flexShrink: 0,
  position: 'relative',
  width: spacing(sizes[0]),
  height: spacing(sizes[0])
}));

const LegendProportionWrapper = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  gap: spacing(1),
  alignItems: 'stretch',
  justifyContent: 'stretch',
  padding: spacing(2, 0)
}));

const LabelList = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  gap: 1,
  flexGrow: 1,
  flexShrink: 1
}));

/**
 * @param {object} props
 * @param {import('../LegendWidgetUI').LegendLayerVariableBase & import('../LegendWidgetUI').LegendProportion} props.legend - legend variable data.
 * @returns {React.ReactNode}
 */
function LegendProportion({ legend }) {
  const intl = useIntl();
  const intlConfig = useImperativeIntl(intl);

  const showMinMax = legend.showMinMax ?? true;
  const { min, max, error } = calculateRange(legend);
  const [step1, step2] = !error ? calculateSteps(min, max) : [0, 0];

  return (
    <LegendProportionWrapper data-testid='proportion-legend'>
      <CircleGrid>
        {[...Array(4)].map((_, index) => (
          <Circle key={index} index={index} component='span' />
        ))}
      </CircleGrid>
      <LabelList>
        {error ? (
          <Box maxWidth={240}>
            <Typography variant='overline'>
              You need to specify valid numbers for the labels property
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant='overline' color='textSecondary'>
              {showMinMax
                ? `${intlConfig.formatMessage({ id: 'c4r.widgets.legend.max' })}: ${max}`
                : max}
            </Typography>
            <Typography variant='overline' color='textSecondary'>
              {step2}
            </Typography>
            <Typography variant='overline' color='textSecondary'>
              {step1}
            </Typography>
            <Typography variant='overline' color='textSecondary'>
              {showMinMax
                ? `${intlConfig.formatMessage({ id: 'c4r.widgets.legend.min' })}: ${min}`
                : min}
            </Typography>
          </>
        )}
      </LabelList>
    </LegendProportionWrapper>
  );
}

LegendProportion.defaultProps = {
  legend: {
    labels: []
  }
};

LegendProportion.propTypes = {
  legend: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
  }).isRequired
};

export default LegendProportion;

// Aux
export function getMinMax({ labels }) {
  let max = labels?.[labels.length - 1];
  let min = labels?.[0];

  if (!Number.isFinite(min)) {
    min = parseInt(min, 10);
  }

  if (!Number.isFinite(max)) {
    max = parseInt(max, 10);
  }

  return [min, max];
}

function calculateRange(legend) {
  let error = false;
  const [min, max] = getMinMax(legend);

  if (Number.isNaN(min) || Number.isNaN(max)) {
    error = true;
  }

  return { min, max, error };
}

/**
 * Calculates two evenly-spaced steps, linearly interpolated between a given
 * min and max. For example, `calculateSteps(3, 12)` gives `[6, 9]`.
 */
function calculateSteps(min, max) {
  const step = (max - min) / 3;
  return [min + step, max - step];
}
