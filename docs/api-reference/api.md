# API

Set of functions that allow to work with CARTO APIs.
## buildQueryFilters ⇒ <code>string</code>
Returns a SQL query applying a set of filters.

**Returns**: <code>string</code> - SQL query  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | Dataset name or SQL query |
| filters | <code>Object</code> | Filters to be applied |

## executeSQL ⇒ <code>Object</code>
Executes a SQL query against [CARTO SQL API](https://carto.com/developers/sql-api/)

**Returns**: <code>Object</code> - Data returned from the SQL query execution  

| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Object</code> | CARTO user credentials |
| credentials.username | <code>string</code> | CARTO username |
| credentials.apiKey | <code>string</code> | CARTO API Key |
| credentials.serverUrlTemplate | <code>string</code> | CARTO server URL template |
| query | <code>string</code> | SQL query to be executed |
| opts | <code>Object</code> | Additional options for the HTTP request |
| opts.format | <code>string</code> | Output format (i.e. geojson) |

## getUserDatasets ⇒ <code>Object</code>
Get the lists of datasets for the user by performing a request to CARTO datasets API

**Returns**: <code>Object</code> - List of datasets  

| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Object</code> | CARTO user credentials |
| credentials.username | <code>string</code> | CARTO username |
| credentials.apiKey | <code>string</code> | CARTO API Key |
| credentials.serverUrlTemplate | <code>string</code> | CARTO server URL template |
| opts | <code>Object</code> | Additional options for the HTTP request |
| opts.format | <code>string</code> | Output format (i.e. geojson) |
