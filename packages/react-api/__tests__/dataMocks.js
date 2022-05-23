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
