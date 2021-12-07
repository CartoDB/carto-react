import { _applyMaskToTile } from '@carto/react-core/';
import { selectMask } from '@carto/react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTileId } from '../utils/tileUtils';

const EMPTY_OBJ = {};
const EMPTY_ARRAY = [];

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
  const maskGeometry = useSelector((state) => selectMask(state, source?.id));

  const [filtersBuffer, setFiltersBuffer] = useState(EMPTY_OBJ);

  const debouncedSetFiltersBuffer = useCallback(
    gradualDebounce(setFiltersBuffer, 50),
    []
  );

  useEffect(() => {
    setFiltersBuffer({});
  }, [maskGeometry]);

  const renderSubLayers = (props) => {
    let { data, binary } = props;
    // TODO: Implement to binary as false
    if (!data || !binary) {
      return null;
    }

    const tileId = getTileId(props.tile);
    if (props.data && maskGeometry) {
      if (filtersBuffer[tileId]) {
        data = buildDataUsingFilterBuffer(props, filtersBuffer[tileId]);
      } else {
        data = _applyMaskToTile(props.tile, maskGeometry, {
          uniqueIdProperty,
          analysedFeatures
        });

        debouncedSetFiltersBuffer({
          [tileId]: {
            points: data.points.attributes.getFilterValue,
            lines: data.lines.attributes.getFilterValue,
            polygons: data.polygons.attributes.getFilterValue
          }
        });
      }
    }

    return _renderSubLayers(props, { data });
  };

  return [!!maskGeometry, renderSubLayers, filtersBuffer];
}

// Aux
function buildDataUsingFilterBuffer(props, filterBuffer) {
  return {
    ...props.data,
    points: {
      ...props.data.points,
      attributes: {
        getFilterValue: filterBuffer.points
      }
    },
    lines: {
      ...props.data.lines,
      attributes: {
        getFilterValue: filterBuffer.lines
      }
    },
    polygons: {
      ...props.data.polygons,
      attributes: {
        getFilterValue: filterBuffer.polygons
      }
    }
  };
}

export function gradualDebounce(fn, ms) {
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
