import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Drawer, IconButton, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LayerIcon from '@mui/icons-material/LayersOutlined';
import { LegendContent, LegendRoot, LegendToggleHeader } from './LegendWidgetUI.styles';
import LegendLayer from './LegendLayer';
import { useIntl } from 'react-intl';
import useImperativeIntl from '../../hooks/useImperativeIntl';

const EMPTY_OBJ = {};
const EMPTY_FN = () => {};
const EMPTY_ARR = [];

/**
 * @param {object} props
 * @param {Object.<string, import('./LegendWidgetUI').CustomLegendComponent>} [props.customLegendTypes] - Allow to customise by default legend types that can be rendered.
 * @param {import('./LegendWidgetUI').LegendLayerData[]} [props.layers] - Array of layer objects from redux store.
 * @param {boolean} [props.collapsed] - Collapsed state for whole legend widget.
 * @param {(collapsed: boolean) => void} [props.onChangeCollapsed] - Callback function for collapsed state change.
 * @param {({ id, collapsed }: { id: string, collapsed: boolean }) => void} [props.onChangeLegendRowCollapsed] - Callback function for layer visibility change.
 * @param {({ id, opacity }: { id: string, opacity: number }) => void} [props.onChangeOpacity] - Callback function for layer opacity change.
 * @param {({ id, visible }: { id: string, visible: boolean }) => void} [props.onChangeVisibility] - Callback function for layer collapsed state change.
 * @param {({ id, index, selection }: { id: string, index: number, selection: unknown }) => void} props.onChangeSelection - Callback function for layer variable selection change.
 * @param {string} [props.title] - Title of the toggle button when widget is open.
 * @param {number} [props.maxZoom] - Global maximum zoom level for the map.
 * @param {number} [props.minZoom] - Global minimum zoom level for the map.
 * @param {number} [props.currentZoom] - Current zoom level for the map.
 * @param {boolean} [props.isMobile] - Whether the widget is displayed on a mobile device.
 * @param {import('@mui/system').SxProps<import('@mui/system').Theme>} [props.sx] - Style object for the root component.
 * @returns {React.ReactNode}
 */
function LegendWidgetUI({
  customLegendTypes = EMPTY_OBJ,
  layers = EMPTY_ARR,
  collapsed = false,
  onChangeCollapsed = EMPTY_FN,
  onChangeVisibility = EMPTY_FN,
  onChangeOpacity = EMPTY_FN,
  onChangeLegendRowCollapsed = EMPTY_FN,
  onChangeSelection = EMPTY_FN,
  title,
  maxZoom = 20,
  minZoom = 0,
  currentZoom,
  isMobile,
  sx
} = {}) {
  const intl = useIntl();
  const intlConfig = useImperativeIntl(intl);
  const isSingle = layers.length === 1;

  const legendToggleHeader = (
    <LegendToggleHeader collapsed={collapsed}>
      <Typography variant='caption' sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      <Tooltip title={intlConfig.formatMessage({ id: 'c4r.widgets.legend.close' })}>
        <IconButton size='small' onClick={() => onChangeCollapsed(true)}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </LegendToggleHeader>
  );
  const legendToggleButton = (
    <Tooltip title={intlConfig.formatMessage({ id: 'c4r.widgets.legend.open' })}>
      <IconButton aria-label={title} onClick={() => onChangeCollapsed(false)}>
        <LayerIcon />
      </IconButton>
    </Tooltip>
  );

  if (isSingle && !isMobile) {
    return (
      <LegendRoot sx={sx} elevation={3} collapsed={collapsed || isMobile}>
        <LegendContent>
          <LegendLayer
            layer={layers[0]}
            onChangeCollapsed={onChangeLegendRowCollapsed}
            onChangeOpacity={onChangeOpacity}
            onChangeVisibility={onChangeVisibility}
            onChangeSelection={onChangeSelection}
            maxZoom={maxZoom}
            minZoom={minZoom}
            currentZoom={currentZoom}
            customLegendTypes={customLegendTypes}
          />
        </LegendContent>
      </LegendRoot>
    );
  }

  return (
    <LegendRoot sx={sx} elevation={3} collapsed={collapsed || isMobile}>
      {isMobile ? (
        <>
          {legendToggleButton}
          <Drawer
            anchor='bottom'
            open={!collapsed}
            onClose={() => onChangeCollapsed(true)}
          >
            {legendToggleHeader}
            <LegendContent>
              {layers.map((l) => (
                <LegendLayer
                  key={l.id}
                  layer={l}
                  onChangeCollapsed={onChangeLegendRowCollapsed}
                  onChangeOpacity={onChangeOpacity}
                  onChangeVisibility={onChangeVisibility}
                  onChangeSelection={onChangeSelection}
                  maxZoom={maxZoom}
                  minZoom={minZoom}
                  currentZoom={currentZoom}
                  customLegendTypes={customLegendTypes}
                />
              ))}
            </LegendContent>
          </Drawer>
        </>
      ) : (
        <>
          {collapsed ? legendToggleButton : legendToggleHeader}
          <LegendContent width={collapsed ? 0 : undefined}>
            <Collapse unmountOnExit in={!collapsed} timeout={500}>
              {layers.map((l) => (
                <LegendLayer
                  key={l.id}
                  layer={l}
                  onChangeCollapsed={onChangeLegendRowCollapsed}
                  onChangeOpacity={onChangeOpacity}
                  onChangeVisibility={onChangeVisibility}
                  onChangeSelection={onChangeSelection}
                  maxZoom={maxZoom}
                  minZoom={minZoom}
                  currentZoom={currentZoom}
                  customLegendTypes={customLegendTypes}
                />
              ))}
            </Collapse>
          </LegendContent>
        </>
      )}
    </LegendRoot>
  );
}

LegendWidgetUI.defaultProps = {
  layers: EMPTY_ARR,
  customLegendTypes: EMPTY_OBJ,
  collapsed: false,
  title: 'Layers',
  onChangeCollapsed: EMPTY_FN,
  onChangeLegendRowCollapsed: EMPTY_FN,
  onChangeVisibility: EMPTY_FN,
  onChangeOpacity: EMPTY_FN,
  onChangeSelection: EMPTY_FN
};

LegendWidgetUI.propTypes = {
  customLegendTypes: PropTypes.objectOf(PropTypes.func),
  layers: PropTypes.array,
  collapsed: PropTypes.bool,
  onChangeCollapsed: PropTypes.func,
  onChangeLegendRowCollapsed: PropTypes.func,
  onChangeVisibility: PropTypes.func,
  onChangeOpacity: PropTypes.func,
  onChangeSelection: PropTypes.func,
  title: PropTypes.string,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  currentZoom: PropTypes.number,
  isMobile: PropTypes.bool
};

export default LegendWidgetUI;
