import { makeIntervalComplete } from '../utils/makeIntervalComplete';

export const FilterTypes = Object.freeze({
  IN: 'in',
  BETWEEN: 'between', // [a, b] both are included
  CLOSED_OPEN: 'closed_open', // [a, b) a is included, b is not
  TIME: 'time',
  STRING_SEARCH: 'stringSearch'
});

export const filterFunctions = {
  [FilterTypes.IN](filterValues, featureValue) {
    return filterValues.includes(featureValue);
  },
  [FilterTypes.BETWEEN]: between,
  [FilterTypes.TIME](filterValues, featureValue) {
    const featureValueAsTimestamp = new Date(featureValue).getTime();
    if (isFinite(featureValueAsTimestamp)) {
      return between(filterValues, featureValueAsTimestamp);
    } else {
      throw new Error(`Column used to filter by time isn't well formatted.`);
    }
  },
  [FilterTypes.CLOSED_OPEN]: closedOpen,
  [FilterTypes.STRING_SEARCH]: stringSearch
};

// FilterTypes.BETWEEN
function between(filterValues, featureValue) {
  const checkRange = (range) => {
    const [lowerBound, upperBound] = range;
    return featureValue >= lowerBound && featureValue <= upperBound;
  };

  return makeIntervalComplete(filterValues).some(checkRange);
}

// FilterTypes.CLOSED_OPEN
function closedOpen(filterValues, featureValue) {
  const checkRange = (range) => {
    const [lowerBound, upperBound] = range;
    return featureValue >= lowerBound && featureValue < upperBound;
  };

  return makeIntervalComplete(filterValues).some(checkRange);
}

// FilterTypes.STRING_SEARCH
function stringSearch(filterValues, featureValue, params = {}) {
  const normalizedFeatureValue = normalize(featureValue, params);
  const stringRegExp = filterValues
    .map((filterValue) => {
      let formattedValue = filterValue;

      if (!params.useRegExp) {
        formattedValue = escapeRegExp(normalize(filterValue, params));
        if (params.mustStart) formattedValue = `^${formattedValue}`;
        if (params.mustEnd) formattedValue = `${formattedValue}$`;
      }

      return formattedValue;
    })
    .join('|');

  const regex = new RegExp(stringRegExp, 'g');
  return !!normalizedFeatureValue.match(regex);
}

// Aux
const specialCharRegExp = /[.*+?^${}()|[\]\\]/g;
const normalizeRegExp = /\p{Diacritic}/gu;

function escapeRegExp(value) {
  return value.replace(specialCharRegExp, '\\$&');
}

function normalize(data, params) {
  let normalizedData = '' + data;

  if (!params.caseSensitive) normalizedData = normalizedData.toLocaleLowerCase();
  if (!params.keepSpecialCharacters)
    normalizedData = normalizedData.normalize('NFD').replace(normalizeRegExp, '');

  return normalizedData;
}
