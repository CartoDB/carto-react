## Basemaps

Basemaps constants and Google Maps component

### Constants for available basemaps

- POSITRON: <code>string</code>
- VOYAGER: <code>string</code>
- DARK_MATTER: <code>string</code>
- GOOGLE_ROADMAP: <code>string</code>
- GOOGLE_SATELLITE: <code>string</code>
- GOOGLE_HYBRID: <code>string</code>

### GoogleMap

React component for working with Google Maps API and [deck.gl](https://deck.gl).

| Param            | Type                             | Description                      |
| ---------------- | -------------------------------- | -------------------------------- |
| props            |                                  |                                  |
| props.basemap    | <code>Object</code>              | Basemap (see basemaps constants) |
| props.viewState  | <code>Object</code>              | Viewstate (center, zoom level)   |
| props.layers     | <code>Array.&lt;Layer&gt;</code> | Layers array                     |
| props.getTooltip | <code>function</code>            | Tooltip handler                  |
| props.apiKey     | <code>string</code>              | Google Maps API Key              |
