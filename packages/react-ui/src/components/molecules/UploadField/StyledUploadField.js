import { styled } from '@mui/material/styles';
import TextField from '../../atoms/TextField';

const StyledUploadField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'cursor'
})(({ cursor, theme }) => ({
  '&.MuiTextField-root .MuiInputBase-root': {
    cursor: cursor,
    paddingRight: theme.spacing(1),

    '& input': {
      cursor: cursor
    },
    '&.Mui-disabled': {
      pointerEvents: 'none',

      '& .MuiButtonBase-root': {
        color: theme.palette.text.disabled
      }
    },
    '&.MuiInputBase-sizeSmall': {
      paddingRight: theme.spacing(0.5)
    }
  },
  '& .MuiFormLabel-root': {
    cursor: cursor,

    '&.Mui-disabled': {
      pointerEvents: 'none'
    }
  }
}));

export default StyledUploadField;
