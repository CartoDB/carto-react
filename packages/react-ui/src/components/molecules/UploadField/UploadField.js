import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import FilesIndicator from './FilesIndicator';
import useFileUpload from './useFileUpload';

const useStyles = makeStyles((theme) => ({
  uploadField: {
    '& .MuiInputBase-root': {
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
    }
  },

  focused: {
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
  }
}));

function UploadField({ buttonText, accept, files, ...props }) {
  const { onChange, multiple, placeholder, size, error } = props;
  const uploadInputRef = useRef(null);
  const classes = useStyles();

  const { filesText, getPlaceholder, dragOver, inputEvents, handleFiles, handleReset } =
    useFileUpload({
      uploadInputRef,
      files,
      onChange,
      multiple,
      placeholder
    });

  return (
    <>
      <TextField
        {...props}
        placeholder={getPlaceholder}
        value={filesText}
        error={error}
        className={`${classes.uploadField} ${dragOver && classes.focused}`}
        InputProps={{
          ...inputEvents,
          readOnly: true,
          endAdornment: (
            <FilesIndicator
              buttonText={buttonText}
              hasFiles={!!filesText}
              size={size}
              error={error}
              disabled={!!dragOver}
              handleReset={handleReset}
            />
          )
        }}
      />
      <input
        ref={uploadInputRef}
        style={{ display: 'none' }}
        type='file'
        accept={accept}
        multiple={multiple}
        onChange={handleFiles}
      />
    </>
  );
}

UploadField.defaultProps = {
  buttonText: 'Browse',
  accept: ['application/JSON'],
  files: [],
  onChange: (files) => files
};

UploadField.propTypes = {
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  accept: PropTypes.array,
  multiple: PropTypes.bool,
  error: PropTypes.bool,
  files: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'medium'])
};

export default UploadField;
