# API

## Functions

### executeSQL

Executes a SQL query

#### Parameters

##### `credentials` ({ username, apiKey, serverUrlTemplate })

Required. CARTO user credentials.

##### `query` (String)

Required. SQL query to be executed.

##### `opts` ({ format })

Optional. Additional options for the HTTP request.

#### Returns

{ Object }. Data returned from the SQL query execution.

If `opts.format` is "geojson", it returns the full object returned by CARTO SQL API; otherwise it returns only the `rows` property.

### getUserDatasets

Get the lists of datasets for the user by performing a request to CARTO datasets API

#### Parameters

##### `credentials` ({ username, apiKey, serverUrlTemplate })

Required. CARTO user credentials.

##### `opts` ({ Object })

Optional. Additional options for the HTTP request.

#### Returns

{ Object }. List of datasets owned by the user that are in CARTO canonical form (cartodbfied).

### buildQueryFilters

Returns a SQL query applying a set of filters

#### Parameters

##### `data` ({ string }) 

Required. Dataset name or SQL query

##### `filters` ({ Object }) 

Optional. Filters to be applied

#### Returns

{ string }. SQL query.