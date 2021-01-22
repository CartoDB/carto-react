# Widgets
 
## CategoryWidget
Renders a `<CategoryWidget />` component

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props |  |  |  |
| props.id | <code>string</code> |  | ID for the widget instance. |
| props.title | <code>string</code> |  | Title to show in the widget header. |
| props.dataSource | <code>string</code> |  | ID of the data source to get the data from. |
| props.column | <code>string</code> |  | Name of the data source's column to get the data from. |
| [props.operationColumn] | <code>string</code> |  | Name of the data source's column to operate with. If not defined it will default to the one defined in `column`. |
| props.operation | <code>string</code> |  | Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object. |
| [props.formatter] | [<code>formatterCallback</code>](#formatterCallback) |  | Function to format each value returned. |
| [props.viewportFilter] | <code>boolean</code> | <code>false</code> | Defines whether filter by the viewport or not. |
| [props.onError] | [<code>errorCallback</code>](#errorCallback) |  | Function to handle error messages from the widget. |

## FormulaWidget
Renders a `<FormulaWidget />` component

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props |  |  |  |
| props.id | <code>string</code> |  | ID for the widget instance. |
| props.title | <code>string</code> |  | Title to show in the widget header. |
| props.dataSource | <code>string</code> |  | ID of the data source to get the data from. |
| props.column | <code>string</code> |  | Name of the data source's column to get the data from. |
| props.operation | <code>string</code> |  | Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object. |
| [props.formatter] | [<code>formatterCallback</code>](#formatterCallback) |  | Function to format each value returned. |
| [props.viewportFilter] | <code>boolean</code> | <code>false</code> | Defines whether filter by the viewport or not. |
| [props.onError] | [<code>errorCallback</code>](#errorCallback) |  | Function to handle error messages from the widget. |

## GeocoderWidget
Renders a `<GeocoderWidget />` component

| Param | Type | Description |
| --- | --- | --- |
| props |  |  |
| props.id | <code>string</code> | ID for the widget instance. |
| [props.className] | <code>Object</code> | Material-UI withStyle class for styling |
| [props.onError] | [<code>errorCallback</code>](#errorCallback) | Function to handle error messages from the widget. |

## HistogramWidget
Renders a `<HistogramWidget />` component

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props |  |  |  |
| props.id | <code>string</code> |  | ID for the widget instance. |
| props.title | <code>string</code> |  | Title to show in the widget header. |
| props.dataSource | <code>string</code> |  | ID of the data source to get the data from. |
| props.column | <code>string</code> |  | Name of the data source's column to get the data from. |
| props.operation | <code>string</code> |  | Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object. |
| props.ticks | <code>Array.&lt;number&gt;</code> |  | Array of thresholds for the X axis. |
| [props.xAxisformatter] | [<code>formatterCallback</code>](#formatterCallback) |  | Function to format X axis values. |
| [props.formatter] | [<code>formatterCallback</code>](#formatterCallback) |  | Function to format tooltip and Y axis values. |
| [props.viewportFilter] | <code>boolean</code> | <code>false</code> | Defines whether filter by the viewport or not. |
| [props.onError] | [<code>errorCallback</code>](#errorCallback) |  | Function to handle error messages from the widget. |

## PieWidget
Renders a `<PieWidget />` component

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props |  |  |  |
| props.id | <code>string</code> |  | ID for the widget instance. |
| props.title | <code>string</code> |  | Title to show in the widget header. |
| props.dataSource | <code>string</code> |  | ID of the data source to get the data from. |
| props.column | <code>string</code> |  | Name of the data source's column to get the data from. |
| [props.operationColumn] | <code>string</code> |  | Name of the data source's column to operate with. If not defined it will default to the one defined in `column`. |
| props.operation | <code>string</code> |  | Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object. |
| [props.formatter] | [<code>formatterCallback</code>](#formatterCallback) |  | Function to format each value returned. |
| [props.tooltipFormatter] | [<code>formatterCallback</code>](#formatterCallback) |  |  Function to return the HTML of the tooltip. |
| [props.viewportFilter] | <code>boolean</code> | <code>false</code> | Defines whether filter by the viewport or not. |
| props.height | <code>string</code> | <code>300px</code> | Height of the chart in CSS format. |
| [props.onError] | [<code>errorCallback</code>](#errorCallback) |  | Function to handle error messages from the widget. |

## AggregationTypes
Enum for the different types of aggregations available for widgets

**Kind**: global enum  
**Read only**: true  

<dl>
<dt><a href="#COUNT">COUNT</a></dt>
<dd><p>Count</p>
</dd>
<dt><a href="#AVG">AVG</a></dt>
<dd><p>Average</p>
</dd>
<dt><a href="#MIN">MIN</a></dt>
<dd><p>Minimum</p>
</dd>
<dt><a href="#MAX">MAX</a></dt>
<dd><p>Maximum</p>
</dd>
<dt><a href="#SUM">SUM</a></dt>
<dd><p>Sum</p>
</dd>
</dl>