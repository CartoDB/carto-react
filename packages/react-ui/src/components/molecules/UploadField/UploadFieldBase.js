import React from 'react';
import PropTypes from 'prop-types';

import FilesAction from './FilesAction';
import StyledUploadField from './StyledUploadField';

function UploadFieldBase({
  buttonText,
  inProgress,
  size,
  error,
  filesText,
  muiInputProps,
  nativeInputProps,
  handleReset,
  dragOver,
  name,
  uploadInputRef,
  focused,
  ...props
}) {
  return (
    <>
      <StyledUploadField
        {...props}
        size={size}
        error={!!error}
        helperText={error}
        focused={focused || dragOver}
        InputProps={{
          ...muiInputProps,
          readOnly: true,
          name: name,
          endAdornment: (
            <FilesAction
              buttonText={buttonText}
              hasFiles={!!filesText}
              size={size}
              error={!!error}
              disabled={!!dragOver}
              handleReset={handleReset}
              inProgress={inProgress}
            />
          )
        }}
      />
      <input
        {...nativeInputProps}
        ref={uploadInputRef}
        style={{ display: 'none' }}
        type='file'
        aria-label={name}
      />
    </>
  );
}

UploadFieldBase.defaultProps = {
  buttonText: 'Browse',
  filesText: '',
  size: 'small'
};

UploadFieldBase.propTypes = {
  name: PropTypes.string,
  buttonText: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  filesText: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  inProgress: PropTypes.bool,
  dragOver: PropTypes.bool,
  muiInputProps: PropTypes.object,
  nativeInputProps: PropTypes.object,
  handleReset: PropTypes.func,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

export default UploadFieldBase;
