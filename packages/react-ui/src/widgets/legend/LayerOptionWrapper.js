import React from 'react';
import { Box } from '@mui/material';
import Typography from '../../atoms/Typography';

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
