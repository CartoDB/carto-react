import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { getPalette } from '../../../utils/palette';
import PropTypes from 'prop-types';
import LegendLayerTitle from '../LegendLayerTitle';
import { LegendVariableList } from '../LegendWidgetUI.styles';
import useImperativeIntl from '../../../hooks/useImperativeIntl';
import { useIntl } from 'react-intl';

const MAX_CATEGORIES = 20;

/**
 * @param {object} props
 * @param {import('../LegendWidgetUI').LegendLayerVariableBase & import('../LegendWidgetUI').LegendCategories} props.legend - legend variable data.
 * @returns {React.ReactNode}
 */
function LegendCategories({ legend }) {
  const {
    labels = [],
    colors = [],
    isStrokeColor = false,
    customMarkers,
    maskedMarkers = true
  } = legend;

  const palette = getPalette(colors, labels.length);
  const showHelperText = labels.length > MAX_CATEGORIES;
  const intl = useIntl();
  const intlConfig = useImperativeIntl(intl);

  return (
    <>
      <LegendVariableList data-testid='categories-legend'>
        {labels.slice(0, MAX_CATEGORIES).map((label, idx) => (
          <LegendCategoriesRow
            key={label + idx}
            label={label}
            color={palette[idx % palette.length]}
            icon={
              customMarkers && Array.isArray(customMarkers)
                ? customMarkers[idx]
                : customMarkers
            }
            maskedIcon={maskedMarkers}
            isStrokeColor={isStrokeColor}
          />
        ))}
      </LegendVariableList>
      {showHelperText && (
        <Typography
          variant='caption'
          color='textSecondary'
          component='div'
          sx={{ py: 2 }}
        >
          {intlConfig.formatMessage(
            {
              id: 'c4r.widgets.legend.maxCategories'
            },
            {
              n: MAX_CATEGORIES
            }
          )}
        </Typography>
      )}
    </>
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
    !['icon', 'maskedIcon', 'color', 'isStrokeColor'].includes(prop)
})(({ icon, maskedIcon, color, isStrokeColor, theme }) => ({
  whiteSpace: 'nowrap',
  display: 'block',
  width: theme.spacing(1.5),
  height: theme.spacing(1.5),
  borderRadius: '50%',
  position: 'relative',
  border: '2px solid transparent',
  ...(icon
    ? getIconStyles({ icon, color, maskedIcon })
    : getCircleStyles({ color, isStrokeColor, theme }))
}));

function LegendCategoriesRow({ label, isStrokeColor, color = '#000', icon, maskedIcon }) {
  return (
    <Box component='li' sx={{ display: 'flex', alignItems: 'center' }}>
      <Marker
        className='marker'
        mr={1.5}
        component='span'
        icon={icon}
        maskedIcon={maskedIcon}
        isStrokeColor={isStrokeColor}
        color={color}
      />
      <LegendLayerTitle
        title={label}
        visible
        typographyProps={{ variant: 'overline', my: 0.75 }}
      />
    </Box>
  );
}
