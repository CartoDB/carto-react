import {
  processTiles,
  geojsonFeatures,
  aggregationFunctions,
  _applyFilters,
  histogram,
  scatterPlot,
  groupValuesByColumn,
  groupValuesByDateColumn,
  transformToTileCoords
} from '@carto/react-core';
import { TILE_FORMATS } from '@deck.gl/carto';
import bboxPolygon from '@turf/bbox-polygon';
import booleanWithin from '@turf/boolean-within';
import { applySorting } from '../utils/sorting';
import { Methods } from '../workerMethods';
import intersect from '@turf/intersect';

let currentFeatures;
let currentGeoJSON;
let currentTiles;

onmessage = ({ data: { method, ...params } }) => {
  switch (method) {
    case Methods.TILE_FEATURES:
      getTileFeatures(params);
      break;
    case Methods.FEATURES_FORMULA:
      getFormula(params);
      break;
    case Methods.FEATURES_HISTOGRAM:
      getHistogram(params);
      break;
    case Methods.FEATURES_CATEGORY:
      getCategories(params);
      break;
    case Methods.FEATURES_SCATTERPLOT:
      getScatterPlot(params);
      break;
    case Methods.FEATURES_TIME_SERIES:
      getTimeSeries(params);
      break;
    case Methods.FEATURES_RAW:
      getRawFeatures(params);
      break;
    case Methods.LOAD_TILES:
      loadTiles(params);
      break;
    case Methods.LOAD_GEOJSON_FEATURES:
      loadGeoJSONFeatures(params);
      break;
    case Methods.GEOJSON_FEATURES:
      getGeojsonFeatures(params);
      break;
    default:
      throw new Error('Invalid worker method');
  }
};

function getTileFeatures({ viewport, geometry, tileFormat }) {
  let t0 = performance.now();
  const viewportPolygon = bboxPolygon(viewport);
  const geometryToIntersect = flatGeometries(viewportPolygon, geometry);
  currentFeatures = [];

  for (let tile of currentTiles) {
    const { bbox } = tile;
    const bboxToGeom = bboxPolygon([bbox.west, bbox.south, bbox.east, bbox.north]);
    const tileIsFullyVisible = booleanWithin(bboxToGeom, geometryToIntersect);

    let foundFeatures = [];
    if (tileIsFullyVisible) {
      for (let feature of tile.data) foundFeatures.push(feature.properties);
    } else {
      // Clip the geometry to intersect with the tile
      const clippedGeometryToIntersect = intersect(bboxToGeom, geometryToIntersect);

      if (!clippedGeometryToIntersect) {
        continue;
      }

      // We assume that MVT tileFormat uses local coordinates so we transform the geometry to intersect to tile coordinates [0..1],
      // while in the case of 'geojson' or binary, the geometries are already in WGS84
      const transformedGeometryToIntersect = {
        geometry:
          tileFormat === TILE_FORMATS.MVT
            ? transformToTileCoords(clippedGeometryToIntersect.geometry, bbox)
            : clippedGeometryToIntersect.geometry
      };

      foundFeatures = geojsonFeatures({
        geojson: { features: tile.data },
        geometry: transformedGeometryToIntersect
      });
    }

    currentFeatures = currentFeatures.concat(foundFeatures);
  }

  let t1 = performance.now();
  console.log('Process tiles by viewport', t1 - t0);

  postMessage({ result: true });
}

function loadTiles({ tiles, uniqueIdProperty }) {
  let t0 = performance.now();
  currentTiles = processTiles({ tiles, uniqueIdProperty });
  let t1 = performance.now();
  console.log('Load tiles', t1 - t0);
  postMessage({ result: true });
}

function loadGeoJSONFeatures({ geojson }) {
  currentGeoJSON = geojson;
  postMessage({ result: true });
}

function getGeojsonFeatures({ viewport, geometry, uniqueIdProperty }) {
  if (currentGeoJSON) {
    currentFeatures = geojsonFeatures({
      geojson: currentGeoJSON,
      viewport,
      geometry,
      uniqueIdProperty
    });
  }
  postMessage({ result: true });
}

function getFormula({ filters, operation, column }) {
  let result = null;

  if (currentFeatures) {
    const targetOperation = aggregationFunctions[operation];

    const filteredFeatures = getFilteredFeatures(filters);

    result = [{ value: targetOperation(filteredFeatures, column) }];
  }

  postMessage({ result });
}

function getHistogram({ filters, operation, column, ticks }) {
  let result = null;

  if (currentFeatures) {
    const filteredFeatures = getFilteredFeatures(filters);

    result = histogram(filteredFeatures, column, ticks, operation);
  }

  postMessage({ result });
}

function getCategories({ filters, operation, column, operationColumn }) {
  let result = null;

  if (currentFeatures) {
    const filteredFeatures = getFilteredFeatures(filters);

    const groups = groupValuesByColumn(
      filteredFeatures,
      operationColumn,
      column,
      operation
    );

    result = groups || [];
  }

  postMessage({ result });
}

function getScatterPlot({ filters, xAxisColumn, yAxisColumn }) {
  let result = [];
  if (currentFeatures) {
    const filteredFeatures = getFilteredFeatures(filters);
    result = scatterPlot(filteredFeatures, xAxisColumn, yAxisColumn);
  }

  postMessage({ result });
}

function getTimeSeries({ filters, column, stepSize, operation, operationColumn }) {
  let result = [];

  if (currentFeatures) {
    const filteredFeatures = getFilteredFeatures(filters);

    const groups = groupValuesByDateColumn(
      filteredFeatures,
      operationColumn,
      column,
      stepSize,
      operation
    );

    result = groups || [];
  }

  postMessage({ result });
}

// See sorting details in utils/sorting.js
function getRawFeatures({
  filters,
  limit = 10,
  page = 0,
  sortBy,
  sortByDirection = 'asc'
}) {
  let data = [];
  let numberPages = 0;
  let totalCount = 0;

  if (currentFeatures) {
    data = applySorting(getFilteredFeatures(filters), {
      sortBy,
      sortByDirection
    });

    totalCount = data.length;

    if (limit) {
      numberPages = Math.ceil(data.length / limit);
      data = applyPagination(data, { limit, page });
    }
  }

  postMessage({
    result: { data, currentPage: page, pages: numberPages, totalCount }
  });
}

function applyPagination(features, { limit, page }) {
  return features.slice(limit * Math.max(0, page), limit * Math.max(1, page + 1));
}

function getFilteredFeatures(filters = {}) {
  return _applyFilters(currentFeatures, filters);
}

function flatGeometries(...geometries) {
  const validGeometries = geometries.filter(Boolean);
  return validGeometries.length === 2
    ? intersect(geometries[0], geometries[1])
    : geometries[0];
}
