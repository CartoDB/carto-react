import React, { useMemo } from 'react';
import { Paper, capitalize, styled } from '@mui/material';
import PropTypes from 'prop-types';
import FeatureSelectionUIToggleButton from './FeatureSelectionUIToggleButton';
import FeatureSelectionUIGeometryChips from './FeatureSelectionUIGeometryChips';
import FeatureSelectionUIDropdown from './FeatureSelectionUIDropdown';

const StylesWrapper = styled(Paper)(({ theme: { spacing, palette, shape } }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: spacing(0.5)
}));

/**
 * Renders a <FeatureSelectionWidgetUI /> component
 *
 * <!--
 * @param {Object} props
 * @param {Object[]} props.selectionModes
 * @param {string} props.selectionModes[].id
 * @param {string} props.selectionModes[].label
 * @param {React.ReactNode} props.selectionModes[].icon
 * @param {Object[]} [props.editModes]
 * @param {string} props.editModes[].id
 * @param {string} props.editModes[].label
 * @param {React.ReactNode} props.editModes[].icon
 * @param {string} props.selectedMode
 * @param {function} [props.onSelectMode]
 * @param {boolean} [props.enabled]
 * @param {function} [props.onEnabledChange]
 * @param {GeoJSON.Feature} [props.geometry]
 * @param {function} [props.onSelectGeometry]
 * @param {function} [props.onDeleteGeometry]
 * @param { "bottom" | "left" | "right" | "top" | undefined } [props.tooltipPlacement]
 * @param { "small" | "medium" | undefined } [props.size]
 * @param {string} [props.chipLabel]
 *
 * -->
 */
function FeatureSelectionWidgetUI({
  selectionModes,
  editModes = [],
  selectedMode,
  onSelectMode,
  enabled,
  onEnabledChange,
  geometry,
  onSelectGeometry,
  onDeleteGeometry,
  tooltipPlacement = 'bottom',
  size = 'medium',
  chipLabel
}) {
  const selectedModeData = useMemo(() => {
    const modes = [
      ...selectionModes.map((mode) => ({ ...mode, isEdit: false })),
      ...editModes.map((mode) => ({ ...mode, isEdit: true }))
    ];
    const foundMode = modes.find((m) => m.id === selectedMode);
    if (!foundMode) {
      throw new Error(`Selected mode "${selectedMode}" not supported`);
    }
    return foundMode;
  }, [editModes, selectionModes, selectedMode]);

  const label = capitalize(selectedModeData?.label || '');
  const hoverTooltip = selectedModeData?.isEdit ? label : `Select a ${label}`;
  const clickTooltip = selectedModeData?.isEdit
    ? 'Click on the mask to edit it'
    : 'Click on the map to create a mask';

  return (
    <StylesWrapper>
      <FeatureSelectionUIToggleButton
        icon={selectedModeData?.icon}
        hoverTooltip={hoverTooltip}
        clickTooltip={clickTooltip}
        enabled={enabled}
        onEnabledChange={onEnabledChange}
        tooltipPlacement={tooltipPlacement}
      />
      <FeatureSelectionUIDropdown
        selectionModes={selectionModes}
        editModes={editModes}
        selectedMode={selectedMode}
        onSelectMode={onSelectMode}
        enabled={enabled}
        tooltipPlacement={tooltipPlacement}
        tooltipText='Select a mode'
        menuHeaderText='Choose a selection mode'
        editDisabled={!geometry}
      />
      {!!geometry && (
        <FeatureSelectionUIGeometryChips
          features={[geometry]}
          onSelectGeometry={onSelectGeometry}
          onDeleteGeometry={onDeleteGeometry}
          disabledChipTooltip='Apply mask'
          chipTooltip='Clear mask'
          tooltipPlacement={tooltipPlacement}
          size={size}
          chipLabel={chipLabel}
        />
      )}
    </StylesWrapper>
  );
}

FeatureSelectionWidgetUI.defaultProps = {
  enabled: false,
  tooltipPlacement: 'bottom',
  editModes: [],
  size: 'medium'
};

const MODE_SHAPE = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
});

FeatureSelectionWidgetUI.propTypes = {
  selectionModes: PropTypes.arrayOf(MODE_SHAPE.isRequired).isRequired,
  editModes: PropTypes.arrayOf(MODE_SHAPE.isRequired),
  selectedMode: PropTypes.string.isRequired,
  onSelectMode: PropTypes.func,
  enabled: PropTypes.bool,
  onEnabledChange: PropTypes.func,
  geometry: PropTypes.any,
  onSelectGeometry: PropTypes.func,
  tooltipPlacement: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  chipLabel: PropTypes.string
};

export default FeatureSelectionWidgetUI;
