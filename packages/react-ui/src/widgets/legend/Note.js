import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import Typography from '../../components/atoms/Typography';

const LighterTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'normal'
}));

export default function Note({ children }) {

  if (!children) {
    return null;
  }

  return (
    <Box mt={1} data-testid='note-legend'>
      <Typography variant='caption'>Note:</Typography>{' '}
      <LighterTypography variant='caption'>
        {children}
      </LighterTypography>
    </Box>
  );
}
