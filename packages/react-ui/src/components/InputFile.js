import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  makeStyles,
  Typography
} from '@material-ui/core';
import UploadIcon from '../assets/UploadIcon';

const useStyles = makeStyles((theme) => ({
  inputFile: {
    flex: 1,
    width: '100%'
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    height: theme.spacing(4.5),
    marginRight: theme.spacing(1.5),
    padding: theme.spacing(0, 2),
    border: `2px dashed ${theme.palette.common.black}44`,
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
    marginLeft: theme.spacing(1.5),
    maxWidth: 'calc(100% - 110px)'
  }
}));

function InputFile(props) {
  const classes = useStyles();
  const uploadInputRef = useRef(null);
  const [filesText, setFilesText] = useState('');
  const [canUpload, setCanUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [over, setOver] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setCanUpload(true);

    if (files.length === 0) {
      setCanUpload(false);
      setFilesText('');
    } else if (files.length === 1) {
      setFilesText(files[0].name);
    } else {
      setFilesText(`${files.length} files selected`);
    }
  }, [files]);

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
    // TODO: validate file/s

    const newFiles = [];
    const items = event.dataTransfer.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file') {
        const file = items[i].getAsFile();
        newFiles.push(file);
      }
    }

    setFiles(newFiles);
  };

  const handleFiles = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles(newFiles);
  };

  const handleUpload = () => {
    setUploading(true);
  };

  return (
    <div className={classes.inputFile}>
      <FormControl size='small' margin='dense'>
        <InputLabel>{props.title}</InputLabel>
        <Box
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Box
            className={`${classes.inputWrapper} ${over ? classes.inputWrapperOver : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Button size='small' variant='text' color='primary' onClick={handleBrowse}>
              {props.browseButtonText}
            </Button>
            <Typography
              variant='body2'
              color='textSecondary'
              noWrap
              className={classes.placeholder}
            >
              {filesText || props.placeholder}
            </Typography>
            <input
              ref={uploadInputRef}
              style={{ display: 'none' }}
              type='file'
              accept={props.accept}
              multiple={props.multiple}
              onChange={handleFiles}
            />
          </Box>
          <Button
            color='primary'
            size='small'
            startIcon={uploading ? <CircularProgress size={16} /> : <UploadIcon />}
            disabled={!canUpload}
            onClick={handleUpload}
          >
            {props.buttonText}
          </Button>
        </Box>
      </FormControl>
    </div>
  );
}

InputFile.defaultProps = {
  title: 'Import data',
  placeholder: 'Drag and drop your file or click to browse',
  buttonText: 'Upload',
  browseButtonText: 'Browse',
  accept: 'application/JSON',
  multiple: false
};

InputFile.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  browseButtonText: PropTypes.string,
  accept: PropTypes.string,
  multiple: PropTypes.bool
};

export default InputFile;
