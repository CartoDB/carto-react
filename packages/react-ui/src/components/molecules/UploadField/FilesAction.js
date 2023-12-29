import React from 'react';
import { Button, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Cancel } from '@mui/icons-material';

// For Browser or Delete actions
export default function FilesAction({
  buttonText,
  hasFiles,
  size,
  error,
  disabled,
  handleReset,
  inProgress
}) {
  return (
    <InputAdornment position='end'>
      {inProgress ? (
        <IconButton aria-label='loading' disabled size={size}>
          <CircularProgress size={18} />
        </IconButton>
      ) : !hasFiles ? (
        <Button
          size={size}
          variant='text'
          color={error ? 'default' : 'primary'}
          disabled={disabled}
        >
          {buttonText}
        </Button>
      ) : (
        <IconButton
          onClick={handleReset}
          aria-label='delete'
          disabled={disabled}
          size={size}
        >
          <Cancel />
        </IconButton>
      )}
    </InputAdornment>
  );
}
