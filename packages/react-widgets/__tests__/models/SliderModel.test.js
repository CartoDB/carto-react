import { getSlider } from '../../src/models/SliderModel';
import { Methods, executeTask } from '@carto/react-workers';

const RESULT = { min: 0, max: 100 };

const mockedExecuteModel = jest.fn();

jest.mock('@carto/react-api', () => ({
  _executeModel: (props) => {
    mockedExecuteModel(props);
    return Promise.resolve({ rows: [RESULT] });
  }
}));

jest.mock('@carto/react-workers', () => ({
  executeTask: jest
    .fn()
    .mockImplementation(() => new Promise((resolve) => resolve(RESULT))),
  Methods: {
    FEATURES_MIN_MAX: 'featuresMinMax'
  }
}));

describe('getSlider', () => {
  describe('local mode', () => {
    test('should work correctly', async () => {
      const props = {
        source: {
          id: '__test__',
          type: 'query',
          data: 'SELECT * FROM test',
          credentials: {
            apiVersion: 'v2'
          }
        },
        column: 'column_1'
      };

      const data = await getSlider(props);

      expect(data).toBe(RESULT);

      expect(executeTask).toHaveBeenCalledWith(
        props.source.id,
        Methods.FEATURES_MIN_MAX,
        {
          filters: props.source.filters,
          filtersLogicalOperator: props.source.filtersLogicalOperator,
          column: props.column
        }
      );
    });
  });

  describe('global mode', () => {
    test('should work correctly', async () => {
      const props = {
        source: {
          id: '__test__',
          type: 'table',
          data: '__test__',
          credentials: {
            apiVersion: 'v3',
            accessToken: '__test_token__'
          },
          connection: '__test_connection__'
        },
        column: 'column_1',
        global: true
      };

      const data = await getSlider(props);

      expect(data).toEqual(RESULT);

      expect(mockedExecuteModel).toHaveBeenCalledWith({
        model: 'range',
        opts: { abortController: undefined },
        params: {
          column: props.column
        },
        source: props.source
      });
    });
  });
});
