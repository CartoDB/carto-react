import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledUploadField = styled(TextField, {
  shouldForwardProp: (prop) => !['focused', 'cursor'].includes(prop)
})(({ focused, cursor, theme }) => ({
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
  },
  ...(focused && {
    '& .MuiOutlinedInput-root, & .MuiFilledInput-root': {
      backgroundColor: theme.palette.background.paper
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline, & .MuiInputBase-root.MuiFilledInput-root::after':
      {
        opacity: 1,
        border: `2px solid ${theme.palette.primary.main}`
      },
    '& .MuiFormLabel-root': {
      color: theme.palette.primary.main
    }
  })
}));

export default StyledUploadField;
