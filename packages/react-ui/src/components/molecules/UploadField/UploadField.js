import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import FilesAction from './FilesAction';
import useFileUpload from './useFileUpload';
import StyledUploadField from './StyledUploadField';

function UploadField({ buttonText, accept, files, name, inputRef, validator, ...props }) {
  const { onFileChange, multiple, placeholder, size, error } = props;
  const uploadInputRef = useRef(null);

  const { filesText, getPlaceholder, dragOver, inputEvents, handleFiles, handleReset } =
    useFileUpload({
      uploadInputRef,
      files,
      onFileChange,
      multiple,
      placeholder,
      validator
    });

  return (
    <>
      <StyledUploadField
        {...props}
        placeholder={getPlaceholder}
        value={filesText}
        error={error}
        focused={dragOver}
        InputProps={{
          ...inputEvents,
          readOnly: true,
          name: name,
          inputRef: inputRef,
          endAdornment: (
            <FilesAction
              buttonText={buttonText}
              hasFiles={!!filesText}
              size={size}
              error={error}
              disabled={!!dragOver}
              handleReset={handleReset}
            />
          )
        }}
      />
      <input
        ref={uploadInputRef}
        style={{ display: 'none' }}
        type='file'
        accept={accept}
        multiple={multiple}
        onChange={handleFiles}
      />
    </>
  );
}

UploadField.defaultProps = {
  buttonText: 'Browse',
  accept: null,
  files: [],
  onChange: (files) => files
};

UploadField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  error: PropTypes.bool,
  files: PropTypes.array,
  onFileChange: PropTypes.func,
  validator: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

export default UploadField;
