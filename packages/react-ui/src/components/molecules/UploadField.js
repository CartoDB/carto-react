import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Cancel } from '@mui/icons-material';

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

function UploadField(props) {
  const classes = useStyles();
  const uploadInputRef = useRef(null);
  const textFieldRef = useRef(null);

  const [filesText, setFilesText] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const isSmall = props.size === 'small';

  useEffect(() => {
    if (props.files.length === 0) {
      setFilesText('');
    } else if (props.files.length === 1) {
      setFilesText(props.files[0].name);
    } else {
      setFilesText(`${props.files.length} files selected`);
    }
  }, [props.files]);

  const handleBrowse = () => {
    uploadInputRef.current?.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);

    const items = event.dataTransfer.items;
    const newFiles = getAllFiles(items);
    props.onChange(newFiles);
  };

  const getAllFiles = (items) => {
    const newFiles = [];
    for (let item of items) {
      if (item.kind === 'file') {
        const file = item.getAsFile();
        newFiles.push(file);
      }
    }

    return newFiles;
  };

  const handleFiles = (event) => {
    const newFiles = Array.from(event.target.files);
    props.onChange(newFiles);
  };

  const handleReset = (event) => {
    event.stopPropagation();

    setFilesText('');
  };

  const setPlaceholder = () => {
    const multipleSuffix = props.multiple ? '(s)' : '';
    const placeholder = `Drag and drop your file${multipleSuffix} or click to browse`;
    const dragPlaceholder = `Drop your file${multipleSuffix} here...`;

    let placeholderText;
    if (dragOver) {
      placeholderText = dragPlaceholder;
    } else {
      placeholderText = props.placeholder || placeholder;
    }
    return placeholderText;
  };

  return (
    <>
      <TextField
        {...props}
        ref={textFieldRef}
        placeholder={setPlaceholder()}
        value={filesText}
        error={props.error}
        className={`${classes.uploadField} ${dragOver && classes.focused}`}
        InputProps={{
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          onDrop: handleDrop,
          onClick: handleBrowse,
          readOnly: true,
          endAdornment: (
            <InputAdornment position='end'>
              {!filesText ? (
                <Button
                  size={isSmall ? 'small' : 'medium'}
                  variant='text'
                  color={props.error ? 'default' : 'primary'}
                  disabled={!!dragOver}
                  className={classes.button}
                >
                  {props.buttonText}
                </Button>
              ) : (
                <IconButton
                  onClick={handleReset}
                  aria-label='delete'
                  disabled={!!dragOver}
                  size={isSmall ? 'small' : 'medium'}
                >
                  <Cancel />
                </IconButton>
              )}
            </InputAdornment>
          )
        }}
      />
      <input
        ref={uploadInputRef}
        style={{ display: 'none' }}
        type='file'
        accept={props.accept}
        multiple={props.multiple}
        onChange={handleFiles}
      />
    </>
  );
}

UploadField.defaultProps = {
  buttonText: 'Browse',
  accept: ['application/JSON'],
  multiple: false,
  error: false,
  files: [],
  onChange: (files) => files,
  size: 'medium'
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
