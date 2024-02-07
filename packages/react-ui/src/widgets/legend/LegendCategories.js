import React from 'react';
import { Box, Tooltip, styled } from '@mui/material';
import { getPalette } from '../../utils/palette';
import PropTypes from 'prop-types';
import LegendLayerTitle from '../new-legend/LegendLayerTitle';

function LegendCategories({ legend }) {
  const {
    labels = [],
    colors = [],
    isStrokeColor = false,
    customMarkers,
    maskedMarkers = true
  } = legend;

  const palette = getPalette(colors, labels.length);

  return (
    <Box
      component='ul'
      data-testid='categories-legend'
      sx={{ m: 0, p: 0, pb: 1, display: 'flex', flexDirection: 'column' }}
    >
      {labels.map((label, idx) => (
        <LegendCategoriesRow
          key={label + idx}
          isMax={false}
          label={label}
          color={palette[idx]}
          icon={
            customMarkers && Array.isArray(customMarkers)
              ? customMarkers[idx]
              : customMarkers
          }
          maskedIcon={maskedMarkers}
          isStrokeColor={isStrokeColor}
        />
      ))}
    </Box>
  );
}

LegendCategories.defaultProps = {
  legend: {
    labels: [],
    colors: [],
    isStrokeColor: false
  }
};

const ColorType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.number)
]);

LegendCategories.propTypes = {
  legend: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    colors: PropTypes.oneOfType([PropTypes.arrayOf(ColorType), PropTypes.string]),
    customMarkers: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    maskedMarkers: PropTypes.bool,
    isStrokeColor: PropTypes.bool
  }).isRequired
};

export default LegendCategories;

const getCircleStyles = ({ isMax, color, isStrokeColor, theme }) => ({
  border: '2px solid transparent',
  '&::after': {
    position: 'absolute',
    display: isMax ? 'block' : 'none',
    content: '""',
    width: theme.spacing(2),
    height: theme.spacing(2),
    border: `2px solid ${theme.palette.grey[900]}`,
    transform: 'translate(-30%, -30%)',
    borderRadius: '50%',
    boxSizing: 'content-box'
  },
  ...(isStrokeColor ? { borderColor: color } : { backgroundColor: color })
});

const getIconStyles = ({ icon, color, maskedIcon }) => ({
  maskRepeat: 'no-repeat',
  maskSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  ...(maskedIcon
    ? {
        backgroundColor: color,
        maskImage: `url(${icon})`,
        WebkitMaskImage: `url(${icon})`
      }
    : {
        backgroundColor: `rgba(0,0,0,0)`,
        backgroundImage: `url(${icon})`
      })
});

const Marker = styled(Box, {
  shouldForwardProp: (prop) =>
    !['isMax', 'icon', 'maskedIcon', 'color', 'isStrokeColor'].includes(prop)
})(({ isMax, icon, maskedIcon, color, isStrokeColor, theme }) => ({
  whiteSpace: 'nowrap',
  display: 'block',
  width: theme.spacing(1.5),
  height: theme.spacing(1.5),
  borderRadius: '50%',
  position: 'relative',
  border: '2px solid transparent',
  ...(icon
    ? getIconStyles({ icon, color, maskedIcon })
    : getCircleStyles({ isMax, color, isStrokeColor, theme }))
}));

function LegendCategoriesRow({
  label,
  isMax,
  isStrokeColor,
  color = '#000',
  icon,
  maskedIcon
}) {
  return (
    <Box component='li' sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title={isMax ? 'Most representative' : ''}>
        <Marker
          className='marker'
          mr={1.5}
          component='span'
          isMax={isMax}
          icon={icon}
          maskedIcon={maskedIcon}
          isStrokeColor={isStrokeColor}
          color={color}
        />
      </Tooltip>
      <LegendLayerTitle
        title={label}
        visible
        typographyProps={{ variant: 'overlineDelicate' }}
      />
    </Box>
  );
}
