import { Box, Chip, List, ListItem, Tooltip, styled } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const ChipList = styled(List)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  padding: spacing(0, 1),
  overflowX: 'auto',
  maxWidth: '100%',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

const NOOP = () => {};

/**
 * Renders a list of chips from geojson features with tooltip, click and delete handlers
 * @param {Object} props
 * @param {string} [props.className]
 * @param {Object} [props.sx]
 * @param {GeoJSON.Feature[]} props.features
 * @param {function} [props.onSelectGeometry]
 * @param {function} [props.onDeleteGeometry]
 * @param {string} [props.chipTooltip]
 * @param {string} [props.disabledChipTooltip]
 * @param { "medium" | "small" } [props.size]
 * @param { "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined } [props.tooltipPlacement]
 * @returns
 */
function FeatureSelectionUIGeometryChips({
  className,
  sx,
  features,
  onSelectGeometry = NOOP,
  onDeleteGeometry = NOOP,
  chipTooltip,
  disabledChipTooltip,
  size = 'medium',
  tooltipPlacement = 'bottom'
}) {
  /**
   * @param {GeoJSON.Geometry['type']} type
   */
  function translateType(type) {
    if (type === 'MultiPoint') return 'Point';
    if (type === 'MultiLineString') return 'LineString';
    if (type === 'MultiPolygon') return 'Polygon';
    if (type === 'GeometryCollection') return 'Polygon';
    return type;
  }

  function getFeatureChipLabel(feature, index) {
    const type = translateType(feature.geometry.type);
    return feature.properties?.name || `${type} ${index + 1}`;
  }

  return (
    <Box className={className} sx={{ ...sx, overflowX: 'auto' }}>
      <ChipList sx={{ gap: size === 'small' ? 0.5 : 1 }}>
        {features.map((geometry, index) => {
          const isDisabled = geometry.properties?.disabled;
          return (
            <ListItem disablePadding key={index}>
              <Tooltip
                disableHoverListener={isDisabled ? !disabledChipTooltip : !chipTooltip}
                title={isDisabled ? disabledChipTooltip || chipTooltip : chipTooltip}
                placement={tooltipPlacement}
              >
                <Chip
                  size={size}
                  label={getFeatureChipLabel(geometry, index)}
                  color={isDisabled ? 'default' : 'secondary'}
                  onClick={() => onSelectGeometry(geometry)}
                  onDelete={() => onDeleteGeometry(geometry)}
                />
              </Tooltip>
            </ListItem>
          );
        })}
      </ChipList>
    </Box>
  );
}

FeatureSelectionUIGeometryChips.propTypes = {
  className: PropTypes.string,
  sx: PropTypes.any,
  features: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectGeometry: PropTypes.func,
  onDeleteGeometry: PropTypes.func,
  chipTooltip: PropTypes.string,
  disabledChipTooltip: PropTypes.string,
  size: PropTypes.oneOf(['medium', 'small']),
  tooltipPlacement: PropTypes.oneOf([
    'bottom',
    'left',
    'right',
    'top',
    'bottom-end',
    'bottom-start',
    'left-end',
    'left-start',
    'right-end',
    'right-start',
    'top-end',
    'top-start'
  ])
};
FeatureSelectionUIGeometryChips.defaultProps = {
  className: '',
  size: 'medium',
  tooltipPlacement: 'bottom',
  onSelectGeometry: NOOP,
  onDeleteGeometry: NOOP
};

export default FeatureSelectionUIGeometryChips;
