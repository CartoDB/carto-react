import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { ICON_SIZE_MEDIUM } from '../../../theme/themeConstants';
import { LegendIconWrapper, LegendVariableList } from '../LegendWidgetUI.styles';
import LegendLayerTitle from '../LegendLayerTitle';

/**
 * @param {object} props
 * @param {import('../LegendWidgetUI').LegendLayerVariableBase & import('../LegendWidgetUI').LegendIcons} props.legend - legend variable data.
 * @returns {React.ReactNode}
 */
function LegendIcon({ legend }) {
  const { labels = [], icons = [] } = legend;
  return (
    <LegendVariableList data-testid='icon-legend'>
      {labels.map((label, idx) => (
        <Box key={label} component='li' sx={{ display: 'flex', alignItems: 'center' }}>
          <LegendIconWrapper>
            <img src={icons[idx]} alt={label} width='autio' height={ICON_SIZE_MEDIUM} />
          </LegendIconWrapper>
          <LegendLayerTitle
            visible
            title={label}
            typographyProps={{ variant: 'overlineDelicate' }}
          />
        </Box>
      ))}
    </LegendVariableList>
  );
}

LegendIcon.defaultProps = {
  legend: {
    labels: [],
    icons: []
  }
};

LegendIcon.propTypes = {
  legend: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    icons: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default LegendIcon;
