import React from 'react';
import { SvgIcon } from '@mui/material';

export default function ArrowDropIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.5 12.17L9.32998 9L7.91998 10.41L12.5 15L17.09 10.41L15.67 9L12.5 12.17Z'
        fill='currentColor'
      />
    </SvgIcon>
  );
}
