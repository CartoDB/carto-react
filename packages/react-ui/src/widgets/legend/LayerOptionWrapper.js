import React from 'react';
import { Box } from '@mui/material';
import Typography from '../../components/atoms/Typography';

export default function LayerOptionWrapper({ label, children }) {
  return (
    <Box px={2} py={1.5}>
      <Typography variant='caption' color='textPrimary'>
        {label}
      </Typography>
      <Box>{children}</Box>
    </Box>
  );
}
