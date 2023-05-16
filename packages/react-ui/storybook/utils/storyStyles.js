import { styled } from '@mui/material/styles';
import { Alert, Box, Grid } from '@mui/material';
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

export const TitleContent = styled(Typography)(({ theme }) => ({
  minWidth: '200px'
}));

export const Standalone = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center'
}));

export const Container = styled(Standalone)(({ theme }) => ({
  marginTop: theme.spacing(4)
}));

export const FilledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
  padding: 0,
  backgroundColor: theme.palette.primary.background,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(0.5)
}));

export const DocContainer = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(3)
}));

export const Label = styled(Typography)(({ theme }) => ({
  minWidth: theme.spacing(25)
}));

export const Header = styled(Label)(({ theme }) => ({
  marginTop: theme.spacing(4)
}));
