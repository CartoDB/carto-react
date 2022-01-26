import { getCategories } from '../../src/models/CategoryModel';
import { AggregationTypes } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';

jest.mock('@carto/react-workers', () => ({
  executeTask: jest.fn(),
  Methods: {
    FEATURES_CATEGORY: 'featuresCategory'
  }
}));

describe('getCategories', () => {
  describe('should correctly handle viewport features', () => {
    const categoriesParams = {
      column: 'storetype',
      operationColumn: 'revenue',
      operation: AggregationTypes.COUNT,
      filters: {},
      dataSource: 'whatever-data-source'
    };

    test('correctly returns data', async () => {
      executeTask.mockImplementation(() =>
        Promise.resolve([
          { name: 'a', value: 2 },
          { name: 'b', value: 1 }
        ])
      );
      const categories = await getCategories(categoriesParams);
      expect(categories).toEqual([
        { name: 'a', value: 2 },
        { name: 'b', value: 1 }
      ]);
    });

    test('correctly called', async () => {
      const { column, operationColumn, operation, filters, dataSource } =
        categoriesParams;
      await getCategories(categoriesParams);
      expect(executeTask).toHaveBeenCalledWith(dataSource, Methods.FEATURES_CATEGORY, {
        column,
        filters,
        operation,
        operationColumn
      });
    });
  });
});
