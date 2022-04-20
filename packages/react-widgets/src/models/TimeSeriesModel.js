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
    Date.UTC(row[formatStepSizeColumn(GroupDateTypes.YEARS)], 0),
  [GroupDateTypes.MONTHS]: (row) =>
    Date.UTC(
      row[formatStepSizeColumn(GroupDateTypes.YEARS)],
      row[formatStepSizeColumn(GroupDateTypes.MONTHS)] - 1
    ),
  [GroupDateTypes.DAYS]: (row) =>
    Date.UTC(
      row[formatStepSizeColumn(GroupDateTypes.YEARS)],
      row[formatStepSizeColumn(GroupDateTypes.MONTHS)] - 1,
      row[formatStepSizeColumn(GroupDateTypes.DAYS)]
    ),
  [GroupDateTypes.HOURS]: (row) =>
    Date.UTC(
      row[formatStepSizeColumn(GroupDateTypes.YEARS)],
      row[formatStepSizeColumn(GroupDateTypes.MONTHS)] - 1,
      row[formatStepSizeColumn(GroupDateTypes.DAYS)],
      row[formatStepSizeColumn(GroupDateTypes.HOURS)]
    ),
  [GroupDateTypes.MINUTES]: (row) =>
    Date.UTC(
      row[formatStepSizeColumn(GroupDateTypes.YEARS)],
      row[formatStepSizeColumn(GroupDateTypes.MONTHS)] - 1,
      row[formatStepSizeColumn(GroupDateTypes.DAYS)],
      row[formatStepSizeColumn(GroupDateTypes.HOURS)],
      row[formatStepSizeColumn(GroupDateTypes.MINUTES)]
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

      const aggregatedValue = item.value * item._grouped_count;

      const isValid = aggregatedValue !== null && aggregatedValue !== undefined;

      if (isValid) {
        groupedValues.push([aggregatedValue, item._grouped_count]);
        acc.set(groupKey, groupedValues);
      }
    }

    return acc;
  }, new Map());

  return [...groups.entries()].map(([name, value]) => ({
    name,
    value:
      value.filter((_, idx) => idx % 2 === 0).reduce((acc, [val]) => acc + val, 0) /
      value.filter((_, idx) => idx % 2 !== 0).reduce((acc, [val]) => acc + val, 0)
  }));
}

// In order to keep compatibility with the different providers, we group the data in the query using
// multiple extract fns. After that, we must build the date using the resulting _agg_* columns
function formatRemoteData(data, props) {
  const { stepSize, operation } = props;

  const dateFormatter =
    FORMAT_NAME_BY_STEP_SIZE[
      stepSize === GroupDateTypes.WEEKS ? GroupDateTypes.DAYS : stepSize
    ];

  const formattedData = data.map((row) => ({
    value: row.value,
    name: dateFormatter(row),
    _grouped_count: row._grouped_count
  }));

  // For weeks, each provider behavies differently, so we need to group the data in the local
  if (stepSize === GroupDateTypes.WEEKS) {
    // For any other AggregationTypes it's easy, but AVG should be made using a pondered average
    if (operation === AggregationTypes.AVG) {
      return groupWeeklyAverageValuesByDateColumn(formattedData);
    } else {
      return groupValuesByDateColumn({
        data: formattedData,
        keysColumn: 'name',
        valuesColumns: ['value'],
        operation: stepSize === AggregationTypes.COUNT ? AggregationTypes.SUM : stepSize
      });
    }
  } else {
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

  const stepSizesToGroupBy =
    STEP_SIZE_TO_GROUP_QUERY_MAP[
      stepSize === GroupDateTypes.WEEKS ? GroupDateTypes.DAYS : stepSize
    ];

  if (!stepSizesToGroupBy) throw new Error(`${stepSize} not supported`);

  const selectClause = stepSizesToGroupBy
    .map((_stepSize) => {
      return `extract(${_stepSize} from cast(${column} as timestamp)) as ${formatStepSizeColumn(
        _stepSize
      )}`;
    })
    .join();

  const selectValueClause = `${operation}(${
    operation === AggregationTypes.COUNT
      ? '*'
      : formatOperationColumn(operationColumn || column, joinOperation)
  }) as value`;

  const byColumns = stepSizesToGroupBy.map(formatStepSizeColumn).join();

  return `SELECT ${selectClause}, ${selectValueClause}, COUNT(*) as _grouped_count FROM ${formatTableNameWithFilters(
    props
  )} GROUP BY ${byColumns} ORDER BY ${byColumns}`.trim();
}

// Aux
function formatStepSizeColumn(stepSize) {
  return `_agg_${stepSize}`;
}
