import React, { createRef, Fragment } from 'react';
import { Box, Button, Collapse, Divider, Grid, styled, SvgIcon } from '@mui/material';
import LegendWrapper from './LegendWrapper';
import LegendCategories from './LegendCategories';
import LegendIcon from './LegendIcon';
import LegendRamp from './LegendRamp';
import LegendProportion from './LegendProportion';
import PropTypes from 'prop-types';
import Typography from '../../components/atoms/Typography';
import { DEFAULT_LOCALE } from '@carto/react-ui/hooks/useImperativeIntl';

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

const LegendBox = styled(Box)(({ theme }) => ({
  minWidth: theme.spacing(30),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: theme.spacing(0.5)
}));

function LegendWidgetUI({
  customLegendTypes,
  customLayerOptions,
  layers = [],
  collapsed,
  onChangeCollapsed,
  onChangeVisibility,
  onChangeOpacity,
  onChangeLegendRowCollapsed,
  title,
  locale
}) {
  const isSingle = layers.length === 1;

  return (
    <LegendBox>
      <LegendContainer
        isSingle={isSingle}
        collapsed={collapsed}
        onChangeCollapsed={onChangeCollapsed}
        title={title}
      >
        <LegendRows
          layers={layers}
          customLegendTypes={customLegendTypes}
          customLayerOptions={customLayerOptions}
          onChangeVisibility={onChangeVisibility}
          onChangeOpacity={onChangeOpacity}
          onChangeCollapsed={onChangeLegendRowCollapsed}
          locale={locale}
        />
      </LegendContainer>
    </LegendBox>
  );
}

LegendWidgetUI.defaultProps = {
  layers: [],
  customLegendTypes: {},
  customLayerOptions: {},
  collapsed: false,
  title: 'Layers',
  locale: DEFAULT_LOCALE
};

LegendWidgetUI.propTypes = {
  customLegendTypes: PropTypes.objectOf(PropTypes.func),
  customLayerOptions: PropTypes.objectOf(PropTypes.func),
  layers: PropTypes.array,
  collapsed: PropTypes.bool,
  onChangeCollapsed: PropTypes.func,
  onChangeLegendRowCollapsed: PropTypes.func,
  onChangeVisibility: PropTypes.func,
  onChangeOpacity: PropTypes.func,
  title: PropTypes.string,
  locale: PropTypes.string
};

export default LegendWidgetUI;

const Header = styled(Grid)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: theme.spacing(4.5)
}));

const HeaderButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'collapsed'
})(({ theme, collapsed }) => ({
  flex: '1 1 auto',
  justifyContent: 'space-between',
  padding: theme.spacing(0.75, 1.25, 0.75, 3),
  borderTop: collapsed ? 'none' : `1px solid ${theme.palette.divider}`,
  cursor: 'pointer'
}));

const CollapseWrapper = styled(Collapse)(() => ({
  '.MuiCollapse-wrapperInner': {
    maxHeight: 'max(350px, 80vh)',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
}));

function LegendContainer({ isSingle, children, collapsed, onChangeCollapsed, title }) {
  const wrapper = createRef();

  const handleExpandClick = () => {
    if (onChangeCollapsed) onChangeCollapsed(!collapsed);
  };

  return isSingle ? (
    children
  ) : (
    <>
      <CollapseWrapper ref={wrapper} in={!collapsed} timeout='auto' unmountOnExit>
        {children}
      </CollapseWrapper>
      <Header container>
        <HeaderButton
          collapsed={collapsed}
          endIcon={<LayersIcon />}
          onClick={handleExpandClick}
        >
          <Typography variant='subtitle1'>{title}</Typography>
        </HeaderButton>
      </Header>
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
  onChangeCollapsed,
  locale
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
          options = [],
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
              locale={locale}
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
