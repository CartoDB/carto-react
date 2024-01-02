import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import FilesAction from './FilesAction';
import useFileUpload2 from './useFileUpload2';
import StyledUploadField from './StyledUploadField';

function UploadField({
  buttonText,
  accept,
  files,
  name,
  inProgress,
  onChange,
  multiple,
  placeholder,
  size,
  error,
  handleValidation,
  handleReset,
  file,
  ...props
}) {
  const uploadInputRef = useRef(null);

  const { filesText, getPlaceholder, dragOver, inputEvents, handleFiles, defaultReset } =
    useFileUpload2({
      uploadInputRef,
      files,
      onChange,
      multiple,
      placeholder,
      error,
      file
    });

  return (
    <>
      <StyledUploadField
        {...props}
        placeholder={getPlaceholder}
        value={file || filesText}
        error={!!error}
        focused={dragOver}
        InputProps={{
          ...inputEvents,
          readOnly: true,
          name: name,
          endAdornment: (
            <FilesAction
              buttonText={buttonText}
              hasFiles={!!filesText}
              size={size}
              error={!!error}
              disabled={!!dragOver}
              handleReset={handleReset || defaultReset}
              inProgress={inProgress}
            />
          )
        }}
      />
      <input
        ref={uploadInputRef}
        style={{ display: 'none' }}
        type='file'
        accept={accept}
        multiple={file ? false : multiple}
        onChange={handleFiles}
        aria-label={name}
      />
    </>
  );
}

UploadField.defaultProps = {
  buttonText: 'Browse',
  accept: null,
  files: [],
  onChange: (files) => files,
  size: 'small'
};

UploadField.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  accept: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  multiple: PropTypes.bool,
  error: PropTypes.bool,
  files: PropTypes.array,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
  inProgress: PropTypes.bool,
  handleValidation: PropTypes.func,
  handleReset: PropTypes.func,
  file: PropTypes.instanceOf(File)
};

export default UploadField;
