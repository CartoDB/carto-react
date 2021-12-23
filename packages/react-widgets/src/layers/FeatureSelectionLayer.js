import { EditableGeoJsonLayer } from '@nebula.gl/layers';
import * as nebulaModes from '@nebula.gl/edit-modes';
import {
  setFeatureSelectionGeometry,
  selectFeatureSelectionGeometry
} from '@carto/react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_MODES } from '../utils/constants';
import { hexToRgb, useTheme } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';

const { ViewMode, TranslateMode, ModifyMode, CompositeMode } = nebulaModes;

const EditMode = new CompositeMode([new TranslateMode(), new ModifyMode()]);

export default function FeatureSelectionLayer() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null);
  const selectedMode = useSelector((state) => state.carto.featureSelectionState.mode);
  const geometry = useSelector((state) => selectFeatureSelectionGeometry(state));

  const isEdit = isEditMode(selectedMode);
  const hasGeometry = !!geometry;
  const hasSelected = selectedFeatureIndex !== null;

  useEffect(() => {
    if (hasSelected) {
      setSelectedFeatureIndex(null);
    }
    // If hasSelected is added, when a feature is selected, it will be deselected
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMode]);

  useEffect(() => {
    if (hasSelected && !geometry) {
      setSelectedFeatureIndex(null);
    }
    // If hasSelected is added, when a feature is selected, it will be deselected
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geometry]);

  const mode = useMemo(() => {
    if (selectedMode) {
      if (isEdit && hasSelected) {
        return EditMode;
      } else if (!isEdit && !hasSelected) {
        return nebulaModes[selectedMode];
      }
    }

    return ViewMode;
  }, [hasSelected, isEdit, selectedMode]);

  const primaryAsRgba = formatRGBA(hexToRgb(theme.palette.primary.main));
  const secondaryAsRgba = formatRGBA(hexToRgb(theme.palette.secondary.main));

  const mainColor = hasGeometry && !hasSelected ? secondaryAsRgba : primaryAsRgba;

  return new EditableGeoJsonLayer({
    id: 'FeatureSelectionLayer',
    data: {
      type: 'FeatureCollection',
      features: geometry ? [geometry] : []
    },
    mode,
    selectedFeatureIndexes: isFinite(selectedFeatureIndex) ? [selectedFeatureIndex] : [],
    onEdit: ({ updatedData }) => {
      const [lastFeature] = updatedData.features.slice(-1);
      if (lastFeature) {
        dispatch(
          setFeatureSelectionGeometry({
            geometry: lastFeature
          })
        );
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
