import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert as MuiAlert, AlertTitle, Fade, styled } from '@mui/material';
import Typography from '../atoms/Typography';
import { ICON_SIZE_MEDIUM } from '../../theme/themeConstants';

const StyledAlert = styled(MuiAlert, {
  shouldForwardProp: (prop) =>
    ![
      'isNeutral',
      'content',
      'hasCloseButton',
      'hasAction',
      'hasTitle',
      'isSticky'
    ].includes(prop)
})(({ isNeutral, content, hasCloseButton, hasAction, hasTitle, isSticky, theme }) => ({
  columnGap: theme.spacing(1),
  minHeight: hasTitle ? theme.spacing(8) : theme.spacing(6),
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
    flex: 1,
    paddingTop: hasTitle ? theme.spacing(0.25) : theme.spacing(0.5),

    ...(hasAction && {
      gridArea: 'message'
    }),
    ...(isNeutral && {
      '& :not(.MuiAlertTitle-root)': {
        color: theme.palette.text.secondary
      }
    })
  },
  '.MuiAlert-icon': {
    height: hasTitle ? theme.spacing(2.5) : theme.spacing(3),
    marginRight: 0,

    ...(hasAction && {
      gridArea: 'icon'
    }),
    ...(isNeutral && {
      color: theme.palette.text.primary
    })
  },
  '.MuiAlert-action': {
    alignItems: content === 'inline' ? 'center' : 'flex-start',
    margin: content === 'block' && !hasCloseButton ? theme.spacing(1.5, 0, 0.5) : 0,
    marginLeft: content === 'inline' || hasCloseButton ? 'auto' : 0,
    padding: 0,

    ...(hasAction && {
      gridArea: 'actions'
    }),

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
        hasTitle={Boolean(title)}
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
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  severity: PropTypes.oneOf(['neutral', 'info', 'success', 'warning', 'error']),
  content: PropTypes.oneOf(['block', 'inline']),
  variant: PropTypes.string,
  icon: PropTypes.node,
  open: PropTypes.bool,
  isSticky: PropTypes.bool
};

export default Alert;
