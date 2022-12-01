import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  dragOver: {
    background: 'red'
  }
}));

function UploadField(props) {
  const classes = useStyles();
  const uploadInputRef = useRef(null);
  const [filesText, setFilesText] = useState('');
  const [over, setOver] = useState(false);

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
    setOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();

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

  return (
    <Box>
      <TextField
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        variant={props.variant}
        placeholder={filesText || props.placeholder}
        label={props.label}
        helperText={props.helperText}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position='end'>
              <Button size='small' variant='text' color='primary' onClick={handleBrowse}>
                {props.buttonText}
              </Button>
            </InputAdornment>
          )
        }}
        className={`${over ? classes.dragOdver : ''}`}
      />
      <input
        ref={uploadInputRef}
        style={{ display: 'none' }}
        type='file'
        accept={props.accept}
        multiple={props.multiple}
        onChange={handleFiles}
      />
    </Box>
  );
}

UploadField.defaultProps = {
  placeholder: 'Drag and drop your file or click to browse',
  buttonText: 'Browse',
  accept: 'application/JSON',
  multiple: false,
  files: [],
  variant: 'outlined',
  onChange: (files) => files
};

UploadField.propTypes = {
  placeholder: PropTypes.string,
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
