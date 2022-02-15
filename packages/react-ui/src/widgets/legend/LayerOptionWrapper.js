import React from 'react';
import { Box, Typography } from '@material-ui/core';

export default function LayerOptionWrapper({ className = '', label, children }) {
  return (
    <Box className={className} px={2} py={1.5}>
      <Typography variant='caption' color='textPrimary'>
        {label}
      </Typography>
      <Box>{children}</Box>
    </Box>
  );
}
