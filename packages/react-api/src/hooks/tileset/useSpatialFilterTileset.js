import { _applySpatialFilterToTileContent, debounce } from '@carto/react-core/';
import { selectSpatialFilter } from '@carto/react-redux';
import { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTileId } from '../utils';

const EMPTY_OBJ = {};

const createEmptyAnalysedFeatures = () => ({
  points: new Map(),
  polygons: new Map(),
  lines: new Map()
});

export default function useSpatialFilterTileset({ source, tilesCacheRef }) {
  // Stores already analysed features. Used to avoid inconsistencies between tiles.
  const analysedFeaturesRef = useRef(createEmptyAnalysedFeatures());

  // For forcing tile filtering
  const [reloadCounter, setReloadCounter] = useState(0);

  const debounceIdReloadRef = useRef(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedReload = useCallback(
    debounce((shouldClearTilesCache) => {
      if (shouldClearTilesCache) {
        tilesCacheRef.current = {};
      }
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

  let hasGeometryChanged = currentFilterGeometryRef.current !== spatialFilterGeometry;
  // Reset everything if geom has changed
  // Do not use useEffect because it's slow for this case
  if (hasGeometryChanged && spatialFilterGeometry) {
    currentFilterGeometryRef.current = spatialFilterGeometry;
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
  }

  const applySpatialFilter = useCallback(
    (props) => {
      // props.data is the same as props.tile.content
      let { data, uniqueIdProperty = 'cartodb_id' } = props;

      if (currentFilterGeometryRef.current) {
        const tileId = getTileId(props.tile);

        // Stop reload if another tile is going to be analysed
        if (debounceIdReloadRef.current) {
          clearTimeout(debounceIdReloadRef.current);
          debounceIdReloadRef.current = null;
        }

        if (debounceIdSetSpatialFilterBuffersRef.current) {
          clearTimeout(debounceIdSetSpatialFilterBuffersRef.current);
          debounceIdSetSpatialFilterBuffersRef.current = null;
        }

        // First of all, filter spatially by a certain geometry.
        data = _applySpatialFilterToTileContent(data, currentFilterGeometryRef.current, {
          tileBbox: props.tile.bbox,
          uniqueIdProperty,
          analysedFeatures: analysedFeaturesRef.current
        });

        const shouldClearTilesCache = reloadCounter === 0;
        debounceIdReloadRef.current = debouncedReload(shouldClearTilesCache);

        debounceIdSetSpatialFilterBuffersRef.current = debouncedSetSpatialFilterBuffers({
          [tileId]: {
            points: data.points.attributes.getFilterValue,
            lines: data.lines.attributes.getFilterValue,
            polygons: data.polygons.attributes.getFilterValue
          }
        });
      }

      return { ...props, data };
    },
    // DO NOT ADD ANYTHING ELSE
    // This fn only changes when geometry changes or forcing it to change using reloadCounter
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasGeometryChanged, reloadCounter]
  );

  return [applySpatialFilter, spatialFilterBuffers];
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
