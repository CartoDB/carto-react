import React from 'react';
import { styled, useTheme } from '@mui/material/styles';

import Typography from '../../atoms/Typography';

const Text = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap'
}));

export default function BrandText({ text, textColor }) {
  const theme = useTheme();

  return (
    <Text
      component='span'
      variant='subtitle1'
      textColor={textColor || theme.palette.common.white}
    >
      {text}
    </Text>
  );
}
