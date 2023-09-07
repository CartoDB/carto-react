import React from 'react';
import { Box, Skeleton } from '@mui/material';

const FormulaSkeleton = () => {
  return (
    <Box pt={0.5}>
      <Skeleton height={24} width={120} />
    </Box>
  );
};

export default FormulaSkeleton;
