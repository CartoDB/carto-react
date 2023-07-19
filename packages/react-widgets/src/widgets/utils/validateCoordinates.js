export const isLatitude = (lat) => {
  return isFinite(lat) && Math.abs(lat) <= 90;
};

export const isLongitude = (lng) => {
  return isFinite(lng) && Math.abs(lng) <= 180;
};

export const isCoordinate = (str) => {
  const coordinateRegexp =
    /^-?([1-8]?\d(\.\d{1,16})?|90(\.0{1,16})?)(,?\s?)-?((1?[0-7]|\d)?\d(\.\d{1,16})?|180(\.0{1,16})?)$/;
  return coordinateRegexp.test(str);
};

export const validateAndGenerateCoordsResult = (searchText) => {
  const [latitude, longitude] =
    searchText.indexOf(',') !== -1 ? searchText.split(',') : searchText.split(' ');
  const hasCoords = latitude && longitude;
  const areValidCoords = isLatitude(latitude) && isLongitude(longitude);
  if (!hasCoords || !areValidCoords) return false;
  return {
    longitude: parseFloat(longitude),
    latitude: parseFloat(latitude)
  };
};
