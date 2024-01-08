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
  focused,
  buttonText,
  inProgress,
  inputProps,
  size,
  hasFiles,
  cursor,
  ...props
}) {
  return (
    <StyledUploadField
      {...props}
      size={size}
      error={!!error}
      helperText={error}
      focused={focused || dragOver}
      cursor={cursor}
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
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  buttonText: PropTypes.string,
  inProgress: PropTypes.bool,
  inputProps: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium']),
  hasFiles: PropTypes.bool,
  cursor: PropTypes.oneOf(['pointer', 'default'])
};

export default UploadFieldBase;
