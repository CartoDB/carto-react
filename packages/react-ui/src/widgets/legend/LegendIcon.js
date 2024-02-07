import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '../../components/atoms/Typography';
import { ICON_SIZE_MEDIUM } from '../../theme/themeConstants';

function LegendIcon({ legend }) {
  const { labels = [], icons = [] } = legend;
  return (
    <Box
      component='ul'
      data-testid='icon-legend'
      sx={{ m: 0, p: 0, pb: 1, display: 'flex', flexDirection: 'column' }}
    >
      {labels.map((label, idx) => (
        <Box key={label} component='li' sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              mr: 1.5,
              width: ICON_SIZE_MEDIUM,
              height: ICON_SIZE_MEDIUM,
              '& img': {
                margin: 'auto',
                display: 'block'
              }
            }}
          >
            <img src={icons[idx]} alt={label} width='autio' height={ICON_SIZE_MEDIUM} />
          </Box>
          <Typography lineHeight='24px' variant='overlineDelicate'>
            {label}
          </Typography>
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
