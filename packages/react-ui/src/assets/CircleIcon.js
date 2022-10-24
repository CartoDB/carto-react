import React from 'react';
import { SvgIcon } from '@mui/material';

export default function CircleIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d='M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' />
    </SvgIcon>
  );
}
