import React from 'react';
import { styled } from '@mui/material/styles';

import Typography from '../../atoms/Typography';

const Text = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'textColor'
})(({ textColor, theme }) => ({
  display: 'flex',
  alignItems: 'center',

  '&.MuiTypography-root': {
    color: textColor || theme.palette.common.white
  },

  '&::before': {
    content: '"/"',
    margin: theme.spacing(0, 1),
    opacity: 0.6,
    color: textColor || theme.palette.common.white
  }
}));

export default function SecondaryText({ text, textColor }) {
  return (
    <Text component='span' variant='body2' weight='strong' textColor={textColor}>
      {text}
    </Text>
  );
}
