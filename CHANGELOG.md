# CHANGELOG

## Not released

- Add tooltip to WrapperWidget action buttons [#55](https://github.com/CartoDB/carto-react-lib/pull/55)
- Extend widget props to WrapperWidgetUI with a better implementation [#57](https://github.com/CartoDB/carto-react-lib/pull/57)

## 1.0.0-beta9 (2020-12-18)

- Pass actions and options to WrapperWidgetUI from HistogramWidget and CategoryWidget [#50](https://github.com/CartoDB/carto-react-lib/pull/50)
- Fix addSource in cartoSlice spreading layerAttributes [#52](https://github.com/CartoDB/carto-react-lib/pull/52)
- Category widget UX improvements [#54](https://github.com/CartoDB/carto-react-lib/pull/54)
- Add new clearFilters action [#58](https://github.com/CartoDB/carto-react-lib/pull/58)
- Design improvements [#59](https://github.com/CartoDB/carto-react-lib/pull/59)

## 1.0.0-beta8 (2020-12-15)

- Remove OAuthLogin component (extracted to the template project) [#44](https://github.com/CartoDB/carto-react-lib/pull/44)
- Add layerAttributes to addLayer and refactor updateLayer to use same destructuring approach [#45](https://github.com/CartoDB/carto-react-lib/pull/45)
- Restyle map attribution button for mobile [#46](https://github.com/CartoDB/carto-react-lib/pull/46)
- Allow disabling tooltip in HistogramWidget and fix hover on disabled bars for touch devices [#46](https://github.com/CartoDB/carto-react-lib/pull/46)
- Fix Clear button not appearing on iOS devices [#46](https://github.com/CartoDB/carto-react-lib/pull/46)
- Mobile design improvements [#47](https://github.com/CartoDB/carto-react-lib/pull/47)

## 1.0.0-beta7 (2020-12-04)

- Add meta value example to List component story [#31](https://github.com/CartoDB/carto-react-lib/pull/31)
- Mobile fixes and fix loading datasets for free accounts [#38](https://github.com/CartoDB/carto-react-lib/pull/38)
- Add updateLayer action to cartoSlice [#39](https://github.com/CartoDB/carto-react-lib/pull/39)

## 1.0.0-beta6 (2020-11-27)

- Fix CategoryWidgetUI displaying no data while loading [#26](https://github.com/CartoDB/carto-react-lib/pull/26)
- Animate CategoryWidget values [#30](https://github.com/CartoDB/carto-react-lib/pull/30)
- Make OAuthLogin component responsive [#28](https://github.com/CartoDB/carto-react-lib/pull/28)
- Remove FilterTypes from API exports [#29](https://github.com/CartoDB/carto-react-lib/pull/29)
- Fix CategoryWidgetUI keeping the order for blocked categories [#32](https://github.com/CartoDB/carto-react-lib/pull/32)
- Fix bar size in CategoryWidget [#33](https://github.com/CartoDB/carto-react-lib/pull/33)

## 1.0.0-beta5 (2020-11-25)

- Fix addSource keeping optional credentials property in the payload [#24](https://github.com/CartoDB/carto-react-lib/pull/24)

## 1.0.0-beta4 (2020-11-24)

- Fix addSource, keeping optional credentials property in the payload [#22](https://github.com/CartoDB/carto-react-lib/pull/22)

## 1.0.0-beta3 (2020-11-24)

- Improve package.json metadata + README inclusion in npm publication [#20](https://github.com/CartoDB/carto-react-lib/pull/20)

## 1.0.0-beta2 (2020-11-23)

- Fix missing regenerator runtime in the build [#13](https://github.com/CartoDB/carto-react-lib/pull/13)
- Doc updates for api reference

## 1.0.0-beta1 (2020-11-20)

- Initial release: api, basemaps, oauth, redux and ui