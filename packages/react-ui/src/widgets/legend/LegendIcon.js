import React from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  legendIcon: {
    alignItems: 'center',
    '&:hover': {
      '& $circle': {}
    }
  },
  icon: {
    width: '16px',
    height: '16px'
  }
}));

export default function LegendIcon({ legend }) {
  const classes = useStyles();

  if (!legend) {
    return null;
  }

  const { labels = [], icons = [] } = legend;

  const Icons = labels.map((label, idx) => (
    <Grid key={label} container item className={classes.legendIcon}>
      <Box mr={1.5}>
        <img src={icons[idx]} className={classes.icon} alt={icons[idx]} />
      </Box>
      <Typography variant='overline'>{label}</Typography>
    </Grid>
  ));

  return (
    <Grid container direction='column' spacing={1} data-testid='icon-legend'>
      {Icons}
    </Grid>
  );
}
