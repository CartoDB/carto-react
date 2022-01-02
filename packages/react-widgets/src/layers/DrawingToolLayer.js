import { EditableGeoJsonLayer } from '@nebula.gl/layers';
import * as nebulaModes from '@nebula.gl/edit-modes';
import {
  addSpatialFilter,
  selectSpatialFilter,
  setDrawingToolEnabled,
  selectDrawingToolMode
} from '@carto/react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_MODES } from '@carto/react-core';
import { hexToRgb, useTheme } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';

const { ViewMode, TranslateMode, ModifyMode, CompositeMode } = nebulaModes;

const EditMode = new CompositeMode([new TranslateMode(), new ModifyMode()]);

export default function DrawingToolLayer() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null);
  const selectedMode = useSelector((state) => selectDrawingToolMode(state));
  const spatialFilterGeometry = useSelector((state) => selectSpatialFilter(state));

  const isEdit = isEditMode(selectedMode);
  const hasGeometry = !!spatialFilterGeometry;
  const isSelected = selectedFeatureIndex !== null;

  useEffect(() => {
    // When the user changes mode or finishes drawing a geometry, remove selected feature
    if (!isEdit && isSelected) {
      setSelectedFeatureIndex(null);
    }
  }, [isEdit, spatialFilterGeometry, isSelected]);

  const mode = useMemo(() => {
    if (selectedMode) {
      if (isEdit && isSelected) {
        return EditMode;
      } else if (!isEdit && !isSelected) {
        return nebulaModes[selectedMode];
      }
    }

    return ViewMode;
  }, [isSelected, isEdit, selectedMode]);

  const primaryAsRgba = formatRGBA(hexToRgb(theme.palette.primary.main));
  const secondaryAsRgba = formatRGBA(hexToRgb(theme.palette.secondary.main));

  const mainColor = hasGeometry && !isSelected ? secondaryAsRgba : primaryAsRgba;

  return new EditableGeoJsonLayer({
    id: 'DrawingToolLayer',
    pickable: isEdit,
    data: {
      type: 'FeatureCollection',
      features: spatialFilterGeometry ? [spatialFilterGeometry] : []
    },
    mode,
    selectedFeatureIndexes: isFinite(selectedFeatureIndex) ? [selectedFeatureIndex] : [],
    onEdit: ({ updatedData, editType }) => {
      // Once the geometry is drawed, disable the tool
      if (editType === 'addFeature') {
        dispatch(setDrawingToolEnabled(false));
      }

      // Do not update spatial filter if
      //     1. updatedData is empty
      //     2. editType includes tentative, that means it's being drawn
      if (updatedData.features.length !== 0 && !editType.includes('Tentative')) {
        const [lastFeature] = updatedData.features.slice(-1);
        if (lastFeature) {
          dispatch(
            addSpatialFilter({
              geometry: lastFeature
            })
          );
        }
      }
    },
    onClick: ({ index, object }) => {
      if (isEdit && object?.geometry.type === 'Polygon') {
        setSelectedFeatureIndex(index);
      }
    },
    // Styles once geometry is created or it's being edited
    getLineColor: mainColor,
    getFillColor: isEdit ? [...mainColor.slice(0, 3), 255 * 0.08] : [0, 0, 0, 0],
    // Styles while drawing geometry
    getTentativeFillColor: [...primaryAsRgba.slice(0, 3), 255 * 0.08],
    getTentativeLineColor: primaryAsRgba,
    // Point styles while drawing
    getEditHandlePointColor: [0xff, 0xff, 0xff],
    getEditHandlePointOutlineColor: primaryAsRgba,
    editHandlePointStrokeWidth: 5,
    getEditHandlePointRadius: 2
  });
}

// Aux
function isEditMode(mode) {
  return Object.values(EDIT_MODES).indexOf(mode) !== -1;
}

function formatRGBA(cssRgba) {
  const [r, g, b, alpha] = cssRgba.replace(/[rgba() ]/g, '').split(',');

  return [r, g, b, alpha ? alpha * 255 : 255].map(Number);
}
