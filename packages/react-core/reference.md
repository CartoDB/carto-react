## Core

### aggregationFunctions ⇒ <code>Object</code>

Contains aggregation functions for widgets and layers, see [AggregationTypes](#aggregationtypes)

**Returns**: <code>Object</code> - Aggregation functions

### groupValuesByColumn ⇒ <code>Array</code>

Makes groups from features based in a operation

**Returns**: <code>Array</code> - Grouped values

| Param        | Type                | Default | Description                                                                  |
| ------------ | ------------------- | ------- | ---------------------------------------------------------------------------- |
| data         | <code>Array</code>  |         | Features for calculations                                                    |
| valuesColumn | <code>string</code> |         | Quantitative column for grouping                                             |
| keysColumn   | <code>string</code> |         | Qualitative column for grouping                                              |
| operation    | <code>string</code> |         | Operation for groups calculations, see [AggregationTypes](#aggregationtypes) |

### histogram ⇒ <code>Array</code>

Makes an array of numeric values as histogram data from features

**Returns**: <code>Array</code> - Histogram data

| Param      | Type                | Default | Description                                                                  |
| ---------- | ------------------- | ------- | ---------------------------------------------------------------------------- |
| features   | <code>Array</code>  |         | Features for calculations                                                    |
| columnName | <code>string</code> |         | Qualitative column for grouping                                              |
| ticks      | <code>Array</code>  |         | Array of numeric intervals                                                   |
| operation  | <code>string</code> |         | Operation for groups calculations, see [AggregationTypes](#aggregationtypes) |

### viewportFeatures ⇒ <code>Array</code>

Handles all tiles features and returns the current viewport ones

**Returns**: <code>Array</code> - Features in viewport

| Param            | Type                | Default | Description                |
| ---------------- | ------------------- | ------- | -------------------------- |
| tiles            | <code>Array</code>  |         | deck.gl tiles              |
| viewport         | <code>Array</code>  |         | Viewport bounds            |
| uniqueIdProperty | <code>string</code> |         | Unique feature id property |

### AggregationTypes

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
