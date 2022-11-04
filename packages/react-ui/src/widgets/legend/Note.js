import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import Typography from '../../components/atoms/Typography';

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
    <Box mt={1} data-testid='note-legend'>
      <Typography variant='caption'>Note:</Typography>{' '}
      <Typography className={classes.note} variant='caption'>
        {children}
      </Typography>
    </Box>
  );
}
