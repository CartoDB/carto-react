import {
  isCoordinate,
  isLatitude,
  isLongitude,
  validateAndGenerateCoordsResult
} from '../../../src/widgets/utils/validateCoordinates';

// Test isLatitude function
test('isLatitude should return true for valid latitudes', () => {
  expect(isLatitude(0)).toBe(true);
  expect(isLatitude(45)).toBe(true);
  expect(isLatitude(-90)).toBe(true);
});
test('isLatitude should return false for invalid latitudes', () => {
  expect(isLatitude(91)).toBe(false);
  expect(isLatitude(-91)).toBe(false);
  expect(isLatitude('invalid')).toBe(false);
});

// Test isLongitude function
test('isLongitude should return true for valid longitudes', () => {
  expect(isLongitude(0)).toBe(true);
  expect(isLongitude(120)).toBe(true);
  expect(isLongitude(-180)).toBe(true);
});
test('isLongitude should return false for invalid longitudes', () => {
  expect(isLongitude(181)).toBe(false);
  expect(isLongitude(-181)).toBe(false);
  expect(isLongitude('invalid')).toBe(false);
  expect(isLongitude('Sevilla,')).toBe(false);
});

// Test isCoordinate function
test('isCoordinate should return true for valid coordinates', () => {
  expect(isCoordinate('90,120')).toBe(true);
  expect(isCoordinate('0,0')).toBe(true);
  expect(isCoordinate('45,-90')).toBe(true);
  expect(isCoordinate('-12.345,67.890')).toBe(true);
  expect(isCoordinate('0.1234,-45.6789')).toBe(true);
  expect(isCoordinate('12.3456789, 0')).toBe(true);
  expect(isCoordinate('0 0')).toBe(true);
  expect(isCoordinate('45 -90')).toBe(true);
  expect(isCoordinate('-12.345 67.890')).toBe(true);
  expect(isCoordinate('0.1234 -45.6789')).toBe(true);
  expect(isCoordinate('12.3456789 0')).toBe(true);
  expect(isCoordinate('12.3456789123456789 123.4567891234567891')).toBe(true);
});

test('isCoordinate should return false for invalid coordinates', () => {
  // Invalid latitude
  expect(isCoordinate('120,90')).toBe(false);
  expect(isCoordinate('-100 180')).toBe(false);
  expect(isCoordinate('abc 45')).toBe(false);
  expect(isCoordinate('-90.001,123.456')).toBe(false);
  expect(isCoordinate('-120.123,45.678')).toBe(false);
  expect(isCoordinate('12.34567891234567891 123.456')).toBe(false);

  // Invalid longitude
  expect(isCoordinate('0 181')).toBe(false);
  expect(isCoordinate('45 -181')).toBe(false);
  expect(isCoordinate('12.345 200')).toBe(false);
  expect(isCoordinate('45 def')).toBe(false);
  expect(isCoordinate('12.345,180.001')).toBe(false);
  expect(isCoordinate('12.345,250')).toBe(false);
  expect(isCoordinate('12.345 123.45678912345678912')).toBe(false);

  // Extra characters
  expect(isCoordinate('0 0 extra')).toBe(false);
  expect(isCoordinate('45 -90 extra')).toBe(false);
  expect(isCoordinate('-12.345 67.890 extra')).toBe(false);
  expect(isCoordinate('0.1234 -45.6789 extra')).toBe(false);
  expect(isCoordinate('12.3456789 0 extra')).toBe(false);

  // Missing coordinate parts
  expect(isCoordinate('0')).toBe(false);
  expect(isCoordinate('45 ')).toBe(false);
  expect(isCoordinate(' 0')).toBe(false);
  expect(isCoordinate('232,49,0')).toBe(false);
  expect(isCoordinate('invalid')).toBe(false);
});

// Test validateAndGenerateCoordsResult function
test('validateAndGenerateCoordsResult should return the correct result for valid input', () => {
  expect(validateAndGenerateCoordsResult('0,0')).toEqual({ latitude: 0, longitude: 0 });
  expect(validateAndGenerateCoordsResult('45,-90')).toEqual({
    latitude: 45,
    longitude: -90
  });
  expect(validateAndGenerateCoordsResult('-12.345,67.890')).toEqual({
    latitude: -12.345,
    longitude: 67.89
  });
});
test('validateAndGenerateCoordsResult should return false for invalid input', () => {
  expect(validateAndGenerateCoordsResult('91,0')).toBe(false);
  expect(validateAndGenerateCoordsResult('-91,180')).toBe(false);
  expect(validateAndGenerateCoordsResult('invalid')).toBe(false);
});
