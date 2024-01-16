import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const ReadOnlyTextField = ({ readOnly, ...rest }) => {
  return (
    <TextField
      {...rest}
      readOnly={readOnly}
      InputProps={{
        ...rest.InputProps,
        readOnly: readOnly
      }}
    />
  );
};

ReadOnlyTextField.defaultProps = {
  readOnly: true
};
ReadOnlyTextField.propTypes = {
  readOnly: PropTypes.bool
};

export default ReadOnlyTextField;
