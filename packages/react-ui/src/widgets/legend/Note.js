import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useNoteStyles = makeStyles(() => ({
  note: {
    fontWeight: 'normal'
  }
}));

export default function Note({ children }) {
  const classes = useNoteStyles();

  if (!children) {
    return null;
  }

  return (
    <Box mt={1}>
      <Typography variant='caption'>Note:</Typography>{' '}
      <Typography className={classes.note} variant='caption'>
        {children}
      </Typography>
    </Box>
  );
}
