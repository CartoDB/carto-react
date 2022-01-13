import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputFile: {
    flex: 1,
    width: '100%'
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    height: theme.spacing(4.5),
    marginRight: theme.spacing(1.5),
    padding: theme.spacing(0, 1),
    border: `2px solid ${theme.palette.action.disabled}`,
    borderRadius: theme.spacing(0.5),
    transition: theme.transitions.create(['border'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut
    })
  },
  inputWrapperOver: {
    border: `2px solid ${theme.palette.primary.light}`
  },
  placeholder: {
    opacity: 0.42,
    maxWidth: 'calc(100% - 110px)'
  },
  placeholderFiles: {
    opacity: 1
  }
}));

function InputFile(props) {
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

    const newFiles = [];
    const items = event.dataTransfer.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file') {
        const file = items[i].getAsFile();
        newFiles.push(file);
      }
    }

    props.onChange(newFiles);
  };

  const handleFiles = (event) => {
    const newFiles = Array.from(event.target.files);
    props.onChange(newFiles);
  };

  return (
    <Box
      className={`${classes.inputWrapper} ${over ? classes.inputWrapperOver : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Typography
        variant='body2'
        color='textPrimary'
        noWrap
        className={`${classes.placeholder} ${filesText ? classes.placeholderFiles : ''}`}
      >
        {filesText || props.placeholder}
      </Typography>
      <Button size='small' variant='text' color='primary' onClick={handleBrowse}>
        {props.buttonText}
      </Button>
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

InputFile.defaultProps = {
  placeholder: 'Drag and drop your file or click to browse',
  buttonText: 'Browse',
  accept: 'application/JSON',
  multiple: false,
  files: [],
  onChange: (files) => files
};

InputFile.propTypes = {
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  files: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default InputFile;
