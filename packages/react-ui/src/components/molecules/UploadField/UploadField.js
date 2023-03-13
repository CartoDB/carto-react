import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import FilesIndicator from './FilesIndicator';
import useFileUpload from './useFileUpload';
import StyledUploadField from './StyledUploadField';

function UploadField({ buttonText, accept, files, ...props }) {
  const { onChange, multiple, placeholder, size, error } = props;
  const uploadInputRef = useRef(null);

  const { filesText, getPlaceholder, dragOver, inputEvents, handleFiles, handleReset } =
    useFileUpload({
      uploadInputRef,
      files,
      onChange,
      multiple,
      placeholder
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
          endAdornment: (
            <FilesIndicator
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
  accept: ['application/JSON'],
  files: [],
  onChange: (files) => files
};

UploadField.propTypes = {
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  accept: PropTypes.array,
  multiple: PropTypes.bool,
  error: PropTypes.bool,
  files: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'medium'])
};

export default UploadField;
