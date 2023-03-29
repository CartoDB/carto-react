import React from 'react';
import { Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '../../components/atoms/Typography';
import { ICON_SIZE_MEDIUM } from '../../theme/themeConstants';

function LegendIcon({ legend }) {
  const { labels = [], icons = [] } = legend;

  const Icons = labels.map((label, idx) => (
    <Grid key={label} container item alignItems='center'>
      <Box mr={1.5} width={ICON_SIZE_MEDIUM} height={ICON_SIZE_MEDIUM}>
        <img
          src={icons[idx]}
          alt={label}
          width={ICON_SIZE_MEDIUM}
          height={ICON_SIZE_MEDIUM}
        />
      </Box>
      <Typography variant='overlineDelicate'>{label}</Typography>
    </Grid>
  ));

  return (
    <Grid container direction='column' spacing={1} data-testid='icon-legend'>
      {Icons}
    </Grid>
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
