import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import {
  Box,
  Button,
  Collapse,
  Grid,
  Icon,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import { ExpandLess, ExpandMore, MoreVert } from '@mui/icons-material';
import Typography from '../components/atoms/Typography';

/*
Options props must have this format:
[
  { id: 'o0', name: 'Option 1', action: null },
  ...
];

Actions props must have this format:
[
  { id: 'a0', name: 'Autostyle', icon: '/icon-content-autostyle.svg', action: null },
  ...
];
*/

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    maxWidth: '100%',
    padding: ({ margin }) => (margin !== undefined ? margin : theme.spacing(2, 2.5))
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: theme.spacing(0.25)
  },
  header: ({ expanded }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    ...(expanded ? { minHeight: theme.spacing(3) } : { height: theme.spacing(3) }),
    padding: 0
  }),
  optionsMenu: {
    marginTop: theme.spacing(6),
    maxHeight: theme.spacing(21),
    minWidth: theme.spacing(16)
  },
  button: {
    flex: 1,
    padding: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    cursor: (props) => (props.expandable ? 'pointer' : 'default'),

    '& .MuiButton-startIcon': {
      marginRight: theme.spacing(1)
    },
    '&:hover': {
      background: 'none'
    }
  },
  buttonText: ({ expanded }) => ({
    wordBreak: 'break-word',
    overflow: 'hidden',
    ...(expanded && {
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical'
    }),
    ...(!expanded && {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    })
  }),
  actions: {
    display: 'flex',
    marginLeft: theme.spacing(1)
  },
  iconToggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: theme.palette.text.secondary
  },
  iconAction: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(-0.75, 0)
  },
  content: {
    paddingTop: theme.spacing(1.25)
  }
}));

function WrapperWidgetUI(props) {
  const wrapper = createRef();

  const [expandedInt, setExpandedInt] = useState(true);
  const externalExpanded =
    typeof props.expanded === 'boolean' && typeof props.onExpandedChange === 'function';
  const expanded =
    props.expandable !== false ? (externalExpanded ? props.expanded : expandedInt) : true;
  const setExpanded = externalExpanded ? props.onExpandedChange : setExpandedInt;

  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles({ ...props, expanded });
  const open = Boolean(anchorEl);
  const {
    disabled = false,
    options = [],
    actions = [],
    optionsIcon = <MoreVert />
  } = props;

  const handleExpandClick = () => {
    if (props.expandable) {
      setExpanded(!expanded);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionAction = (action) => {
    if (action) {
      action();
    }

    handleClose();
  };

  const iconButtonTooltip = (action) => {
    return (
      <IconButton
        key={action.id}
        aria-label={action.label}
        onClick={action.action}
        className={classes.iconAction}
        size='large'
      >
        {action.icon}
      </IconButton>
    );
  };

  if (disabled) {
    return props.children;
  }

  return (
    <Box component='section' aria-label={props.title} className={classes.root}>
      {props.isLoading ? <LinearProgress className={classes.loading} /> : null}
      <Grid container className={classes.header}>
        <Button
          className={classes.button}
          startIcon={
            props.expandable && (
              <Icon>
                {expanded ? (
                  <ExpandLess className={classes.iconToggle} />
                ) : (
                  <ExpandMore className={classes.iconToggle} />
                )}
              </Icon>
            )
          }
          onClick={handleExpandClick}
        >
          <Tooltip title={props.title} placement='top' arrow>
            <Typography className={classes.buttonText} align='left' variant='subtitle1'>
              {props.title}
            </Typography>
          </Tooltip>
        </Button>

        <Grid className={classes.actions} item>
          {actions.length > 0 &&
            actions.map((action) => {
              return action.tooltip ? (
                <Tooltip
                  key={action.id}
                  title={action.tooltip.text}
                  placement={action.tooltip.placement || 'top'}
                >
                  {iconButtonTooltip(action)}
                </Tooltip>
              ) : (
                iconButtonTooltip(action)
              );
            })}

          {options.length > 0 && (
            <div>
              <IconButton
                aria-label='options'
                aria-controls='options-menu'
                aria-haspopup='true'
                onClick={handleClick}
                className={classes.iconAction}
                size='large'
              >
                {optionsIcon}
              </IconButton>
              <Menu
                id='options-menu'
                elevation={8}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{ className: classes.optionsMenu }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option.id}
                    selected={option.selected}
                    onClick={() => handleOptionAction(option.action)}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
        </Grid>
      </Grid>
      {/* TODO: check collapse error */}
      <Collapse ref={wrapper} in={expanded} timeout='auto' unmountOnExit>
        <Box className={classes.content}>{props.children}</Box>
      </Collapse>
    </Box>
  );
}

WrapperWidgetUI.defaultProps = {
  expanded: true,
  expandable: true,
  isLoading: false,
  disabled: false
};

WrapperWidgetUI.propTypes = {
  title: PropTypes.string.isRequired,
  expandable: PropTypes.bool,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      action: PropTypes.func.isRequired
    })
  ),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired
    })
  ),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired
  ]),
  margin: PropTypes.number
};

export default WrapperWidgetUI;
