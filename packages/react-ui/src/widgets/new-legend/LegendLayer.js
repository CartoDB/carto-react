import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Collapse, IconButton, Tooltip, Typography } from '@mui/material';
import EyeIcon from '@mui/icons-material/VisibilityOutlined';
import EyeOffIcon from '@mui/icons-material/VisibilityOffOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { styles } from './LegendWidgetUI.styles';
import LegendOpacityControl from './LegendOpacityControl';
import LegendLayerTitle from './LegendLayerTitle';
import LegendLayerVariable from './LegendLayerVariable';
import { useIntl } from 'react-intl';
import useImperativeIntl from '../../hooks/useImperativeIntl';

const EMPTY_OBJ = {};

/**
 * Receives configuration options, send change events and renders a legend item
 * @param {object} props
 * @param {Object.<string, import('./LegendWidgetUI').CustomLegendComponent>} props.customLegendTypes - Allow to customise by default legend types that can be rendered.
 * @param {import('./LegendWidgetUI').LegendLayerData} props.layer - Layer object from redux store.
 * @param {({ id, collapsed }: { id: string, collapsed: boolean }) => void} props.onChangeCollapsed - Callback function for layer visibility change.
 * @param {({ id, opacity }: { id: string, opacity: number }) => void} props.onChangeOpacity - Callback function for layer opacity change.
 * @param {({ id, visible }: { id: string, visible: boolean }) => void} props.onChangeVisibility - Callback function for layer collapsed state change.
 * @param {({ id, index, selection }: { id: string, index: number, selection: unknown }) => void} props.onChangeSelection - Callback function for layer selection change.
 * @param {number} props.maxZoom - Global maximum zoom level for the map.
 * @param {number} props.minZoom - Global minimum zoom level for the map.
 * @param {number} props.currentZoom - Current zoom level for the map.
 * @returns {React.ReactNode}
 */
