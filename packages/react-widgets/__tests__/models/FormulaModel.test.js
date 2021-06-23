import { getFormula } from '../../src/models/FormulaModel';
import { AggregationTypes } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';

jest.mock('@carto/react-workers', () => ({
  executeTask: jest.fn(),
  Methods: {
    VIEWPORT_FEATURES_FORMULA: 'viewportFeaturesFormula'
  }
}));

describe('getFormula', () => {
  test('should throw with array data', async () => {
    await expect(getFormula({ data: [] })).rejects.toThrow(
      'Array is not a valid type to get formula'
    );
  });

  describe('should correctly handle viewport features', () => {
    const formulaParams = {
      operation: AggregationTypes.COUNT,
      column: 'revenue',
      filters: {},
      dataSource: 'whatever-data-source'
    };

    test('correctly returns data', async () => {
      executeTask.mockImplementation(() => Promise.resolve([{ value: 3 }]));
      const formula = await getFormula(formulaParams);
      expect(formula).toEqual([{ value: 3 }]);
    });

    test('correctly called', async () => {
      const { operation, column, filters, dataSource } = formulaParams;
      await getFormula(formulaParams);
      expect(executeTask).toHaveBeenCalledWith(
        dataSource,
        Methods.VIEWPORT_FEATURES_FORMULA,
        { column, filters, operation }
      );
    });
  });
});
