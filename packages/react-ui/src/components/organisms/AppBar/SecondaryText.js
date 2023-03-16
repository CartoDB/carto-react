import React from 'react';
import { styled } from '@mui/material';

import Typography from '../../atoms/Typography';

const Text = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '"/"',
    margin: theme.spacing(0, 1),
    color: theme.palette.white[60]
  }
}));

export default function SecondaryText({ text }) {
  return (
    <Text component='span' variant='body2' weight='strong'>
      {text}
    </Text>
  );
}
