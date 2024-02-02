import PropTypes from 'prop-types';
import {
  Box,
  Collapse,
  IconButton,
  InputAdornment,
  Paper,
  Popover,
  Slider,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { LEGEND_TYPES, LegendCategories, LegendIcon, LegendRamp } from '@carto/react-ui';
import EyeIcon from '@mui/icons-material/VisibilityOutlined';
import EyeOffIcon from '@mui/icons-material/VisibilityOffOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LayerIcon from '@mui/icons-material/LayersOutlined';
import { useLayoutEffect, useRef, useState } from 'react';

const EMPTY_OBJ = {};
const EMPTY_FN = () => {};
const EMPTY_ARR = [];
const LEGEND_WIDTH = 240;

/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {Number} val The initial value
 * @param {Number} min The lower boundary
 * @param {Number} max The upper boundary
 * @returns {Number} A number in the range (min, max)
 */
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export const styles = {
  legendToggleOpen: {
    borderBottom: (theme) => `1px solid ${theme.palette.divider}`
  },
  legendToggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    pl: 2,
    pr: 1,
    py: 1
  },
  legendItemList: {
    overflow: 'auto',
    maxHeight: `calc(100% - 12px)`
  },
  legendItem: {
    '&:not(:first-of-type)': {
      borderTop: (theme) => `1px solid ${theme.palette.divider}`
    }
  },
  legendItemHeader: {
    p: 1.5,
    pr: 2,
    gap: 0.5,
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0
  },
  legendItemBody: {
    px: 2
    // '& [data-testid="categories-legend"] > .MuiGrid-root': {
    //   paddingTop: '6px',
    //   paddingBottom: '6px',
    // },
    // '& [data-testid="icon-legend"] > .MuiGrid-root': {
    //   paddingTop: '2px',
    //   paddingBottom: '2px',
    //   '& > .MuiBox-root': {
    //     width: '20px',
    //     height: '20px',
    //     marginRight: '8px',
    //   },
    //   '& img': {
    //     display: 'block',
    //     margin: 'auto',
    //     width: 'auto',
    //     height: '20px',
    //   },
    // },
  },
  opacityControl: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
    p: 1,
    minWidth: LEGEND_WIDTH - 32
  },
  layerOptions: {
    background: (theme) => theme.palette.background.default,
    px: 2,
    py: 1,
    m: 2
  },
  opacityInput: {
    display: 'flex',
    width: '60px',
    flexShrink: 0
  },
  'top-left': {
    top: 0,
    left: 0
  },
  'top-right': {
    top: 0,
    right: 0
  },
  'bottom-left': {
    bottom: 0,
    left: 0
  },
  'bottom-right': {
    bottom: 0,
    right: 0
  }
};

/**
 * @param {object} props
 * @param {Object.<string, Function>} [props.customLegendTypes] - Allow to customise by default legend types that can be rendered.
 * @param {import('../legend/LegendWidgetUI').LegendData[]} [props.layers] - Array of layer objects from redux store.
 * @param {boolean} [props.collapsed] - Collapsed state for whole legend widget.
 * @param {(collapsed: boolean) => void} props.onChangeCollapsed - Callback function for collapsed state change.
 * @param {({ id, collapsed }: { id: string, collapsed: boolean }) => void} props.onChangeLegendRowCollapsed - Callback function for layer visibility change.
 * @param {({ id, opacity }: { id: string, opacity: number }) => void} props.onChangeOpacity - Callback function for layer opacity change.
 * @param {({ id, visible }: { id: string, visible: boolean }) => void} props.onChangeVisibility - Callback function for layer collapsed state change.
 * @param {string[]} [props.layerOrder] - Array of layer identifiers. Defines the order of layer legends. [] by default.
 * @param {string} [props.title] - Title of the toggle button when widget is open.
 * @param {'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'} [props.position] - Position of the widget.
 * @param {number} [props.maxZoom] - Global maximum zoom level for the map.
 * @param {number} [props.minZoom] - Global minimum zoom level for the map.
 * @returns {React.ReactNode}
 */
