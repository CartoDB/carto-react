import { getTileId } from '../utils';
import { useCallback, useRef } from 'react';
import useSpatialFilterTileset from './useSpatialFilterTileset';
import useFiltersTileset from './useFiltersTileset';

export default function useRenderSubLayers({
  source,
  renderSubLayers: _renderSubLayers
}) {
  const tilesCacheRef = useRef({});
  const [applySpatialFilter, spatialFilterBuffers] = useSpatialFilterTileset({
    source,
    tilesCacheRef
  });
  const applyFilters = useFiltersTileset({ source, tilesCacheRef });

  const renderSubLayers = useCallback(
    (props) => {
      if (!props.data || !props.binary) {
        return null;
      }

      const tileId = getTileId(props.tile);
      if (tilesCacheRef.current?.[tileId]) {
        props = {
          ...props,
          data: tilesCacheRef.current?.[tileId]
        };
      } else {
        // We need to add getFilterValue binary attribute
        // even if there's no filter applied. This is to
        // avoid weird reactivity bahavior when adding DataFilterExtension.
        props = {
          ...props,
          data: addGetFilterValueToTileContent(props.data)
        };

        props = pipe(applySpatialFilter, applyFilters)(props);

        tilesCacheRef.current = {
          ...tilesCacheRef.current,
          [tileId]: props.data
        };
      }

      return _renderSubLayers(props);
    },
    [_renderSubLayers, applySpatialFilter, applyFilters]
  );

  return [renderSubLayers, spatialFilterBuffers];
}

// Aux
function pipe(...fns) {
  return (x) => fns.reduce((v, f) => f(v), x);
}

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
