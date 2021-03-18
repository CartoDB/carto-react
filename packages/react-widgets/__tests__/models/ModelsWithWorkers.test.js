import { AggregationTypes } from '@carto/react-core';
import { SourceTypes } from '@carto/react-api';

import { executeTask } from '@carto/react-workers';
import { getCategories } from '../../src/models/CategoryModel';

const features = (categoryColumn, operationColumn) => [
  {
    [categoryColumn]: 'a',
    [operationColumn]: 1
  },
  {
    [categoryColumn]: 'a',
    [operationColumn]: 2
  },
  {
    [categoryColumn]: 'b',
    [operationColumn]: 3
  }
];

jest.mock('@carto/react-workers', () => ({
  executeTask: jest.fn(),
  Methods: {
    VIEWPORT_FEATURES_CATEGORY: 'viewportFeaturesCategory'
  }
}));

// execute only this test with -t flag => yarn test -t 'unique test'
describe('unique test', () => {
  const viewportFeatures = features('storetype', 'revenue');

  const buildGetCategoriesParamsFor = (operation) => ({
    operation,
    column: 'storetype',
    operationColumn: 'revenue',
    type: SourceTypes.SQL,
    viewportFilter: true,
    viewportFeatures,
    dataSource: 'ese'
  });

  test(AggregationTypes.COUNT, async () => {
    const params = buildGetCategoriesParamsFor(AggregationTypes.COUNT);
    await getCategories(params);
    // expect().toBe(true);

    expect(executeTask).toHaveBeenCalled();
  });
});
