import React, { createRef, useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Grid,
  Icon,
  makeStyles,
  Switch,
  Tooltip,
  Typography
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Note from './Note';
import LayerIcon from '../../assets/LayerIcon';
import { ToggleButton } from '@material-ui/lab';
import OpacityControl from '../OpacityControl';

const useStyles = makeStyles((theme) => ({
  legendWrapper: {
    position: 'relative',
    maxWidth: '100%',
    padding: 0
  },
  content: {
    padding: theme.spacing(0, 3, 3, 3)
  },
  attr: {
    marginBottom: theme.spacing(1)
  },
  layerOptionsWrapper: {
    backgroundColor: theme.palette.grey[50]
  }
}));

export default function LegendWrapper({
  id,
  title,
  layerOptions = [],
  switchable = true,
  collapsible = true,
  collapsed = false,
  visible = true,
  hasChildren = true,
  note,
  attr,
  children,
  showOpacityControl,
  opacity,
  onChangeOpacity,
  onChangeVisibility,
  onChangeCollapsed
}) {
  const wrapper = createRef();
  const classes = useStyles();
  const expanded = !collapsed;
  const [isLayerOptionsExpanded, setIsLayerOptionsExpanded] = useState(false);

  const handleChangeOpacity = (newOpacity) => {
    if (onChangeOpacity) onChangeOpacity({ id, opacity: newOpacity });
  };

  const handleExpandClick = () => {
    if (collapsible && onChangeCollapsed)
      onChangeCollapsed({ id, collapsed: !collapsed });
  };

  const handleChangeVisibility = () => {
    if (onChangeVisibility) onChangeVisibility({ id, visible: !visible });
  };

  const handleToggleLayerOptions = () => {
    setIsLayerOptionsExpanded((oldState) => !oldState);
  };

  return (
    <Box component='section' aria-label={title} className={classes.legendWrapper}>
      <Header
        title={title}
        switchable={switchable}
        visible={visible}
        expanded={expanded}
        collapsible={hasChildren && collapsible}
        onExpandClick={handleExpandClick}
        onChangeVisibility={handleChangeVisibility}
        onToggleLayerOptions={showOpacityControl && handleToggleLayerOptions}
        isLayerOptionsExpanded={isLayerOptionsExpanded}
      />
      {hasChildren && !!children && (
        <Collapse ref={wrapper} in={expanded} timeout='auto' unmountOnExit>
          <Box className={classes.content}>
            <Grid container direction='column' pb={16} spacing={1}>
              {attr && (
                <Typography className={classes.attr} variant='caption'>
                  By {attr}
                </Typography>
              )}
              {children}
              <Collapse in={isLayerOptionsExpanded} timeout='auto' unmountOnExit>
                <Box className={classes.layerOptionsWrapper} mt={2}>
                  <OpacityControl
                    opacity={opacity}
                    onChangeOpacity={handleChangeOpacity}
                  />
                  {layerOptions}
                </Box>
              </Collapse>
              <Note>{note}</Note>
            </Grid>
          </Box>
        </Collapse>
      )}
    </Box>
  );
}

const useHeaderStyles = makeStyles((theme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60px',
    padding: theme.spacing(1.25, 1.25, 1.25, 2.5)
  },
  button: {
    padding: 0,
    flex: '1 1 auto',
    justifyContent: 'flex-start',
    cursor: ({ collapsible }) => (collapsible ? 'pointer' : 'default'),
    '& .MuiButton-label': {
      ...theme.typography.body1,

      '& .MuiButton-startIcon': {
        marginRight: theme.spacing(1)
      }
    },
    '&:hover': {
      background: 'none'
    }
  },
  expandIcon: {
    display: 'block',
    fill: theme.palette.text.secondary
  }
}));

function Header({
  title,
  switchable,
  visible,
  collapsible,
  expanded,
  onExpandClick,
  onChangeVisibility,
  onToggleLayerOptions,
  isLayerOptionsExpanded
}) {
  const classes = useHeaderStyles({ collapsible });
  const ExpandIcon = expanded ? ExpandLess : ExpandMore;

  return (
    <Grid container alignItems='center' className={classes.header}>
      <Button
        className={classes.button}
        startIcon={
          collapsible && (
            <Icon>
              <ExpandIcon className={classes.expandIcon} />
            </Icon>
          )
        }
        onClick={onExpandClick}
      >
        <Typography variant='subtitle1'>{title}</Typography>
      </Button>
      {!!onToggleLayerOptions && (
        <Tooltip title='Layer options' placement='top' arrow>
          <ToggleButton
            selected={isLayerOptionsExpanded}
            onClick={onToggleLayerOptions}
            value='check'
          >
            <LayerIcon />
          </ToggleButton>
        </Tooltip>
      )}
      {switchable && (
        <Tooltip title={(visible ? 'Hide' : 'Show') + ' layer'} placement='top' arrow>
          <Switch checked={visible} onChange={onChangeVisibility} />
        </Tooltip>
      )}
    </Grid>
  );
}
