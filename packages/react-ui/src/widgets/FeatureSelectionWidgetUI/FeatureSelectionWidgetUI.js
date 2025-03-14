import React, { useMemo } from 'react';
import { Paper, capitalize, styled } from '@mui/material';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import FeatureSelectionUIToggleButton from './FeatureSelectionUIToggleButton';
import FeatureSelectionUIGeometryChips from './FeatureSelectionUIGeometryChips';
import FeatureSelectionUIDropdown from './FeatureSelectionUIDropdown';
import useImperativeIntl from '../../hooks/useImperativeIntl';

const StylesWrapper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxHeight: theme.spacing(5),
  padding: theme.spacing(0.5)
}));

const EMPTY_ARRAY = [];

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
function FeatureSelectionWidgetUI(props) {
  const {
    selectionModes,
    editModes = EMPTY_ARRAY,
    selectedMode,
    onSelectMode,
    enabled = false,
    onEnabledChange,
    geometry,
    onSelectGeometry,
    onDeleteGeometry,
    tooltipPlacement = 'bottom',
    size = 'medium',
    chipLabel
  } = props;
  const intl = useIntl();
  const intlConfig = useImperativeIntl(intl);

  const selectionModeWithLocales = useMemo(() => {
    return selectionModes.map((mode) => ({
      ...mode,
      label: intlConfig.formatMessage({
        id: `c4r.widgets.featureSelection.${getModeKeyForLocale(mode.id)}`
      })
    }));
  }, [selectionModes, intlConfig]);

  const editModesWithLocales = useMemo(() => {
    return editModes.map((mode) => ({
      ...mode,
      label: intlConfig.formatMessage({
        id: `c4r.widgets.featureSelection.${getModeKeyForLocale(mode.id)}`
      })
    }));
  }, [editModes, intlConfig]);

  const selectedModeData = useMemo(() => {
    const modes = [
      ...selectionModeWithLocales.map((mode) => ({
        ...mode,
        isEdit: false
      })),
      ...editModesWithLocales.map((mode) => ({
        ...mode,
        isEdit: true
      }))
    ];

    const foundMode = modes.find((m) => m.id === selectedMode);
    if (!foundMode) {
      throw new Error(`Selected mode "${selectedMode}" not supported`);
    }
    return foundMode;
  }, [editModesWithLocales, selectionModeWithLocales, selectedMode]);

  const label = capitalize(selectedModeData?.label || '');
  const hoverTooltip = selectedModeData?.isEdit
    ? label
    : intlConfig.formatMessage(
        {
          id: `c4r.widgets.featureSelection.selectTool`
        },
        { label }
      );
  const clickTooltip = selectedModeData?.isEdit
    ? intlConfig.formatMessage({
        id: `c4r.widgets.featureSelection.clickToEdit`
      })
    : intlConfig.formatMessage({
        id: `c4r.widgets.featureSelection.clickToCreate`
      });

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
        selectionModes={selectionModeWithLocales}
        editModes={editModesWithLocales}
        selectedMode={selectedMode}
        onSelectMode={onSelectMode}
        enabled={enabled}
        tooltipPlacement={tooltipPlacement}
        tooltipText={intlConfig.formatMessage({
          id: `c4r.widgets.featureSelection.selectMode`
        })}
        menuHeaderText={intlConfig.formatMessage({
          id: `c4r.widgets.featureSelection.chooseSelectionMode`
        })}
        editDisabled={!geometry}
      />
      {!!geometry && (
        <FeatureSelectionUIGeometryChips
          features={[geometry]}
          onSelectGeometry={onSelectGeometry}
          onDeleteGeometry={onDeleteGeometry}
          disabledChipTooltip={intlConfig.formatMessage({
            id: `c4r.widgets.featureSelection.applyMask`
          })}
          chipTooltip={intlConfig.formatMessage({
            id: `c4r.widgets.featureSelection.clearMask`
          })}
          tooltipPlacement={tooltipPlacement}
          size={size}
          chipLabel={chipLabel}
          intl={intlConfig}
        />
      )}
    </StylesWrapper>
  );
}

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
  chipLabel: PropTypes.string,
  intl: PropTypes.object
};

export default FeatureSelectionWidgetUI;

// Aux
function getModeKeyForLocale(id) {
  return id.charAt(0).toLowerCase() + id.slice(1);
}
