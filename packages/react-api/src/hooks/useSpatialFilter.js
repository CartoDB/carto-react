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

const EMPTY_ANALYSED_FEATURES = {
  points: new Map(),
  polygons: new Map(),
  lines: new Map()
};

export default function useSpatialFilter(
  source,
  { renderSubLayers: _renderSubLayers, uniqueIdProperty = 'cartodb_id' }
) {
  const { current: analysedFeatures } = useRef(EMPTY_ANALYSED_FEATURES);
  const spatialFilterGeometry = useSelector((state) =>
    selectSpatialFilter(state, source?.id)
  );

  const [spatialFilterBuffer, setSpatialFilterBuffer] = useState(EMPTY_OBJ);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSpatialFilterBuffer = useCallback(
    incrementalDebounce(setSpatialFilterBuffer, 50),
    []
  );

  const filterFn = useMemo(() => {
    return _buildFeatureFilter({ filters: source?.filters });
  }, [source?.filters]);

  useEffect(() => {
    setSpatialFilterBuffer({});
  }, [spatialFilterGeometry]);

  // Used when layer uses tiles
  const renderSubLayers = (props) => {
    let { data, binary } = props;
    if (!data || !binary) {
      return null;
    }

    const tileId = getTileId(props.tile);

    data = {
      ...data,
      points: {
        ...data.points,
        attributes: {
          getFilterValue: {
            value: new Uint16Array(data.points.featureIds.value.length).fill(1),
            size: 1
          }
        }
      },
      lines: {
        ...data.lines,
        attributes: {
          getFilterValue: {
            value: new Uint16Array(data.points.featureIds.value.length).fill(1),
            size: 1
          }
        }
      },
      polygons: {
        ...data.polygons,
        attributes: {
          getFilterValue: {
            value: new Uint16Array(data.points.featureIds.value.length).fill(1),
            size: 1
          }
        }
      }
    };

    if (spatialFilterGeometry) {
      if (spatialFilterBuffer[tileId]) {
        data = buildDataUsingFilterBuffer(props, spatialFilterBuffer[tileId]);
      } else {
        data = _applySpatialFilterToTileContent(data, spatialFilterGeometry, {
          tileBbox: props.tile.bbox,
          uniqueIdProperty,
          analysedFeatures
        });

        debouncedSetSpatialFilterBuffer({
          [tileId]: {
            points: data.points.attributes.getFilterValue,
            lines: data.lines.attributes.getFilterValue,
            polygons: data.polygons.attributes.getFilterValue
          }
        });
      }
    }

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

  return [renderSubLayers, spatialFilterBuffer, getFilterValue];
}

// Aux
function buildDataUsingFilterBuffer(props, filterBuffer) {
  return {
    ...props.data,
    ...['points', 'lines', 'polygons'].reduce((acc, key) => {
      acc[key] = {
        ...props.data[key],
        attributes: {
          getFilterValue: filterBuffer[key]
        }
      };
      return acc;
    }, {})
  };
}

// incrementalDebounce is a variation of classic debounce
// made to join the arguments of the difference fn calls.
// In this case, it's special made for useState considering
// that first argument is always an object
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
    return timer;
  };
}
