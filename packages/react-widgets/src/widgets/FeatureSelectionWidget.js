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

const DEFAULT_SELECTION_MODES = Object.values(FEATURE_SELECTION_MODES);
const DEFAULT_EDIT_MODES = Object.values(EDIT_MODES_KEYS);

function FeatureSelectionWidget({
  selectionModes: selectionModesKeys = DEFAULT_SELECTION_MODES,
  editModes: editModesKeys = DEFAULT_EDIT_MODES,
  tooltipPlacement,
  size,
  chipLabel
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
      size={size}
      chipLabel={chipLabel}
    />
  );
}

FeatureSelectionWidget.propTypes = {
  selectionModes: PropTypes.arrayOf(
    PropTypes.oneOf(Object.values(FEATURE_SELECTION_MODES))
  ),
  editModes: PropTypes.arrayOf(PropTypes.oneOf(Object.values(EDIT_MODES_KEYS)))
};

export default FeatureSelectionWidget;
