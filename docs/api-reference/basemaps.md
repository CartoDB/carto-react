# Basemaps

Basemaps constants and Google Maps component

## Constants

<dl>
<dt><a href="#POSITRON">POSITRON</a> : <code>string</code></dt>
<dd></dd>
<dt><a href="#VOYAGER">VOYAGER</a> : <code>string</code></dt>
<dd></dd>
<dt><a href="#DARK_MATTER">DARK_MATTER</a> : <code>string</code></dt>
<dd></dd>
<dt><a href="#GOOGLE_ROADMAP">GOOGLE_ROADMAP</a> : <code>string</code></dt>
<dd></dd>
<dt><a href="#GOOGLE_SATELLITE">GOOGLE_SATELLITE</a> : <code>string</code></dt>
<dd></dd>
<dt><a href="#GOOGLE_HYBRID">GOOGLE_HYBRID</a> : <code>string</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#GoogleMap">GoogleMap(props)</a></dt>
<dd><p>React component for working with Google Maps API and deck.gl</p>
</dd>
</dl>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Properties |
| props.basemap | <code>Object</code> | Basemap (see basemaps constants) |
| props.viewState | <code>Object</code> | Viewstate (center, zoom level) |
| props.layers | <code>Array.&lt;Layer&gt;</code> | Layers array |
| props.getTooltip | <code>function</code> | Tooltip handler |
| props.apiKey | <code>string</code> | Google Maps API Key |

