import { checkCredentials, makeCall } from './common';
import { _assert as assert } from '@carto/react-core/';

import { REQUEST_GET_MAX_URL_LENGTH, _getClient } from '@carto/react-core';
import { MAP_TYPES } from '../types';
import { API_VERSIONS } from '../types';

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

const extractSpatialDataFromSource = (source) => {
  let spatialDataType = source.spatialDataType;
  let spatialDataColumn = source.spatialDataColumn;

  if (!spatialDataType || !spatialDataColumn) {
    if (source.geoColumn) {
      const parsedGeoColumn = source.geoColumn.split(':');
      if (parsedGeoColumn.length === 2) {
        spatialDataType = parsedGeoColumn[0];
        spatialDataColumn = parsedGeoColumn[1];
      } else if (parsedGeoColumn.length === 1) {
        spatialDataColumn = parsedGeoColumn[0] || DEFAULT_GEO_COLUMN;
        spatialDataType = 'geo';
      }
      if (spatialDataType === 'geom') {
        // fallback if for some reason someone provided old `geom:$column`
        spatialDataType = 'geo';
      }
    } else {
      spatialDataType = 'geo';
      spatialDataColumn = DEFAULT_GEO_COLUMN;
    }
  }

  return { spatialDataType, spatialDataColumn };
};

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
    client: _getClient(),
    source: data,
    params: JSON.stringify(params),
    queryParameters,
    filters: JSON.stringify(filters),
    filtersLogicalOperator
  };

  let spatialFilters;
  if (spatialFilter || props.model === 'table') {
    const { spatialDataType, spatialDataColumn } = extractSpatialDataFromSource(source);

    // API supports multiple filters, we apply it only to geometry column or spatialDataColumn
    spatialFilters = spatialFilter
      ? {
          [spatialDataColumn]: spatialFilter
        }
      : undefined;

    if (spatialFilters) queryParams.spatialFilters = JSON.stringify(spatialFilters);
    if (spatialDataType) queryParams.spatialDataType = spatialDataType;
    if (spatialDataColumn) queryParams.spatialDataColumn = spatialDataColumn;

    if (spatialDataType !== 'geo') {
      if (source.spatialFiltersResolution !== undefined) {
        queryParams.spatialFiltersResolution = source.spatialFiltersResolution;
      }
      queryParams.spatialFiltersMode = source.spatialFiltersMode || 'intersects';
    }
  }

  const urlWithSearchParams = url + '?' + new URLSearchParams(queryParams).toString();
  const isGet = urlWithSearchParams.length <= REQUEST_GET_MAX_URL_LENGTH;
  if (isGet) {
    url = urlWithSearchParams;
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
