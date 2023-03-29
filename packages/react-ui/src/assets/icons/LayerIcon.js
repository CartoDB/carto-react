import React from 'react';
import { SvgIcon } from '@mui/material';

export default function LayerIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z'
        fillOpacity='.6'
      />
      <path
        d='M9 15h2v2H9v-2zm0-4h2v2H9v-2zm0-4h2v2H9V7zm-4 8h2v2H5v-2zm0-4h2v2H5v-2zm0-4h2v2H5V7zm12 8h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2V7zm-2 10h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2V9zm0-4h2v2h-2V5zM7 17h2v2H7v-2zm0-4h2v2H7v-2zm0-4h2v2H7V9zm0-4h2v2H7V5zm6 10h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2V7zm-2 10h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2V9zm0-4h2v2h-2V5z'
        fillOpacity='.36'
      />
    </SvgIcon>
  );
}
