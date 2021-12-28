import { DrawingToolWidgetUI } from '@carto/react-ui/';
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawingToolMode, addSpatialFilter, removeSpatialFilter } from '@carto/react-redux';
import { SvgIcon } from '@material-ui/core';
import {
  DRAW_MODES as DRAW_MODES_KEYS,
  EDIT_MODES as EDIT_MODES_KEYS
} from '../utils/constants';

const CursorIcon = (
  <SvgIcon>
    <path d='m10.083 19.394.057.113a1 1 0 0 0 1.72.007l2.869-4.786 4.785-2.87a1 1 0 0 0-.12-1.777l-14-6c-.83-.356-1.669.483-1.313 1.313l6.002 14zM6.905 6.904l9.903 4.244-3.322 1.995-.102.069a1 1 0 0 0-.242.274l-1.992 3.321-4.245-9.903z' />
  </SvgIcon>
);

const PolygonIcon = (
  <SvgIcon>
    <path d='M4 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm16 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-2.829 1a2.995 2.995 0 0 0 0 2H6.829a2.995 2.995 0 0 0 0-2h10.342zm-2.463-5.707 3.998 4a3.012 3.012 0 0 0-1.414 1.414l-4-3.999a3.013 3.013 0 0 0 1.31-1.214l.106-.201zM2.998 6.829a2.995 2.995 0 0 0 2.002 0v10.342a2.995 2.995 0 0 0-2.002 0V6.83zM12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm1.84-3.919c.464.483 1.09.81 1.79.896l-1.47 2.94a2.992 2.992 0 0 0-1.79-.894l1.47-2.942zM16 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9.171.998a2.995 2.995 0 0 0 0 2.002H6.829a2.995 2.995 0 0 0 0-2.002h6.342z' />
  </SvgIcon>
);

const RectangleIcon = (
  <SvgIcon>
    <path d='M4 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm16 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-2.829 1a2.994 2.994 0 0 0-.17.974l-.001.052.007.183c.02.275.075.54.164.79H6.829a2.995 2.995 0 0 0 0-2h10.342zM2.998 6.828a2.995 2.995 0 0 0 2.002 0v10.342a2.995 2.995 0 0 0-2.002 0V6.83zm16.001 0a2.995 2.995 0 0 0 2 0v10.342a2.995 2.995 0 0 0-2 0V6.829zM20 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm13.171.998a2.994 2.994 0 0 0-.17.976L17 4.026l.007.183c.02.275.075.54.164.79H6.829a2.995 2.995 0 0 0 0-2H17.17z' />
  </SvgIcon>
);

const CircleIcon = (
  <SvgIcon>
    <path d='M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' />
  </SvgIcon>
);

const LassoIcon = (
  <SvgIcon>
    <path d='M12 3c4.935 0 9 3.736 9 9l-.002.343-.012.669c-.012.437-.033.86-.062 1.265l-.05.597C20.498 18.767 19.267 21 17 21c-1.192 0-1.971-.341-2.987-1.122l-.473-.375c-.401-.319-.64-.473-.888-.566a4.894 4.894 0 0 0-.415-.13l-.34-.085-.398-.086-.456-.086-.66-.111-1.708-.273a9.103 9.103 0 0 1-.952-.206C5.46 17.301 3 14.954 3 12.015c0-1.508.485-2.995 1.436-4.458.355.585.906 1.04 1.562 1.272C5.328 9.916 5 10.977 5 12.015c0 1.889 1.78 3.588 3.282 4.025l.085.023.345.076.517.092 1.619.257.583.1.518.099.237.05.433.102c.272.07.512.143.73.224.434.161.783.373 1.235.718l.457.362c.806.646 1.24.857 1.959.857.893 0 1.63-1.518 1.895-4.45l.045-.585c.013-.2.024-.407.033-.62l.02-.655c.005-.224.007-.454.007-.69 0-4.12-3.134-7-7-7a1 1 0 0 1 0-2zM7 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' />
  </SvgIcon>
);

const DRAW_MODES_MAP = {
  [DRAW_MODES_KEYS.POLYGON]: {
    label: 'Polygon',
    icon: PolygonIcon
  },
  [DRAW_MODES_KEYS.RECTANGLE]: {
    label: 'Rectangle',
    icon: RectangleIcon
  },
  [DRAW_MODES_KEYS.CIRCLE]: {
    label: 'Circle',
    icon: CircleIcon
  },
  [DRAW_MODES_KEYS.LASSO_TOOL]: {
    label: 'Lasso tool',
    icon: LassoIcon
  }
};

const EDIT_MODES_MAP = {
  [EDIT_MODES_KEYS.EDIT]: {
    label: 'Edit geometry',
    icon: CursorIcon
  }
};

function DrawingToolWidget({
  className,
  drawModes: drawModesKeys,
  editModes: editModesKeys,
  defaultActivated,
  defaultSelectedMode,
  tooltipPlacement
}) {
  const dispatch = useDispatch();
  const [activated, setActivated] = useState(defaultActivated);
  const [selectedMode, setSelectedMode] = useState(defaultSelectedMode);
  const geometry = useSelector((state) => state.carto.spatialFilter);

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

  const handleActivatedChange = (newActivated) => {
    dispatch(setDrawingToolMode(newActivated ? selectedMode : null));
    setActivated(newActivated);
  };

  useEffect(() => {
    // After drawing, when the geometry is created, disactivated the mode
    const wasGeometryRecentlyCreated = geometry?.properties.disabled === undefined;
    if (DRAW_MODES_MAP[selectedMode] && wasGeometryRecentlyCreated) {
      handleActivatedChange(false);
    }
    // If selectedMode is added, each time the mode changes,
    // it breaks the activated by default behavior
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geometry]);

  const handleSelectMode = (newSelectedMode) => {
    setSelectedMode(newSelectedMode);
    // If the user update selectedMode, activate it by default
    dispatch(setDrawingToolMode(newSelectedMode));
    if (!activated) setActivated(true);
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
      activated={activated}
      onActivatedChange={handleActivatedChange}
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
  defaultActivated: DrawingToolWidgetUI.defaultProps.activated,
  tooltipPlacement: DrawingToolWidgetUI.defaultProps.tooltipPlacement
};

DrawingToolWidget.propTypes = {
  className: DrawingToolWidgetUI.propTypes.className,
  drawModes: PropTypes.arrayOf(PropTypes.oneOf(Object.values(DRAW_MODES_KEYS))),
  editModes: PropTypes.arrayOf(PropTypes.oneOf(Object.values(EDIT_MODES_KEYS))),
  defaultActivated: DrawingToolWidgetUI.propTypes.activated,
  defaultSelectedMode: PropTypes.oneOf([
    ...Object.values(DRAW_MODES_KEYS),
    ...Object.values(EDIT_MODES_KEYS)
  ]),
  tooltipPlacement: DrawingToolWidgetUI.propTypes.tooltipPlacement
};

export default DrawingToolWidget;
