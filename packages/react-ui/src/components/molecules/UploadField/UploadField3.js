import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  styled
} from '@mui/material';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Cancel } from '@mui/icons-material';

const StyledInputLabel = styled(InputLabel)(() => ({
  // FIXME: It should be added in carto-react
  '&[data-shrink=false] + .MuiInputBase-formControl .MuiInputBase-input::placeholder': {
    opacity: '1!important'
  }
}));

const GridTemp = styled(Grid)(() => ({
  backgroundColor: '#ffff0042'
}));

function UploadField2(props) {
  const {
    label,
    placeholder,
    validator,
    onFileChange,
    size = 'medium',
    accept = null,
    value,
    classes: customClasses,
    endAdornment
  } = props;
  const [error, setError] = useState(null);
  const [file, setFile] = useState(value);
  const [dragOver, setDragOver] = useState(false);

  const resetState = () => {
    setError(null);
    setFile(undefined);
    onFileChange && onFileChange(undefined);
  };

  const validateFile = async (inputFile) => {
    const error = validator && (await validator(inputFile));
    setError(error);
    return error;
  };

  const onDrop = async ([inputFile]) => {
    resetState();
    const error = await validateFile(inputFile);

    if (!error) {
      setFile(inputFile);
      onFileChange && onFileChange(inputFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDrop: onDrop,
    accept: accept ? accept : ''
  });

  return (
    <GridTemp {...getRootProps()} role='section'>
      <input {...getInputProps()} aria-label={props.name} />
      <FormControl error={!!error} variant='outlined' focused={isDragActive} size={size}>
        {label && <StyledInputLabel>{label}</StyledInputLabel>}
        <OutlinedInput
          readOnly
          className={customClasses?.outlinedOutput}
          value={file?.name || ''}
          placeholder={placeholder}
          name={props.name}
          inputRef={props?.inputRef}
          endAdornment={
            endAdornment ? (
              endAdornment
            ) : !file ? (
              <Button size={size} color='primary' onClick={open}>
                Browse
              </Button>
            ) : (
              <IconButton size={size} onClick={resetState} aria-label='delete'>
                <Cancel />
              </IconButton>
            )
          }
        />
        {!!error && (
          <FormHelperText className={customClasses?.formHelperText}>
            {error}
          </FormHelperText>
        )}
      </FormControl>
    </GridTemp>
  );
}

UploadField2.defaultProps = {
  accept: null
};

UploadField2.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  placeholder: PropTypes.string,
  validator: PropTypes.func,
  onFileChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
  accept: PropTypes.string,
  value: PropTypes.object,
  classes: PropTypes.shape({
    outlinedOutput: PropTypes.string,
    formHelperText: PropTypes.string
  }),
  endAdornment: PropTypes.node
};

export default UploadField2;
