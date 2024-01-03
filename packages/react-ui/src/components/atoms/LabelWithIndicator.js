import React from 'react';
import PropTypes from 'prop-types';
import { Box, styled } from '@mui/material';

import Typography from './Typography';
import { ICON_SIZE_SMALL } from '../../theme/themeConstants';

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5)
}));

const LabelIndicator = styled(Typography)(({ theme }) => ({
  '.Mui-disabled &': {
    color: theme.palette.text.disabled
  }
}));

const Icon = styled(Box)(({ theme }) => ({
  display: 'flex',

  svg: {
    width: ICON_SIZE_SMALL,
    height: ICON_SIZE_SMALL,
    fontSize: ICON_SIZE_SMALL,

    path: {
      fill: theme.palette.text.secondary,

      '.Mui-disabled &': {
        fill: theme.palette.text.disabled
      }
    }
  }
}));

const LabelWithIndicator = ({ label, type, icon }) => {
  const isRequired = type === 'required';

  return (
    <Root>
      {label}

      {type && (
        <LabelIndicator
          component='span'
          variant='inherit'
          color='textSecondary'
          weight='regular'
        >
          {isRequired ? '(required)' : '(optional)'}
        </LabelIndicator>
      )}

      {icon && <Icon>{icon}</Icon>}
    </Root>
  );
};

LabelWithIndicator.propTypes = {
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  type: PropTypes.oneOf(['optional', 'required']),
  icon: PropTypes.element
};

export default LabelWithIndicator;
