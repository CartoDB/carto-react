import React from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  legendIcon: {
    alignItems: 'center'
  },
  icon: {
    width: theme.spacing(2),
    height: theme.spacing(2)
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
