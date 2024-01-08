import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import useFileUpload from './useFileUpload';
import UploadFieldBase from './UploadFieldBase';

function UploadField({
  name,
  buttonText,
  accept,
  files,
  inProgress,
  onChange,
  multiple,
  placeholder,
  size,
  focused,
  nativeInputProps,
  ...props
}) {
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
      <UploadFieldBase
        {...props}
        placeholder={getPlaceholder}
        value={filesText}
        focused={focused || dragOver}
        handleReset={handleReset}
        dragOver={dragOver}
        inProgress={inProgress}
        hasFiles={Boolean(filesText)}
        inputProps={inputEvents}
        buttonText={buttonText}
      />
      <input
        {...nativeInputProps}
        ref={uploadInputRef}
        style={{ display: 'none' }}
        type='file'
        aria-label={name}
        name={name}
        accept={accept}
        multiple={multiple}
        onChange={handleFiles}
      />
    </>
  );
}

UploadField.defaultProps = {
  accept: ['application/JSON'],
  files: [],
  onChange: (files) => files,
  size: 'small'
};

UploadField.propTypes = {
  name: PropTypes.string,
  buttonText: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  accept: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  multiple: PropTypes.bool,
  files: PropTypes.array,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
  inProgress: PropTypes.bool,
  nativeInputProps: PropTypes.object
};

export default UploadField;
