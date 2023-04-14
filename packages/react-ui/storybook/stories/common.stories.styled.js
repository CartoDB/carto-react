import {
  Box,
  styled
} from '@mui/material';
import Typography from '../../src/components/atoms/Typography';

export const Standalone = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const Container = styled(Standalone)(({theme}) => ({
  marginTop: theme.spacing(4)
}));

export const Label = styled(Typography)(({theme}) => ({
  minWidth: theme.spacing(25)
}));

export const Header = styled(Label)(({theme}) => ({
  marginTop: theme.spacing(4)
}));

export const ChipWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'small'
})(({theme, small}) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  overflow: 'auto',
  height: theme.spacing(small ? 3 : 4)
}));
