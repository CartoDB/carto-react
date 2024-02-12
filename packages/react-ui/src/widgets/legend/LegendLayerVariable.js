import React from 'react';
import { Box, ListItemText, MenuItem, Select } from '@mui/material';
import LegendCategories from './legend-types/LegendCategories';
import LegendIcon from './legend-types/LegendIcon';
import LegendRamp from './legend-types/LegendRamp';
import LegendProportion from './legend-types/LegendProportion';
import LEGEND_TYPES from './legend-types/LegendTypes';
import { useIntl } from 'react-intl';
import useImperativeIntl from '../../hooks/useImperativeIntl';
import Typography from '../../components/atoms/Typography';

const legendTypeMap = {
  [LEGEND_TYPES.CATEGORY]: LegendCategories,
  [LEGEND_TYPES.PROPORTION]: LegendProportion,
  [LEGEND_TYPES.ICON]: LegendIcon,
  [LEGEND_TYPES.BINS]: (props) => <LegendRamp {...props} isContinuous={false} />,
  [LEGEND_TYPES.CONTINUOUS_RAMP]: (props) => <LegendRamp {...props} isContinuous={true} />
};

/**
 * @param {object} props
 * @param {import('./LegendWidgetUI').LegendLayerVariableBase} props.legend - legend variable data.
 * @returns {React.ReactNode}
 */
function LegendUnknown({ legend }) {
  const intl = useIntl();
  const intlConfig = useImperativeIntl(intl);

  if (legend.select || !legend.type) {
    return null;
  }

  return (
    <Typography variant='body2' color='textSecondary' component='p'>
      {legend.type} {intlConfig.formatMessage({ id: 'c4r.widgets.legend.notSupported' })}.
    </Typography>
  );
}

/**
 * @param {import('./LegendWidgetUI').LegendLayerVariableData} legend - legend variable data.
 * @returns {string}
 */
function getLegendSubtitle(legend) {
  if (legend.type === LEGEND_TYPES.PROPORTION) {
    return 'c4r.widgets.legend.subtitles.proportion';
  }
  if (legend.type === LEGEND_TYPES.ICON || !!legend.customMarkers) {
    return 'c4r.widgets.legend.subtitles.icon';
  }
  if (legend.isStrokeColor) {
    return 'c4r.widgets.legend.subtitles.strokeColor';
  }
  return 'c4r.widgets.legend.subtitles.color';
}

/**
 * @param {object} props
 * @param {import('./LegendWidgetUI').LegendLayerData} props.layer - Layer object from redux store.
 * @param {import('./LegendWidgetUI').LegendLayerVariableData} props.legend - legend variable data.
 * @param {Object.<string, import('./LegendWidgetUI').CustomLegendComponent>} props.customLegendTypes - Map from legend type to legend component that allows to customise additional legend types that can be rendered.
 * @param {(selection: unknown) => void} props.onChangeSelection - Callback function for legend options change.
 * @returns {React.ReactNode}
 */
export default function LegendLayerVariable({
  layer,
  legend,
  customLegendTypes,
  onChangeSelection
}) {
  const intl = useIntl();
  const intlConfig = useImperativeIntl(intl);

  const type = legend.type;
  const TypeComponent = legendTypeMap[type] || customLegendTypes[type] || LegendUnknown;
  const selectOptions = legend.select?.options || [];

  return (
    <Box data-testid='legend-layer-variable' px={2}>
      {legend.attr ? (
        <Box pb={1}>
          <Typography
            gutterBottom
            variant='overlineDelicate'
            color='textSecondary'
            component='p'
          >
            {intlConfig.formatMessage({ id: getLegendSubtitle(legend) })}
          </Typography>
          <Typography variant='caption' component='p'>
            {legend.attr}
          </Typography>
        </Box>
      ) : null}
      {legend.select ? (
        <Box pb={1}>
          <Typography variant='caption' weight='medium' component='p'>
            {legend.select.label}
          </Typography>
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
    </Box>
  );
}