export default function LegendLayer({
  customLegendTypes = EMPTY_OBJ,
  layer = EMPTY_OBJ,
  onChangeCollapsed,
  onChangeOpacity,
  onChangeVisibility,
  onChangeSelection,
  maxZoom,
  minZoom,
  currentZoom
}) {
  const intl = useIntl();
  const intlConfig = useImperativeIntl(intl);
  const menuAnchorRef = useRef(null);
  const [opacityOpen, setOpacityOpen] = useState(false);

  // layer legend defaults as defined here: https://docs.carto.com/carto-for-developers/carto-for-react/library-reference/widgets#legendwidget
  const id = layer.id;
  const title = layer.title;
  const visible = layer.visible ?? true;
  const switchable = layer.switchable ?? true;
  const collapsed = layer.collapsed ?? false;
  const collapsible = layer.collapsible ?? true;
  const opacity = layer.opacity ?? 1;
  const showOpacityControl = layer.showOpacityControl ?? true;
  const isExpanded = visible && !collapsed;
  const collapseIcon = isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />;

  const layerHasZoom = layer?.minZoom !== undefined || layer?.maxZoom !== undefined;
  const showZoomNote =
    layerHasZoom && (layer.minZoom > minZoom || layer.maxZoom < maxZoom);
  const outsideCurrentZoom = currentZoom < layer.minZoom || currentZoom > layer.maxZoom;

  const zoomHelperText = getZoomHelperText({
    intl: intlConfig,
    minZoom,
    maxZoom,
    layerMinZoom: layer.minZoom,
    layerMaxZoom: layer.maxZoom
  });
  const helperText = layer.helperText ?? (showZoomNote ? zoomHelperText : '');

  const legendLayerVariables = useMemo(() => {
    if (!layer.legend) {
      return [];
    }
    return Array.isArray(layer.legend) ? layer.legend : [layer.legend];
  }, [layer.legend]);

  return (
    <Box
      data-testid='legend-layer'
      aria-label={title}
      component='section'
      sx={{
        '&:not(:first-of-type)': {
          borderTop: (theme) => `1px solid ${theme.palette.divider}`
        }
      }}
    >
      <Box ref={menuAnchorRef} component='header' sx={styles.legendItemHeader}>
        {collapsible && (
          <IconButton
            size='small'
            aria-label={intlConfig.formatMessage({
              id: collapsed ? 'c4r.widgets.legend.expand' : 'c4r.widgets.legend.collapse'
            })}
            disabled={!visible}
            onClick={() => onChangeCollapsed({ id, collapsed: !collapsed })}
          >
            {collapseIcon}
          </IconButton>
        )}
        <Box flexGrow={1} sx={{ minWidth: 0, flexShrink: 1 }}>
          <LegendLayerTitle visible={visible} title={title} />
          {showZoomNote && (
            <Tooltip
              title={intlConfig.formatMessage({
                id: 'c4r.widgets.legend.zoomLevelTooltip'
              })}
            >
              <Typography
                color={visible ? 'textPrimary' : 'textSecondary'}
                variant='caption'
                component='p'
              >
                {intlConfig.formatMessage({ id: 'c4r.widgets.legend.zoomLevel' })}{' '}
                {layer.minZoom} - {layer.maxZoom}
              </Typography>
            </Tooltip>
          )}
        </Box>
        {showOpacityControl && visible && (
          <LegendOpacityControl
            menuRef={menuAnchorRef}
            open={opacityOpen}
            toggleOpen={setOpacityOpen}
            opacity={opacity}
            onChange={(opacity) => onChangeOpacity({ id, opacity })}
          />
        )}
        {switchable && (
          <Tooltip
            title={intlConfig.formatMessage({
              id: visible
                ? 'c4r.widgets.legend.hideLayer'
                : 'c4r.widgets.legend.showLayer'
            })}
          >
            <IconButton
              size='small'
              onClick={() =>
                onChangeVisibility({
                  id,
                  collapsed: visible ? collapsed : false,
                  visible: !visible
                })
              }
            >
              {visible ? <EyeIcon /> : <EyeOffIcon />}
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Collapse unmountOnExit timeout={100} in={isExpanded}>
        <Box
          data-testid='legend-layer-variable-list'
          sx={{
            ...styles.layerVariablesList,
            opacity: outsideCurrentZoom ? 0.5 : 1
          }}
        >
          {legendLayerVariables.map((legend, index) => (
            <LegendLayerVariable
              key={`${legend.type}-${index}`}
              legend={legend}
              layer={layer}
              customLegendTypes={customLegendTypes}
              onChangeSelection={(selection) =>
                onChangeSelection({ id, index, selection })
              }
            />
          ))}
        </Box>
        {helperText && (
          <Typography variant='caption' color='textSecondary' component='p' sx={{ p: 2 }}>
            {helperText}
          </Typography>
        )}
      </Collapse>
    </Box>
  );
}

LegendLayer.propTypes = {
  customLegendTypes: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  onChangeCollapsed: PropTypes.func.isRequired,
  onChangeOpacity: PropTypes.func.isRequired,
  onChangeVisibility: PropTypes.func.isRequired,
  onChangeSelection: PropTypes.func.isRequired,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  currentZoom: PropTypes.number
};
LegendLayer.defaultProps = {
  maxZoom: 21,
  minZoom: 0,
  currentZoom: 0
};

/**
 * @param {object} props
 * @param {import('react-intl').IntlShape} props.intl - React Intl object.
 * @param {number} props.minZoom - Global minimum zoom level for the map.
 * @param {number} props.maxZoom - Global maximum zoom level for the map.
 * @param {number} props.layerMinZoom - Layer minimum zoom level.
 * @param {number} props.layerMaxZoom - Layer maximum zoom level.
 * @returns {string}
 */
function getZoomHelperText({ intl, minZoom, maxZoom, layerMinZoom, layerMaxZoom }) {
  const and = intl.formatMessage({ id: 'c4r.widgets.legend.and' });
  const lowerThan = intl.formatMessage({ id: 'c4r.widgets.legend.lowerThan' });
  const greaterThan = intl.formatMessage({ id: 'c4r.widgets.legend.greaterThan' });
  const note = intl.formatMessage({ id: 'c4r.widgets.legend.zoomNote' });

  const maxZoomText = layerMaxZoom < maxZoom ? `${lowerThan} ${layerMaxZoom}` : '';
  const minZoomText = layerMinZoom > minZoom ? `${greaterThan} ${layerMinZoom}` : '';
  const texts = [maxZoomText, minZoomText].filter(Boolean).join(` ${and} `);
  return texts ? `${note} ${texts}` : '';
}
