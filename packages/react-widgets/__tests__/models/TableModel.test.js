import { getTable } from '../../src/models/TableModel';
import { Methods, executeTask } from '@carto/react-workers';

const RESULT = {
  rows: [
    { id: 10, city: 'Berlin', value: 100 },
    { id: 20, city: 'Rome', value: 200 },
    { id: 30, city: 'Madrid', value: 300 },
    { id: 40, city: 'Paris', value: 400 },
    { id: 50, city: 'London', value: 500 }
  ],
  metadata: {
    total: 5
  }
};

const mockedExecuteModel = jest.fn();

jest.mock('@carto/react-api', () => ({
  _executeModel: (props) => {
    mockedExecuteModel(props);
    return Promise.resolve(RESULT);
  }
}));

jest.mock('@carto/react-workers', () => ({
  executeTask: jest.fn(),
  Methods: {
    FEATURES_RAW: 'featuresRawFeatures'
  }
}));

describe('getTable', () => {
  const tableParams = {
    source: {
      id: '__test__',
      type: 'query',
      data: 'SELECT * FROM test',
      filters: {},
      credentials: {
        apiVersion: 'v3'
      }
    },
    columns: ['id', 'city', 'value'],
    sortBy: 'city',
    sortDirection: 'asc'
  };

  describe('local model', () => {
    test('correctly returns data', async () => {
      executeTask.mockImplementation(() =>
        Promise.resolve({
          rows: [
            { id: 0, city: 'a', value: 2 },
            { id: 7, city: 'b', value: 1 }
          ],
          totalCount: 2,
          hasData: true
        })
      );
      const data = await getTable(tableParams);
      expect(data).toEqual({
        rows: [
          { id: 0, city: 'a', value: 2 },
          { id: 7, city: 'b', value: 1 }
        ],
        totalCount: 2,
        hasData: true
      });
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
    test('correctly returns data', async () => {
      const data = await getTable({ ...tableParams, remoteCalculation: true });
      expect(data).toStrictEqual({
        rows: RESULT.rows,
        totalCount: RESULT.metadata.total,
        hasData: true
      });
    });
  });
});
