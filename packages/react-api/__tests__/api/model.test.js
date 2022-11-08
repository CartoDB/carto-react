import { executeModel } from '../../src/api/model';
import {
  QUERY_PARAMS_SOURCE,
  QUERY_SOURCE,
  TABLE_SOURCE,
  TILESET_SOURCE
} from '../dataMocks';

const mockedMakeCall = jest.fn();

jest.mock('../../src/api/common', () => ({
  ...jest.requireActual('../../src/api/common'),
  makeCall: (props) => {
    mockedMakeCall(props);
    return Promise.resolve();
  }
}));

const DEFAULT_PARAMS = { column: '__test__', operation: 'avg' };

describe('model', () => {
  describe('executeModel', () => {
    test('works correctly with a table source', () => {
      executeModel({ model: 'formula', source: TABLE_SOURCE, params: DEFAULT_PARAMS });

      expect(mockedMakeCall).toHaveBeenCalledWith({
        credentials: TABLE_SOURCE.credentials,
        opts: { method: 'GET' },
        url: 'https://gcp-us-east1.api.carto.com/v3/sql/carto-ps-bq-developers/model/formula?type=table&source=cartobq.public_account.seattle_collisions&params=%7B%22column%22%3A%22__test__%22%2C%22operation%22%3A%22avg%22%7D&queryParameters=&filters=%7B%7D&filtersLogicalOperator=AND'
      });
    });

    test('works correctly with a query source', () => {
      executeModel({ model: 'formula', source: QUERY_SOURCE, params: DEFAULT_PARAMS });

      expect(mockedMakeCall).toHaveBeenCalledWith({
        credentials: TABLE_SOURCE.credentials,
        opts: { method: 'GET' },
        url: 'https://gcp-us-east1.api.carto.com/v3/sql/carto-ps-bq-developers/model/formula?type=query&source=SELECT+*+FROM+%60cartobq.public_account.seattle_collisions%60&params=%7B%22column%22%3A%22__test__%22%2C%22operation%22%3A%22avg%22%7D&queryParameters=&filters=%7B%7D&filtersLogicalOperator=AND'
      });
    });

    test('works correctly when the source is very large', () => {
      const longQuerySource = {
        ...QUERY_SOURCE,
        data: 'a'.repeat(2048)
      };

      executeModel({ model: 'formula', source: longQuerySource, params: DEFAULT_PARAMS });

      expect(mockedMakeCall).toHaveBeenCalledWith({
        credentials: TABLE_SOURCE.credentials,
        opts: {
          method: 'POST',
          body: JSON.stringify({
            type: 'query',
            source: longQuerySource.data,
            params: DEFAULT_PARAMS,
            filters: longQuerySource.filters,
            filtersLogicalOperator: longQuerySource.filtersLogicalOperator
          })
        },
        url: 'https://gcp-us-east1.api.carto.com/v3/sql/carto-ps-bq-developers/model/formula'
      });
    });

    test('works correctly when the source has queryParameters', () => {
      executeModel({
        model: 'formula',
        source: QUERY_PARAMS_SOURCE,
        params: DEFAULT_PARAMS
      });

      expect(mockedMakeCall).toHaveBeenCalledWith({
        credentials: TABLE_SOURCE.credentials,
        opts: { method: 'GET' },
        url: 'https://gcp-us-east1.api.carto.com/v3/sql/carto-ps-bq-developers/model/formula?type=query&source=SELECT+*+FROM+%60cartobq.public_account.seattle_collisions%60+WHERE+time_column+%3E+%40start+AND+time_column+%3C+%40end&params=%7B%22column%22%3A%22__test__%22%2C%22operation%22%3A%22avg%22%7D&queryParameters=%7B%22start%22%3A%222019-01-01%22%2C%22end%22%3A%222019-01-02%22%7D&filters=%7B%7D&filtersLogicalOperator=AND'
      });
    });

    test('should throw error with a tileset source', () => {
      expect(() =>
        executeModel({ model: 'formula', source: TILESET_SOURCE, params: DEFAULT_PARAMS })
      ).toThrowError();
    });
  });
});
