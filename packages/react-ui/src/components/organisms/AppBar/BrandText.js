import React from 'react';
import { styled, useTheme } from '@mui/material/styles';

import Typography from '../../atoms/Typography';

const Text = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap'
});

export default function BrandText({ text }) {
  const theme = useTheme();

  return (
    <Text
      component='span'
      variant='subtitle1'
      textColor={theme.palette.brand.appBarContrastText}
    >
      {text}
    </Text>
  );
}
