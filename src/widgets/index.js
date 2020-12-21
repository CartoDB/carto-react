/**
 * @typedef {Object} FormattedValue
 * @property {string} value - The formatted value
 * @property {string} prefix - The prefix to apply to the value
 * @property {string} suffix - The suffix to apply to the value
 */

/**
 * @typedef {Object} ErrorObject
 * @property {string} name - The error name
 * @property {string} message - The error message 
 */

/**
 * Formatter function to apply on a widget value
 *
 * @callback formatterCallback
 * @param {number} value - Number to format
 * @returns {(string|FormattedValue)} - String with the whole formatted value or a FormattedValue object containing the value and optional an optional prefix or suffix
 */

/**
 * Error handler
 * @callback errorCallback
 * @param {ErrorObject} error - Error object to handle 
 */

export { default as CategoryWidget } from './CategoryWidget';
export { default as FormulaWidget } from './FormulaWidget';
export { default as GeocoderWidget } from './GeocoderWidget';
export { default as HistogramWidget } from './HistogramWidget';
export { getFormula, getHistogram, getCategories, geocodeStreetPoint } from './models';
export { AggregationTypes } from './AggregationTypes';
export { SourceTypes } from './SourceTypes';
