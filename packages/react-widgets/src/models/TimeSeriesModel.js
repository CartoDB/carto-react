import { executeSQL } from '@carto/react-api/';
import {
  AggregationTypes,
  getMonday,
  GroupDateTypes,
  groupValuesByDateColumn
} from '@carto/react-core/';
import { Methods, executeTask } from '@carto/react-workers';
import {
  formatOperationColumn,
  formatTableNameWithFilters,
  wrapModelCall
} from './utils';

export function getTimeSeries(props) {
  return wrapModelCall(props, fromLocal, fromRemote);
}

// From local
function fromLocal({
  source,
  column,
  operationColumn,
  joinOperation,
  operation,
  stepSize
}) {
  return executeTask(source.id, Methods.FEATURES_TIME_SERIES, {
    filters: source.filters,
    filtersLogicalOperator: source.filtersLogicalOperator,
    column,
    stepSize,
    operationColumn: operationColumn || column,
    joinOperation,
    operation
  });
}

// From remote
const STEP_SIZE_TO_GROUP_QUERY_MAP = {
  [GroupDateTypes.YEARS]: [GroupDateTypes.YEARS],
  [GroupDateTypes.MONTHS]: [GroupDateTypes.YEARS, GroupDateTypes.MONTHS],
  [GroupDateTypes.DAYS]: [
    GroupDateTypes.YEARS,
    GroupDateTypes.MONTHS,
    GroupDateTypes.DAYS
  ],
  [GroupDateTypes.HOURS]: [
    GroupDateTypes.YEARS,
    GroupDateTypes.MONTHS,
    GroupDateTypes.DAYS,
    GroupDateTypes.HOURS
  ],
  [GroupDateTypes.MINUTES]: [
    GroupDateTypes.YEARS,
    GroupDateTypes.MONTHS,
    GroupDateTypes.DAYS,
    GroupDateTypes.HOURS,
    GroupDateTypes.MINUTES
  ]
};

const FORMAT_NAME_BY_STEP_SIZE = {
  [GroupDateTypes.YEARS]: (row) =>
    Date.UTC(row[stepSizeQueryColumn(GroupDateTypes.YEARS)], 0),
  [GroupDateTypes.MONTHS]: (row) =>
    Date.UTC(
      row[stepSizeQueryColumn(GroupDateTypes.YEARS)],
      row[stepSizeQueryColumn(GroupDateTypes.MONTHS)] - 1
    ),
  [GroupDateTypes.DAYS]: (row) =>
    Date.UTC(
      row[stepSizeQueryColumn(GroupDateTypes.YEARS)],
      row[stepSizeQueryColumn(GroupDateTypes.MONTHS)] - 1,
      row[stepSizeQueryColumn(GroupDateTypes.DAYS)]
    ),
  [GroupDateTypes.HOURS]: (row) =>
    Date.UTC(
      row[stepSizeQueryColumn(GroupDateTypes.YEARS)],
      row[stepSizeQueryColumn(GroupDateTypes.MONTHS)] - 1,
      row[stepSizeQueryColumn(GroupDateTypes.DAYS)],
      row[stepSizeQueryColumn(GroupDateTypes.HOURS)]
    ),
  [GroupDateTypes.MINUTES]: (row) =>
    Date.UTC(
      row[stepSizeQueryColumn(GroupDateTypes.YEARS)],
      row[stepSizeQueryColumn(GroupDateTypes.MONTHS)] - 1,
      row[stepSizeQueryColumn(GroupDateTypes.DAYS)],
      row[stepSizeQueryColumn(GroupDateTypes.HOURS)],
      row[stepSizeQueryColumn(GroupDateTypes.MINUTES)]
    )
};

