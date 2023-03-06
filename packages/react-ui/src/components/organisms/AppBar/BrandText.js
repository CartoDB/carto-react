import React from 'react';
import { styled } from '@mui/material';

import Typography from '../../atoms/Typography';

const Text = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap'
});

export default function BrandText({ text }) {
  return (
    <Text component='span' variant='subtitle1'>
      {text}
    </Text>
  );
}
