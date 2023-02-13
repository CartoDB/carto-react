import {
  tileFeatures,
  geojsonFeatures,
  aggregationFunctions,
  _applyFilters,
  histogram,
  scatterPlot,
  groupValuesByColumn,
  groupValuesByDateColumn,
  AggregationTypes
} from '@carto/react-core';
import { InvalidColumnError } from '@carto/react-core/';
import { applySorting } from '../utils/sorting';

let currentFeatures;
let currentGeoJSON;
let currentTiles;

export function getTileFeatures({
  viewport,
  geometry,
  uniqueIdProperty,
  tileFormat,
  geoColumName,
  spatialIndex
}) {
  currentFeatures = tileFeatures({
    tiles: currentTiles,
    viewport,
    geometry,
    uniqueIdProperty,
    tileFormat,
    geoColumName,
    spatialIndex
  });
  return true;
}

export function loadTiles({ tiles }) {
  currentTiles = tiles;
  return true;
}

export function loadGeoJSONFeatures({ geojson }) {
  currentGeoJSON = geojson;
  return true;
}

export function getGeojsonFeatures({ viewport, geometry, uniqueIdProperty }) {
  if (currentGeoJSON) {
    currentFeatures = geojsonFeatures({
      geojson: currentGeoJSON,
      viewport,
      geometry,
      uniqueIdProperty
    });
  }
  return true;
}

export function getFormula({
  filters,
  filtersLogicalOperator,
  operation,
  column,
  joinOperation
}) {
  let result = null;

  if (currentFeatures) {
    const targetOperation = aggregationFunctions[operation];

    const isCount = operation === AggregationTypes.COUNT;

    // If the operation isn't count, we need to assert the column
    // If the operation is count, the column can be undefined
    if (!isCount || (isCount && column)) {
      assertColumn(column);
    }

    const filteredFeatures = getFilteredFeatures(filters, filtersLogicalOperator);

    if (filteredFeatures.length === 0 && !isCount) {
      result = { value: null };
    } else {
      result = { value: targetOperation(filteredFeatures, column, joinOperation) };
    }
  }

  return result;
}

export function getHistogram({
  filters,
  filtersLogicalOperator,
  operation,
  column,
  ticks,
  joinOperation
}) {
  let result = null;

  if (currentFeatures) {
    const filteredFeatures = getFilteredFeatures(filters, filtersLogicalOperator);

    assertColumn(column);

    result = histogram({
      data: filteredFeatures,
      valuesColumns: normalizeColumns(column),
      joinOperation,
      ticks,
      operation
    });
  }

  return result;
}

export function getCategories({
  filters,
  filtersLogicalOperator,
  operation,
  column,
  operationColumn,
  joinOperation
}) {
  let result = null;

  if (currentFeatures) {
    const filteredFeatures = getFilteredFeatures(filters, filtersLogicalOperator);

    assertColumn(column, operationColumn);

    const groups = groupValuesByColumn({
      data: filteredFeatures,
      valuesColumns: normalizeColumns(operationColumn),
      joinOperation,
      keysColumn: column,
      operation
    });

    result = groups || [];
  }

  return result;
}

export function getScatterPlot({
  filters,
  filtersLogicalOperator,
  xAxisColumn,
  yAxisColumn,
  xAxisJoinOperation,
  yAxisJoinOperation
}) {
  let result = [];
  if (currentFeatures) {
    const filteredFeatures = getFilteredFeatures(filters, filtersLogicalOperator);

    assertColumn(xAxisColumn, yAxisColumn);

    result = scatterPlot({
      data: filteredFeatures,
      xAxisColumns: normalizeColumns(xAxisColumn),
      xAxisJoinOperation,
      yAxisColumns: normalizeColumns(yAxisColumn),
      yAxisJoinOperation
    });
  }

  return result;
}

export function getTimeSeries({
  filters,
  filtersLogicalOperator,
  column,
  stepSize,
  operation,
  operationColumn,
  joinOperation
}) {
  let result = [];

  if (currentFeatures) {
    const filteredFeatures = getFilteredFeatures(filters, filtersLogicalOperator);

    assertColumn(operationColumn, column);

    const groups = groupValuesByDateColumn({
      data: filteredFeatures,
      valuesColumns: normalizeColumns(operationColumn),
      keysColumn: column,
      groupType: stepSize,
      operation,
      joinOperation
    });

    result = groups || [];
  }

  return result;
}

export function getRange({ filters, filtersLogicalOperator, column }) {
  let result = null;

  if (currentFeatures) {
    const filteredFeatures = getFilteredFeatures(filters, filtersLogicalOperator);

    assertColumn(column);

    result = {
      min: aggregationFunctions.min(filteredFeatures, column),
      max: aggregationFunctions.max(filteredFeatures, column)
    };
  }

  return result;
}

// See sorting details in utils/sorting.js
export function getRawFeatures({
  filters,
  filtersLogicalOperator,
  limit = 10,
  page = 0,
  sortBy,
  sortByDirection = 'asc',
  sortByColumnType
}) {
  let data = [];
  let numberPages = 0;
  let totalCount = 0;

  if (currentFeatures) {
    data = applySorting(getFilteredFeatures(filters, filtersLogicalOperator), {
      sortBy,
      sortByDirection,
      sortByColumnType
    });

    totalCount = data.length;

    if (limit) {
      numberPages = Math.ceil(data.length / limit);
      data = applyPagination(data, { limit, page });
    }
  }

  return { data, currentPage: page, pages: numberPages, totalCount };
}

function applyPagination(features, { limit, page }) {
  return features.slice(limit * Math.max(0, page), limit * Math.max(1, page + 1));
}

function getFilteredFeatures(filters = {}, filtersLogicalOperator) {
  return _applyFilters(currentFeatures, filters, filtersLogicalOperator);
}

function assertColumn(...columnArgs) {
  // This check can only be done if there're features
  if (currentFeatures.length) {
    // Due to the multiple column shape, we normalise it as an array with normalizeColumns
    const columns = Array.from(new Set(columnArgs.map(normalizeColumns).flat()));

    const featureKeys = Object.keys(currentFeatures[0]);

    const invalidColumns = columns.filter((column) => !featureKeys.includes(column));

    if (invalidColumns.length) {
      throw new InvalidColumnError(`Missing column(s): ${invalidColumns.join(', ')}`);
    }
  }
}

function normalizeColumns(columns) {
  return Array.isArray(columns) ? columns : typeof columns === 'string' ? [columns] : [];
}