function groupWeeklyAverageValuesByDateColumn(data) {
  const groups = data.reduce((acc, item) => {
    const value = item.name;
    const formattedValue = new Date(value);
    const groupKey = getMonday(formattedValue);

    if (!isNaN(groupKey)) {
      let groupedValues = acc.get(groupKey);
      if (!groupedValues) {
        groupedValues = [];
        acc.set(groupKey, groupedValues);
      }

      // In order to calculate the weighted average, we need to multiply the aggregated value by the weight that
      // is the number of elements that were grouped (_grouped_count)
      const weightedValue = item.value * item._grouped_count;

      const isValid = weightedValue !== null && weightedValue !== undefined;

      if (isValid) {
        groupedValues.push([weightedValue, item._grouped_count]);
        acc.set(groupKey, groupedValues);
      }
    }

    return acc;
  }, new Map());

  return [...groups.entries()].map(([name, value]) => {
    const weightedValues = value.flat().filter((_, idx) => idx % 2 === 0);
    const weights = value.flat().filter((_, idx) => idx % 2 !== 0);

    return {
      name,
      // Pondered average is the sum of the weighted values divided by the sum of the weights
      value: sum(weightedValues) / sum(weights)
    };
  });
}

// In order to keep compatibility with the different providers, we group the data in the query using
// multiple extract fns. After that, we must build the date using the resulting _agg_* columns
function formatRemoteData(data, props) {
  const { stepSize, operation } = props;

  const dateFormatter =
    FORMAT_NAME_BY_STEP_SIZE[
      stepSize === GroupDateTypes.WEEKS ? GroupDateTypes.DAYS : stepSize
    ];

  // For weeks, each provider behavies differently, so we need to group the data in the local
  // For any other AggregationTypes it's easy, but AVG should be made using a weighted average
  if (stepSize === GroupDateTypes.WEEKS && operation === AggregationTypes.AVG) {
    const formattedData = data.map((row) => ({
      value: row.value,
      name: dateFormatter(row),
      _grouped_count: row._grouped_count
    }));

    return groupWeeklyAverageValuesByDateColumn(formattedData);
  } else {
    const formattedData = data.map((row) => ({
      value: row.value,
      name: dateFormatter(row)
    }));

    if (stepSize === GroupDateTypes.WEEKS) {
      return groupValuesByDateColumn({
        data: formattedData,
        keysColumn: 'name',
        valuesColumns: ['value'],
        groupType: stepSize,
        operation: operation === AggregationTypes.COUNT ? AggregationTypes.SUM : operation
      });
    }

    return formattedData;
  }
}

async function fromRemote(props) {
  const { source, abortController } = props;
  const { credentials, connection } = source;

  const query = buildSqlQueryToGetTimeSeries(props);

  const data = await executeSQL({
    credentials,
    query,
    connection,
    opts: { abortController }
  });

  return formatRemoteData(data, props);
}

function buildSqlQueryToGetTimeSeries(props) {
  const { column, operation, operationColumn, joinOperation, stepSize } = props;

  const isWeekly = stepSize === GroupDateTypes.WEEKS;

  const stepSizesToGroupBy =
    STEP_SIZE_TO_GROUP_QUERY_MAP[
      // In weeks, group by days and then group by weeks in local
      isWeekly ? GroupDateTypes.DAYS : stepSize
    ];

  if (!stepSizesToGroupBy) throw new Error(`${stepSize} not supported`);

  const selectDateClause = stepSizesToGroupBy
    .map(
      (step) =>
        `extract(${step} from cast(${column} as timestamp)) as ${stepSizeQueryColumn(
          step
        )}`
    )
    .join();

  const selectValueClause = `${operation}(${
    operation === AggregationTypes.COUNT
      ? '*'
      : formatOperationColumn(operationColumn || column, joinOperation)
  }) as value`;

  const selectClause = [
    selectDateClause,
    selectValueClause,
    ...(isWeekly && operation === AggregationTypes.AVG
      ? // _grouped_count is needed for weighted average
        [`count(*) as _grouped_count`]
      : [])
  ];

  const byColumns = stepSizesToGroupBy.map(stepSizeQueryColumn);

  const tableName = formatTableNameWithFilters(props);

  return `SELECT ${selectClause} FROM ${tableName} GROUP BY ${byColumns} ORDER BY ${byColumns}`.trim();
}

// Aux
function sum(data) {
  return data.reduce((acc, item) => (acc += item), 0);
}

function stepSizeQueryColumn(stepSize) {
  return `_agg_${stepSize}`;
}
