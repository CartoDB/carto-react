import { makeIntervalComplete } from '../utils/makeIntervalComplete';

// FilterTypes.BETWEEN
export function between(filterValues, featureValue) {
  const checkRange = (range) => {
    const [lowerBound, upperBound] = range;
    return featureValue >= lowerBound && featureValue <= upperBound;
  };

  return makeIntervalComplete(filterValues).some(checkRange);
}

// FilterTypes.CLOSED_OPEN
export function closedOpen(filterValues, featureValue) {
  const checkRange = (range) => {
    const [lowerBound, upperBound] = range;
    return featureValue >= lowerBound && featureValue < upperBound;
  };

  return makeIntervalComplete(filterValues).some(checkRange);
}

// FilterTypes.STRING_SEARCH
export function stringSearch(filterValues, featureValue) {
  const normalizedFeatureValue = normalize(featureValue);

  return filterValues.some((filterValue) => {
    const regex = new RegExp(escapeRegExp(normalize(filterValue)), 'gi');
    return !!normalizedFeatureValue.match(regex);
  });
}

// Aux
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalize(data) {
  return ('' + data)
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
