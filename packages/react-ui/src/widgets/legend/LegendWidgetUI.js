import React, { createRef, Fragment, useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  makeStyles,
  SvgIcon,
  Typography
} from '@material-ui/core';
import LegendWrapper from './LegendWrapper';
import LegendCategories from './LegendCategories';
import LegendIcon from './LegendIcon';
import LegendRamp from './LegendRamp';
import LegendProportion from './LegendProportion';

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

const useStyles = makeStyles((theme) => ({
  legend: {
    minWidth: '240px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    borderRadius: 4
  }
}));

export default function LegendWidgetUI({ className, legends = [], onChangeVisibility }) {
  const classes = useStyles();
  const isSingle = legends.length === 1;

  return (
    <Box className={`${classes.legend} ${className}`}>
      <LegendContainer isSingle={isSingle}>
        <LegendRows legends={legends} onChangeVisibility={onChangeVisibility} />
      </LegendContainer>
    </Box>
  );
}

const useStylesLegendContainer = makeStyles((theme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '36px'
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

function LegendContainer({ isSingle, children }) {
  const wrapper = createRef();
  const classes = useStylesLegendContainer();
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return isSingle ? (
    children
  ) : (
    <>
      <Collapse ref={wrapper} in={expanded} timeout='auto' unmountOnExit>
        {children}
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

export const LEGEND_TYPES = {
  CATEGORY: 'category',
  ICON: 'icon',
  CONTINUOUS_RAMP: 'continuous_ramp',
  BINS: 'bins',
  PROPORTION: 'proportion',
  CUSTOM: 'custom'
};

const LEGEND_COMPONENT_BY_TYPE = {
  [LEGEND_TYPES.CATEGORY]: LegendCategories,
  [LEGEND_TYPES.ICON]: LegendIcon,
  [LEGEND_TYPES.CONTINUOUS_RAMP]: (args) => LegendRamp({ ...args, isContinuous: true }),
  [LEGEND_TYPES.BINS]: (args) => LegendRamp({ ...args, isContinuous: false }),
  [LEGEND_TYPES.PROPORTION]: LegendProportion
};

function LegendRows({ legends = [], onChangeVisibility }) {
  const isSingle = legends.length === 1;

  return legends.map((legend) => {
    // TODO: Add validation for layer.type
    const LegendComponent =
      LEGEND_COMPONENT_BY_TYPE[legend.type] || (() => legend.children);

    return (
      <Fragment key={legend.id}>
        <LegendWrapper
          id={legend.id}
          title={legend.title}
          collapsible={legend.collapsible}
          switchable={legend.switchable}
          visible={legend.visible}
          note={legend.note}
          attr={legend.attr}
          onChangeVisibility={onChangeVisibility}
        >
          {LegendComponent({ legend }) || <NoLegend />}
        </LegendWrapper>
        {!isSingle && <Divider />}
      </Fragment>
    );
  });
}

function NoLegend() {
  return <Typography>Legend type not found</Typography>;
}
