# API

Functions for working with CARTO REST APIs

## Functions

<dl>
<dt><a href="#buildQueryFilters">buildQueryFilters</a> ⇒ <code>string</code></dt>
<dd><p>Returns a SQL query applying a set of filters</p>
</dd>
<dt><a href="#executeSQL">executeSQL</a> ⇒ <code>Object</code></dt>
<dd><p>Execute a SQL query</p>
</dd>
<dt><a href="#getUserDatasets">getUserDatasets</a> ⇒ <code>Object</code></dt>
<dd><p>Get the lists of datasets for the user by performing a request to CARTO datasets API</p>
</dd>
</dl>

<a name="buildQueryFilters"></a>

## buildQueryFilters ⇒ <code>string</code>
Returns a SQL query applying a set of filters

**Kind**: global function  
**Returns**: <code>string</code> - SQL query  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | Dataset name or SQL query |
| filters | <code>Object</code> | Filters to be applied |

<a name="executeSQL"></a>

## executeSQL ⇒ <code>Object</code>
Executes a SQL query

**Kind**: global function  
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

<a name="getUserDatasets"></a>

## getUserDatasets ⇒ <code>Object</code>
Get the lists of datasets for the user by performing a request to CARTO datasets API

**Kind**: global function  
**Returns**: <code>Object</code> - List of datasets  

| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Object</code> | CARTO user credentials |
| credentials.username | <code>string</code> | CARTO username |
| credentials.apiKey | <code>string</code> | CARTO API Key |
| credentials.serverUrlTemplate | <code>string</code> | CARTO server URL template |
| opts | <code>Object</code> | Additional options for the HTTP request |
| opts.format | <code>string</code> | Output format (i.e. geojson) |

