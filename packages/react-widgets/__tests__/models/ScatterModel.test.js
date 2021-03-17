import { minify } from 'pgsql-minify';

import { getScatter, buildSqlQueryToGetScatter } from '../../src/models/ScatterPlotModel';
import { SourceTypes } from '@carto/react-api';
import { Methods, executeTask } from '@carto/react-workers';

import { mockSqlApiRequest, mockClear } from '../mockSqlApiRequest';

jest.mock('@carto/react-workers', () => ({
  executeTask: jest.fn(),
  Methods: {
    VIEWPORT_FEATURES_SCATTERPLOT: 'viewportFeaturesScatterPlot'
  }
}));

const features = (xColumn, yColumn) => [
  {
    [xColumn]: 1,
    [yColumn]: 2
  },
  {
    [xColumn]: 2,
    [yColumn]: 4
  },
  {
    [xColumn]: 3,
    [yColumn]: 6
  }
];

describe('getScatter', () => {
  test('should throw with array data', async () => {
    await expect(getScatter({ data: [] })).rejects.toThrow(
      'Array is not a valid type to get scatter'
    );
  });

  test('should throw if using CartoBQTilerLayer without viewportFilter', async () => {
    await expect(
      getScatter({ type: SourceTypes.BIGQUERY, viewportFilter: false })
    ).rejects.toThrow(
      'Scatter Widget error: BigQuery layer needs "viewportFilter" prop set to true.'
    );
  });

  describe('SQL Layer', () => {
    describe('should execute a SqlApi request when using "viewportFilter": false', () => {
      const response = { rows: features('x', 'y') };
      const sql = 'SELECT * FROM retail_stores LIMIT 4';
      const credentials = {
        username: 'public',
        apiKey: 'default_public',
        serverUrlTemplate: 'https://{user}.carto.com'
      };

      mockSqlApiRequest({ response, sql, credentials });

      beforeEach(() => {
        mockClear();
      });

      test('should call SqlApi', async () => {
        const params = {
          data: sql,
          credentials,
          type: SourceTypes.SQL,
          xAxisColumn: 'x',
          yAxisColumn: 'y',
          viewportFilter: false
        };
        const scatterData = await getScatter(params);
        const values = features('x', 'y').map((f) => [f.x, f.y]);
        expect(scatterData).toEqual(values);
      });
    });
  });
  test('should filter viewport features - "viewportFilter" prop is true', async () => {
    const viewportFeatures = features('x', 'y');
    const values = viewportFeatures.map((f) => [f.x, f.y]);
    executeTask.mockImplementation(() => Promise.resolve(values));
    const params = {
      type: SourceTypes.SQL,
      xAxisColumn: 'x',
      yAxisColumn: 'y',
      viewportFilter: true,
      viewportFeatures
    };
    const scatterData = await getScatter(params);
    expect(scatterData).toEqual(values);
  });
});

test('buildSqlQueryToGetScatter', () => {
  const sql = 'SELECT * FROM retail_stores LIMIT 4';
  const credentials = {
    username: 'public',
    apiKey: 'default_public',
    serverUrlTemplate: 'https://{user}.carto.com'
  };
  const params = {
    data: sql,
    credentials,
    type: SourceTypes.SQL,
    xAxisColumn: 'x',
    yAxisColumn: 'y',
    viewportFilter: false
  };

  const query = `
    SELECT 
      ${params.xAxisColumn}, ${params.yAxisColumn}
    FROM 
      (${params.data}) as q1
  `;

  expect(buildSqlQueryToGetScatter(params)).toEqual(minify(query));
});
