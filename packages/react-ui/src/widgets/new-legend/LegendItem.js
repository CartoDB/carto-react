import PropTypes from 'prop-types';
import { Box, Collapse, IconButton, Tooltip, Typography } from '@mui/material';
import {
  LEGEND_TYPES,
  LegendCategories,
  LegendIcon,
  LegendProportion,
  LegendRamp
} from '@carto/react-ui';
import EyeIcon from '@mui/icons-material/VisibilityOutlined';
import EyeOffIcon from '@mui/icons-material/VisibilityOffOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { styles } from './LegendWidgetUI.styles';
import LegendOpacityControl from './LegendOpacityControl';

const EMPTY_OBJ = {};

/**
 * Receives configuration options, send change events and renders a legend item
 * @param {object} props
 * @param {Object.<string, import('../legend/LegendWidgetUI').CustomLegendComponent>} props.customLegendTypes - Allow to customise by default legend types that can be rendered.
 * @param {import('../legend/LegendWidgetUI').LegendData} props.layer - Layer object from redux store.
 * @param {({ id, collapsed }: { id: string, collapsed: boolean }) => void} props.onChangeCollapsed - Callback function for layer visibility change.
 * @param {({ id, opacity }: { id: string, opacity: number }) => void} props.onChangeOpacity - Callback function for layer opacity change.
 * @param {({ id, visible }: { id: string, visible: boolean }) => void} props.onChangeVisibility - Callback function for layer collapsed state change.
 * @param {({ id, selection }: { id: string, selection: unknown }) => void} props.onChangeSelection - Callback function for layer selection change.
 * @param {number} props.maxZoom - Global maximum zoom level for the map.
 * @param {number} props.minZoom - Global minimum zoom level for the map.
 * @param {number} props.currentZoom - Current zoom level for the map.
 * @returns {React.ReactNode}
 */
