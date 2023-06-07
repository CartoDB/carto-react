import {
  getColumnNameFromGeoColumn,
  getSpatialIndexFromGeoColumn
} from '../../src/utils/columns';

describe('getColumnNameFromGeoColumn', () => {
  it('pass column name unchanged', () => {
    expect(getColumnNameFromGeoColumn('abc')).toStrictEqual('abc');
    expect(getColumnNameFromGeoColumn('quadbin')).toStrictEqual('quadbin');
    expect(getColumnNameFromGeoColumn('h3')).toStrictEqual('h3');
    expect(getColumnNameFromGeoColumn('s2')).toStrictEqual('s2');
  });

  it('detect column name in case of spatial index', () => {
    expect(getColumnNameFromGeoColumn('quadbin:abc')).toStrictEqual('abc');
    expect(getColumnNameFromGeoColumn('h3:abc')).toStrictEqual('abc');
    expect(getColumnNameFromGeoColumn('s2:abc')).toStrictEqual('abc');
  });
});

describe('getSpatialIndexFromGeoColumn', () => {
  it('detect simple spatial index', () => {
    expect(getSpatialIndexFromGeoColumn('quadbin')).toStrictEqual('quadbin');
    expect(getSpatialIndexFromGeoColumn('h3')).toStrictEqual('h3');
    expect(getSpatialIndexFromGeoColumn('s2')).toStrictEqual('s2');
  });

  it('detect prefix spatial index', () => {
    expect(getSpatialIndexFromGeoColumn('quadbin:abc')).toStrictEqual('quadbin');
    expect(getSpatialIndexFromGeoColumn('h3:abc')).toStrictEqual('h3');
    expect(getSpatialIndexFromGeoColumn('s2:abc')).toStrictEqual('s2');
  });

  it('handle unsupported spatial index', () => {
    expect(getSpatialIndexFromGeoColumn('abc')).toStrictEqual(null);
    expect(getSpatialIndexFromGeoColumn('abc:abc')).toStrictEqual(null);
  });
});
