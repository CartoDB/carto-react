import { checkCredentials, makeCall } from './common';
import { MAP_TYPES, API_VERSIONS } from '@deck.gl/carto';
import { _assert as assert } from '@carto/react-core/';

const URL_LENGTH = 2048;

const AVAILABLE_MODELS = ['category', 'histogram', 'formula', 'timeseries', 'range'];

/**
 * Execute a SQL model request.
 *
 * @param { object } props
 * @param { string } props.model - widget's model that we want to get the data for
 * @param { object } props.source - source that owns the column
 * @param { object } props.params - widget's props
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

  const { source, model, params, opts } = props;

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

  const isGet = false && url.length + JSON.stringify(queryParams).length <= URL_LENGTH;
  if (isGet) {
    url += '?' + new URLSearchParams(queryParams).toString();
  } else {
    queryParams.params = params;
    queryParams.filters = filters;
    queryParams.queryParameters = source.queryParameters;
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
