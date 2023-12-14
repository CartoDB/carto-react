import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert as MuiAlert, AlertTitle, Fade, styled } from '@mui/material';
import Typography from '../atoms/Typography';
import { ICON_SIZE_MEDIUM } from '../../theme/themeConstants';

const StyledAlert = styled(MuiAlert, {
  shouldForwardProp: (prop) =>
    !['isNeutral', 'content', 'hasCloseButton', 'hasAction', 'isSticky'].includes(prop)
})(({ isNeutral, content, hasCloseButton, hasAction, isSticky, theme }) => ({
  columnGap: theme.spacing(1),
  minHeight: theme.spacing(6),
  padding: theme.spacing(1.5),

  ...(hasAction && {
    display: 'grid',
    gridTemplateAreas:
      content === 'inline' || hasCloseButton
        ? `"icon message actions"`
        : `
    "icon message"
    "icon actions"
    `,
    gridTemplateColumns: hasCloseButton
      ? `${ICON_SIZE_MEDIUM} 1fr ${theme.spacing(3)}`
      : `${ICON_SIZE_MEDIUM}`
  }),
  ...(isNeutral && {
    backgroundColor: theme.palette.default.background,
    color: theme.palette.text.primary
  }),
  ...(isSticky && {
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
    gridArea: 'icon',
    marginRight: 0,

    ...(isNeutral && {
      color: theme.palette.text.primary
    })
  },
  '.MuiAlert-action': {
    gridArea: 'actions',
    alignItems: content === 'inline' ? 'center' : 'flex-start',
    padding: 0,
    margin: content === 'block' && !hasCloseButton ? theme.spacing(1.5, 0, 0.5) : 0,
    marginLeft: content === 'inline' || hasCloseButton ? 'auto' : 0,

    '.MuiIconButton-root svg path': {
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
  isSticky,
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
        hasAction={Boolean(action)}
        isSticky={isSticky}
        {...otherProps}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        <Typography variant='caption' color='inherit' component='div'>
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
  isSticky: PropTypes.bool
};

export default Alert;
