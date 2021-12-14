import {
  _applySpatialFilterToTileContent,
  _applyFiltersToTileContent,
  debounce
} from '@carto/react-core/';
import { selectSpatialFilter } from '@carto/react-redux';
import { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTileId } from '../utils/tileUtils';

const EMPTY_OBJ = {};

const BINARY_DATA_KEYS = ['points', 'lines', 'polygons'];

const createEmptyAnalysedFeatures = () => ({
  points: new Map(),
  polygons: new Map(),
  lines: new Map()
});

export default function useSpatialFilterTileset(
  source,
  { renderSubLayers: _renderSubLayers, uniqueIdProperty = 'cartodb_id' }
) {
  // Stores already analysed features. Used to avoid inconsistencies between tiles.
  const analysedFeaturesRef = useRef(createEmptyAnalysedFeatures());
  const tilesCacheRef = useRef({});

  // For reloading tile filtering
  const [reloadCounter, setReloadCounter] = useState(0);

  const debounceIdReloadRef = useRef(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedReload = useCallback(
    debounce(() => {
      setReloadCounter((oldState) => (oldState ? 0 : 1));
    }, 25),
    []
  );

  // Stores getFilterValue typed array for each tileId
  const [spatialFilterBuffers, setSpatialFilterBuffers] = useState(EMPTY_OBJ);

  // Check incrementalDebounce definition comments
  const debounceIdSetSpatialFilterBuffersRef = useRef(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSpatialFilterBuffers = useCallback(
    incrementalDebounce(setSpatialFilterBuffers, 50),
    []
  );

  const spatialFilterGeometry = useSelector((state) =>
    selectSpatialFilter(state, source?.id)
  );

  const currentFilterGeometryRef = useRef(spatialFilterGeometry);

  let hasGeometryChanged = false;
  if (currentFilterGeometryRef.current !== spatialFilterGeometry) {
    currentFilterGeometryRef.current = spatialFilterGeometry;
    hasGeometryChanged = true;
  }

  // Clean analysed features cache
  // We
  if (hasGeometryChanged && spatialFilterGeometry) {
    if (debounceIdReloadRef.current) {
      clearTimeout(debounceIdReloadRef.current);
      debounceIdReloadRef.current = null;
    }
    if (debounceIdSetSpatialFilterBuffersRef.current) {
      clearTimeout(debounceIdSetSpatialFilterBuffersRef.current);
      debounceIdSetSpatialFilterBuffersRef.current = null;
    }
    tilesCacheRef.current = {};
    analysedFeaturesRef.current = createEmptyAnalysedFeatures();
    setReloadCounter(0);
  }

  const renderSubLayers = useCallback(
    (props) => {
      // props.data is the same as props.tile.content
      let { data, binary } = props;
      if (!data || !binary) {
        return null;
      }

      const tileId = getTileId(props.tile);

      if (tilesCacheRef.current?.[tileId] && reloadCounter === 0) {
        data = tilesCacheRef.current?.[tileId];
        return _renderSubLayers(props, { data });
      }

      // ... If tile isn't cached ...

      // Stop reload if another tile is going to be analysed
      if (debounceIdReloadRef.current) {
        clearTimeout(debounceIdReloadRef.current);
        debounceIdReloadRef.current = null;
      }

      if (debounceIdSetSpatialFilterBuffersRef.current) {
        clearTimeout(debounceIdSetSpatialFilterBuffersRef.current);
        debounceIdSetSpatialFilterBuffersRef.current = null;
      }

      // We need to add getFilterValue binary attribute
      // even if there's no filter applied. This is to
      // avoid weird reactivity bahavior when adding DataFilterExtension.
      data = addGetFilterValueToTileContent(data);

      // First of all, filter spatially by a certain geometry.
      if (spatialFilterGeometry) {
        data = _applySpatialFilterToTileContent(data, spatialFilterGeometry, {
          tileBbox: props.tile.bbox,
          uniqueIdProperty,
          analysedFeatures: analysedFeaturesRef.current
        });

        debounceIdReloadRef.current = debouncedReload();

        debounceIdSetSpatialFilterBuffersRef.current = debouncedSetSpatialFilterBuffers({
          [tileId]: {
            points: data.points.attributes.getFilterValue,
            lines: data.lines.attributes.getFilterValue,
            polygons: data.polygons.attributes.getFilterValue
          }
        });
      }

      // Finally, apply C4R filters.
      // This _apply must be done after the one of spatial filter
      // because that one doesn't use old getFilterValue value.
      if (source?.filters) {
        data = _applyFiltersToTileContent(data, source?.filters);
      }

      tilesCacheRef.current = {
        ...tilesCacheRef.current,
        [tileId]: data
      };

      return _renderSubLayers(props, { data });
    },
    [_renderSubLayers, hasGeometryChanged, reloadCounter, uniqueIdProperty]
  );

  return [renderSubLayers, spatialFilterBuffers];
}

// Aux
function addGetFilterValueToTileContent(tileContent) {
  return {
    ...tileContent,
    ...BINARY_DATA_KEYS.reduce((acc, key) => {
      acc[key] = {
        ...tileContent[key],
        attributes: {
          getFilterValue: {
            value: new Uint16Array(tileContent[key].featureIds.value.length).fill(1),
            size: 1
          }
        }
      };
      return acc;
    }, {})
  };
}

// incrementalDebounce is a variation of classic debounce
// made to join the arguments of the difference fn calls.
// In this case, it's special customised for useState considering
// that first argument is always an object.
function incrementalDebounce(fn, ms) {
  let timer;
  let fullNewValue;
  return (newValue) => {
    if (!fullNewValue) fullNewValue = newValue;
    else fullNewValue = { ...fullNewValue, ...newValue };
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn((oldState) => {
        return { ...oldState, ...fullNewValue };
      });
      fullNewValue = null;
    }, ms);
    return timer;
  };
}
