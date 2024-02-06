import PropTypes from 'prop-types';
import { Box, Collapse, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LayerIcon from '@mui/icons-material/LayersOutlined';
import { LEGEND_WIDTH, styles } from './LegendWidgetUI.styles';
import LegendItem from './LegendItem';

const EMPTY_OBJ = {};
const EMPTY_FN = () => {};
const EMPTY_ARR = [];

/**
 * @param {object} props
 * @param {Object.<string, import('../legend/LegendWidgetUI').CustomLegendComponent>} [props.customLegendTypes] - Allow to customise by default legend types that can be rendered.
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
 * @param {number} [props.currentZoom] - Current zoom level for the map.
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
  minZoom = 0,
  currentZoom
} = {}) {
  const rootSx = {
    ...styles[position],
    ...styles.root,
    width: collapsed ? undefined : LEGEND_WIDTH
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
        <Collapse unmountOnExit in={!collapsed} timeout={500}>
          {layers.map((l) => (
            <LegendItem
              key={l.id}
              layer={l}
              onChangeCollapsed={onChangeLegendRowCollapsed}
              onChangeOpacity={onChangeOpacity}
              onChangeVisibility={onChangeVisibility}
              maxZoom={maxZoom}
              minZoom={minZoom}
              currentZoom={currentZoom}
              customLegendTypes={customLegendTypes}
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
