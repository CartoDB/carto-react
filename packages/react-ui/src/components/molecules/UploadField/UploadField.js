import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import useFileUpload from './useFileUpload';
import UploadFieldBase from './UploadFieldBase';

const DEFAULT_ACCEPT = ['application/JSON'];
const DEFAULT_FILES = [];
const IDENTITY_FN = (x) => x;

function UploadField({
  name,
  buttonText,
  accept = DEFAULT_ACCEPT,
  files = DEFAULT_FILES,
  inProgress,
  onChange = IDENTITY_FN,
  multiple,
  placeholder,
  error,
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
        error={error}
        focused={focused || dragOver}
        handleReset={handleReset}
        dragOver={dragOver}
        inProgress={inProgress}
        hasFiles={Boolean(filesText)}
        InputProps={inputEvents}
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

UploadField.propTypes = {
  name: PropTypes.string,
  buttonText: PropTypes.string,
  accept: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  multiple: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  placeholder: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  files: PropTypes.array,
  onChange: PropTypes.func,
  inProgress: PropTypes.bool,
  nativeInputProps: PropTypes.object
};

export default UploadField;
