import { Box, Grid, styled } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '../../components/atoms/Typography';

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
    border: `solid 1px ${theme.palette.grey[100]}`,
    backgroundColor: theme.palette.grey[50],
    borderRadius: '50%',
    position: 'absolute',
    right: 0,
    bottom: 0,
    width,
    height
  };
});

const ProportionalGrid = styled(Grid)(({ theme: { spacing } }) => ({
  justifyContent: 'flex-end',
  marginBottom: spacing(0.5),
  position: 'relative'
}));

function LegendProportion({ legend }) {
  const { min, max, error } = calculateRange(legend);
  const [step1, step2] = !error ? calculateSteps(min, max) : [0, 0];

  return (
    <Grid container item direction='row' spacing={2} data-testid='proportion-legend'>
      <ProportionalGrid container item xs={6}>
        {[...Array(4)].map((circle, index) => (
          <Circle key={index} index={index} component='span'></Circle>
        ))}
      </ProportionalGrid>
      <Grid
        container
        item
        direction='column'
        justifyContent='space-between'
        xs={6}
        spacing={1}
      >
        {error ? (
          <Grid item maxWidth={240}>
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

function calculateSteps(min, max) {
  const gap = (max + min) / 4;
  const step1 = min + gap;
  const step2 = max - gap;

  return [step1, step2];
}
