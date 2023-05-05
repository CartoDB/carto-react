import { styled } from '@mui/material/styles';
import { Box, Grid, Typography as TypographyMaterial } from '@mui/material';
import Typography from '../../src/components/atoms/Typography';

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

export const TitleContent = styled(TypographyMaterial)(({ theme }) => ({
  minWidth: '200px'
}));

export const Standalone = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center'
}));

export const Container = styled(Standalone)(({ theme }) => ({
  marginTop: theme.spacing(4)
}));

export const Label = styled(Typography)(({ theme }) => ({
  minWidth: theme.spacing(25)
}));

export const Header = styled(Label)(({ theme }) => ({
  marginTop: theme.spacing(4)
}));
