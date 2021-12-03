import { _applyMaskToTile } from '@carto/react-core/';
import { selectMask } from '@carto/react-redux';
import { useEffect, useState } from 'react';
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
  const maskGeometry = useSelector((state) => selectMask(state, source?.id));

  const [filtersBuffer, setFiltersBuffer] = useState(EMPTY_OBJ);
  const [analysedFeatures, setAnalysedFeatures] = useState(EMPTY_ANALYSED_FEATURES);

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
      //   if (filtersBuffer[tileId]) {
      // data = buildDataUsingFilterBuffer(props, filtersBuffer[tileId]);
      //   } else {
      data = _applyMaskToTile(props.tile, maskGeometry, {
        uniqueIdProperty,
        analysedFeatures
      });

      // setAnalysedFeatures({ ...analysedFeatures });

      setFiltersBuffer((oldState) => ({
        ...oldState,
        [tileId]: {
          points: data.points.attributes.getFilterValue,
          lines: data.lines.attributes.getFilterValue,
          polygons: data.polygons.attributes.getFilterValue
        }
      }));
      //   }
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
