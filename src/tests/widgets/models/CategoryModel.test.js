import { minify } from 'pgsql-minify';

import { buildSqlQueryToGetCategories } from 'src/widgets/models/CategoryModel';

describe('getCategories', () => {

  test('buildSqlQueryToGetCategories - sum by category, with viewport', () => {
    const [west, south, east, north] = [-180, -90, 180, 90];
    const props = {
      data: 'SELECT * FROM stores',
      column: 'country',
      operation: 'SUM',
      operationColumn: 'sales',
      viewport: [west, south, east, north]
    };

    const sql = `
      WITH all_categories as (
        SELECT
          country as category
        FROM
          (
            SELECT * FROM (SELECT * FROM stores) as q 
            WHERE ST_Intersects(the_geom_webmercator, ST_Transform(ST_MakeEnvelope(-180, -90, 180, 90, 4326), 3857))
          ) as q
        GROUP BY category
      ),
      categories as (
        SELECT
          country as category, SUM(sales) as value
        FROM
          (
            SELECT * FROM (SELECT * FROM stores) as q 
            WHERE ST_Intersects(the_geom_webmercator, ST_Transform(ST_MakeEnvelope(-180, -90, 180, 90, 4326), 3857))
          ) as q
        GROUP BY category
      )
      SELECT
        a.category, b.value
      FROM
        all_categories a
      LEFT JOIN categories b ON a.category=b.category
    `;

    expect(buildSqlQueryToGetCategories(props)).toEqual(minify(sql));
  });

})