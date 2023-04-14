import {
  Box,
  styled
} from '@mui/material';
import Typography from '../../../src/components/atoms/Typography';

export const Container = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(4)
}));

export const Label = styled(Typography)(({theme}) => ({
  minWidth: theme.spacing(25)
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