export default function LegendItem({
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
  // layer legend defaults as defined here: https://docs.carto.com/carto-for-developers/carto-for-react/library-reference/widgets#legendwidget
  const id = layer?.id;
  const title = layer?.title;
  const visible = layer?.visible ?? true;
  const switchable = layer.switchable ?? true;
  const collapsed = layer.collapsed ?? false;
  const collapsible = layer.collapsible ?? true;
  const opacity = layer.opacity ?? 1;
  const showOpacityControl = layer.showOpacityControl ?? true;

  const legendItemVariables = useMemo(() => {
    if (!layer.legend) {
      return [];
    }
    return Array.isArray(layer.legend) ? layer.legend : [layer.legend];
  }, [layer.legend]);

  const isExpanded = visible && !collapsed;
  const collapseIcon = isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />;

  const [opacityOpen, setOpacityOpen] = useState(false);
  const menuAnchorRef = useRef(null);
  const layerHasZoom = layer?.minZoom !== undefined || layer?.maxZoom !== undefined;
  const showZoomNote =
    layerHasZoom && (layer.minZoom > minZoom || layer.maxZoom < maxZoom);
  const outsideCurrentZoom = currentZoom < layer.minZoom || currentZoom > layer.maxZoom;

  const zoomHelperText = getZoomHelperText({
    minZoom,
    maxZoom,
    layerMinZoom: layer.minZoom,
    layerMaxZoom: layer.maxZoom
  });
  const helperText = layer.helperText ?? showZoomNote ? zoomHelperText : '';

  if (!layer) {
    return null;
  }

  return (
    <Box
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
            aria-label='Toggle legend item collapsed'
            disabled={!visible}
            onClick={() => onChangeCollapsed({ id, collapsed: !collapsed })}
          >
            {collapseIcon}
          </IconButton>
        )}
        <Box flexGrow={1} sx={{ minWidth: 0, flexShrink: 1 }}>
          <LegendItemTitle visible={visible} title={title} />
          {showZoomNote && (
            <Typography
              color={visible ? 'textPrimary' : 'textSecondary'}
              variant='caption'
              component='p'
            >
              Zoom level: {layer.minZoom} - {layer.maxZoom}
            </Typography>
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
          <Tooltip title={visible ? 'Hide layer' : 'Show layer'}>
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
      <Collapse unmountOnExit timeout={100} sx={styles.legendItemBody} in={isExpanded}>
        <Box pb={2} opacity={outsideCurrentZoom ? 0.5 : 1}>
          {legendItemVariables.map((legend) => (
            <LegendItemVariable
              key={legend.type}
              legend={legend}
              layer={layer}
              customLegendTypes={customLegendTypes}
              onChangeSelection={(selection) => onChangeSelection({ id, selection })}
            />
          ))}
        </Box>
        {helperText && (
          <Typography
            variant='caption'
            color='textSecondary'
            component='p'
            sx={{ py: 2 }}
          >
            {helperText}
          </Typography>
        )}
      </Collapse>
    </Box>
  );
}

LegendItem.propTypes = {
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
LegendItem.defaultProps = {
  maxZoom: 21,
  minZoom: 0,
  currentZoom: 0
};

/**
 * @param {object} props
 * @param {number} props.minZoom - Global minimum zoom level for the map.
 * @param {number} props.maxZoom - Global maximum zoom level for the map.
 * @param {number} props.layerMinZoom - Layer minimum zoom level.
 * @param {number} props.layerMaxZoom - Layer maximum zoom level.
 * @returns {string}
 */
function getZoomHelperText({ minZoom, maxZoom, layerMinZoom, layerMaxZoom }) {
  const maxZoomText = layerMaxZoom < maxZoom ? `lower than ${layerMaxZoom}` : '';
  const minZoomText = layerMinZoom > minZoom ? `greater than ${layerMinZoom}` : '';
  const texts = [maxZoomText, minZoomText].filter(Boolean).join(' and ');
  return texts ? `Note: this layer will display at zoom levels ${texts}` : '';
}

/**
 * @param {object} props
 * @param {string} props.title
 * @param {boolean} props.visible
 * @returns {React.ReactNode}
 */
function LegendItemTitle({ title, visible }) {
  const ref = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useLayoutEffect(() => {
    if (visible && ref.current) {
      const { offsetWidth, scrollWidth } = ref.current;
      setIsOverflow(offsetWidth < scrollWidth);
    }
  }, [title, visible]);

  const element = (
    <Typography
      ref={ref}
      color={visible ? 'textPrimary' : 'textSecondary'}
      variant='button'
      fontWeight={500}
      lineHeight='20px'
      component='p'
      noWrap
      sx={{ my: 0.25 }}
    >
      {title}
    </Typography>
  );

  if (!isOverflow) {
    return element;
  }

  return <Tooltip title={title}>{element}</Tooltip>;
}

const legendTypeMap = {
  [LEGEND_TYPES.CATEGORY]: LegendCategories,
  [LEGEND_TYPES.ICON]: LegendIcon,
  [LEGEND_TYPES.BINS]: LegendRamp,
  [LEGEND_TYPES.PROPORTION]: LegendProportion,
  [LEGEND_TYPES.CONTINUOUS_RAMP]: LegendRamp
};

/**
 * @param {object} props
 * @param {import('../legend/LegendWidgetUI').LegendItemData} props.legend - legend variable data.
 * @returns {React.ReactNode}
 */
function LegendUnknown({ legend }) {
  return (
    <Typography variant='body2' color='textSecondary' component='p'>
      Legend type {legend.type} not supported
    </Typography>
  );
}

/**
 * @param {object} props
 * @param {import('../legend/LegendWidgetUI').LegendData} props.layer - Layer object from redux store.
 * @param {import('../legend/LegendWidgetUI').LegendItemData} props.legend - legend variable data.
 * @param {Object.<string, import('../legend/LegendWidgetUI').CustomLegendComponent>} props.customLegendTypes - Map from legend type to legend component that allows to customise additional legend types that can be rendered.
 * @param {({ id, selection }: { id: string, selection: unknown }) => void} props.onChangeSelection - Callback function for legend options change.
 * @returns {React.ReactNode}
 */
function LegendItemVariable({ layer, legend, customLegendTypes, onChangeSelection }) {
  const type = legend.type;
  const TypeComponent = legendTypeMap[type] || customLegendTypes[type] || LegendUnknown;

  return (
    <>
      <div id='legend-option-selector'></div>
      <TypeComponent layer={layer} legend={legend} />
    </>
  );
}
