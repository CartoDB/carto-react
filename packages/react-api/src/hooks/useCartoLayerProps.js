import { DataFilterExtension } from '@deck.gl/extensions';
import useViewportFeatures from './useViewportFeatures';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import ExtentedGeoJsonLayer from './extended-geojson-layer/geojson-layer';
import useSpatialFilter from './useSpatialFilter';

export default function useCartoLayerProps({
  source,
  uniqueIdProperty,
  viewportFeatures = true,
  viewporFeaturesDebounceTimeout = 500,
  renderSubLayers = (props) => new ExtentedGeoJsonLayer(props)
}) {
  const [hasSpatialFilter, _renderSubLayers, filtersBuffer] = useSpatialFilter(source, {
    renderSubLayers
  });

  const [onViewportLoad, onDataLoad, fetch] = useViewportFeatures(
    source,
    uniqueIdProperty,
    viewporFeaturesDebounceTimeout,
    filtersBuffer
  );

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
      ...(hasSpatialFilter && { renderSubLayers: _renderSubLayers })
    };
  } else if (useGeoJSON) {
    props = {
      // empty function should be removed by null, but need a fix in CartoLayer
      onDataLoad: viewportFeatures ? onDataLoad : () => null
    };
  }

  const hasFilters = !!Object.keys(source?.filters || {}).length || hasSpatialFilter;

  return {
    ...props,
    uniqueIdProperty,
    data: source?.data,
    type: source?.type,
    connection: source?.connection,
    credentials: source?.credentials,
    updateTriggers: {},
    // getFilterValue: _buildFeatureFilter({ filters: source?.filters, type: 'number' }),
    ...(hasFilters && {
      filterRange: [1, 1],
      extensions: [new DataFilterExtension({ filterSize: 1 })]
    })
    // updateTriggers: {
    //   getFilterValue: [source?.filters, maskGeometry]
    // }
  };
}
