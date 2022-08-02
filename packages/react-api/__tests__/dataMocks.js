export const TABLE_SOURCE = {
  type: 'table',
  data: 'cartobq.public_account.seattle_collisions',
  connection: 'carto-ps-bq-developers',
  filters: {},
  filtersLogicalOperator: 'AND',
  credentials: {
    accessToken: '__test_api_key__',
    apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
    apiVersion: 'v3'
  }
};

export const QUERY_SOURCE = {
  type: 'query',
  data: 'SELECT * FROM `cartobq.public_account.seattle_collisions`',
  connection: 'carto-ps-bq-developers',
  filters: {},
  filtersLogicalOperator: 'AND',
  credentials: {
    accessToken: '__test_api_key__',
    apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
    apiVersion: 'v3'
  }
};

export const QUERY_PARAMS_SOURCE = {
  type: 'query',
  data: 'SELECT * FROM `cartobq.public_account.seattle_collisions` WHERE time_column > @start AND time_column < @end',
  connection: 'carto-ps-bq-developers',
  filters: {},
  queryParameters: {'start': '2019-01-01', 'end': '2019-01-02'},
  filtersLogicalOperator: 'AND',
  credentials: {
    accessToken: '__test_api_key__',
    apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
    apiVersion: 'v3'
  }
};

export const TILESET_SOURCE = {
  type: 'tileset',
  data: 'cartobq.public_account.pois',
  connection: 'carto-ps-bq-developers',
  filters: {},
  filtersLogicalOperator: 'AND',
  credentials: {
    accessToken: '__test_api_key__',
    apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
    apiVersion: 'v3'
  }
};
