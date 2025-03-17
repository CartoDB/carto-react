import React from 'react';
import PropTypes from 'prop-types';

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
  buttonText = 'Browse',
  inProgress,
  InputProps,
  size = 'small',
  hasFiles,
  cursor = 'pointer',
  ...props
}) {
  return (
    <StyledUploadField
      {...props}
      size={size}
      error={error}
      placeholder={placeholder}
      focused={focused || dragOver}
      cursor={cursor}
      InputProps={{
        ...InputProps,
        readOnly: true,
        multiple: multiple,
        name: name,
        endAdornment: (
          <FilesAction
            buttonText={buttonText}
            hasFiles={hasFiles}
            size={size}
            error={error}
            disabled={!!dragOver}
            handleReset={handleReset}
            handleOpen={handleOpen}
            inProgress={inProgress}
          />
        )
      }}
    />
  );
}

UploadFieldBase.propTypes = {
  name: PropTypes.string,
  multiple: PropTypes.bool,
  handleReset: PropTypes.func,
  handleOpen: PropTypes.func,
  dragOver: PropTypes.bool,
  placeholder: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  buttonText: PropTypes.string,
  inProgress: PropTypes.bool,
  InputProps: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium']),
  hasFiles: PropTypes.bool,
  cursor: PropTypes.oneOf(['pointer', 'default'])
};

export default UploadFieldBase;
