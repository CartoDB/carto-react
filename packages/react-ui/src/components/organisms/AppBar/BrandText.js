import React from 'react';
import { styled } from '@mui/material/styles';

import Typography from '../../atoms/Typography';

const Text = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'textColor'
})(({ textColor, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',

  '&.MuiTypography-root': {
    color: textColor || theme.palette.common.white
  }
}));

export default function BrandText({ text, textColor }) {
  return (
    <Text component='span' variant='subtitle1' textColor={textColor}>
      {text}
    </Text>
  );
}
