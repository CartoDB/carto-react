import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert as MuiAlert, AlertTitle, Fade, styled } from '@mui/material';
import Typography from '../atoms/Typography';
import { ICON_SIZE_MEDIUM } from '../../theme/themeConstants';

const StyledAlert = styled(MuiAlert, {
  shouldForwardProp: (prop) =>
    !['isNeutral', 'content', 'hasCloseButton', 'hasTitle', 'sticky'].includes(prop)
})(({ isNeutral, content, hasCloseButton, hasTitle, sticky, theme }) => ({
  minHeight: hasTitle ? theme.spacing(8) : theme.spacing(6),
  padding: theme.spacing(1.5),
  paddingBottom: hasTitle ? theme.spacing(1.25) : undefined,
  paddingRight: hasCloseButton ? theme.spacing(2) : theme.spacing(1.5),
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
    ? `${ICON_SIZE_MEDIUM} 1fr ${theme.spacing(2)}`
    : `${ICON_SIZE_MEDIUM}`,

  ...(isNeutral && {
    backgroundColor: theme.palette.default.background,
    color: theme.palette.text.primary
  }),
  ...(sticky && {
    borderRadius: 0
  }),

  '.MuiAlert-message': {
    gridArea: 'message',
    ...(isNeutral && {
      '& :not(.MuiAlertTitle-root)': {
        color: theme.palette.text.secondary
      }
    })
  },
  '.MuiAlert-icon': {
    ...(isNeutral && { color: theme.palette.text.primary }),
    marginRight: 0,
    gridArea: 'icon'
  },
  '.MuiAlert-action': {
    gridArea: 'actions',
    padding: 0,
    alignItems: content === 'inline' ? 'center' : 'flex-start',
    marginTop: hasCloseButton ? theme.spacing(0.5) : 0,
    marginBottom: content === 'block' && !hasCloseButton ? theme.spacing(1) : 0,
    marginLeft: content === 'inline' || hasCloseButton ? 'auto' : 0,
    marginRight: hasCloseButton ? theme.spacing(0.5) : 0,

    'svg path': {
      fill: hasCloseButton ? theme.palette.text.secondary : undefined
    }
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
  sticky,
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
        hasTitle={Boolean(title)}
        sticky={sticky}
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
  open: PropTypes.bool,
  sticky: PropTypes.bool
};

export default Alert;
