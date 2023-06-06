import { checkCredentials, makeCall } from './common';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto/typed';
import { _assert as assert } from '@carto/react-core/';

import { REQUEST_GET_MAX_URL_LENGTH } from '@carto/react-core';

const AVAILABLE_MODELS = [
  'category',
  'histogram',
  'formula',
  'timeseries',
  'range',
  'scatterplot',
  'table'
];

const DEFAULT_GEO_COLUMN = 'geom';

/**
 * Execute a SQL model request.
 *
 * @typedef { import('geojson').Polygon | import('geojson').MultiPolygon } SpatialFilter
 * @param { object } props
 * @param { string } props.model - widget's model that we want to get the data for
 * @param { object } props.source - source that owns the column
 * @param { object } props.params - widget's props
 * @param { SpatialFilter= } props.spatialFilter - restrict widget calculation to an area
 * @param { object= } props.opts - Additional options for the HTTP request
 */
export function executeModel(props) {
  assert(props.source, 'executeModel: missing source');
  assert(props.model, 'executeModel: missing model');
  assert(props.params, 'executeModel: missing params');

  assert(
    AVAILABLE_MODELS.indexOf(props.model) !== -1,
    `executeModel: model provided isn't valid. Available models: ${AVAILABLE_MODELS.join(
      ', '
    )}`
  );

  const { source, model, params, spatialFilter, opts } = props;

  checkCredentials(source.credentials);

  assert(
    source.credentials.apiVersion === API_VERSIONS.V3,
    'SQL Model API is a feature only available in CARTO 3.'
  );
  assert(source.type !== MAP_TYPES.TILESET, 'executeModel: Tileset not supported');

  let url = `${source.credentials.apiBaseUrl}/v3/sql/${source.connection}/model/${model}`;

  const { filters, filtersLogicalOperator, data, type } = source;
  const queryParameters = source.queryParameters
    ? JSON.stringify(source.queryParameters)
    : '';
  let queryParams = {
    type,
    source: data,
    params: JSON.stringify(params),
    queryParameters,
    filters: JSON.stringify(filters),
    filtersLogicalOperator
  };

  // API supports multiple filters, we apply it only to geoColumn
  const spatialFilters = spatialFilter
    ? {
        [source.geoColumn ? source.geoColumn : DEFAULT_GEO_COLUMN]: spatialFilter
      }
    : undefined;

  if (spatialFilters) {
    queryParams.spatialFilters = JSON.stringify(spatialFilters);
  }

  const queryParamsString = new URLSearchParams(queryParams).toString();
  const getUrl = `${url}?${queryParamsString}`;
  const isGet = getUrl.length <= REQUEST_GET_MAX_URL_LENGTH;

  if (isGet) {
    url = getUrl;
  } else {
    // undo the JSON.stringify, @todo find a better pattern
    queryParams.params = params;
    queryParams.filters = filters;
    queryParams.queryParameters = source.queryParameters;
    if (spatialFilters) {
      queryParams.spatialFilters = spatialFilters;
    }
  }
  return makeCall({
    url,
    credentials: source.credentials,
    opts: {
      ...opts,
      method: isGet ? 'GET' : 'POST',
      ...(!isGet && { body: JSON.stringify(queryParams) })
    }
  });
}
