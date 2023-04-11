import { Box, Grid, styled } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '../../components/atoms/Typography';

const Circle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'index'
})(({ index = 0, theme }) => {
  const sizes = {
    0: 96,
    1: 72,
    2: 48,
    3: 24
  };
  const width = `${sizes[index]}px`;
  const height = `${sizes[index]}px`;

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

function LegendProportion({ legend }) {
  const { min, max, error } = calculateRange(legend);
  const [step1, step2] = !error ? calculateSteps(min, max) : [0, 0];

  return (
    <Grid container item direction='row' spacing={2} data-testid='proportion-legend'>
      <Grid container item xs={6} justifyContent='flex-end' mb={4} position='relative'>
        <Circle index={0} component='span'></Circle>
        <Circle index={1} component='span'></Circle>
        <Circle index={2} component='span'></Circle>
        <Circle index={3} component='span'></Circle>
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
          <Grid item xs maxWidth={240}>
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
