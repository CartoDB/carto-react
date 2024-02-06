import { Box, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import LegendCategories from '../legend/LegendCategories';
import LegendIcon from '../legend/LegendIcon';
import LegendRamp from '../legend/LegendRamp';
import LegendProportion from '../legend/LegendProportion';
import { LEGEND_TYPES } from '../legend/LegendWidgetUI';

const legendTypeMap = {
  [LEGEND_TYPES.CATEGORY]: LegendCategories,
  [LEGEND_TYPES.ICON]: LegendIcon,
  [LEGEND_TYPES.BINS]: LegendRamp,
  [LEGEND_TYPES.PROPORTION]: LegendProportion,
  [LEGEND_TYPES.CONTINUOUS_RAMP]: LegendRamp
};

/**
 * @param {object} props
 * @param {import('../legend/LegendWidgetUI').LegendLayerVariableData} props.legend - legend variable data.
 * @returns {React.ReactNode}
 */
function LegendUnknown({ legend }) {
  if (legend.select) {
    return null;
  }

  return (
    <Typography variant='body2' color='textSecondary' component='p'>
      Legend type {legend.type} not supported
    </Typography>
  );
}

/**
 * @param {object} props
 * @param {import('../legend/LegendWidgetUI').LegendLayerData} props.layer - Layer object from redux store.
 * @param {import('../legend/LegendWidgetUI').LegendLayerVariableData} props.legend - legend variable data.
 * @param {Object.<string, import('../legend/LegendWidgetUI').CustomLegendComponent>} props.customLegendTypes - Map from legend type to legend component that allows to customise additional legend types that can be rendered.
 * @param {(selection: unknown) => void} props.onChangeSelection - Callback function for legend options change.
 * @returns {React.ReactNode}
 */
export default function LegendLayerVariable({
  layer,
  legend,
  customLegendTypes,
  onChangeSelection
}) {
  const type = legend.type;
  const TypeComponent = legendTypeMap[type] || customLegendTypes[type] || LegendUnknown;
  const selectOptions = legend.select?.options || [];

  return (
    <>
      {legend.select ? (
        <Box>
          <Typography variant='caption'>{legend.select.label}</Typography>
          <Select
            value={legend.select.value}
            renderValue={(value) =>
              selectOptions.find((option) => option.value === value)?.label || value
            }
            onChange={(ev) => onChangeSelection(ev.target.value)}
            MenuProps={{
              transformOrigin: { vertical: 'bottom', horizontal: 'left' },
              anchorOrigin: { vertical: 'top', horizontal: 'left' },
              PaperProps: {
                style: {
                  maxHeight: 240
                }
              }
            }}
          >
            {selectOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
        </Box>
      ) : null}
      <TypeComponent layer={layer} legend={legend} />
    </>
  );
}
