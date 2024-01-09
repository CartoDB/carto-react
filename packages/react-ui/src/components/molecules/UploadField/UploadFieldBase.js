import React from 'react';
import PropTypes from 'prop-types';
import { Box, FormHelperText } from '@mui/material';

import FilesAction from './FilesAction';
import StyledUploadField from './StyledUploadField';

function UploadFieldBase({
  name,
  multiple,
  handleReset,
  handleOpen,
  dragOver,
  error,
  placeholder,
  focused,
  buttonText,
  inProgress,
  inputProps,
  size,
  hasFiles,
  cursor,
  helperText,
  fullWidth = true,
  ...props
}) {
  return (
    <Box width={fullWidth ? '100%' : undefined}>
      <StyledUploadField
        {...props}
        size={size}
        error={!!error}
        placeholder={placeholder}
        helperText={error}
        focused={focused || dragOver}
        cursor={cursor}
        fullWidth={fullWidth}
        InputProps={{
          ...inputProps,
          readOnly: true,
          multiple: multiple,
          name: name,
          endAdornment: (
            <FilesAction
              buttonText={buttonText}
              hasFiles={hasFiles}
              size={size}
              error={!!error}
              disabled={!!dragOver}
              handleReset={handleReset}
              handleOpen={handleOpen}
              inProgress={inProgress}
            />
          )
        }}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </Box>
  );
}

UploadFieldBase.defaultProps = {
  buttonText: 'Browse',
  size: 'small',
  cursor: 'pointer'
};

UploadFieldBase.propTypes = {
  name: PropTypes.string,
  multiple: PropTypes.bool,
  handleReset: PropTypes.func,
  handleOpen: PropTypes.func,
  dragOver: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  placeholder: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  buttonText: PropTypes.string,
  inProgress: PropTypes.bool,
  inputProps: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium']),
  hasFiles: PropTypes.bool,
  cursor: PropTypes.oneOf(['pointer', 'default'])
};

export default UploadFieldBase;
