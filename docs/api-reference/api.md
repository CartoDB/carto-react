# API

Set of functions that allow to work with CARTO APIs.
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

## filterApplicator ⇒ <code>number|boolean</code>
Returns a number (0-1) or a boolean checking wether a feature should be rendered by widgets and displayed on the map or no

**Returns**: <code>number|boolean</code> - Feature that passes the filter

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filters | <code>Object</code> | {} | Filters to be applied |
| returnedType | <code>string</code> | 'boolean' | Output type: number (0-1) or boolean |

## useCartoProps ⇒ <code>Object</code>
Returns required default props for layers. Manages filtering and viewport changes.

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Required default props for layers |
| props.onViewportChange | <code>function</code> | Callback that is fired for each viewport update |
| props.getFilterValue | <code>function`|`number</code> | Accessor to the filterable value of each data object |
| props.filterRange | <code>[number, number]</code> | The [min, max] bounds of the filter values to display |
| props.extensions | <code>[Object]</code> | Bonus features to add to the core deck.gl layers |
| props.updateTriggers | <code>Object</code> | Tells deck.gl exactly which attributes need to change, and when |
| props.updateTriggers.getFilterValue | <code>Object</code> | Updating `getFilterValue` accessor when new filters come |
