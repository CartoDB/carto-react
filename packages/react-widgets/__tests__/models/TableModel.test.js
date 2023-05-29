import { getTable, paginateTable } from '../../src/models/TableModel';
import { Methods, executeTask } from '@carto/react-workers';

const RESULT = {
  rows: [
    { id: 10, city: 'Berlin', value: 100 },
    { id: 20, city: 'Rome', value: 200 },
    { id: 30, city: 'Madrid', value: 300 },
    { id: 40, city: 'Paris', value: 400 },
    { id: 50, city: 'London', value: 500 }
  ]
};

const mockedExecuteModel = jest.fn();

jest.mock('@carto/react-api', () => ({
  _executeModel: (props) => {
    mockedExecuteModel(props);
    return Promise.resolve({ rows: [{ VALUE: RESULT }] });
  }
}));

jest.mock('@carto/react-workers', () => ({
  executeTask: jest.fn(),
  Methods: {
    FEATURES_RAW: 'featuresRawFeatures'
  }
}));

describe('paginateTable', () => {
  const data = {
    rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // 11 must hidden
    totalCount: 10 // not 11
  };
  const tests = [
    [0, 5, [1, 2, 3, 4, 5], 2], // first 5
    [1, 5, [6, 7, 8, 9, 10], 2], // second 5
    [0, 7, [1, 2, 3, 4, 5, 6, 7], 2], // first 7
    [1, 7, [8, 9, 10], 2], // second 7, but not 11 that is hidden
    [2, 5, [], 2], // 11 is hidden
    [3, 5, [], 2], // no data at all
    [0, 10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1] // corner case, 1 page not 2
  ];
  it.each(tests)(
    'should work as expected',
    (page, rowsPerPage, expectedRows, expectedPages) => {
      const expected = {
        rows: expectedRows,
        pages: expectedPages
      };
      expect(paginateTable(data, page, rowsPerPage)).toStrictEqual(expected);
    }
  );
});

describe('getTable', () => {
  const tableParams = {
    source: {
      id: '__test__',
      type: 'query',
      data: 'SELECT * FROM test',
      filters: {},
      credentials: {
        apiVersion: 'v2'
      }
    },
    columns: ['id', 'city', 'value'],
    sortBy: 'city',
    sortDirection: 'asc'
  };

  describe('local model', () => {
    test('correctly returns data', async () => {
      executeTask.mockImplementation(() =>
        Promise.resolve([
          { id: 0, city: 'a', value: 2 },
          { id: 7, city: 'b', value: 1 }
        ])
      );
      const categories = await getTable(tableParams);
      expect(categories).toEqual([
        { id: 0, city: 'a', value: 2 },
        { id: 7, city: 'b', value: 1 }
      ]);
    });

    test('correctly called', async () => {
      await getTable(tableParams);
      expect(executeTask).toHaveBeenCalledWith(
        tableParams.source.id,
        Methods.FEATURES_RAW,
        {
          filters: tableParams.source.filters,
          filtersLogicalOperator: tableParams.source.filtersLogicalOperator,
          sortBy: tableParams.sortBy,
          sortByDirection: tableParams.sortDirection
        }
      );
    });
  });

  describe('remote mode', () => {
    // TODO: complete
  });
});
