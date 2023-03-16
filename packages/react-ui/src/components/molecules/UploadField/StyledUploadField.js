import { styled, TextField } from '@mui/material';

const StyledUploadField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'focused'
})(({ focused, theme }) => ({
  '&.MuiTextField-root .MuiInputBase-root': {
    cursor: 'pointer',
    paddingRight: theme.spacing(1),

    '& input': {
      cursor: 'pointer'
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
    cursor: 'pointer',

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
