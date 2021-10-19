import { getHistogram } from '../../src/models/HistogramModel';
import { AggregationTypes } from '@carto/react-core';
import { Methods, executeTask } from '@carto/react-workers';

jest.mock('@carto/react-workers', () => ({
  executeTask: jest.fn(),
  Methods: {
    VIEWPORT_FEATURES_HISTOGRAM: 'viewportFeaturesHistogram'
  }
}));

describe('getHistogram', () => {
  describe('should correctly handle viewport features', () => {
    const histogramParams = {
      column: 'revenue',
      operation: AggregationTypes.COUNT,
      ticks: [0, 1, 2],
      filters: {},
      dataSource: 'whatever-data-source'
    };

    test('correctly returns data', async () => {
      executeTask.mockImplementation(() => Promise.resolve([0, 1, 2, 1]));
      const histogram = await getHistogram(histogramParams);
      expect(histogram).toEqual([0, 1, 2, 1]);
    });

    test('correctly called', async () => {
      const { column, operation, ticks, filters, dataSource } = histogramParams;
      await getHistogram(histogramParams);
      expect(executeTask).toHaveBeenCalledWith(
        dataSource,
        Methods.VIEWPORT_FEATURES_HISTOGRAM,
        { column, filters, operation, ticks }
      );
    });
  });
});
