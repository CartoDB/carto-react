import { minify } from 'pgsql-minify';

import { buildSqlQueryToGetFormula } from 'src/widgets/models/FormulaModel';

describe('getFormula', () => {

  test('buildSqlQueryToGetFormula - simple sum, with viewport', () => {
    const [west, south, east, north] = [-180, -90, 180, 90];
    const props = {
      data: 'SELECT * FROM stores',
      column: 'sales',
      operation: 'SUM',
      viewport: [west, south, east, north]
    };

    const sql = `
      SELECT 
        SUM(sales) as value
      FROM
        (
          SELECT * FROM (SELECT * from stores) as q 
          WHERE ST_Intersects(the_geom_webmercator, ST_Transform(ST_MakeEnvelope(-180, -90, 180, 90, 4326), 3857))
        ) as q
    `;

    expect(buildSqlQueryToGetFormula(props)).toEqual(minify(sql));
  });

})