function NewLegendWidgetUI({
  customLegendTypes = EMPTY_OBJ,
  layers = EMPTY_ARR,
  collapsed = true,
  onChangeCollapsed = EMPTY_FN,
  onChangeVisibility = EMPTY_FN,
  onChangeOpacity = EMPTY_FN,
  onChangeLegendRowCollapsed = EMPTY_FN,
  layerOrder,
  title,
  position = 'bottom-right',
  maxZoom = 21,
  minZoom = 0
} = {}) {
  const rootSx = {
    ...styles[position],
    position: 'absolute',
    width: collapsed ? undefined : LEGEND_WIDTH,
    maxHeight: 'calc(100% - 120px)',
    // height: collapsed ? undefined : '100%',
    background: '#fafafa',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <Paper elevation={3} sx={rootSx}>
      {collapsed ? (
        <Tooltip title='Open legend'>
          <IconButton onClick={() => onChangeCollapsed(false)}>
            <LayerIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Box
          sx={{
            ...styles.legendToggle,
            ...(!collapsed && styles.legendToggleOpen)
          }}
        >
          <Typography variant='caption' sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Tooltip title='Close'>
            <IconButton size='small' onClick={() => onChangeCollapsed(true)}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <Box sx={{ ...styles.legendItemList, width: collapsed ? 0 : undefined }}>
        <Collapse in={!collapsed} timeout={500}>
          {layers.map((l) => (
            <LegendItem
              key={l.id}
              layer={l}
              collapsed={collapsed}
              onChangeCollapsed={onChangeLegendRowCollapsed}
              onChangeOpacity={onChangeOpacity}
              onChangeVisibility={onChangeVisibility}
              maxZoom={maxZoom}
              minZoom={minZoom}
            />
          ))}
        </Collapse>
      </Box>
    </Paper>
  );
}

NewLegendWidgetUI.defaultProps = {
  layers: [],
  customLegendTypes: {},
  collapsed: true,
  title: 'Layers',
  position: 'bottom-right'
};

NewLegendWidgetUI.propTypes = {
  customLegendTypes: PropTypes.objectOf(PropTypes.func),
  layers: PropTypes.array,
  collapsed: PropTypes.bool.isRequired,
  onChangeCollapsed: PropTypes.func.isRequired,
  onChangeLegendRowCollapsed: PropTypes.func.isRequired,
  onChangeVisibility: PropTypes.func.isRequired,
  onChangeOpacity: PropTypes.func.isRequired,
  layerOrder: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  position: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right'])
};

export default NewLegendWidgetUI;

/**
 * Receives configuration options, send change events and renders a legend item
 * @param {object} props
 * @param {import('../legend/LegendWidgetUI').LegendData} props.layer - Layer object from redux store.
 * @param {({ id, collapsed }: { id: string, collapsed: boolean }) => void} props.onChangeCollapsed - Callback function for layer visibility change.
 * @param {({ id, opacity }: { id: string, opacity: number }) => void} props.onChangeOpacity - Callback function for layer opacity change.
 * @param {({ id, visible }: { id: string, visible: boolean }) => void} props.onChangeVisibility - Callback function for layer collapsed state change.
 * @param {boolean} [props.collapsed] - Collapsed state for the whole legend.
 * @param {number} [props.maxZoom] - Global maximum zoom level for the map.
 * @param {number} [props.minZoom] - Global minimum zoom level for the map.
 * @returns {React.ReactNode}
 */
export function LegendItem({
  layer = EMPTY_OBJ,
  onChangeCollapsed,
  onChangeOpacity,
  onChangeVisibility,
  collapsed: legendCollapsed,
  maxZoom,
  minZoom
}) {
  // layer legend defaults as defined here: https://docs.carto.com/carto-for-developers/carto-for-react/library-reference/widgets#legendwidget
  const id = layer?.id;
  const type = layer?.legend?.type;
  const visible = layer?.visible ?? true;
  const switchable = layer.switchable ?? true;
  const collapsed = layer.collapsed ?? false;
  const collapsible = layer.collapsible ?? true;
  const opacity = layer.opacity ?? 1;
  const showOpacityControl = layer.showOpacityControl ?? true;

  const isExpanded = visible && !collapsed;
  const collapseIcon = isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />;

  const [opacityOpen, setOpacityOpen] = useState(false);
  const menuAnchorRef = useRef(null);
  const layerHasZoom = layer?.minZoom !== undefined || layer?.maxZoom !== undefined;
  const showZoomNote =
    layerHasZoom && (layer.minZoom > minZoom || layer.maxZoom < maxZoom);

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
          <LegendItemTitle
            visible={legendCollapsed ? false : visible}
            title={layer.title}
          />
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
        {showOpacityControl && (
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
      <Collapse timeout={100} sx={styles.legendItemBody} in={isExpanded}>
        <Box pb={2}>
          {type === LEGEND_TYPES.CATEGORY && (
            <LegendCategories layer={layer} legend={layer.legend} />
          )}
          {type === LEGEND_TYPES.ICON && (
            <LegendIcon layer={layer} legend={layer.legend} />
          )}
          {type === LEGEND_TYPES.BINS && (
            <LegendRamp layer={layer} legend={layer.legend} />
          )}
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

/**
 * @param {object} props
 * @param {number} props.opacity - Opacity value
 * @param {(opacity: number) => void} props.onChange - Callback function for opacity change
 * @param {React.MutableRefObject} props.menuRef - Ref object for the menu anchor
 * @param {boolean} props.open - Open state of the popover
 * @param {(open: boolean) => void} props.toggleOpen - Callback function for open state change
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
