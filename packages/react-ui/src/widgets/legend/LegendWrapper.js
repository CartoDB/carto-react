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
  onChangeVisibility
}) {
  const wrapper = createRef();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = () => {
    if (collapsible) {
      setExpanded(!expanded);
    }
  };

  const handleChangeVisibility = () => {
    if (onChangeVisibility) onChangeVisibility({ id, visible: !visible });
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
  onChangeVisibility
}) {
  const classes = useHeaderStyles({ collapsible });

  return (
    <Grid container alignItems='center' className={classes.header}>
      <Button
        className={classes.button}
        startIcon={
          collapsible && (
            <Icon>
              {expanded ? (
                <ExpandLess className={classes.expandIcon} />
              ) : (
                <ExpandMore className={classes.expandIcon} />
              )}
            </Icon>
          )
        }
        onClick={onExpandClick}
      >
        <Typography variant='subtitle1'>{title}</Typography>
      </Button>
      {switchable && (
        <Tooltip title={(visible ? 'Hide' : 'Show') + ' layer'} placement='top' arrow>
          <Switch checked={visible} onChange={onChangeVisibility} />
        </Tooltip>
      )}
    </Grid>
  );
}
