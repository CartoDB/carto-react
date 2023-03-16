import React from 'react';
import { styled } from '@mui/material';

const Logo = styled('div')(({ theme }) => ({
  display: 'flex',
  marginRight: theme.spacing(1.5),

  '& a': {
    display: 'flex'
  },

  '& svg, & img': {
    width: theme.spacing(4),
    height: theme.spacing(4)
  }
}));

export default function BrandLogo({ logo }) {
  return <Logo>{logo}</Logo>;
}
