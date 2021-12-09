import {
  _buildFeatureFilter,
  _applySpatialFilterToTileContent,
  _applyFiltersToTileContent
} from '@carto/react-core/';
import { selectSpatialFilter } from '@carto/react-redux';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTileId } from '../utils/tileUtils';
import turfIntersects from '@turf/boolean-intersects';

const EMPTY_OBJ = {};

const createEmptyAnalysedFeatures = () => ({
  points: new Map(),
  polygons: new Map(),
  lines: new Map()
});

export default function useSpatialFilter(
  source,
  { renderSubLayers: _renderSubLayers, uniqueIdProperty = 'cartodb_id' }
) {
  // Stores already analysed features. Used to avoid inconsistencies between tiles.
  const analysedFeaturesRef = useRef(createEmptyAnalysedFeatures);
  const spatialFilterBuffersCleanFn = useRef(null);
  const spatialFilterGeometry = useSelector((state) =>
    selectSpatialFilter(state, source?.id)
  );

  // Stores getFilterValue typed array for each tileId
  const [spatialFilterBuffers, setSpatialFilterBuffers] = useState(EMPTY_OBJ);

  // Check incrementalDebounce definition comments
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSpatialFilterBuffer = useCallback(
    incrementalDebounce(setSpatialFilterBuffers, 50),
    []
  );

  // filterFn is only used on GeoJson sources
  const filterFn = useMemo(() => {
    return _buildFeatureFilter({ filters: source?.filters });
  }, [source?.filters]);

  useEffect(() => {
    if (spatialFilterBuffersCleanFn.current) {
      spatialFilterBuffersCleanFn.current();
      spatialFilterBuffersCleanFn.current = null;
    }
    setSpatialFilterBuffers({});
    analysedFeaturesRef.current = createEmptyAnalysedFeatures();
  }, [spatialFilterGeometry]);

  // Used when layer uses tiles
  const renderSubLayers = (props) => {
    // props.data === props.tile.content
    let { data, binary } = props;
    if (!data || !binary) {
      return null;
    }

    const tileId = getTileId(props.tile);

    // We need to add getFilterValue binary attribute
    // even if there's no filter applied. This is to
    // avoid weird reactivity bahavior when adding DataFilterExtension.
    data = addGetFilterValueToTileContent(data);

    // First of all, filter spatially by a certain geometry.
    if (spatialFilterGeometry) {
      if (spatialFilterBuffers[tileId]) {
        data = buildDataUsingSpatialFilterBuffer(data, spatialFilterBuffers[tileId]);
      } else {
        data = _applySpatialFilterToTileContent(data, spatialFilterGeometry, {
          tileBbox: props.tile.bbox,
          uniqueIdProperty,
          analysedFeatures: analysedFeaturesRef.current
        });

        spatialFilterBuffersCleanFn.current = debouncedSetSpatialFilterBuffer({
          [tileId]: {
            points: data.points.attributes.getFilterValue,
            lines: data.lines.attributes.getFilterValue,
            polygons: data.polygons.attributes.getFilterValue
          }
        });
      }
    }

    // Finally, apply C4R filters.
    // This _apply must be done after the one of spatial filter
    // because that one doesn't use old getFilterValue value.
    if (source?.filters) {
      data = _applyFiltersToTileContent(data, source?.filters);
    }

    return _renderSubLayers(props, { data });
  };

  // Used when layer uses GeoJson
  const getFilterValue = useCallback(
    (feature) => {
      return Number(
        filterFn(feature) &&
          (!spatialFilterGeometry ||
            turfIntersects(feature.geometry, spatialFilterGeometry))
      );
    },
    [filterFn, spatialFilterGeometry]
  );

  return [renderSubLayers, spatialFilterBuffers, getFilterValue];
}

// Aux
function addGetFilterValueToTileContent(tileContent) {
  return {
    ...tileContent,
    ...['points', 'lines', 'polygons'].reduce((acc, key) => {
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
function buildDataUsingSpatialFilterBuffer(data, spatialFilterBuffer) {
  return {
    ...data,
    ...['points', 'lines', 'polygons'].reduce((acc, key) => {
      acc[key] = {
        ...data[key],
        attributes: {
          getFilterValue: spatialFilterBuffer[key]
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
export function incrementalDebounce(fn, ms) {
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
    return () => {
      clearTimeout(timer);
      fullNewValue = null;
    };
  };
}
