import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

export const GridVerticalContent = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  wordBreak: 'break-word'
}));
