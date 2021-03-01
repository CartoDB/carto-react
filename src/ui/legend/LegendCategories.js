import React from 'react';
import { Box, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core';
import Note from './Note';

function LegendCategories({ data = [], info }) {
  const max = 1;
  return (
    <Grid container direction='column' pb={16} spacing={1}>
      {data.map((d, index) => {
        const isMax = index === max;
        return (
          <Row key={d.label + index} isMax={isMax} label={d.label} color={d.color}/>
        );
      })}
      <Note>{info}</Note>
    </Grid>
  );
}

export default LegendCategories;

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    '&:hover': {
      '& $circle': {}
    }
  },
  circle: {
    display: 'block',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    position: 'relative',
    '&::after': {
      position: 'absolute',
      display: ({ isMax }) => (isMax ? 'block' : 'none'),
      content: '""',
      width: '16px',
      height: '16px',
      border: `2px solid ${theme.palette.grey[900]}`,
      transform: 'translate(-30%, -30%)',
      borderRadius: '50%'
    }
  }
}));

function Row({ label, isMax, color = '#000' }) {
  const classes = useStyles({ isMax });

  return (
    <Grid container item className={classes.root}>
      <Tooltip title={isMax ? 'Most representative' : ''} placement='right' arrow>
        <Box
          mr={1.5}
          component='span'
          className={classes.circle}
          style={{ backgroundColor: color }}
        />
      </Tooltip>
      <Typography variant='overline'>{label}</Typography>
    </Grid>
  );
}
