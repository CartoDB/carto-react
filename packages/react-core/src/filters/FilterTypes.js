import { makeIntervalComplete } from '../utils/makeIntervalComplete';

export const FilterTypes = Object.freeze({
  IN: 'in',
  BETWEEN: 'between', // [a, b] both are included
  CLOSED_OPEN: 'closed_open', // [a, b) a is included, b is not
  TIME: 'time',
  STRING_SEARCH: 'stringSearch',
  FOREIGN_IN: 'foreign_in'
});

export const filterFunctions = {
  [FilterTypes.IN]: includes,
  [FilterTypes.FOREIGN_IN]: includes,
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

function includes(filterValues, featureValue) {
  return filterValues.includes(featureValue);
}

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
  const stringRegExp = params.useRegExp
    ? filterValues
    : filterValues.map((filterValue) => {
        let stringRegExp = escapeRegExp(normalize(filterValue, params));

        if (params.mustStart) stringRegExp = `^${stringRegExp}`;
        if (params.mustEnd) stringRegExp = `${stringRegExp}$`;

        return stringRegExp;
      });

  const regex = new RegExp(stringRegExp.join('|'), params.caseSensitive ? 'g' : 'gi');
  return !!normalizedFeatureValue.match(regex);
}

// Aux
const specialCharRegExp = /[.*+?^${}()|[\]\\]/g;
const normalizeRegExp = /\p{Diacritic}/gu;

function escapeRegExp(value) {
  return value.replace(specialCharRegExp, '\\$&');
}

function normalize(data, params) {
  let normalizedData = String(data);
  if (!params.keepSpecialCharacters)
    normalizedData = normalizedData.normalize('NFD').replace(normalizeRegExp, '');

  return normalizedData;
}
