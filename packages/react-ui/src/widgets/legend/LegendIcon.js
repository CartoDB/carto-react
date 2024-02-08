import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { ICON_SIZE_MEDIUM } from '../../theme/themeConstants';
import { styles } from '../new-legend/LegendWidgetUI.styles';
import LegendLayerTitle from '../new-legend/LegendLayerTitle';

function LegendIcon({ legend }) {
  const { labels = [], icons = [] } = legend;
  return (
    <Box component='ul' data-testid='icon-legend' sx={styles.legendVariableList}>
      {labels.map((label, idx) => (
        <Box key={label} component='li' sx={styles.legendVariableListItem}>
          <Box sx={styles.legendIconWrapper}>
            <img src={icons[idx]} alt={label} width='autio' height={ICON_SIZE_MEDIUM} />
          </Box>
          <LegendLayerTitle
            visible
            title={label}
            typographyProps={{ variant: 'overlineDelicate' }}
          />
        </Box>
      ))}
    </Box>
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
