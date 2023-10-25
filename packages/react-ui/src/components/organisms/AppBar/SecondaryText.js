import React from 'react';
import { styled, useTheme } from '@mui/material/styles';

import Typography from '../../atoms/Typography';

const Text = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  '&::before': {
    content: '"/"',
    margin: theme.spacing(0, 1),
    opacity: 0.6,
    color: theme.palette.brand.appBarContrastText
  }
}));

export default function SecondaryText({ text }) {
  const theme = useTheme();

  return (
    <Text
      component='span'
      variant='body2'
      weight='strong'
      color={theme.palette.brand.appBarContrastText}
    >
      {text}
    </Text>
  );
}
