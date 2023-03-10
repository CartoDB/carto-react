import React from 'react';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { Cancel } from '@mui/icons-material';

export default function FilesIndicator({
  buttonText,
  hasFiles,
  size,
  error,
  disabled,
  handleReset
}) {
  return (
    <InputAdornment position='end'>
      {!hasFiles ? (
        <Button
          size={size}
          variant='text'
          color={error ? 'inherit' : 'primary'}
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
