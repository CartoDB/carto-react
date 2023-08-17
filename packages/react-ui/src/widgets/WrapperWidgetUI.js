import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
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
  Tooltip,
  styled
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

const Root = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'margin'
})(({ theme, margin }) => {
  return {
    margin: 0,
    position: 'relative',
    maxWidth: '100%',
    padding: margin !== undefined ? margin : theme.spacing(2, 2.5)
  };
});

const LoadingBar = styled(LinearProgress)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: theme.spacing(0.25)
}));

const Header = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'expanded'
})(({ theme, expanded = true }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
  ...(expanded ? { minHeight: theme.spacing(3) } : { height: theme.spacing(3) }),
  padding: 0
}));

const HeaderButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'expandable'
})(({ theme, expandable = true }) => ({
  flex: 1,
  padding: 0,
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  cursor: expandable ? 'pointer' : 'default',
  '& .MuiButton-startIcon': {
    marginTop: '3px',
    marginRight: theme.spacing(1)
  },
  '&:hover': {
    background: 'none'
  }
}));

const ParentIcon = ({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: theme.spacing(3),
  height: theme.spacing(3),
  color: theme.palette.text.secondary
});

const HideButton = styled(ExpandLess)(({ theme }) => ParentIcon({ theme }));

const ShowButton = styled(ExpandMore)(({ theme }) => ParentIcon({ theme }));

const Text = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'expanded'
})(({ expanded = true }) => ({
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
}));

const ActionsGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  marginLeft: theme.spacing(1)
}));

const IconActionButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  margin: theme.spacing(-0.75, 0)
}));

const PaperMenu = styled(Menu)(({ theme }) => ({
  '.MuiPaper-root': {
    marginTop: theme.spacing(5),
    maxHeight: theme.spacing(21),
    minWidth: theme.spacing(16)
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
      <IconActionButton key={action.id} aria-label={action.label} onClick={action.action}>
        {action.icon}
      </IconActionButton>
    );
  };

  if (disabled) {
    return props.children;
  }

  return (
    <Root margin={props.margin} component='section' aria-label={props.title}>
      {props.isLoading ? <LoadingBar /> : null}
      <Header container expanded={props.expanded}>
        <HeaderButton
          expandable={props.expandable}
          startIcon={
            props.expandable && <Icon>{expanded ? <HideButton /> : <ShowButton />}</Icon>
          }
          onClick={handleExpandClick}
        >
          <Tooltip title={props.title}>
            <Text expanded={props.expanded} align='left' variant='subtitle1'>
              {props.title}
            </Text>
          </Tooltip>
        </HeaderButton>

        <ActionsGrid item>
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
            <>
              <IconActionButton
                aria-label='options'
                aria-controls='options-menu'
                aria-haspopup='true'
                onClick={handleClick}
              >
                {optionsIcon}
              </IconActionButton>
              <PaperMenu
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
              </PaperMenu>
            </>
          )}
        </ActionsGrid>
      </Header>
      {/* TODO: check collapse error */}
      <Collapse ref={wrapper} in={expanded} timeout='auto' unmountOnExit>
        <Box pt={1}>{props.children}</Box>
        {props.footer ?? <Box>{props.footer}</Box>}
      </Collapse>
    </Root>
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
  footer: PropTypes.element,
  margin: PropTypes.number
};

export default WrapperWidgetUI;
