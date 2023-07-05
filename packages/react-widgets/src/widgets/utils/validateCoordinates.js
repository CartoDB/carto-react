export const isLatitude = (lat) => {
  return isFinite(lat) && Math.abs(lat) <= 90;
};

export const isLongitude = (lng) => {
  return isFinite(lng) && Math.abs(lng) <= 180;
};

export const isCoordinate = (str) => {
  const coordinateRegexp =
    /^-?(\d{1,2}|1[0-7]\d|\d{1,2}\.\d{1,9}|1[0-7]\d\.\d{1,9}|180(\.0{1,6})?)(\s|-|,\s?)-?(\d{1,2}|[1-8]\d|\d{1,2}\.\d{1,9}|[1-8]\d\.\d{1,9}|90(\.0{1,9})?)$/;
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
