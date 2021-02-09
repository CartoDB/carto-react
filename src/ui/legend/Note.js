import { Box, Typography } from '@material-ui/core';
import React from 'react';

function Note({ children }) {
  if (!children) {
    return null;
  }

  return (
    <Box mt={1}>
      <Typography variant='caption'>Note:</Typography>{' '}
      <Typography variant='caption'>children</Typography>
    </Box>
  );
}

export default Note;
