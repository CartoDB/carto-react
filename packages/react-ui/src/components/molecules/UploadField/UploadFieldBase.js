import React from 'react';
import PropTypes from 'prop-types';

//import FilesAction from './FilesAction';
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  styled
} from '@mui/material';
import { Cancel } from '@mui/icons-material';
//import StyledUploadField from './StyledUploadField';

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

function UploadFieldBase({
  name,
  multiple,
  handleReset,
  handleOpen,
  dragOver,
  error,
  focused,
  buttonText,
  inProgress,
  inputProps,
  size,
  hasFiles,
  cursor,
  ...props
}) {
  return (
    <StyledUploadField
      {...props}
      size={size}
      error={!!error}
      helperText={error}
      focused={focused || dragOver}
      cursor={cursor}
      InputProps={{
        ...inputProps,
        readOnly: true,
        multiple: multiple,
        name: name,
        endAdornment: (
          <InputAdornment position='end'>
            {inProgress ? (
              <IconButton aria-label='loading' disabled size={size}>
                <CircularProgress size={18} />
              </IconButton>
            ) : !hasFiles ? (
              <Button
                onClick={handleOpen}
                size={size}
                variant='text'
                color={error ? 'default' : 'primary'}
                disabled={!!dragOver}
              >
                {buttonText}
              </Button>
            ) : (
              <IconButton
                onClick={handleReset}
                size={size}
                aria-label='delete'
                disabled={!!dragOver}
              >
                <Cancel />
              </IconButton>
            )}
          </InputAdornment>
          // <FilesAction
          //   buttonText={buttonText}
          //   hasFiles={hasFiles}
          //   size={size}
          //   error={!!error}
          //   disabled={!!dragOver}
          //   handleReset={handleReset}
          //   handleOpen={handleOpen}
          //   inProgress={inProgress}
          // />
        )
      }}
    />
  );
}

UploadFieldBase.defaultProps = {
  buttonText: 'Browse',
  size: 'small',
  cursor: 'pointer'
};

UploadFieldBase.propTypes = {
  name: PropTypes.string,
  multiple: PropTypes.bool,
  handleReset: PropTypes.func,
  handleOpen: PropTypes.func,
  dragOver: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  buttonText: PropTypes.string,
  inProgress: PropTypes.bool,
  inputProps: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium']),
  hasFiles: PropTypes.bool,
  cursor: PropTypes.oneOf(['pointer', 'default'])
};

export default UploadFieldBase;
