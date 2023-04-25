import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

export const GridVerticalContent = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  wordBreak: 'break-word'
}));

export const BoxContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(4)
}));

export const TitleContent = styled(Typography)(({ theme }) => ({
  minWidth: '200px'
}));
