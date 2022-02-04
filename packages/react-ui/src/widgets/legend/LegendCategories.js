import React from 'react';
import { Box, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { getPalette } from '../../utils/palette';

export default function LegendCategories({ legend }) {
  if (!legend) {
    return null;
  }

  const { labels = [], colors = [], isStrokeColor = false } = legend;

  const palette = getPalette(colors, labels.length);

  const Rows = labels.map((label, idx) => (
    <Row
      key={label + idx}
      isMax={false}
      label={label}
      color={palette[idx]}
      isStrokeColor={isStrokeColor}
    />
  ));

  return (
    <Grid container direction='column' spacing={1} data-testid='categories-legend'>
      {Rows}
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  legendCategories: {
    alignItems: 'center',
    '&:hover': {
      '& $circle': {}
    }
  },
  circle: {
    display: 'block',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    position: 'relative',
    border: '2px solid transparent',
    '&::after': {
      position: 'absolute',
      display: ({ isMax }) => (isMax ? 'block' : 'none'),
      content: '""',
      width: '16px',
      height: '16px',
      border: `2px solid ${theme.palette.grey[900]}`,
      transform: 'translate(-30%, -30%)',
      borderRadius: '50%',
      boxSizing: 'content-box'
    }
  }
}));

function Row({ label, isMax, isStrokeColor, color = '#000' }) {
  const classes = useStyles({ isMax });

  return (
    <Grid container item className={classes.legendCategories}>
      <Tooltip title={isMax ? 'Most representative' : ''} placement='right' arrow>
        <Box
          mr={1.5}
          component='span'
          className={classes.circle}
          style={isStrokeColor ? { borderColor: color } : { backgroundColor: color }}
        />
      </Tooltip>
      <Typography variant='overline'>{label}</Typography>
    </Grid>
  );
}
