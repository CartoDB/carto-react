// stolen from deck.gl/modules/carto/src/layers/h3-tileset-2d.ts
const BIAS = 2;
function getHexagonResolution(viewport, tileSize) {
  // Difference in given tile size compared to deck's internal 512px tile size,
  // expressed as an offset to the viewport zoom.
  const zoomOffset = Math.log2(tileSize / 512);
  const hexagonScaleFactor = (2 / 3) * (viewport.zoom - zoomOffset);
  const latitudeScaleFactor = Math.log(1 / Math.cos((Math.PI * viewport.latitude) / 180));

  // Clip and bias
  return Math.max(0, Math.floor(hexagonScaleFactor + latitudeScaleFactor - BIAS));
}

const maxH3SpatialFiltersResolutions = [
  [20, 14],
  [19, 13],
  [18, 12],
  [17, 11],
  [16, 10],
  [15, 9],
  [14, 8],
  [13, 7],
  [12, 7],
  [11, 7],
  [10, 6],
  [9, 6],
  [8, 5],
  [7, 4],
  [6, 4],
  [5, 3],
  [4, 2],
  [3, 1],
  [2, 1],
  [1, 0]
];

const quadBinZoomMaxOffset = 4;

const DEFAULT_TILE_SIZE = 512;
const DEFAULT_AGGREGATION_RES_LEVEL_H3 = 4;
const DEFAULT_AGGREGATION_RES_LEVEL_QUADBIN = 6;

export function getSpatialFiltersResolution({ source, spatialDataType, viewState }) {
  if (spatialDataType === 'geo') return undefined;

  const currentZoom = viewState.zoom ?? 1;

  const dataResolution = source.dataResolution ?? Number.MAX_VALUE;

  const aggregationResLevel =
    source.aggregationResLevel ??
    (spatialDataType === 'h3'
      ? DEFAULT_AGGREGATION_RES_LEVEL_H3
      : DEFAULT_AGGREGATION_RES_LEVEL_QUADBIN);

  const aggregationResLevelOffset = Math.max(0, Math.floor(aggregationResLevel));

  const currentZoomInt = Math.ceil(currentZoom);
  if (spatialDataType === 'h3') {
    const tileSize = DEFAULT_TILE_SIZE;
    const maxResolutionForZoom =
      maxH3SpatialFiltersResolutions.find(([zoom]) => zoom === currentZoomInt)?.[1] ??
      Math.max(0, currentZoomInt - 3);

    const maxSpatialFiltersResolution = maxResolutionForZoom
      ? Math.min(dataResolution, maxResolutionForZoom)
      : dataResolution;

    const hexagonResolution =
      getHexagonResolution(
        { zoom: currentZoom, latitude: viewState.latitude },
        tileSize
      ) + aggregationResLevelOffset;

    return Math.min(hexagonResolution, maxSpatialFiltersResolution);
  }

  if (spatialDataType === 'quadbin') {
    const maxResolutionForZoom = currentZoomInt + quadBinZoomMaxOffset;
    const maxSpatialFiltersResolution = Math.min(dataResolution, maxResolutionForZoom);

    const quadsResolution = Math.floor(viewState.zoom) + aggregationResLevelOffset;
    return Math.min(quadsResolution, maxSpatialFiltersResolution);
  }

  return undefined;
}
