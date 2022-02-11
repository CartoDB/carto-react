import React, { createRef, useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Grid,
  Icon,
  Input,
  InputAdornment,
  makeStyles,
  Slider,
  Switch,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Note from './Note';
import LayerIcon from '../../assets/LayerIcon';
import LayerOptionWrapper from './LayerOptionWrapper';
import { ToggleButton } from '@material-ui/lab';

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
  switchable = true,
  collapsible = true,
  visible = true,
  note,
  attr,
  children,
  showOpacityControl,
  opacity,
  onChangeOpacity,
  onChangeVisibility
}) {
  const wrapper = createRef();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);
  const [isLayerOptionsExpanded, setIsLayerOptionsExpanded] = useState(false);

  const handleChangeOpacity = (newOpacity) => {
    if (onChangeOpacity) onChangeOpacity({ id, opacity: newOpacity });
  };

  const handleExpandClick = () => {
    if (collapsible) {
      setExpanded(!expanded);
    }
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
        collapsible={collapsible}
        onExpandClick={handleExpandClick}
        onChangeVisibility={handleChangeVisibility}
        onToggleLayerOptions={showOpacityControl && handleToggleLayerOptions}
        isLayerOptionsExpanded={isLayerOptionsExpanded}
      />
      {!!children && (
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

const useOpacityControlStyles = makeStyles(({ spacing }) => ({
  content: {
    height: 'auto',
    flex: 1
  },
  slider: {
    marginTop: spacing(1)
  },
  input: {
    width: spacing(8),
    '& input': {
      '&[type=number]': {
        appearance: 'textfield'
      },
      '&::-webkit-outer-spin-button': {
        appearance: 'none',
        margin: 0
      },
      '&::-webkit-inner-spin-button': {
        appearance: 'none',
        margin: 0
      }
    },
    '& .MuiInputAdornment-positionEnd': {
      margin: 0
    }
  }
}));

function OpacityControl({ opacity, onChangeOpacity }) {
  const classes = useOpacityControlStyles();
  const handleTextFieldChange = (e) => {
    const newOpacity = parseInt(e.target.value || '0');
    onChangeOpacity(Math.max(0, Math.min(100, newOpacity)) / 100);
  };

  return (
    <LayerOptionWrapper label='Opacity'>
      <Box className={classes.content}>
        <Grid container spacing={2} direction='row' alignItems='center'>
          <Grid item xs>
            <Slider
              value={Math.round(opacity * 100)}
              min={0}
              max={100}
              step={1}
              onChange={(_, value) => onChangeOpacity(value / 100)}
              aria-labelledby='input-slider'
              className={classes.slider}
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.input}
              value={Math.round(opacity * 100)}
              margin='dense'
              onChange={handleTextFieldChange}
              InputProps={{
                step: 1,
                min: 0,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider',
                endAdornment: <InputAdornment position='end'>%</InputAdornment>
              }}
            />
          </Grid>
        </Grid>
      </Box>
      {/* <Grid
        container
        wrap='nowrap'
        direction='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <Grid item xs={6}>
          <Slider
            value={Math.round(opacity * 100)}
            aria-labelledby='opacity-slider'
            min={0}
            max={100}
            step={1}
            onChange={(_, value) => onChangeOpacity(value / 100)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            size='small'
            id='opacity-text'
            value={Math.round(opacity * 100)}
            onChange={handleTextFieldChange}
            InputProps={{
              endAdornment: <InputAdornment position='end'>%</InputAdornment>
            }}
          />
        </Grid>
      </Grid>*/}
    </LayerOptionWrapper>
  );
}
