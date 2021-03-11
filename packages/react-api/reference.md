# API

Set of functions that allow to work with CARTO APIs.

## executeSQL ⇒ <code>Object</code>

Executes a SQL query against [CARTO SQL API](https://carto.com/developers/sql-api/)

**Returns**: <code>Object</code> - Data returned from the SQL query execution

| Param                         | Type                | Description                             |
| ----------------------------- | ------------------- | --------------------------------------- |
| credentials                   | <code>Object</code> | CARTO user credentials                  |
| credentials.username          | <code>string</code> | CARTO username                          |
| credentials.apiKey            | <code>string</code> | CARTO API Key                           |
| credentials.serverUrlTemplate | <code>string</code> | CARTO server URL template               |
| query                         | <code>string</code> | SQL query to be executed                |
| opts                          | <code>Object</code> | Additional options for the HTTP request |
| opts.format                   | <code>string</code> | Output format (i.e. geojson)            |

## useCartoLayerProps ⇒ <code>Object</code>

Returns required default props for layers. It manages filtering and viewport changes.

| Param                               | Type                          | Description                                                               |
| ----------------------------------- | ----------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------- |
| props                               | <code>Object</code>           | Required default props for layers                                         |
| props.uniqueIdProperty              | <code>string</code>           | Unique id property for the layer, default to `cartodb_id`                 |
| props.onViewportLoad                | <code>function</code>         | Function that is called when all tiles in the current viewport are loaded |
| props.getFilterValue                | <code>function`               | `number</code>                                                            | Accessor to the filterable value of each data object |
| props.filterRange                   | <code>[number, number]</code> | The [min, max] bounds of the filter values to display                     |
| props.extensions                    | <code>[Object]</code>         | Bonus features to add to the core deck.gl layers                          |
| props.updateTriggers                | <code>Object</code>           | Tells deck.gl exactly which attributes need to change, and when           |
| props.updateTriggers.getFilterValue | <code>Object</code>           | Updating `getFilterValue` accessor when new filters come                  |

## SourceTypes

Enum for the different types of @deck.gl/carto sources

**Kind**: global enum  
**Read only**: true

<dl>
<dt><a href="#SQL">SQL</a></dt>
<dd><p>sql</p>
</dd>
<dt><a href="#BIGQUERY">BIGQUERY</a></dt>
<dd><p>bigquery</p>
</dd>
</dl>
