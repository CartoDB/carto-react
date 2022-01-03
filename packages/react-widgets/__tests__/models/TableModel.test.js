import { getTable } from '../../src/models/TableModel';
import { Methods, executeTask } from '@carto/react-workers';

jest.mock('@carto/react-workers', () => ({
  executeTask: jest.fn(),
  Methods: {
    FEATURES_RAW: 'featuresRawFeatures'
  }
}));

describe('getTable', () => {
  describe('should correctly handle viewport features', () => {
    const tableParams = {
      dataSource: 'whatever-data-source',
      filters: {},
      rowsPerPage: 10,
      page: 1,
      sortBy: 'city',
      sortDirection: 'asc'
    };

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
      const { dataSource, filters, rowsPerPage, page, sortBy, sortDirection } =
        tableParams;
      await getTable(tableParams);
      expect(executeTask).toHaveBeenCalledWith(dataSource, Methods.FEATURES_RAW, {
        filters,
        limit: rowsPerPage,
        page,
        sortBy,
        sortByDirection: sortDirection
      });
    });
  });
});
