import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert as MuiAlert, AlertTitle, Fade, styled } from '@mui/material';
import Typography from '../atoms/Typography';

const StyledAlert = styled(MuiAlert, {
  shouldForwardProp: (prop) => !['isNeutral', 'content', 'hasCloseButton'].includes(prop)
})(({ isNeutral, content, hasCloseButton, theme }) => ({
  borderRadius: theme.spacing(1),
  paddingLeft: theme.spacing(1.5),
  paddingRight: hasCloseButton ? theme.spacing(2) : theme.spacing(1.5),
  alignSelf: 'start',
  width: '100%',
  display: 'grid',
  columnGap: theme.spacing(1),
  gridTemplateAreas:
    content === 'inline' || hasCloseButton
      ? `"icon message actions"`
      : `
    "icon message"
    "icon actions"
  `,
  gridTemplateColumns: hasCloseButton
    ? `${theme.spacing(2)} 1fr ${theme.spacing(2)}`
    : `${theme.spacing(2)}`,
  ...(isNeutral
    ? {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
      }
    : {}),
  '.MuiAlert-message': {
    gridArea: 'message'
  },
  '.MuiAlert-icon': {
    ...(isNeutral ? { color: theme.palette.text.primary } : {}),
    marginRight: 0,
    svg: {
      width: theme.spacing(2),
      height: theme.spacing(2)
    },
    gridArea: 'icon'
  },
  '.MuiAlert-action': {
    gridArea: 'actions',
    padding: 0,
    alignItems: content === 'inline' ? 'center' : 'flex-start',
    marginTop: hasCloseButton ? theme.spacing(0.5) : 0,
    marginBottom: content === 'block' && !hasCloseButton ? theme.spacing(1) : 0,
    marginLeft: content === 'inline' || hasCloseButton ? 'auto' : 0,
    marginRight: hasCloseButton ? theme.spacing(0.5) : 0
  },
  '.MuiAlertTitle-root': {
    ...theme.typography.body2,
    fontWeight: theme.typography.fontWeightBold,
    color: 'inherit'
  }
}));

const Alert = ({
  title,
  severity,
  content,
  children,
  onClose,
  action,
  open: controlledOpen,
  ...otherProps
}) => {
  const [open, setOpen] = useState(controlledOpen !== undefined ? controlledOpen : true);

  const handleClose = onClose
    ? () => {
        onClose();
        setOpen(false);
      }
    : undefined;

  const isNeutral = severity === 'neutral';

  const isOpen = controlledOpen !== undefined ? controlledOpen : open;

  return (
    <Fade in={isOpen} appear={false}>
      <StyledAlert
        severity={isNeutral ? 'info' : severity}
        isNeutral={isNeutral}
        content={content}
        action={action}
        onClose={handleClose}
        hasCloseButton={Boolean(onClose)}
        {...otherProps}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        <Typography variant='caption' color='inherit' component='p'>
          {children}
        </Typography>
      </StyledAlert>
    </Fade>
  );
};

Alert.defaultProps = {
  severity: 'neutral',
  content: 'inline',
  variant: 'standard'
};
Alert.propTypes = {
  title: PropTypes.node,
  severity: PropTypes.oneOf(['neutral', 'info', 'success', 'warning', 'error']),
  content: PropTypes.oneOf(['block', 'inline']),
  variant: PropTypes.string,
  icon: PropTypes.node,
  open: PropTypes.bool
};

export default Alert;
