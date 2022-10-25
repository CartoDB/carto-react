import React from 'react';
import PropTypes from 'prop-types';
import { Typography as MuiTypography } from '@mui/material';
import { Text } from './styles';

const Typography = (props) => {
  const children = this.props.children;

  return (
    <MuiTypography>
      <Text weight={props.weight} italic={props.italic}>
        {children}
      </Text>
    </MuiTypography>
  );
};

Typography.defaultProps = {
  italic: false
};

Typography.propTypes = {
  weight: PropTypes.oneOf([400 | 500 | 600]),
  italic: PropTypes.bool,
  children: PropTypes.element.isRequired
};

export default Typography;
