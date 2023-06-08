import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert as MuiAlert, Fade, Box, styled } from '@mui/material';
import Typography from '../atoms/Typography';

const StyledAlert = styled(MuiAlert, {
  shouldForwardProp: (prop) => prop !== 'isNeutral'
})(({ isNeutral, theme }) => ({
  borderRadius: theme.spacing(1),
  paddingLeft: theme.spacing(1.5),
  alignSelf: 'start',
  width: '100%',
  ...(isNeutral
    ? {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
      }
    : {}),
  '.MuiAlert-message': {
    paddingTop: theme.spacing(0.75),
    paddingBottom: theme.spacing(0.75),
    width: '100%'
  },
  '.MuiAlert-icon': {
    ...(isNeutral ? { color: theme.palette.text.primary } : {}),
    paddingTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    svg: {
      width: theme.spacing(2),
      height: theme.spacing(2)
    }
  },
  '.MuiAlert-action': {
    paddingLeft: theme.spacing(1)
  }
}));

const Alert = ({ title, severity, layout, children, onClose, action, ...otherProps }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setOpen(false);
  };

  const isNeutral = severity === 'neutral';

  return (
    <Fade in={open} appear={false}>
      <StyledAlert
        severity={isNeutral ? 'info' : severity}
        isNeutral={isNeutral}
        onClose={onClose ? handleClose : undefined}
        {...otherProps}
      >
        <Box
          display='flex'
          flexDirection={layout === 'inline' ? 'row' : 'column'}
          justifyContent='space-between'
          alignItems={layout === 'inline' ? 'center' : 'auto'}
          width='100%'
          gap={1}
        >
          <Box>
            {title && (
              <Typography variant='body2' weight='strong' color='inherit'>
                {title}
              </Typography>
            )}
            <Typography variant='caption' color='inherit'>
              {children}
            </Typography>
          </Box>
          {action && <Box>{action}</Box>}
        </Box>
      </StyledAlert>
    </Fade>
  );
};

Alert.defaultProps = {
  severity: 'neutral',
  layout: 'inline',
  removable: false,
  variant: 'standard'
};
Alert.propTypes = {
  title: PropTypes.node,
  severity: PropTypes.oneOf(['neutral', 'info', 'success', 'warning', 'error']),
  layout: PropTypes.oneOf(['block', 'inline']),
  removable: PropTypes.bool,
  variant: PropTypes.string,
  icon: PropTypes.node
};

export default Alert;
