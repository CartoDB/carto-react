import { DataFilterExtension } from '@deck.gl/extensions';
import { _buildFeatureFilter, _applyMaskToTile } from '@carto/react-core';
import useViewportFeatures from './useViewportFeatures';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import { GeoJsonLayer } from '@deck.gl/layers';
import { selectMask } from '@carto/react-redux/slices/cartoSlice';
import { useSelector } from 'react-redux';

export default function useCartoLayerProps({
  source,
  uniqueIdProperty,
  viewportFeatures = true,
  viewporFeaturesDebounceTimeout = 500,
  renderSubLayers: _renderSubLayers = (props) => new GeoJsonLayer(props)
}) {
  const maskGeometry = useSelector((state) => selectMask(state, source.id));

  const [onViewportLoad, onDataLoad, fetch] = useViewportFeatures(
    source,
    uniqueIdProperty,
    viewporFeaturesDebounceTimeout
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
      renderSubLayers: (props) => {
        let newProps = { ...props };
        if (props.data && maskGeometry) {
          const filteredTile = _applyMaskToTile(props.tile, maskGeometry);
          newProps.data = filteredTile.content;
        }

        return _renderSubLayers(newProps);
      }
    };
  } else if (useGeoJSON) {
    props = {
      // empty function should be removed by null, but need a fix in CartoLayer
      onDataLoad: viewportFeatures ? onDataLoad : () => null
    };
  }

  const hasFilters = !!Object.keys(source?.filters || {}).length;

  return {
    ...props,
    uniqueIdProperty,
    data: source?.data,
    type: source?.type,
    connection: source?.connection,
    credentials: source?.credentials,
    updateTriggers: {},
    ...(hasFilters && {
      getFilterValue: _buildFeatureFilter({ filters: source?.filters, type: 'number' }),
      filterRange: [1, 1],
      extensions: [new DataFilterExtension({ filterSize: 1 })],
      updateTriggers: {
        getFilterValue: source?.filters
      }
    })
  };
}
