import { Box } from '@mui/material';
import React from 'react';
import Typography from '../../components/atoms/Typography';

export default function Note({ children }) {
  if (!children) {
    return null;
  }

  return (
    <Box mt={1} data-testid='note-legend'>
      <Typography variant='caption'>Note:</Typography>{' '}
      <Typography variant='caption'>{children}</Typography>
    </Box>
  );
}
