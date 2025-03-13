import { Cancel, ErrorOutline } from '@mui/icons-material';
import { Box, Chip, List, ListItem, Tooltip, styled } from '@mui/material';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import useImperativeIntl from '../../hooks/useImperativeIntl';
import React, { useState } from 'react';

const ChipList = styled(List)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(1.5),
  padding: theme.spacing(0.5),
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
 * @param {GeoJSON.Feature[]} props.features
 * @param {function} [props.onSelectGeometry]
 * @param {function} [props.onDeleteGeometry]
 * @param {string} [props.chipTooltip]
 * @param {string} [props.disabledChipTooltip]
 * @param { "medium" | "small" | undefined } [props.size]
 * @param { "bottom" | "left" | "right" | "top" | undefined } [props.tooltipPlacement]
 * @param {string} [props.chipLabel]
 * @returns
 */
function FeatureSelectionUIGeometryChips({
  features,
  onSelectGeometry = NOOP,
  onDeleteGeometry,
  chipTooltip,
  disabledChipTooltip,
  size = 'medium',
  tooltipPlacement = 'bottom',
  chipLabel
}) {
  const intl = useIntl();
  const intlConfig = useImperativeIntl(intl);

  /**
   * @param {GeoJSON.Geometry['type']} type
   */
  function translateType(type) {
    if (type === 'MultiPoint')
      return intlConfig.formatMessage({
        id: `c4r.widgets.featureSelection.point`
      });
    if (type === 'MultiLineString')
      return intlConfig.formatMessage({
        id: `c4r.widgets.featureSelection.lineString`
      });
    if (type === 'MultiPolygon' || type === 'Polygon' || type === 'GeometryCollection')
      return intlConfig.formatMessage({
        id: `c4r.widgets.featureSelection.polygon`
      });

    return type;
  }

  function getFeatureChipLabel(feature, index) {
    const type = translateType(feature.geometry.type);
    return chipLabel || feature.properties?.name || `${type} ${index + 1}`;
  }

  const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <ChipList sx={{ gap: size === 'small' ? 0.5 : 1 }}>
        {features.map((geometry, index) => {
          const isDisabled = geometry.properties?.disabled;
          const isInvalid = geometry.properties?.invalid;

          let tooltipText = chipTooltip;
          if (isDisabled) {
            tooltipText = disabledChipTooltip || chipTooltip;
          }
          if (isInvalid) {
            tooltipText = intlConfig.formatMessage({
              id: `c4r.widgets.featureSelection.invalid`
            });
          }
          if (showDeleteTooltip) {
            tooltipText = intlConfig.formatMessage({
              id: `c4r.widgets.featureSelection.remove`
            });
          }

          let color = 'secondary';
          if (isDisabled) {
            color = 'default';
          }
          if (isInvalid) {
            color = 'error';
          }

          return (
            <ListItem disablePadding key={index}>
              <Tooltip
                disableHoverListener={isDisabled ? !disabledChipTooltip : !chipTooltip}
                title={tooltipText}
                placement={tooltipPlacement}
              >
                <Chip
                  size={size}
                  label={getFeatureChipLabel(geometry, index)}
                  color={color}
                  onClick={() => onSelectGeometry(geometry)}
                  onDelete={
                    onDeleteGeometry ? () => onDeleteGeometry(geometry) : undefined
                  }
                  icon={isInvalid ? <ErrorOutline color='error' /> : undefined}
                  deleteIcon={
                    <Cancel
                      onMouseEnter={() => setShowDeleteTooltip(true)}
                      onMouseLeave={() => setShowDeleteTooltip(false)}
                    />
                  }
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
  ]),
  chipLabel: PropTypes.string
};

export default FeatureSelectionUIGeometryChips;
