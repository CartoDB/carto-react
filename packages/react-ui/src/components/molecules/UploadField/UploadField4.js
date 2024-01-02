import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import useFileUpload from './useFileUpload';
import UploadFieldBase from './UploadFieldBase';

function UploadField({
  accept,
  files,
  inProgress,
  onChange,
  multiple,
  placeholder,
  size,
  focused,
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
    <UploadFieldBase
      {...props}
      placeholder={getPlaceholder}
      value={filesText}
      focused={focused || dragOver}
      uploadInputRef={uploadInputRef}
      onChange={handleFiles}
      handleReset={handleReset}
      dragOver={dragOver}
      inProgress={inProgress}
      muiInputProps={inputEvents}
      nativeInputProps={{
        accept: accept,
        multiple: multiple
      }}
    />
  );
}

UploadField.defaultProps = {
  accept: ['application/JSON'],
  files: [],
  onChange: (files) => files,
  size: 'small'
};

UploadField.propTypes = {
  placeholder: PropTypes.string,
  accept: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  multiple: PropTypes.bool,
  files: PropTypes.array,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
  inProgress: PropTypes.bool
};

export default UploadField;
