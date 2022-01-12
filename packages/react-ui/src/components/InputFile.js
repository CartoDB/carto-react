import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
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
    flexGrow: 1,
    height: theme.spacing(4.5),
    marginRight: theme.spacing(1.5),
    padding: theme.spacing(0, 2),
    border: `2px dashed ${theme.palette.common.black}44`,
    borderRadius: theme.spacing(0.5)
  },
  input: {
    position: 'absolute',
    widht: '100%',
    height: '100%',
    opacity: 0,
    visibility: 'hidden'
  }
}));

function InputFile(props) {
  const classes = useStyles();
  const uploadInputRef = useRef(null);

  const handleBrowse = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.click();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    console.log('handleDragOver');
    console.log(event);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    // TODO: validate file/s

    if (event.dataTransfer.items) {
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        if (event.dataTransfer.items[i].kind === 'file') {
          const file = event.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file.name);
        }
      }
    } else {
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + event.dataTransfer.files[i].name);
      }
    }
  };

  const handleFiles = (event) => {
    console.log(event.target.files);
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
            className={classes.inputWrapper}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Button size='small' variant='text' color='primary' onClick={handleBrowse}>
              {props.browseButtonText}
            </Button>
            <Box ml={1.5}>
              <Typography variant='body2' color='textSecondary'>
                {props.placeholder}
              </Typography>
            </Box>
            <input
              ref={uploadInputRef}
              // className={classes.input}
              style={{ display: 'none' }}
              type='file'
              accept={props.accept}
              multiple={props.multiple}
              onChange={handleFiles}
            />
          </Box>
          <Button color='primary' size='small' startIcon={<UploadIcon />}>
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
