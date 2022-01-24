import { getFormula } from '../../src/models/FormulaModel';
import { AggregationTypes } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';

jest.mock('@carto/react-workers', () => ({
  executeTask: jest.fn(),
  Methods: {
    FEATURES_FORMULA: 'featuresFormula'
  }
}));

describe('getFormula', () => {
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
      expect(executeTask).toHaveBeenCalledWith(dataSource, Methods.FEATURES_FORMULA, {
        column,
        filters,
        operation
      });
    });
  });
});
