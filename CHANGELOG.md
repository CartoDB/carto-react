# CHANGELOG

## Not released


## 2.2

### 2.2.6 (2023-09-07)

- Use selectLoader to obtain loader from mime type [#766](https://github.com/CartoDB/carto-react/pull/766)

### 2.2.5 (2023-08-30)

- WrapperWidgetUI: new footer property [#761](https://github.com/CartoDB/carto-react/pull/761)

### 2.2.4 (2023-08-21)

- Fix Legend Widget UI: Legend Wrapper spacing [#755](https://github.com/CartoDB/carto-react/pull/762)

### 2.2.3 (2023-08-01)

- Add storybook documentation and fix ComparativeCategoryWidgetUI [#755](https://github.com/CartoDB/carto-react/pull/755)
- Improve responsive behavior of MenuItem [#753](https://github.com/CartoDB/carto-react/pull/753)
- Increase documentation discoverability [#751](https://github.com/CartoDB/carto-react/pull/751)

### 2.2.2 (2023-07-26)

- Add namespace as optional param in OAuthCarto3 type [#750](https://github.com/CartoDB/carto-react/pull/750)
- Add onClick event handler to GoogleMap component [#747](https://github.com/CartoDB/carto-react/pull/747)

### 2.2.1 (2023-07-21)

- Fix MuiList: add more specificity to apply max-height [#748](https://github.com/CartoDB/carto-react/pull/748)
- SelectField Storybook leftovers [#746](https://github.com/CartoDB/carto-react/pull/746)

### 2.2.0 (2023-07-19)

- Developer API change:
  - SelectField props removal: `items` no longer available, use a children instead.
  - Changed to a controlled component. So now it needs to handle onChange function in the parent.
  - For multiple selection, now use MultipleSelectField.
- Breaking change in SelectField component: simplification & MultipleSelectField split [#743](https://github.com/CartoDB/carto-react/pull/743)
- Fix size of image placed inside a Chip [#744](https://github.com/CartoDB/carto-react/pull/744)
- Fix to build more accurate ranges for time filters [#655](https://github.com/CartoDB/carto-react/pull/655)
- Improve regex to detect coordinate pairs on search location widget [#742](https://github.com/CartoDB/carto-react/pull/742)

## 2.1

## 2.1.8 (2023-07-07)

- Add client param to LDS Api in geocoding [#737](https://github.com/CartoDB/carto-react/pull/737)

## 2.1.7 (2023-07-06)

- Force numbers for aggregated computations on numbers (workaround for big numeric field transformed to string in PG tileset) [#731](https://github.com/CartoDB/carto-react/pull/731)

### 2.1.6 (2023-07-05)

- Search by coordinates supported in useGeocoderWidgetController hook [#731](https://github.com/CartoDB/carto-react/pull/731)
- Fix blank map when loading widgets for tilesets [#733](https://github.com/CartoDB/carto-react/pull/733)

### 2.1.5 (2023-07-05)

- Supporting for `client` parameter for Widgets API calls without passing client as component attribute [#729](https://github.com/CartoDB/carto-react/pull/729)

### 2.1.4 (2023-06-29)

- Add TableCell styles for padding prop [#725](https://github.com/CartoDB/carto-react/pull/725)

### 2.1.3 (2023-06-28)

- FormulaWidget custom aggregation expression support and fixes [#699](https://github.com/CartoDB/carto-react/pull/699)
  - custom aggregation expression e.g `operation=custom / operationExp = SUM(revenue) * 100`
  - new onStateChange callback
  - display empty/error state as '-'
  - useWidgetFetch to ignore outdated results
  - Fix: Long values cause text-overflow

### 2.1.2 (2023-06-26)

- Fix: table widget was not showing data due to case sensitive [#721](https://github.com/CartoDB/carto-react/pull/721)
- Supporting for `client` parameter for Widgets API calls [#722](https://github.com/CartoDB/carto-react/pull/722)

### 2.1.1 (2023-06-22)

- Fix spatial filter was not being applied to Timeseries widgets [#719](https://github.com/CartoDB/carto-react/pull/719)
- Bugfix: The pagination is out of alignment [#711](https://github.com/CartoDB/carto-react/pull/711).

### 2.1.0 (2023-06-16)

- Widgets processing moved to the data warehouses for table and query sources
- Developer API change:
  - geoColumn and aggregationExp moved to Source, remote widgets disabled for spatial indexes
  - (optional) provider type added to Source, remote widgets disabled for Databricks
  - className and sx props removed from: Legend, Geocoder, Category and FeatureSelection widgets. Use styled API instead to wrap the widgets
- Mask, when set, is applied to global widgets as well as to viewport-based widgets [#704](https://github.com/CartoDB/carto-react/pull/704)
- Support for remote scatter plot widget [#704](https://github.com/CartoDB/carto-react/pull/704)
- Breaking change for styles: sx / classname props removal [#715](https://github.com/CartoDB/carto-react/pull/715)

## 2.0

### 2.0.10 (2023-06-15)

- Fix breaking change for styles (sx / classname) in 2.0.x [#713](https://github.com/CartoDB/carto-react/pull/713)
- FeatureSelection widget fixes [#708](https://github.com/CartoDB/carto-react/pull/708)

### 2.0.9 (2023-06-14)

- Fix HistogramWidget breaking onZr events after adding skeleton [#709](https://github.com/CartoDB/carto-react/pull/709)

### 2.0.8 (2023-06-13)

- Add custom Alert component [#698](https://github.com/CartoDB/carto-react/pull/698)
- [Design system] Text button change to improve layout [#703](https://github.com/CartoDB/carto-react/pull/703)
- Remove styles props from components: className and sx [#701](https://github.com/CartoDB/carto-react/pull/701)
- Fix histogramWidget not passing down loading state to widgetUI [#702](https://github.com/CartoDB/carto-react/pull/702)

### 2.0.7 (2023-06-13)

### 2.0.6 (2023-06-07)

- Bump deck.gl to latest 8.9.17 [#700](https://github.com/CartoDB/carto-react/pull/700)
- Feature selection UI refactor [#697](https://github.com/CartoDB/carto-react/pull/697)
- Fix Theme overrides [#696](https://github.com/CartoDB/carto-react/pull/696)
- Add Tooltip to Mui TablePagination and TableWidgetUI [#695](https://github.com/CartoDB/carto-react/pull/695)
- Add typed imports, from deck.gl typed [#693](https://github.com/CartoDB/carto-react/pull/693)

### 2.0.5 (2023-05-26)

- ScatterPlot Widget: Add a skeleton for loading state [#690](https://github.com/CartoDB/carto-react/pull/690)
- Table Widget: Add a skeleton for loading state [#689](https://github.com/CartoDB/carto-react/pull/689)
- TimeSeries Widget: Add a skeleton for loading state [#686](https://github.com/CartoDB/carto-react/pull/686)
- Pie & ComparativePie Widgets: Add a skeleton for loading state [#682](https://github.com/CartoDB/carto-react/pull/682)
- Range Widget: Add a skeleton for loading state [#681](https://github.com/CartoDB/carto-react/pull/681)
- Avoid reset of Table widget to page 0 when not necessary [#685](https://github.com/CartoDB/carto-react/pull/685)
- Fix widget calculation with very large viewports/masks [#680](https://github.com/CartoDB/carto-react/pull/680)
- Storybook: show figma codes/theme code snippets for colors [#684](https://github.com/CartoDB/carto-react/pull/684)
- Category & ComparativeCategory Widgets: Add a skeleton for loading state [#679](https://github.com/CartoDB/carto-react/pull/679)
- Bar & Histogram & Formula & ComparativeFormula Widgets: Add a skeleton for loading state [#674](https://github.com/CartoDB/carto-react/pull/674)
- Improve Source types [#687](https://github.com/CartoDB/carto-react/pull/687)

### 2.0.4 (2023-05-19)

- Fix type propTypes issues [#677](https://github.com/CartoDB/carto-react/pull/677)

### 2.0.3 (2023-05-18)

- Bump deck.gl to latest 8.9.15 [#675](https://github.com/CartoDB/carto-react/pull/675)
- Calculation of widget using maps API under FF [#658](https://github.com/CartoDB/carto-react/pull/658)
- TablePagination fixes & DS application [#673](https://github.com/CartoDB/carto-react/pull/673)
- Remove ReactDOMServer dependency and simplify avatar image fallback [#672](https://github.com/CartoDB/carto-react/pull/672)
- Remove @mui/styles after dumping makeStyles [#670](https://github.com/CartoDB/carto-react/pull/670)
- Add tooltip prop to ComparativeCategoryWidgetUI [#667](https://github.com/CartoDB/carto-react/pull/667)
- react-ui: Add component typings [#663](https://github.com/CartoDB/carto-react/pull/663)
- Fix paired buttons spacing when the button is from a different variant [#668](https://github.com/CartoDB/carto-react/pull/668)
- Added Storybook documentation on how to add an IconButton in a Table [#664](https://github.com/CartoDB/carto-react/pull/664)
- Changed how widget are calculated when a mask is set: use just the mask, no more intersection between mask and viewport [#661](https://github.com/CartoDB/carto-react/pull/661)
- LegendCategories component migrated from makeStyles to styled-components + cleanup [#634](https://github.com/CartoDB/carto-react/pull/634)
- LegendProportion component migrated from makeStyles to styled-components + cleanup [#635](https://github.com/CartoDB/carto-react/pull/635)
- LegendRamp component migrated from makeStyles to styled-components + cleanup [#636](https://github.com/CartoDB/carto-react/pull/636)
- LegendWidgetUI component migrated from makeStyles to styled-components + cleanup [#637](https://github.com/CartoDB/carto-react/pull/637)
- GeocoderWidget component migrated from makeStyles to styled-components [#638](https://github.com/CartoDB/carto-react/pull/638)
- RangeWidgetUI component migrated from makeStyles to styled-components [#639](https://github.com/CartoDB/carto-react/pull/639)
- FeatureSelectionWidgetUI component migrated from makeStyles to styled-components [#640](https://github.com/CartoDB/carto-react/pull/640)
- LegendWrapper component migrated from makeStyles to styled-components + cleanup [#641](https://github.com/CartoDB/carto-react/pull/641)
- TableWidgetUI component migrated from makeStyles to styled-components + cleanup [#642](https://github.com/CartoDB/carto-react/pull/642)
- TimeSeriesWidgetUI component cleanup makeStyles and unnecessary className [#643](https://github.com/CartoDB/carto-react/pull/643)
- Restore backward compatibility of spatial filters [#665](https://github.com/CartoDB/carto-react/pull/665) modified by [#661](https://github.com/CartoDB/carto-react/pull/661)
- BarWidgetUI component migrated from makeStyles to styled-components + cleanup [#644](https://github.com/CartoDB/carto-react/pull/644)
- CategoryWidgetUI component migrated from makeStyles to styled-components + cleanup [#645](https://github.com/CartoDB/carto-react/pull/645)
- HistogramWidgetUI component migrated from makeStyles to styled-components + cleanup [#646](https://github.com/CartoDB/carto-react/pull/646)
- ComparativeCategoryWidgetUI component migrated from makeStyles to styled-components + cleanup [#648](https://github.com/CartoDB/carto-react/pull/648)
- Migrate multiples components from storybook away from makeStyles [#652](https://github.com/CartoDB/carto-react/pull/652)
- Remove makeStyles leftovers [#669](https://github.com/CartoDB/carto-react/pull/669)
- FormulaWidgetUI component migrated from makeStyles to styled-components + cleanup [#666](https://github.com/CartoDB/carto-react/pull/666)
- Fix histogram widget filter for max/min values [#671](https://github.com/CartoDB/carto-react/pull/671)

### 2.0.2 (2023-04-26)

- react-api: getStats request uses POST for big queries/queryParameters [#656](https://github.com/CartoDB/carto-react/pull/656)
- New DS core component: Table [#657](https://github.com/CartoDB/carto-react/pull/657)
- Improve upgrade guide documentation [#651](https://github.com/CartoDB/carto-react/pull/651)
- Fix storybook publication with Node 18 [#654](https://github.com/CartoDB/carto-react/pull/654)
- Fix Histogram widget when showing just one row of data [#653](https://github.com/CartoDB/carto-react/pull/653)
- WrapperWidgetUI component migrated from makeStyles to styled-components + cleanup [#633](https://github.com/CartoDB/carto-react/pull/633)

### 2.0.1 (2023-04-14)

- New DS core component: Accordion [#632](https://github.com/CartoDB/carto-react/pull/632)
- DS update: Disable ligatures in the monospaced font family [#649](https://github.com/CartoDB/carto-react/pull/649)
- DS update: change action.disabledBackground color [#647](https://github.com/CartoDB/carto-react/pull/647)
- Storybook documentation and fixes [#629](https://github.com/CartoDB/carto-react/pull/629)
- Note component cleaned styles from makeStyles [#630](https://github.com/CartoDB/carto-react/pull/630)
- OpacityControl component migrated from makeStyles to styled-components + cleanup [#631](https://github.com/CartoDB/carto-react/pull/631)

### 2.0.0 (2023-04-05)

- Bump to latest @deck.gl 8.9.6, @emotion and @mui packages [#626](https://github.com/CartoDB/carto-react/pull/626)
- Add missing form stories [#627](https://github.com/CartoDB/carto-react/pull/627)

### 2.0.0-beta.8 (2023-04-04)

- Add compatibility with react 18 at peer dependencies [#624](https://github.com/CartoDB/carto-react/pull/624)

### 2.0.0-beta.7 (2023-03-31)

- Minor theme and Widgets styles fixes [#622](https://github.com/CartoDB/carto-react/pull/622)
- Display Carto icon gallery in Storybook [#619](https://github.com/CartoDB/carto-react/pull/619)

### 2.0.0-beta.6 (2023-03-29)

- New Avatar component based on Mui Avatar [#617](https://github.com/CartoDB/carto-react/pull/617)
- Allow to inject headers externally to executeSQL helper [#620](https://github.com/CartoDB/carto-react/pull/620)

### 2.0.0-beta.5 (2023-03-22)

- Styled import fix [#618](https://github.com/CartoDB/carto-react/pull/618)

### 2.0.0-beta.4 (2023-03-17)

- Carto for React dependencies fix and Storybook cleanup [#615](https://github.com/CartoDB/carto-react/pull/615)
- Add new getCartoColorStylePropsForItem function [#614](https://github.com/CartoDB/carto-react/pull/614)

### 2.0.0-beta.3 (2023-03-06)

- New component: LabelWithIndicator [#608](https://github.com/CartoDB/carto-react/pull/608)
- Design review of Chip component [#607](https://github.com/CartoDB/carto-react/pull/607)

### 2.0.0-beta.2 (2023-02-17)

- Fix overwrite default client in SQL post request [#603](https://github.com/CartoDB/carto-react/pull/603)

### 2.0.0-beta.1 (2023-02-14)

- Fix unselected row styles in Category Widget [#601](https://github.com/CartoDB/carto-react/pull/601)

### 2.0.0-beta.0 (2023-02-14)

### 2.0.0-alpha.0 (2023-02-13)

- MUI5 & new Design System upgrade [#494](https://github.com/CartoDB/carto-react/pull/494)

## 1.5

### 1.5.1 (2023-02-06)

- Add optional sortByColumnType param to fix number sorting in TableWidget [#593](https://github.com/CartoDB/carto-react/pull/593)
- Requests to CARTO APIs V3 will be authorized through the Authorization header instead of using a query param [#592](https://github.com/CartoDB/carto-react/pull/592)
- Provide unified CLIENT_ID for metrics [#591](https://github.com/CartoDB/carto-react/pull/591)

### 1.5.0 (2023-01-31)

### 1.5.0-alpha.15 (2023-01-30)

- Fix support for MVT in FeaturesDroppedLoader [#587](https://github.com/CartoDB/carto-react/pull/587)

### 1.5.0-alpha.14 (2023-01-24)

- Fix isDroppingFeatures converting to Boolean [#583](https://github.com/CartoDB/carto-react/pull/583)

### 1.5.0-alpha.13 (2023-01-23)

- Improve typing for FeatureSelectionWidget [#580](https://github.com/CartoDB/carto-react/pull/580)
- Fix ComparativeCategoryWidgetUI tooltip formatter [#579](https://github.com/CartoDB/carto-react/pull/579)
- Fix gmaps warning caused by callback now been mandatary from version >=3.51.6 [#581](https://github.com/CartoDB/carto-react/pull/581)

### 1.5.0-alpha.12 (2023-01-20)

- HistogramWidget: fix handling of min/max properties [#574](https://github.com/CartoDB/carto-react/pull/574)
- Adapt comparative category widget design [#575](https://github.com/CartoDB/carto-react/pull/575)
- Improved Comparative Formula UI props interface [#573](https://github.com/CartoDB/carto-react/pull/573)

### 1.5.0-alpha.11 (2023-01-18)

- Remove custom fetch function. Fixes issues with icon loading and FillStyleExtensions [#561](https://github.com/CartoDB/carto-react/pull/561)
- Bump deck.gl to latest 8.8.23 [#571](https://github.com/CartoDB/carto-react/pull/571)

### 1.5.0-alpha.10 (2023-01-04)

- Allow to use custom version explicitly in GoogleMap (not 'beta' by default now) [#550](https://github.com/CartoDB/carto-react/pull/550)
- Fix lack of refresh in BarWidgetUI when modifying yAxisData dinamically [#558](https://github.com/CartoDB/carto-react/pull/558)

### 1.5.0-alpha.9 (2022-11-29)

- Improve rendering performance of FeatureSelectionLayer (mask layer) [#541](https://github.com/CartoDB/carto-react/pull/541)

### 1.5.0-alpha.8 (2022-11-25)

- Implement ComparativePieWidgetUI [#510](https://github.com/CartoDB/carto-react/pull/510)
- Fix `executeSQL` through **POST** request [#531](https://github.com/CartoDB/carto-react/pull/531)

### 1.5.0-alpha.7 (2022-11-09)

- Implement ComparativeCategoryWidgetUI [#505](https://github.com/CartoDB/carto-react/pull/505)
- Fix `executeModel` through **POST** request [#525](https://github.com/CartoDB/carto-react/pull/525)

### 1.5.0-alpha.6 (2022-11-02)

- Fix TileLayer unauthorized error due to [breaking changes](https://github.com/visgl/deck.gl/pull/7287) in deck.gl >=8.9.0-alpha.3 and >=8.8.15 [#519](https://github.com/CartoDB/carto-react/pull/519)
- Bump deck.gl to 8.8.15 [#520](https://github.com/CartoDB/carto-react/pull/520)
- Fix missing implementation in stats to support `queryParameters` in RangeWidget and HistogramWidget [#517](https://github.com/CartoDB/carto-react/pull/517)
- AnimatedNumber component with hook wrapping `animateValue` [#509](https://github.com/CartoDB/carto-react/pull/509)
- Implement ComparativeFormulaWidgetUI [#504](https://github.com/CartoDB/carto-react/pull/504)

### 1.5.0-alpha.5 (2022-10-26)

- Fix LegendCategories displaying outlined points [#508](https://github.com/CartoDB/carto-react/pull/508)

### 1.5.0-alpha.4 (2022-10-14)

- Update nebula to latest stable 1.0.4 and deck.gl ^8.9.0-alpha.4 [#491](https://github.com/CartoDB/carto-react/pull/491)

### 1.5.0-alpha.2 (2022-10-14)

- Update Storybook to v6.5.12 [#487](https://github.com/CartoDB/carto-react/pull/487)
- Add **clear** button to RangeWidget [#485](https://github.com/CartoDB/carto-react/pull/485)
- Allow widgets to clear only its own filters [#483](https://github.com/CartoDB/carto-react/pull/483)

### 1.5.0-alpha.1 (2022-10-05)

- LegendCategories: maskedMarkers flag that allows disabling mask icons [#473](https://github.com/CartoDB/carto-react/pull/473)

### 1.5.0-alpha.0 (2022-09-29)

- Switch to using quadbin library, requiring deck.gl ^8.9.0-alpha.3 [#467](https://github.com/CartoDB/carto-react/pull/467)

## 1.4

### 1.4.3 (2022-11-03)

- Fix TileLayer unauthorized error due to [breaking changes](https://github.com/visgl/deck.gl/pull/7287) in deck.gl >=8.8.15 [#519](https://github.com/CartoDB/carto-react/pull/519)

### 1.4.2 (2022-10-27)

- Support for **deck.gl 8.8.15** _(breaking change)_. It requires ‘quadbin’ >= 0.1.5

### 1.4.1 (2022-09-20)

- Fix the Feature selection tool by setting the `EditableGeoJsonLayer` billboard property to false to be compatible with Google raster base maps

### 1.4.0 (2022-09-19)

- Add title in LegendWidget [#466](https://github.com/CartoDB/carto-react/pull/466)

### 1.4.0-alpha.5 (2022-09-02)

- Use unique feature id from tileset if provided [#463](https://github.com/CartoDB/carto-react/pull/463)

### 1.4.0-alpha.4 (2022-08-02)

- Support for SQL queryParameters [#461](https://github.com/CartoDB/carto-react/pull/461)

### 1.4.0-alpha.3 (2022-07-22)

- RangeWidget: new design changes [#459](https://github.com/CartoDB/carto-react/pull/459)

### 1.4.0-alpha.2 (2022-07-21)

- Fix range widget styles [#457](https://github.com/CartoDB/carto-react/pull/457)

### 1.4.0-alpha.1 (2022-07-20)

- Range widget (absolute values) [#454](https://github.com/CartoDB/carto-react/pull/454)

### 1.4.0-alpha.0 (2022-07-14)

- LegendCategories: support for custom markers [#451](https://github.com/CartoDB/carto-react/pull/451)

## 1.3

### 1.3.0 (2022-07-11)

### 1.3.0-beta.6 (2022-07-06)

- Fix updateLayer reducer to allow remove the legend [#448](https://github.com/CartoDB/carto-react/pull/448)
- Remove xAxisFormatter use in tooltipFormatter in BarWidgetUI [#447](https://github.com/CartoDB/carto-react/pull/447)

### 1.3.0-beta.5 (2022-07-05)

- Use labels to calculate BarWidgetUI margin [#444](https://github.com/CartoDB/carto-react/pull/444)
- Allow specifying organizationId in OAuth to support SSO in carto3 [#445](https://github.com/CartoDB/carto-react/pull/445)

### 1.3.0-beta.4 (2022-07-01)

- Add support for quadbin and remove quadkey and quadint. Bump deck.gl to 8.8.0 [#442](https://github.com/CartoDB/carto-react/pull/442)

### 1.3.0-beta.3 (2022-06-30)

- Return the spatial index ID as a property to be available for widgets [#440](https://github.com/CartoDB/carto-react/pull/440)
- Fix CategoryWidget search if there are null values [#439](https://github.com/CartoDB/carto-react/pull/439)
- Layout improvements in BarWidgetUI [#438](https://github.com/CartoDB/carto-react/pull/438)
- Fix FormulaWidget column check [#437](https://github.com/CartoDB/carto-react/pull/437)

### 1.3.0-beta.2 (2022-06-20)

- Add layerOrder in LegendWidget [#433](https://github.com/CartoDB/carto-react/pull/433)
- Allow FormulaWidget column to be undefined when using COUNT [#434](https://github.com/CartoDB/carto-react/pull/434)
- Bump deck.gl to 8.8.0-beta.3 [#435](https://github.com/CartoDB/carto-react/pull/435)

### 1.3.0-beta.1 (2022-06-14)

- Spatial index support for useCartoLayerProps [#425](https://github.com/CartoDB/carto-react/pull/425)
- Ensure source exists in HistogramWidget before getting stats [#426](https://github.com/CartoDB/carto-react/pull/426)
- Use en dash for intervals instead of hyphen [#428](https://github.com/CartoDB/carto-react/pull/428) and [#429](https://github.com/CartoDB/carto-react/pull/429)
- Remove widgets dropping features warning in global mode [#430](https://github.com/CartoDB/carto-react/pull/430)
- Add warning to widgets when column is missing [#427](https://github.com/CartoDB/carto-react/pull/427)
- Bump deck.gl to beta.1 [#431](https://github.com/CartoDB/carto-react/pull/431)

### 1.3.0-alpha.14 (2022-06-07)

- Allow to manage TableWidget pageSize state externally [#423](https://github.com/CartoDB/carto-react/pull/423)

### 1.3.0-alpha.13 (2022-06-02)

- Bump deck.gl to 8.8.0-alpha.5 [#421](https://github.com/CartoDB/carto-react/pull/421)
- Allow to disable WrapperWidgetUI [#420](https://github.com/CartoDB/carto-react/pull/420)

### 1.3.0-alpha.12 (2022-06-01)

- Tiles features calculation for spatial indexes [#417](https://github.com/CartoDB/carto-react/pull/417)
- Add layer options extension mechanism in LegendWidget [#416](https://github.com/CartoDB/carto-react/pull/416)
- Use new Query Models in SQL API for global widgets [#415](https://github.com/CartoDB/carto-react/pull/415)

### 1.3.0-alpha.11 (2022-05-20)

- Bump deck.gl 8.8.0-alpha.4 [#413](https://github.com/CartoDB/carto-react/pull/413)
- Autocalculate min/max in HistogramWidget [#412](https://github.com/CartoDB/carto-react/pull/412)
- Implement Stats API fn [#404](https://github.com/CartoDB/carto-react/pull/404)
- Fix map filtering with CategoryWidget using boolean values [#411](https://github.com/CartoDB/carto-react/pull/411)

### 1.3.0-alpha.10 (2022-05-12)

- Fixes in HistogramWidgetUI [#407](https://github.com/CartoDB/carto-react/pull/407)
- Display ellipsis and tooltip for long labels in Legend [#408](https://github.com/CartoDB/carto-react/pull/408)

### 1.3.0-alpha.9 (2022-05-12)

- Add BarWidget/BarWidgetUI [#229](https://github.com/CartoDB/carto-react/pull/229)
- Bump deck.gl 8.7.9 [#405](https://github.com/CartoDB/carto-react/pull/405)
- Fix filters with null as upper or lower bound [#403](https://github.com/CartoDB/carto-react/pull/403)
- Use static bins in HistogramWidget [#402](https://github.com/CartoDB/carto-react/pull/402)
- Fix deprecated warning in HistogramWidgetUI [#401](https://github.com/CartoDB/carto-react/pull/401)
- TimeSeries - Restrict animation when using global mode [#399](https://github.com/CartoDB/carto-react/pull/399)
- Pass layer obj to LegendComponent [#398](https://github.com/CartoDB/carto-react/pull/398)
- Fix HistogramWidgetUI min/max placement [#397](https://github.com/CartoDB/carto-react/pull/397)
- Fix histogram query with filters [#396](https://github.com/CartoDB/carto-react/pull/396)

### 1.3.0-alpha.8 (2022-04-29)

- Throw error if global mode isn't supported [#393](https://github.com/CartoDB/carto-react/pull/393)
- Use alias in query sources [#394](https://github.com/CartoDB/carto-react/pull/394)
- HistogramWidget/HistogramWidgetUI refactor [#338](https://github.com/CartoDB/carto-react/pull/388)
- Improve "No Data" UI state for FormulaWidget [#389](https://github.com/CartoDB/carto-react/pull/389) and [#391](https://github.com/CartoDB/carto-react/pull/391)

### 1.3.0-alpha.7 (2022-04-28)

- GeocoderWidget support for LDS queries in CARTO 3 [#387](https://github.com/CartoDB/carto-react/pull/387)
- Display warning when tilesets are dropping features [#385](https://github.com/CartoDB/carto-react/pull/385)

### 1.3.0-alpha.6 (2022-04-27)

- Fix histogram bar selection [#384](https://github.com/CartoDB/carto-react/pull/384)

### 1.3.0-alpha.5 (2022-04-25)

- Add callback prop to TableWidget to know when page size changed [#380](https://github.com/CartoDB/carto-react/pull/380)
- Normalize SQL API response due to providers inconsistency [#382](https://github.com/CartoDB/carto-react/pull/382)
- Implement CLOSED_OPEN and TIME filters for SQL to allow proper filtering [#381](https://github.com/CartoDB/carto-react/pull/381)
- Display warning when tilesets are dropping features [#385](https://github.com/CartoDB/carto-react/pull/385)

### 1.3.0-alpha.4 (2022-04-20)

- Bump deck.gl to 8.7.7 [#378](https://github.com/CartoDB/carto-react/pull/378)
- Add Global mode to TimeSeriesWidget [#377](https://github.com/CartoDB/carto-react/pull/377)
- Add Global mode to HistogramWidget [#371](https://github.com/CartoDB/carto-react/pull/371)
- Add Global mode to CategoryWidget & PieWidget [#370](https://github.com/CartoDB/carto-react/pull/370)
- Add Global mode to FormulaWidget [#368](https://github.com/CartoDB/carto-react/pull/368)

### 1.3.0-alpha.3 (2022-04-12)

- WrapperWidgetUI support externally controlled `expanded` attribute [#375](https://github.com/CartoDB/carto-react/pull/375)

### 1.3.0-alpha.2 (2022-04-11)

- Bump deck.gl to 8.7.5 [#373](https://github.com/CartoDB/carto-react/pull/373)
- Bump deck.gl to 8.7.3 [#360](https://github.com/CartoDB/carto-react/pull/360)
- Fix aggregation to ignore NULL values [#367](https://github.com/CartoDB/carto-react/pull/367)
- Fix regression for PieWidgetUI category selection logic [#369](https://github.com/CartoDB/carto-react/pull/369)
- Add support for formatted labels in LegendRamp [#372](https://github.com/CartoDB/carto-react/pull/372)

### 1.3.0-alpha.1 (2022-03-25)

- Add filters logical operator prop to source object [#363](https://github.com/CartoDB/carto-react/pull/363)

### 1.3.0-alpha.0 (2022-03-23)

- Implement multiple operationColumn in core functions [#347](https://github.com/CartoDB/carto-react/pull/347)
- Add RegExp string filtering capabilities [#362](https://github.com/CartoDB/carto-react/pull/362)
- Use multiple operationColumn in widgets [#361](https://github.com/CartoDB/carto-react/pull/361)

## 1.2

### 1.2.1 (2022-02-28)

- Bump deck.gl to 8.7.0 [#355](https://github.com/CartoDB/carto-react/pull/355)
- Typings fix: Include GMapsBasemaps in InitialCarto2State [#354](https://github.com/CartoDB/carto-react/pull/354)

### 1.2.1-beta.9 (2022-02-24)

- Bump deck.gl to 8.7.0-beta.7 [#352](https://github.com/CartoDB/carto-react/pull/352)
- Fix unchecked switch width [#351](https://github.com/CartoDB/carto-react/pull/351)
- Fix opacity selector input [#350](https://github.com/CartoDB/carto-react/pull/350)

### 1.2.1-beta.8 (2022-02-22)

- Bump deck.gl to 8.7.0-beta.6 [#348](https://github.com/CartoDB/carto-react/pull/348)
- Fix duplicated logic for category selection in HistogramWidgetUI [#345](https://github.com/CartoDB/carto-react/pull/345)
- Add groupByDate tests [#346](https://github.com/CartoDB/carto-react/pull/346)
- Refactor PieWidgetUI [#341](https://github.com/CartoDB/carto-react/pull/341)
- Add searchable prop in CategoryWidget to optionally use the search functionality [#338](https://github.com/CartoDB/carto-react/pull/338)
- Implement stringSearch filter [#331](https://github.com/CartoDB/carto-react/pull/331)
- Add filters tests [#331](https://github.com/CartoDB/carto-react/pull/331)

### 1.2.1-beta.7 (2022-02-18)

- Fix legend render with only visibility toggle [#342](https://github.com/CartoDB/carto-react/pull/342)
- Fix LegendWidget types [#343](https://github.com/CartoDB/carto-react/pull/343)
- Fix echarts-for-react events bug [#340](https://github.com/CartoDB/carto-react/pull/340)
- Set expanded/collapsed value of each legend row [#337](https://github.com/CartoDB/carto-react/pull/337)

### 1.2.1-beta.6 (2022-02-16)

- Use layerConfig in useCartoLayerProps [#336](https://github.com/CartoDB/carto-react/pull/336)
- Fix legends typings [#335](https://github.com/CartoDB/carto-react/pull/335)
- Fix legends export [#334](https://github.com/CartoDB/carto-react/pull/334)
- Fix duplicated logic for category selection in PieWidgetUI [#332](https://github.com/CartoDB/carto-react/pull/332)
- Add customLegendTypes prop to customise covered legend types [#325](https://github.com/CartoDB/carto-react/pull/325)

### 1.2.1-beta.5 (2022-02-15)

- Fix aggr operation considering null as valid for count [#326](https://github.com/CartoDB/carto-react/pull/326)
- Add legends tests/stories/types [#328](https://github.com/CartoDB/carto-react/pull/328)
- Fix error in getPalette, causing wrong colors when using CARTOColors [#328](https://github.com/CartoDB/carto-react/pull/328)
- Fix errors in LegendRamp with wrong labels [#328](https://github.com/CartoDB/carto-react/pull/328)
- Dynamic tiling integration [#327](https://github.com/CartoDB/carto-react/pull/327)
- Fix Switch input width [#323](https://github.com/CartoDB/carto-react/pull/323)
- Add optional slider to modify layer opacity in Legend widget [#324](https://github.com/CartoDB/carto-react/pull/324)

### 1.2.1-beta.4 (2022-02-10)

- HistogramWidget improve xAxis labels [#317](https://github.com/CartoDB/carto-react/pull/317)
- Add option in LegendCategories to draw color strokes [#311](https://github.com/CartoDB/carto-react/pull/311)
- Expose individual legend type components [#311](https://github.com/CartoDB/carto-react/pull/311)
- Fix how to read format tiles param from Maps API [#321](https://github.com/CartoDB/carto-react/pull/321)
- Fix Table Widget style issues [#318](https://github.com/CartoDB/carto-react/pull/318)

### 1.2.1-beta.3 (2022-02-09)

- Read formatTile from MAPS API tile url param instead of format to know the tiles format
- TimeSeriesWidget applying received formatter to yAxis [#315](https://github.com/CartoDB/carto-react/pull/315)
- Export FilterTypes enum [#314](https://github.com/CartoDB/carto-react/pull/314)
- Improve lasso tool copies [#313](https://github.com/CartoDB/carto-react/pull/313)

### 1.2.1-beta.2 (2022-02-08)

- Improve lasso tool copies [#313](https://github.com/CartoDB/carto-react/pull/313)
- Support for tiles in WGS84 [#312](https://github.com/CartoDB/carto-react/pull/312)

### 1.2.1-beta.1 (2022-02-01)

- Remove maskEnabled property and control the mask extension activation by maskId [#309](https://github.com/CartoDB/carto-react/pull/309)

### 1.2.1-beta.0 (2022-02-01)

- Upgrade storybook and fix custom-component stories [#303](https://github.com/CartoDB/carto-react/pull/303)
- Name refactor in DrawingTool for FeatureSelection [#271](https://github.com/CartoDB/carto-react/pull/271)
- Add compatibility between Google Maps and FeatureSelectionLayer [#271](https://github.com/CartoDB/carto-react/pull/271)
- Update deck.gl version to 8.7.0-beta.2 and integrate new deck.gl MaskExtension, required by FeatureSelectionLayer [#271](https://github.com/CartoDB/carto-react/pull/271)

### 1.2.1-alpha.8 (2022-01-27)

- Upgrade storybook and fix custom-component stories [#303](https://github.com/CartoDB/carto-react/pull/303)
- Fix Timeseries wrong filtering with time window [#306](https://github.com/CartoDB/carto-react/pull/306)

### 1.2.1-alpha.7 (2022-01-26)

- Support hours and minutes as step size in the time series widget [#297](https://github.com/CartoDB/carto-react/pull/297)
- Fix react-redux FilterBasic typing [#302](https://github.com/CartoDB/carto-react/pull/302)

### 1.2.1-alpha.6 (2022-01-24)

- Align legend icon with its label [#300](https://github.com/CartoDB/carto-react/pull/300)
- Align legend expand icon with title [#299](https://github.com/CartoDB/carto-react/pull/299)
- Use LegendComponent in LegendWidgetUI as JSX component to avoid react errors [#295](https://github.com/CartoDB/carto-react/pull/295)
- Add missing property (`googleMapId`) to `InitialCarto2State` [#294](https://github.com/CartoDB/carto-react/pull/294)
- Improve styles for MaterialUI Dialog component [#272](https://github.com/CartoDB/carto-react/pull/272)
- Add and export CartoTheme type that describe our custom theme [#298](https://github.com/CartoDB/carto-react/pull/298)

### 1.2.1-alpha.5 (2022-01-20)

- Fix size default value in ToggleButton storybook [#292](https://github.com/CartoDB/carto-react/pull/292)
- Add missing filterable default value [#291](https://github.com/CartoDB/carto-react/pull/291)
- Remove custom ToggleButtonGroup and ToggleButton default size value [#289](https://github.com/CartoDB/carto-react/pull/289)
- Improve styles for for MaterialUI CircularProgress component [#270](https://github.com/CartoDB/carto-react/pull/270)
- Improve styles for MaterialUI Slider component [#274](https://github.com/CartoDB/carto-react/pull/274)
- Improve styles for MaterialUI Chip component [#275](https://github.com/CartoDB/carto-react/pull/275)
- Fix wrong word break in widgets title [#290](https://github.com/CartoDB/carto-react/pull/290)
- Fix JS error in category label [#290](https://github.com/CartoDB/carto-react/pull/290)

### 1.2.1-alpha.4 (2022-01-19)

- Fix: TableWidget fixed height with pagination [#286](https://github.com/CartoDB/carto-react/pull/286)
- Add initialCollapsed prop to LegendWidget [#282](https://github.com/CartoDB/carto-react/pull/282)
- Fix executeSQL typing [#280](https://github.com/CartoDB/carto-react/pull/280)
- Fix widget long name going out of the frame [#266](https://github.com/CartoDB/carto-react/pull/266)
- Fix too long labels in CategoryWidget [#267](https://github.com/CartoDB/carto-react/pull/267)
- Improve styles for MaterialUI ToggleButton & ToggleButtonGroup components [#269](https://github.com/CartoDB/carto-react/pull/269)

### 1.2.1-alpha.3 (2022-01-18)

- Export getTable method for TableWidget model [#283](https://github.com/CartoDB/carto-react/pull/283)
- Expose height and dense prop in TableWidget [#279](https://github.com/CartoDB/carto-react/pull/279)
- Expose initialPageSize prop in TableWidget [#281](https://github.com/CartoDB/carto-react/pull/281)
- Fix filtersToSQL output when IN filter has numeric values [#277](https://github.com/CartoDB/carto-react/pull/277)
- Remove uniqueIdProperty default value in useGeojsonFeatures [#273](https://github.com/CartoDB/carto-react/pull/273)
- Allow disable widgets filtering [#268](https://github.com/CartoDB/carto-react/pull/268)
- Fix: use 0-based pagination in raw feature access and TableWidget [#265](https://github.com/CartoDB/carto-react/pull/265)

### 1.2.1-alpha.2 (2022-01-03)

- Fix: DrawingToolLayer disables interactivity of the layers behind it [#263](https://github.com/CartoDB/carto-react/pull/263)
- Add TableWidget [#154](https://github.com/CartoDB/carto-react/pull/154)

### 1.2.1-alpha.1 (2021-12-30)

- Track clientId for tracing purposes [#261](https://github.com/CartoDB/carto-react/pull/261)
- Update deck.gl version to 8.7.0-alpha.11 [#254](https://github.com/CartoDB/carto-react/pull/254)

### 1.2.1-alpha.0 (2021-12-29)

- WRAPPER WIDGET Configurable margin in widgets [#251](https://github.com/CartoDB/carto-react/pull/251)
- Add spatial filter to allow ramdom geometry filters in widgets[#250](https://github.com/CartoDB/carto-react/pull/250)
- DrawingToolWidget [#249](https://github.com/CartoDB/carto-react/pull/249)
- Fix: remove sortBy prop default value [#252](https://github.com/CartoDB/carto-react/pull/252)
- Fix TS type declarations for BasemapName and CartoSlice [#248](https://github.com/CartoDB/carto-react/pull/248)

## 1.1

### 1.1.4 (2021-12-16)

- Implement C4R filtering using binary data [#228](https://github.com/CartoDB/carto-react/pull/228)
- Fix build adding peerDependecy of @carto/react-core to @carto/react-ui [#237](https://github.com/CartoDB/carto-react/pull/237)
- Refactor useViewportFeatures [#238](https://github.com/CartoDB/carto-react/pull/238)
- Add clear button for TimeSeriesWidget widget and enable the speed button even though the animation has not started [#239](https://github.com/CartoDB/carto-react/pull/239)
- Improve timeseries animation performance [#243](https://github.com/CartoDB/carto-react/pull/243)
- Fix TS type declarations for BasemapName and CartoSlice [#248](https://github.com/CartoDB/carto-react/pull/248)

### 1.1.3 (2021-12-04)

- Histogram takes into account null values in filters for selected bars [#234](https://github.com/CartoDB/carto-react/pull/234)
- Return raw feature data from workers [#225](https://github.com/CartoDB/carto-react/pull/225)

### 1.1.2 (2021-12-01)

- Fix CategoryWidget values during animation [#230](https://github.com/CartoDB/carto-react/pull/230)
- Remove lock in CategoryWidget if selected categories change [#231](https://github.com/CartoDB/carto-react/pull/231)
- Refresh charts widgets when changing tooltip functions [#232](https://github.com/CartoDB/carto-react/pull/232)

### 1.1.1 (2021-11-23)

- Improve Widgets calculations sync with tiles [#223](https://github.com/CartoDB/carto-react/pull/223)
- `CategoryWidget`, `HistogramWidget`, `PieWidget` use filters in datasource to derive selecteditems (categories, bars) instead of local react state [224](https://github.com/CartoDB/carto-react/pull/224)

### 1.1.0 (2021-10-29)

- Histogram tooltip formatter receiving dataIndex and ticks [#220](https://github.com/CartoDB/carto-react/pull/220)
- Histogram yAxis max value should always be shown [#221](https://github.com/CartoDB/carto-react/pull/221)

### 1.1.0-beta.3 (2021-10-27)

- Improve TS typings [#213](https://github.com/CartoDB/carto-react/pull/213)
- Fix animation duration not consistent in TimeSeriesWidget [#214](https://github.com/CartoDB/carto-react/pull/214)
- Fix first X axis value partially hidden in Histogram widget [#215](https://github.com/CartoDB/carto-react/pull/215)
- Add missing animation default value in CategoryWidgetUI [#216](https://github.com/CartoDB/carto-react/pull/216)
- Fix PieWidget default label [#217](https://github.com/CartoDB/carto-react/pull/217)
- Fix PieWidget color assignment when using labels prop [#218](https://github.com/CartoDB/carto-react/pull/218)

### 1.1.0-beta.2 (2021-10-22)

- Fix warning console when LegendIcon is used [#170](https://github.com/CartoDB/carto-react/pull/170)
- Fix useTimeSeriesInteractivity error in TimeSeries widget [#200](https://github.com/CartoDB/carto-react/pull/200)
- Fix viewState sync bug in GoogleMap component [#199](https://github.com/CartoDB/carto-react/pull/199)
- Update Google maps component to support vector maps [#194](https://github.com/CartoDB/carto-react/pull/194)
- Fix LegendProportional when the values are not numbers [#171](https://github.com/CartoDB/carto-react/pull/171)
- Improve DataCloneError message when geometry column not called 'geom' [#175](https://github.com/CartoDB/carto-react/pull/175)
- Fix PieWidget colors not preserved [#176](https://github.com/CartoDB/carto-react/pull/176)
- Allow custom colors in PieWidget [#202](https://github.com/CartoDB/carto-react/pull/202)
- Fix the WrapperWidget breaking with headers of two lines [#179](https://github.com/CartoDB/carto-react/pull/179)
- Fix lack of animation in PieWidget [#180](https://github.com/CartoDB/carto-react/pull/180)
- Fix lack of animation in HistogramWidget [#182](https://github.com/CartoDB/carto-react/pull/182)
- Fix WrapperWidgetUI header justify content [#203](https://github.com/CartoDB/carto-react/pull/203)
- Add optional parameter to remove animation from widgets [#181](https://github.com/CartoDB/carto-react/pull/181)
- Allow PieWidget labels to be overwritten [#177](https://github.com/CartoDB/carto-react/pull/177)
- Fix legit 0 values being excluded from numeric filters [#204](https://github.com/CartoDB/carto-react/pull/204)
- Fix histogram widget filter, using closed-open intervals [#205](https://github.com/CartoDB/carto-react/pull/205)
- Adapt executeSQL to the new SQL API v3 response [#207](https://github.com/CartoDB/carto-react/pull/207)
- Fix missing connection arg in executeSQL / createRequest for POST requests [#206](https://github.com/CartoDB/carto-react/pull/206)
- Include new error hint message in API responses [#208](https://github.com/CartoDB/carto-react/pull/208/)
- Fix POST requests to SQL API not managing access_token properly [#210](https://github.com/CartoDB/carto-react/pull/210)
- Fix echarts update problems [#209](https://github.com/CartoDB/carto-react/pull/209)
- Fix issue with TimeSeriesWidget markLine if xAxis is undefined [#211](https://github.com/CartoDB/carto-react/pull/211)

### 1.1.0-beta.1 (2021-10-14)

- Update deck.gl version to 8.6.x [#197](https://github.com/CartoDB/carto-react/pull/197)
- Fix Scatterplot having Y axis values partially hidden [#174](https://github.com/CartoDB/carto-react/pull/174)
- Use Material-UI createTheme instead of deprecated createMuiTheme [#187](https://github.com/CartoDB/carto-react/pull/187)
- Fix error formatting FormulaWidget (AVG) values with no features in current viewport [#186](https://github.com/CartoDB/carto-react/pull/186)
- Add TimeSeriesWidget [#168](https://github.com/CartoDB/carto-react/pull/168)
- Add NoDataAlert component [#188](https://github.com/CartoDB/carto-react/pull/188) and [#191](https://github.com/CartoDB/carto-react/pull/191)
- Update echarts to v5 [#167](https://github.com/CartoDB/carto-react/pull/167)
- Fix unnecessary widget calculations triggered by widget itself [#185](https://github.com/CartoDB/carto-react/pull/185)
- Add new `useSourceFilters` hook for better custom widgets dev [#185](https://github.com/CartoDB/carto-react/pull/185)
- Fix unnecessary widgets calculations when unrelated source changes [#184](https://github.com/CartoDB/carto-react/pull/184)
- Remove widgetsLoadingState and derived actions from cartoSlice [#184](https://github.com/CartoDB/carto-react/pull/184)
- Fix unnecessary viewportFeatures calculation, after a filter change inside a source [#183](https://github.com/CartoDB/carto-react/pull/183)

### 1.1.0-beta.0 (2021-09-07)

- No major changes from 1.1.0-alpha.6. Just move to beta.

### 1.1.0-alpha.6 (2021-08-04)

- **Breaking change**: Allow to disable viewport features calculation. useCartoLayerProps uses now object destructuring. [#164](https://github.com/CartoDB/carto-react/pull/164)
- Rename Credentials exported types [#159](https://github.com/CartoDB/carto-react/pull/159)
- Improve types [#160](https://github.com/CartoDB/carto-react/pull/160)
- Adapt Legend widget to work without children [#161](https://github.com/CartoDB/carto-react/pull/161)
- Update deck.gl version to 8.5.0 [#162](https://github.com/CartoDB/carto-react/pull/162)
- Fix Material-UI warnings on justify property [#162](https://github.com/CartoDB/carto-react/pull/162)

### 1.1.0-alpha.5 (2021-07-12)

- Add and improve typings [#157](https://github.com/CartoDB/carto-react/pull/157)
- Update to latest 8.5.0-beta.1 deck.gl version [#158](https://github.com/CartoDB/carto-react/pull/158)

### 1.1.0-alpha.4 (2021-06-24)

- Fix ScatterplotWidget filters [#153](https://github.com/CartoDB/carto-react/pull/153)
- Add LegendWidget [#91](https://github.com/CartoDB/carto-react/pull/91)

### 1.1.0-alpha.3 (2021-06-17)

- Add support to CARTO Cloud Native [#142](https://github.com/CartoDB/carto-react/pull/142)
- Update TypeScript typings to Cloud Native and remove SourceTypes from react-api public api[#147](https://github.com/CartoDB/carto-react/pull/147)
- Remove SourceTypes from react-api public api [#147](https://github.com/CartoDB/carto-react/pull/147)
- Add new ScatterplotWidget component [#149](https://github.com/CartoDB/carto-react/pull/149)
- Update to latest 8.5.0-alpha.10 deck.gl version [#149](https://github.com/CartoDB/carto-react/pull/149)
- Add support to Cloud Native SQL API [#150](https://github.com/CartoDB/carto-react/pull/150)

## 1.0

### 1.0.1 (2021-04-12)

- Add basic Typescript typings [#136](https://github.com/CartoDB/carto-react/pull/136)
- Remove debugger in googlemap and clean code [#137](https://github.com/CartoDB/carto-react/pull/137)

### 1.0.0 (2021-03-23)

### 1.0.0-rc.3 (2021-03-22)

- Fix PieWidget tooltip confining it inside canvas [#130](https://github.com/CartoDB/carto-react/pull/130)
- Fix FormulaWidgetUI render when data is zero [#128](https://github.com/CartoDB/carto-react/pull/128)
- Remove viewportFilter boolean property from widgets [#131](https://github.com/CartoDB/carto-react/pull/131)

### 1.0.0-rc.2 (2021-03-19)

- Fix material-ui warnings due to wrong styles in theme [#124](https://github.com/CartoDB/carto-react/pull/124)
- Add Widgets from @carto/react-widgets to StoryBook [#120](https://github.com/CartoDB/carto-react/pull/120)
- Improve GoogleMap component [#121](https://github.com/CartoDB/carto-react/pull/121)
- Fix histogram removing last spurious bin [#123](https://github.com/CartoDB/carto-react/pull/123)
- Add workers to calculate viewportFeatures [#111](https://github.com/CartoDB/carto-react/pull/111)

### 1.0.0-rc.1 (2021-03-11)

- Add new PieWidget component [#36](https://github.com/CartoDB/carto-react/pull/36)
- Change 'category' in input data for CategoryWidget for a more generic 'name' parameter [#36](https://github.com/CartoDB/carto-react/pull/36)
- Improve performance widget client side calculations [#88](https://github.com/CartoDB/carto-react/pull/88)
- Change BigQuery source type name from 'bq' to 'bigquery' [#97](https://github.com/CartoDB/carto-react/pull/97)
- Change main dependencies mode to peer, reducing library bundle size [#85](https://github.com/CartoDB/carto-react/pull/85)
- Fix viewportFeatures with empty tiles [#100](https://github.com/CartoDB/carto-react/pull/100)
- Fix viewportFeatures mode in PieWidget when using viewportFilter [#102](https://github.com/CartoDB/carto-react/pull/102)
- BREAKING: Refactor into a new **multi-package** project [#104](https://github.com/CartoDB/carto-react/pull/104)
- Fix animations in Category Widget [#108](https://github.com/CartoDB/carto-react/pull/108)
- Rename useCartoLayerFilterProps hook to useCartoLayerProps [#109](https://github.com/CartoDB/carto-react/pull/109)
- Fix histogram operations with values equal to zero [#113](https://github.com/CartoDB/carto-react/pull/113)
- Return uniqueIdProperty from useCartoLayerProps hook [#113](https://github.com/CartoDB/carto-react/pull/113)
- Fix lint-staged for multi package [#117](https://github.com/CartoDB/carto-react/pull/117)

### 1.0.0-beta14 (2021-02-08)

- Fix an issue on histogram's operations when processing a not finite value [#79](https://github.com/CartoDB/carto-react/pull/79)
- Add sourcemaps and production mode in webpack bundles [#83](https://github.com/CartoDB/carto-react/pull/83)
- Fix number of categories counter when some are locked on Category Widget [#81](https://github.com/CartoDB/carto-react/pull/81)
- Fix luma mismatch caused by the use of '@deck.gl/extensions' [#86](https://github.com/CartoDB/carto-react/pull/86)

### 1.0.0-beta13 (2021-02-02)

- Remove getUserDatasets method from api [#68](https://github.com/CartoDB/carto-react/pull/68)
- Fix hover color in secondary buttons [#65](https://github.com/CartoDB/carto-react/pull/65)
- Fix widgets loading state when calculating client-side [#75](https://github.com/CartoDB/carto-react/pull/75)
- Fix min/max aggregated functions [#76](https://github.com/CartoDB/carto-react/pull/76)
- Fix eventual memory leaks on requestAnimationFrame, on Category and Formula widgets [#77](https://github.com/CartoDB/carto-react/pull/77)
- Update deck.gl version to 8.4 [#78](https://github.com/CartoDB/carto-react/pull/78)

### 1.0.0-beta12 (2021-01-22)

- Fix basemap casing in store and action so `basemap` and `setBasemap` are used [#64](https://github.com/CartoDB/carto-react/pull/64)

### 1.0.0-beta10 (2021-01-14)

- Fix WrapperWidgetUI anchorOrigin error [#55](https://github.com/CartoDB/carto-react/pull/55)
- Add tooltip to WrapperWidget action buttons [#56](https://github.com/CartoDB/carto-react/pull/56)
- Extend widget props to WrapperWidgetUI with a better implementation [#57](https://github.com/CartoDB/carto-react/pull/57)

### 1.0.0-beta9 (2020-12-18)

- Pass actions and options to WrapperWidgetUI from HistogramWidget and CategoryWidget [#50](https://github.com/CartoDB/carto-react/pull/50)
- Fix addSource in cartoSlice spreading layerAttributes [#52](https://github.com/CartoDB/carto-react/pull/52)
- Category widget UX improvements [#54](https://github.com/CartoDB/carto-react/pull/54)
- Add new clearFilters action [#58](https://github.com/CartoDB/carto-react/pull/58)
- Design improvements [#59](https://github.com/CartoDB/carto-react/pull/59)

### 1.0.0-beta8 (2020-12-15)

- Remove OAuthLogin component (extracted to the template project) [#44](https://github.com/CartoDB/carto-react/pull/44)
- Add layerAttributes to addLayer and refactor updateLayer to use same destructuring approach [#45](https://github.com/CartoDB/carto-react/pull/45)
- Restyle map attribution button for mobile [#46](https://github.com/CartoDB/carto-react/pull/46)
- Allow disabling tooltip in HistogramWidget and fix hover on disabled bars for touch devices [#46](https://github.com/CartoDB/carto-react/pull/46)
- Fix Clear button not appearing on iOS devices [#46](https://github.com/CartoDB/carto-react/pull/46)
- Mobile design improvements [#47](https://github.com/CartoDB/carto-react/pull/47)

### 1.0.0-beta7 (2020-12-04)

- Add meta value example to List component story [#31](https://github.com/CartoDB/carto-react/pull/31)
- Mobile fixes and fix loading datasets for free accounts [#38](https://github.com/CartoDB/carto-react/pull/38)
- Add updateLayer action to cartoSlice [#39](https://github.com/CartoDB/carto-react/pull/39)

### 1.0.0-beta6 (2020-11-27)

- Added meta value version to List component [#31](https://github.com/CartoDB/carto-react/pull/31)
- Fix CategoryWidgetUI displaying no data while loading [#26](https://github.com/CartoDB/carto-react/pull/26)
- Animate CategoryWidget values [#30](https://github.com/CartoDB/carto-react/pull/30)
- Make OAuthLogin component responsive [#28](https://github.com/CartoDB/carto-react/pull/28)
- Remove FilterTypes from API exports [#29](https://github.com/CartoDB/carto-react/pull/29)
- Fix CategoryWidgetUI keeping the order for blocked categories [#32](https://github.com/CartoDB/carto-react/pull/32)
- Fix bar size in CategoryWidget [#33](https://github.com/CartoDB/carto-react/pull/33)

### 1.0.0-beta5 (2020-11-25)

- Fix addSource keeping optional credentials property in the payload [#24](https://github.com/CartoDB/carto-react/pull/24)

### 1.0.0-beta4 (2020-11-24)

- Fix addSource, keeping optional credentials property in the payload [#22](https://github.com/CartoDB/carto-react/pull/22)

### 1.0.0-beta3 (2020-11-24)

- Improve package.json metadata + README inclusion in npm publication [#20](https://github.com/CartoDB/carto-react/pull/20)

### 1.0.0-beta2 (2020-11-23)

- Fix missing regenerator runtime in the build [#13](https://github.com/CartoDB/carto-react/pull/13)
- Doc updates for api reference

### 1.0.0-beta1 (2020-11-20)

- Initial release: api, basemaps, oauth, redux and ui
