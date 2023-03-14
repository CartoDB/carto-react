import React from 'react';
import { Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

import Typography from '../../../components/atoms/Typography';

const Note = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  marginTop: theme.spacing(0.5)
}));

function FormulaLabel({ row }) {
  const theme = useTheme();

  const { label, color } = row;

  return label ? (
    <Box color={color || theme.palette.text.secondary}>
      <Note color='inherit' variant='caption'>
        {label}
      </Note>
    </Box>
  ) : null;
}

export default FormulaLabel;
