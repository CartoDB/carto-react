import React, { createRef, useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Grid,
  Icon,
  makeStyles,
  SvgIcon,
  Switch,
  Typography
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    borderRadius: 4
  }
}));

function Legend({ layers = [] }) {
  const classes = useStyles();
  const isSingle = layers.length === 1;
  return (
    <Box className={classes.root}>
      {!isSingle ? (
        <MultiLayers layers={layers}></MultiLayers>
      ) : (
        <LegendRows layers={layers}></LegendRows>
      )}
    </Box>
  );
}

export default Legend;

const useStylesMultiLayers = makeStyles((theme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '36px',
    borderTop: '1px solid transparent',
    borderTopColor: ({ expanded }) =>
      expanded ? theme.palette.other.divider : 'transparent'
  },
  button: {
    flex: '1 1 auto',
    justifyContent: 'space-between',
    padding: theme.spacing(0.75, 1.25, 0.75, 3),
    cursor: 'pointer',
    '& .MuiButton-label': {
      ...theme.typography.body1
    }
  }
}));

const LayersIcon = () => (
  <SvgIcon width='24' height='24' viewBox='0 0 24 24'>
    <defs>
      <path
        id='5chkhs3l0a'
        d='M11.99 19.005l-7.37-5.73L3 14.535l9 7 9-7-1.63-1.27-7.38 5.74zm.01-2.54l7.36-5.73L21 9.465l-9-7-9 7 1.63 1.27 7.37 5.73zm0-11.47l5.74 4.47-5.74 4.47-5.74-4.47L12 4.995z'
      />
    </defs>
    <g transform='translate(-434 -298) translate(230 292) translate(204 6)'>
      <mask id='z57f7rm2gb' fill='#fff'>
        <use xlinkHref='#5chkhs3l0a' />
      </mask>
      <g fill='#2C3032' mask='url(#z57f7rm2gb)'>
        <path d='M0 0H24V24H0z' />
      </g>
    </g>
  </SvgIcon>
);

function MultiLayers({ layers }) {
  const wrapper = createRef();
  const [expanded, setExpanded] = useState(true);
  const classes = useStylesMultiLayers({ expanded });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Collapse ref={wrapper} in={expanded} timeout='auto' unmountOnExit>
        <LegendRows layers={layers}></LegendRows>
      </Collapse>
      <Grid container className={classes.header}>
        <Button
          className={classes.button}
          endIcon={<LayersIcon />}
          onClick={handleExpandClick}
        >
          <Typography variant='subtitle1'>Layers</Typography>
        </Button>
      </Grid>
    </>
  );
}

function LegendRows({ layers }) {
  return layers.map((layer) => (
    <LegendRow
      key={layer.id}
      title={layer.title}
      expandable={layer.expandable}
      visibility={layer.visibility}
      hasVisibility={layer.hasVisibility}
    ></LegendRow>
  ));
}

const useStylesRow = makeStyles((theme) => ({
  root: {
    position: 'relative',
    maxWidth: '100%',
    padding: 0
  },
  content: {
    padding: theme.spacing(0, 3, 3, 3)
  }
}));

export function LegendRow({
  title,
  hasVisibility = true,
  visibility = true,
  expandable = true,
  children
}) {
  const wrapper = createRef();
  const classes = useStylesRow();
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = () => {
    if (expandable) {
      setExpanded(!expanded);
    }
  };

  const handleChangeVisibility = () => {
    // TODO
  };

  return (
    <Box component='section' aria-label={title} className={classes.root}>
      <Header
        title={title}
        hasVisibility={hasVisibility}
        visibility={visibility}
        expanded={expanded}
        expandable={expandable}
        onExpandClick={handleExpandClick}
        onChangeVisibility={handleChangeVisibility}
      ></Header>
      <Collapse ref={wrapper} in={expanded} timeout='auto' unmountOnExit>
        <Box className={classes.content}>{children}</Box>
      </Collapse>
    </Box>
  );
}

const useStylesHeader = makeStyles((theme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60px',
    padding: theme.spacing(1.25, 1.25, 1.25, 3)
  },
  button: {
    padding: 0,
    flex: '1 1 auto',
    justifyContent: 'flex-start',
    cursor: ({ expandable }) => (expandable ? 'pointer' : 'default'),
    '& .MuiButton-label': {
      ...theme.typography.body1,

      '& .MuiButton-startIcon': {
        marginRight: theme.spacing(1)
      }
    },
    '&:hover': {
      background: 'none'
    }
  }
}));

function Header({
  title,
  hasVisibility,
  visibility,
  expandable,
  expanded,
  onExpandClick,
  onChangeVisibility
}) {
  const classes = useStylesHeader({ expandable });

  return (
    <Grid container className={classes.header}>
      <Button
        className={classes.button}
        startIcon={
          expandable && (
            <Icon>
              {expanded ? (
                <ExpandLess className={classes.iconToggle} />
              ) : (
                <ExpandMore className={classes.iconToggle} />
              )}
            </Icon>
          )
        }
        onClick={onExpandClick}
      >
        <Typography variant='subtitle1'>{title}</Typography>
      </Button>
      {hasVisibility && (
        <Switch checked={visibility} onChange={onChangeVisibility}></Switch>
      )}
    </Grid>
  );
}
