import React, { createRef, Fragment } from 'react';
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
import PropTypes from 'prop-types';

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

function LegendWidgetUI({
  className,
  customLegendTypes,
  customLayerOptions,
  layers = [],
  collapsed,
  onChangeCollapsed,
  onChangeVisibility,
  onChangeOpacity,
  onChangeLegendRowCollapsed
}) {
  const classes = useStyles();
  const isSingle = layers.length === 1;

  return (
    <Box className={`${classes.legend} ${className}`}>
      <LegendContainer
        isSingle={isSingle}
        collapsed={collapsed}
        onChangeCollapsed={onChangeCollapsed}
      >
        <LegendRows
          layers={layers}
          customLegendTypes={customLegendTypes}
          customLayerOptions={customLayerOptions}
          onChangeVisibility={onChangeVisibility}
          onChangeOpacity={onChangeOpacity}
          onChangeCollapsed={onChangeLegendRowCollapsed}
        />
      </LegendContainer>
    </Box>
  );
}

LegendWidgetUI.defaultProps = {
  layers: [],
  customLegendTypes: {},
  collapsed: false
};

LegendWidgetUI.propTypes = {
  className: PropTypes.string,
  customLegendTypes: PropTypes.objectOf(PropTypes.func),
  layers: PropTypes.array,
  collapsed: PropTypes.bool,
  onChangeCollapsed: PropTypes.func,
  onChangeLegendRowCollapsed: PropTypes.func,
  onChangeVisibility: PropTypes.func,
  onChangeOpacity: PropTypes.func
};

export default LegendWidgetUI;

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
    borderTop: ({ collapsed }) =>
      collapsed ? 'none' : `1px solid ${theme.palette.divider}`,
    cursor: 'pointer',
    '& .MuiButton-label': {
      ...theme.typography.body1
    }
  },
  wrapperInner: {
    maxHeight: 'max(350px, 80vh)',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
}));

function LegendContainer({ isSingle, children, collapsed, onChangeCollapsed }) {
  const wrapper = createRef();
  const classes = useStylesLegendContainer({
    collapsed
  });

  const handleExpandClick = () => {
    if (onChangeCollapsed) onChangeCollapsed(!collapsed);
  };

  return isSingle ? (
    children
  ) : (
    <>
      <Collapse
        ref={wrapper}
        in={!collapsed}
        timeout='auto'
        unmountOnExit
        classes={{
          wrapperInner: classes.wrapperInner
        }}
      >
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
  [LEGEND_TYPES.CONTINUOUS_RAMP]: (args) => <LegendRamp {...args} isContinuous={true} />,
  [LEGEND_TYPES.BINS]: (args) => <LegendRamp {...args} isContinuous={false} />,
  [LEGEND_TYPES.PROPORTION]: LegendProportion,
  [LEGEND_TYPES.CUSTOM]: ({ legend }) => legend.children
};

function UnknownLayerOption({ optionKey }) {
  return (
    <p>
      Unknown layer option{' '}
      <em>
        <strong>{optionKey}</strong>
      </em>
    </p>
  );
}

function LegendRows({
  layers = [],
  customLegendTypes,
  customLayerOptions,
  onChangeVisibility,
  onChangeOpacity,
  onChangeCollapsed
}) {
  const isSingle = layers.length === 1;

  return (
    <>
      {layers.map((layer, index) => {
        const {
          id,
          title,
          switchable,
          visible,
          options,
          showOpacityControl = false,
          opacity = 1,
          legend = {}
        } = layer;

        const {
          type = LEGEND_TYPES.CUSTOM,
          collapsible = true,
          collapsed = false,
          note = '',
          attr = '',
          children
        } = legend;

        const isLast = layers.length - 1 === index;
        const LegendComponent =
          LEGEND_COMPONENT_BY_TYPE[type] || customLegendTypes[type] || UnknownLegend;
        const hasChildren = type === LEGEND_TYPES.CUSTOM ? !!children : !!LegendComponent;

        const layerOptions = options.map((key) => {
          const Component = customLayerOptions[key] || UnknownLayerOption;
          return <Component key={key} optionKey={key} layer={layer} />;
        });

        return (
          <Fragment key={id}>
            <LegendWrapper
              id={id}
              title={title}
              layerOptions={layerOptions}
              hasChildren={hasChildren}
              collapsible={collapsible}
              collapsed={collapsed}
              switchable={switchable}
              visible={visible}
              note={note}
              attr={attr}
              showOpacityControl={showOpacityControl}
              opacity={opacity}
              onChangeOpacity={onChangeOpacity}
              onChangeVisibility={onChangeVisibility}
              onChangeCollapsed={onChangeCollapsed}
            >
              <LegendComponent layer={layer} legend={legend} />
            </LegendWrapper>
            {!isSingle && !isLast && <Divider />}
          </Fragment>
        );
      })}
    </>
  );
}

function UnknownLegend({ legend }) {
  return (
    <Typography variant='body2'>{legend.type} is not a known legend type.</Typography>
  );
}
