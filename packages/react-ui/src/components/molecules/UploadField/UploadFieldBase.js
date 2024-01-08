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
  onChange,
  handleReset,
  handleOpen,
  dragOver,
  name,
  accept,
  inputRef,
  multiple,
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
          multiple: multiple,
          name: name,
          endAdornment: (
            <FilesAction
              buttonText={buttonText}
              hasFiles={!!filesText}
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
      <input
        {...nativeInputProps}
        ref={inputRef}
        style={{ display: 'none' }}
        type='file'
        aria-label={name}
        name={name}
        onChange={onChange}
        accept={accept}
      />
    </>
  );
}

UploadFieldBase.defaultProps = {
  buttonText: 'Browse',
  filesText: null,
  size: 'small',
  onChange: (files) => files
};

UploadFieldBase.propTypes = {
  name: PropTypes.string,
  accept: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  handleReset: PropTypes.func,
  handleOpen: PropTypes.func,
  dragOver: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  inProgress: PropTypes.bool,
  muiInputProps: PropTypes.object,
  nativeInputProps: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium']),
  buttonText: PropTypes.string,
  filesText: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)]),
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

export default UploadFieldBase;
