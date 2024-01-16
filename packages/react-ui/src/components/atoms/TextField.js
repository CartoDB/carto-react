import React from 'react';
import PropTypes from 'prop-types';
import { TextField as MuiTextField } from '@mui/material';

const TextField = ({ readOnly, ...rest }) => {
  return (
    <MuiTextField
      {...rest}
      readOnly={readOnly}
      InputProps={{
        ...rest.InputProps,
        readOnly: readOnly
      }}
    />
  );
};

TextField.propTypes = {
  readOnly: PropTypes.bool
};

export default TextField;
