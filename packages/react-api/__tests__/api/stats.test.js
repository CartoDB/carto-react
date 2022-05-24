import { getStats } from '../../src/api/stats';
import { QUERY_SOURCE, TABLE_SOURCE, TILESET_SOURCE } from '../dataMocks';

const TABLE_AND_QUERY_STATS = {
  attribute: 'injuries',
  type: 'Number',
  avg: 0.44776268477826375,
  sum: 4483,
  min: 0,
  max: 7,
  quantiles: {
    3: [0, 7],
    4: [0, 0, 7],
    5: [0, 0, 1, 7],
    6: [0, 0, 0, 1, 7],
    7: [0, 0, 0, 0, 1, 7],
    8: [0, 0, 0, 0, 1, 1, 7],
    9: [0, 0, 0, 0, 0, 1, 1, 7],
    10: [0, 0, 0, 0, 0, 0, 1, 1, 7],
    11: [0, 0, 0, 0, 0, 0, 1, 1, 1, 7],
    12: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 7],
    13: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 7],
    14: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 7],
    15: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 7],
    16: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 7],
    17: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 7],
    18: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 7],
    19: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 7],
    20: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 7]
  }
};

const mockedGetTileJson = jest.fn();

jest.mock('../../src/api/tilejson', () => ({
  getTileJson: (props) => {
    mockedGetTileJson(props);
    return Promise.resolve({ tilestats: mockTilestats });
  }
}));

const mockTilestats = {
  layerCount: 1,
  layers: [
    {
      layer: 'default',
      count: 504931,
      geometry: 'Point',
      attributeCount: 5,
      attributes: [
        {
          attribute: 'name',
          type: 'String',
          categories: [
            { category: null, frequency: 236730 },
            { category: 'Banco Santander', frequency: 2250 },
            { category: 'Caixabank', frequency: 2022 }
          ]
        },
        {
          attribute: 'group_name',
          type: 'String',
          categories: [
            { category: 'Others', frequency: 147789 },
            { category: 'Sustenance', frequency: 94220 },
            { category: 'Transportation', frequency: 92761 }
          ]
        }
      ]
    }
  ]
};

describe('stats', () => {
  describe('getStats', () => {
    test('table source - should return stats', async () => {
      const TABLE_TEST = {
        input: {
          source: TABLE_SOURCE,
          column: 'injuries'
        },
        url: `https://gcp-us-east1.api.carto.com/v3/stats/carto-ps-bq-developers/cartobq.public_account.seattle_collisions/injuries`,
        output: TABLE_AND_QUERY_STATS
      };

      const fetchMock = (global.fetch = jest.fn().mockImplementation(async () => {
        return {
          ok: true,
          json: async () => TABLE_TEST.output
        };
      }));

      const abortController = new AbortController();

      const res = await getStats({ ...TABLE_TEST.input, opts: { abortController } });

      expect(res).toEqual(TABLE_TEST.output);

      expect(fetchMock).toBeCalledWith(TABLE_TEST.url, {
        headers: {
          Authorization: `Bearer ${TABLE_TEST.input.source.credentials.accessToken}`
        },
        signal: abortController.signal
      });
    });

    test('query source - should return stats', async () => {
      const QUERY_TEST = {
        input: {
          source: QUERY_SOURCE,
          column: 'injuries'
        },
        url: `https://gcp-us-east1.api.carto.com/v3/stats/carto-ps-bq-developers/injuries?q=SELECT+*+FROM+%60cartobq.public_account.seattle_collisions%60`,
        output: TABLE_AND_QUERY_STATS
      };

      const fetchMock = (global.fetch = jest.fn().mockImplementation(async () => {
        return {
          ok: true,
          json: async () => QUERY_TEST.output
        };
      }));

      const abortController = new AbortController();

      const res = await getStats({ ...QUERY_TEST.input, opts: { abortController } });

      expect(res).toEqual(QUERY_TEST.output);

      expect(fetchMock).toBeCalledWith(QUERY_TEST.url, {
        headers: {
          Authorization: `Bearer ${QUERY_TEST.input.source.credentials.accessToken}`
        },
        signal: abortController.signal
      });
    });

    test('tileset source - should return stats', async () => {
      const TILESET_TEST = {
        input: {
          source: TILESET_SOURCE,
          column: 'name'
        },
        output: mockTilestats.layers[0].attributes[0]
      };

      const res = await getStats(TILESET_TEST.input);

      expect(res).toEqual(TILESET_TEST.output);
      expect(mockedGetTileJson).toBeCalledWith({ source: TILESET_TEST.input.source });
    });
  });
});
