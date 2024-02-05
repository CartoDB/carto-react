import PropTypes from 'prop-types';
import {
  Box,
  Collapse,
  IconButton,
  InputAdornment,
  Popover,
  Slider,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { LEGEND_TYPES, LegendCategories, LegendIcon, LegendRamp } from '@carto/react-ui';
import EyeIcon from '@mui/icons-material/VisibilityOutlined';
import EyeOffIcon from '@mui/icons-material/VisibilityOffOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { styles } from './LegendWidgetUI.styles';

const EMPTY_OBJ = {};

/**
 * Receives configuration options, send change events and renders a legend item
 * @param {object} props
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
          <LegendItemTitle visible={visible} title={layer.title} />
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
          <OpacityControl
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
 * Returns a number whose value is limited to the given range.
 * @param {Number} val The initial value
 * @param {Number} min The lower boundary
 * @param {Number} max The upper boundary
 * @returns {Number} A number in the range (min, max)
 */
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

/**
 * @param {object} props
 * @param {React.MutableRefObject} props.menuRef - Ref object for the menu anchor
 * @param {boolean} props.open - Open state of the popover
 * @param {(open: boolean) => void} props.toggleOpen - Callback function for open state change
 * @param {number} props.opacity - Opacity value
 * @param {(opacity: number) => void} props.onChange - Callback function for opacity change
 * @returns {React.ReactNode}
 */
function OpacityControl({ menuRef, open, toggleOpen, opacity, onChange }) {
  function handleTextFieldChange(e) {
    const newOpacity = parseInt(e.target.value || '0');
    const clamped = clamp(newOpacity, 0, 100);
    onChange(clamped / 100);
  }

  return (
    <>
      <Tooltip title='Layer opacity'>
        <IconButton
          size='small'
          aria-label='Toggle opacity control'
          color={open ? 'primary' : 'default'}
          onClick={() => toggleOpen(!open)}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM17.625 19V17.625H19V15.375H17.625V13.125H19V10.875H17.625V8.625H19V6.375H17.625V5H15.375V6.375H13.125V5H10.875V6.375H8.625V5H6.375V6.375H5V8.625H6.375V10.875H5V13.125H6.375V15.375H5V17.625H6.375V19H8.625V17.625H10.875V19H13.125V17.625H15.375V19H17.625ZM15.375 15.375H17.625V17.625H15.375V15.375ZM13.125 15.375H15.375V13.125H17.625V10.875H15.375V8.625H17.625V6.375H15.375V8.625H13.125V6.375H10.875V8.625H8.625V6.375H6.375V8.625H8.625V10.875H6.375V13.125H8.625V15.375H6.375V17.625H8.625V15.375H10.875V17.625H13.125V15.375ZM13.125 13.125H15.375V10.875H13.125V8.625H10.875V10.875H8.625V13.125H10.875V15.375H13.125V13.125ZM13.125 13.125H10.875V10.875H13.125V13.125Z'
            />
          </svg>
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        onClose={() => toggleOpen(false)}
        anchorEl={menuRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        slotProps={{
          root: {
            sx: { transform: 'translate(-12px, 36px)' }
          }
        }}
      >
        <Box sx={styles.opacityControl}>
          <Slider
            value={opacity * 100}
            onChange={(_, v) => onChange(v / 100)}
            min={0}
            max={100}
            step={1}
          />
          <TextField
            value={Math.round(opacity * 100)}
            size='small'
            onChange={handleTextFieldChange}
            type='number'
            sx={styles.opacityInput}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              style: { appearance: 'textfield' }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' sx={{ margin: 0 }}>
                  {' '}
                  %
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Popover>
    </>
  );
}

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

/**
 * @param {object} props
 * @param {import('../legend/LegendWidgetUI').LegendData} props.layer - Layer object from redux store.
 * @param {import('../legend/LegendWidgetUI').LegendItemData} props.legend - legend variable data.
 * @param {({ id, selection }: { id: string, selection: unknown }) => void} props.onChangeSelection - Callback function for legend options change.
 * @returns {React.ReactNode}
 */
function LegendItemVariable({ layer, legend, onChangeSelection }) {
  const type = legend.type;

  let typeComponent = null;
  if (type === LEGEND_TYPES.CATEGORY) {
    typeComponent = <LegendCategories layer={layer} legend={layer.legend} />;
  }
  if (type === LEGEND_TYPES.ICON) {
    typeComponent = <LegendIcon layer={layer} legend={layer.legend} />;
  }
  if (type === LEGEND_TYPES.BINS) {
    typeComponent = <LegendRamp layer={layer} legend={layer.legend} />;
  }

  return (
    <>
      <div id='legend-option-selector'></div>
      {typeComponent}
    </>
  );
}
