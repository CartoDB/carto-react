function isFeature(value) {
  return typeof value === 'object';
}

function getValueFromFeature(feature, column) {
  if (!isFeature(feature)) {
    return 0;
  }

  const value = feature[column];
  const isValidValue = Number.isFinite(value);
  return isValidValue ? value : 0;
}

export function pickValuesFromFeatures(features, column) {
  return features.map((feat) => getValueFromFeature(feat, column));
}
