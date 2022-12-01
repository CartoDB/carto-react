import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Cancel } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
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
  const [file, setFile] = useState(false);

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
    setFile(newFiles);
  };

  const getAllFiles = (items) => {
    const newFiles = [];
    for (let item of items) {
      if (item.kind === 'file') {
        const file = item.getAsFile();
        newFiles.push(file);
      }
    }
    setFile(newFiles);

    return newFiles;
  };

  const handleFiles = (event) => {
    const newFiles = Array.from(event.target.files);
    props.onChange(newFiles);
    setFile(newFiles);
  };

  const resetState = (event) => {
    event.stopPropagation();

    setFilesText(null);
    setFile(undefined);
  };

  const dragPlaceholderText = dragOver
    ? props.dragPlaceholder
    : filesText || props.placeholder;

  return (
    <>
      <TextField
        {...props}
        ref={textFieldRef}
        variant={props.variant}
        placeholder={dragPlaceholderText}
        label={props.label}
        helperText={props.helperText}
        className={dragOver && classes.focused}
        InputProps={{
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          onDrop: handleDrop,
          onClick: handleBrowse,
          readOnly: true,
          endAdornment: (
            <InputAdornment position='end'>
              {!file ? (
                <Button
                  size='small'
                  variant='text'
                  color='primary'
                  disabled={!!dragOver}
                  className={classes.button}
                >
                  {props.buttonText}
                </Button>
              ) : (
                <IconButton
                  onClick={resetState}
                  aria-label='delete'
                  disabled={!!dragOver}
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
  placeholder: 'Drag and drop your file or click to browse',
  dragPlaceholder: 'Drop your file here...',
  buttonText: 'Browse',
  accept: 'application/JSON',
  multiple: false,
  files: [],
  variant: 'outlined',
  onChange: (files) => files
};

UploadField.propTypes = {
  placeholder: PropTypes.string,
  dragPlaceholder: PropTypes.string,
  buttonText: PropTypes.string,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  files: PropTypes.array,
  variant: PropTypes.oneOf(['outlined', 'filled']),
  label: PropTypes.string,
  helperText: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default UploadField;
