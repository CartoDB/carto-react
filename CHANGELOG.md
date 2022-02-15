# CHANGELOG

## Not released

- Fix legends export [#334](https://github.com/CartoDB/carto-react/pull/334)
- Fix duplicated logic for category selection in PieWidgetUI [#332](https://github.com/CartoDB/carto-react/pull/332)

## 1.2

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
