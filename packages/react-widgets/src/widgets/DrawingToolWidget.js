import { DrawingToolWidgetUI, drawingToolIcons } from '@carto/react-ui';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDrawingToolMode,
  addSpatialFilter,
  removeSpatialFilter,
  setDrawingToolEnabled
} from '@carto/react-redux';
import {
  DRAW_MODES as DRAW_MODES_KEYS,
  EDIT_MODES as EDIT_MODES_KEYS
} from '@carto/react-core';

const { PolygonIcon, RectangleIcon, CircleIcon, LassoIcon, CursorIcon } =
  drawingToolIcons;

const DRAW_MODES_MAP = {
  [DRAW_MODES_KEYS.POLYGON]: {
    label: 'Polygon',
    icon: <PolygonIcon />
  },
  [DRAW_MODES_KEYS.RECTANGLE]: {
    label: 'Rectangle',
    icon: <RectangleIcon />
  },
  [DRAW_MODES_KEYS.CIRCLE]: {
    label: 'Circle',
    icon: <CircleIcon />
  },
  [DRAW_MODES_KEYS.LASSO_TOOL]: {
    label: 'Lasso tool',
    icon: <LassoIcon />
  }
};

const EDIT_MODES_MAP = {
  [EDIT_MODES_KEYS.EDIT]: {
    label: 'Edit geometry',
    icon: <CursorIcon />
  }
};

function DrawingToolWidget({
  className,
  drawModes: drawModesKeys,
  editModes: editModesKeys,
  tooltipPlacement
}) {
  const dispatch = useDispatch();
  const geometry = useSelector((state) => state.carto.spatialFilter);
  const selectedMode = useSelector((state) => state.carto.drawingToolMode);
  const enabled = useSelector((state) => state.carto.drawingToolEnabled);

  const drawModes = useMemo(() => {
    return drawModesKeys
      .filter((key) => DRAW_MODES_MAP[key])
      .map((key) => ({ id: key, ...DRAW_MODES_MAP[key] }));
  }, [drawModesKeys]);

  const editModes = useMemo(() => {
    return editModesKeys
      .filter((key) => EDIT_MODES_MAP[key])
      .map((key) => ({ id: key, ...EDIT_MODES_MAP[key] }));
  }, [editModesKeys]);

  const handleEnabledChange = (newEnabled) => {
    dispatch(setDrawingToolEnabled(newEnabled));
  };

  const handleSelectMode = (newSelectedMode) => {
    dispatch(setDrawingToolMode(newSelectedMode));
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
    <DrawingToolWidgetUI
      className={className}
      drawModes={drawModes}
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

DrawingToolWidget.defaultProps = {
  drawModes: Object.values(DRAW_MODES_KEYS),
  editModes: Object.values(EDIT_MODES_KEYS),
  defaultSelectedMode: Object.values(DRAW_MODES_KEYS)[0],
  defaultEnabled: DrawingToolWidgetUI.defaultProps.enabled,
  tooltipPlacement: DrawingToolWidgetUI.defaultProps.tooltipPlacement
};

DrawingToolWidget.propTypes = {
  className: DrawingToolWidgetUI.propTypes.className,
  drawModes: PropTypes.arrayOf(PropTypes.oneOf(Object.values(DRAW_MODES_KEYS))),
  editModes: PropTypes.arrayOf(PropTypes.oneOf(Object.values(EDIT_MODES_KEYS))),
  defaultEnabled: DrawingToolWidgetUI.propTypes.enabled,
  defaultSelectedMode: PropTypes.oneOf([
    ...Object.values(DRAW_MODES_KEYS),
    ...Object.values(EDIT_MODES_KEYS)
  ]),
  tooltipPlacement: DrawingToolWidgetUI.propTypes.tooltipPlacement
};

export default DrawingToolWidget;
