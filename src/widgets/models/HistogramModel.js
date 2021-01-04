import { executeSQL } from '../../api';
import { filtersToSQL } from '../../api/FilterQueryBuilder';
import { filterApplicator } from '../../api/Filter';
import { histogram } from '../operations/histogram';

export const getHistogram = async (props) => {
  const { data, credentials, column, operation, ticks, filters, viewport, opts, viewportFilter, viewportFeatures, type } = props;

  const operationColumn = props.operationColumn || column;

  if (Array.isArray(data)) {
    throw new Error('Array is not a valid type to get histogram');
  }

  if (type === 'bq' && !viewportFilter) {
    throw new Error('Histogram Widget error: BigQuery layers needs "viewportFilter" prop set to true.');
  }

  // It's an await because we probably will move this calculation need to a webworker
  if (viewportFilter) {
    const features = viewportFeatures || [];
    const filteredFeatures = features.filter(filterApplicator({ filters }));
    const result = histogram(filteredFeatures, column, ticks, operation);
    return await result;
  } else {
    let query =
      (viewport && `SELECT * FROM (${data})  as q`) ||
      data;

    const caseTicks = ticks.map((t, index) => `WHEN ${column} < ${t} THEN 'cat_${index}'`);
    caseTicks.push(`ELSE 'cat_${ticks.length}'`);

    query = `
      SELECT tick, ${operation}(${operationColumn}) as value
        FROM (
          SELECT CASE ${caseTicks.join(' ')} END as tick, ${operationColumn} FROM (
            SELECT * FROM (${query}) as q2 ${filtersToSQL(filters)}
          ) as q1
        ) as q
      GROUP BY tick`;

    const queryResult = await executeSQL(credentials, query, opts);
    const result = [];

    for (let i = 0; i <= ticks.length; i++) {
      const tick = `cat_${i}`;
      const element = queryResult.find((d) => d.tick === tick);
      result.push(element ? element.value : null);
    }

    return result;
  }
};
