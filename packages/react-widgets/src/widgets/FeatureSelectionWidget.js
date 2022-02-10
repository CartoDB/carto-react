import { FeatureSelectionWidgetUI, featureSelectionIcons } from '@carto/react-ui';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFeatureSelectionMode,
  addSpatialFilter,
  removeSpatialFilter,
  setFeatureSelectionEnabled
} from '@carto/react-redux';
import {
  FEATURE_SELECTION_MODES,
  EDIT_MODES as EDIT_MODES_KEYS
} from '@carto/react-core';

const { PolygonIcon, RectangleIcon, CircleIcon, LassoIcon, CursorIcon } =
  featureSelectionIcons;

const FEATURE_SELECTION_MODES_MAP = {
  [FEATURE_SELECTION_MODES.POLYGON]: {
    label: 'Polygon',
    icon: <PolygonIcon />
  },
  [FEATURE_SELECTION_MODES.RECTANGLE]: {
    label: 'Rectangle',
    icon: <RectangleIcon />
  },
  [FEATURE_SELECTION_MODES.CIRCLE]: {
    label: 'Circle',
    icon: <CircleIcon />
  },
  [FEATURE_SELECTION_MODES.LASSO_TOOL]: {
    label: 'Lasso tool',
    icon: <LassoIcon />
  }
};

const EDIT_MODES_MAP = {
  [EDIT_MODES_KEYS.EDIT]: {
    label: 'Edit mask',
    icon: <CursorIcon />
  }
};

function FeatureSelectionWidget({
  className,
  selectionModes: selectionModesKeys,
  editModes: editModesKeys,
  tooltipPlacement
}) {
  const dispatch = useDispatch();
  const geometry = useSelector((state) => state.carto.spatialFilter);
  const selectedMode = useSelector((state) => state.carto.featureSelectionMode);
  const enabled = useSelector((state) => state.carto.featureSelectionEnabled);

  const selectionModes = useMemo(() => {
    return selectionModesKeys
      .filter((key) => FEATURE_SELECTION_MODES_MAP[key])
      .map((key) => ({ id: key, ...FEATURE_SELECTION_MODES_MAP[key] }));
  }, [selectionModesKeys]);

  const editModes = useMemo(() => {
    return editModesKeys
      .filter((key) => EDIT_MODES_MAP[key])
      .map((key) => ({ id: key, ...EDIT_MODES_MAP[key] }));
  }, [editModesKeys]);

  const handleEnabledChange = (newEnabled) => {
    dispatch(setFeatureSelectionEnabled(newEnabled));
  };

  const handleSelectMode = (newSelectedMode) => {
    dispatch(setFeatureSelectionMode(newSelectedMode));
    // If the user update selectedMode, activate it by default
    handleEnabledChange(true);
  };

  const handleSelectGeometry = () => {
    dispatch(
      addSpatialFilter({
        geometry: {
          ...geometry,
          properties: {
            ...geometry.properties,
            disabled: !geometry.properties.disabled
          }
        }
      })
    );
  };

  const handleDeleteGeometry = () => {
    dispatch(removeSpatialFilter());
  };

  return (
    <FeatureSelectionWidgetUI
      className={className}
      selectionModes={selectionModes}
      editModes={editModes}
      selectedMode={selectedMode}
      onSelectMode={handleSelectMode}
      enabled={enabled}
      onEnabledChange={handleEnabledChange}
      tooltipPlacement={tooltipPlacement}
      geometry={geometry}
      onSelectGeometry={handleSelectGeometry}
      onDeleteGeometry={handleDeleteGeometry}
    />
  );
}

FeatureSelectionWidget.defaultProps = {
  selectionModes: Object.values(FEATURE_SELECTION_MODES),
  editModes: Object.values(EDIT_MODES_KEYS),
  defaultSelectedMode: Object.values(FEATURE_SELECTION_MODES)[0],
  defaultEnabled: FeatureSelectionWidgetUI.defaultProps.enabled,
  tooltipPlacement: FeatureSelectionWidgetUI.defaultProps.tooltipPlacement
};

FeatureSelectionWidget.propTypes = {
  className: FeatureSelectionWidgetUI.propTypes.className,
  selectionModes: PropTypes.arrayOf(
    PropTypes.oneOf(Object.values(FEATURE_SELECTION_MODES))
  ),
  editModes: PropTypes.arrayOf(PropTypes.oneOf(Object.values(EDIT_MODES_KEYS))),
  defaultEnabled: FeatureSelectionWidgetUI.propTypes.enabled,
  defaultSelectedMode: PropTypes.oneOf([
    ...Object.values(FEATURE_SELECTION_MODES),
    ...Object.values(EDIT_MODES_KEYS)
  ]),
  tooltipPlacement: FeatureSelectionWidgetUI.propTypes.tooltipPlacement
};

export default FeatureSelectionWidget;
