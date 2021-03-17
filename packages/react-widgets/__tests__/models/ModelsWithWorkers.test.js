import { getCategories } from '../../src/models/CategoryModel';
import { AggregationTypes } from '@carto/react-core';
import { SourceTypes } from '@carto/react-api';

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

jest.mock('../../../react-workers/src/workerPool');
// eslint-disable-next-line import/first
import { executeTask } from '../../../react-workers/src/workerPool';
executeTask.mockReturnValue(Promise.resolve(true));

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
    expect(await getCategories(params)).toBe(true);
  });
});
