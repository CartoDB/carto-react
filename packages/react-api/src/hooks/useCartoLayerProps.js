import { DataFilterExtension } from '@deck.gl/extensions';
import {
  _buildFeatureFilter,
  _applyMaskToTile,
  _applyMaskToTile2
} from '@carto/react-core';
import useViewportFeatures from './useViewportFeatures';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import { GeoJsonLayer } from '@deck.gl/layers';
import { selectMask } from '@carto/react-redux';
import { useSelector } from 'react-redux';
import ExtentedGeoJsonLayer from './extended-geojson-layer/geojson-layer';
import { useEffect } from 'react';

export default function useCartoLayerProps({
  source,
  uniqueIdProperty,
  viewportFeatures = true,
  viewporFeaturesDebounceTimeout = 500,
  renderSubLayers: _renderSubLayers = (props) => new ExtentedGeoJsonLayer(props)
}) {
  const maskGeometry = useSelector((state) => selectMask(state, source?.id));

  const [
    onViewportLoad,
    onDataLoad,
    fetch,
    filtersBuffer,
    setFiltersBuffer
  ] = useViewportFeatures(source, uniqueIdProperty, viewporFeaturesDebounceTimeout);

  useEffect(() => {
    setFiltersBuffer({});
  }, [maskGeometry]);

  let props = {};

  const useMVT =
    source?.credentials.apiVersion === API_VERSIONS.V2 ||
    source?.type === MAP_TYPES.TILESET;

  const useGeoJSON = source?.type === MAP_TYPES.QUERY || source?.type === MAP_TYPES.TABLE;

  if (useMVT) {
    props = {
      binary: true,
      onViewportLoad: viewportFeatures ? onViewportLoad : null,
      fetch: viewportFeatures ? fetch : null,
      renderSubLayers: (props) => {
        let { data, binary } = props;
        // TODO: Implement to binary as false
        if (!data || !binary) {
          return null;
        }

        const tileKey = `${props.tile.x}-${props.tile.y}-${props.tile.z}`;
        if (props.data && maskGeometry) {
          if (filtersBuffer[tileKey]) {
            const filterBuffer = filtersBuffer[tileKey];
            data = {
              ...props.tile.content,
              points: {
                ...props.tile.content.points,
                attributes: {
                  getFilterValue: filterBuffer.points
                }
              },
              lines: {
                ...props.tile.content.lines,
                attributes: {
                  getFilterValue: filterBuffer.lines
                }
              },
              polygons: {
                ...props.tile.content.polygons,
                attributes: {
                  getFilterValue: filterBuffer.polygons
                }
              }
            };
          } else {
            // console.time(tileKey)
            data = _applyMaskToTile2(props.tile, maskGeometry);
            // console.timeEnd(tileKey)
            // setFiltersBuffer((oldState) => ({
            //   ...oldState,
            //   [tileKey]: {
            //     points: data.points.attributes.getFilterValue,
            //     lines: data.lines.attributes.getFilterValue,
            //     polygons: data.polygons.attributes.getFilterValue
            //   }
            // }));
          }
        }

        return _renderSubLayers(props, { data });
      }
    };
  } else if (useGeoJSON) {
    props = {
      // empty function should be removed by null, but need a fix in CartoLayer
      onDataLoad: viewportFeatures ? onDataLoad : () => null
    };
  }

  const hasFilters = !!Object.keys(source?.filters || {}).length || !!maskGeometry;

  return {
    ...props,
    uniqueIdProperty,
    data: source?.data,
    type: source?.type,
    connection: source?.connection,
    credentials: source?.credentials,
    // updateTriggers: {},
    // getFilterValue: _buildFeatureFilter({ filters: source?.filters, type: 'number' }),
    ...(hasFilters && {
      getFilterValue: 1,
      filterRange: [1, 1],
      extensions: [new DataFilterExtension({ filterSize: 1 })]
    })
    // updateTriggers: {
    //   getFilterValue: [source?.filters, maskGeometry]
    // }
  };
}
