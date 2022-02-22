import { getMonday } from '../utils/dateUtils';
import { aggregate, aggregationFunctions } from './aggregation';
import { GroupDateTypes } from './constants/GroupDateTypes';

const GROUP_KEY_FN_MAPPING = {
  // @ts-ignore
  [GroupDateTypes.YEARS]: (date) => Date.UTC(date.getUTCFullYear()),
  [GroupDateTypes.MONTHS]: (date) => Date.UTC(date.getUTCFullYear(), date.getUTCMonth()),
  [GroupDateTypes.WEEKS]: (date) => getMonday(date),
  [GroupDateTypes.DAYS]: (date) =>
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  [GroupDateTypes.HOURS]: (date) =>
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours()
    ),
  [GroupDateTypes.MINUTES]: (date) =>
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes()
    )
};

export function groupValuesByDateColumn({
  data,
  valuesColumns,
  joinOperation,
  keysColumn,
  groupType,
  operation
}) {
  if (Array.isArray(data) && data.length === 0) {
    return null;
  }

  const groupKeyFn = GROUP_KEY_FN_MAPPING[groupType];

  if (!groupKeyFn) {
    return null;
  }

  const groups = data.reduce((acc, item) => {
    const value = item[keysColumn];
    const formattedValue = new Date(value);
    const groupKey = groupKeyFn(formattedValue);

    if (!isNaN(groupKey)) {
      let groupedValues = acc.get(groupKey);
      if (!groupedValues) {
        groupedValues = [];
        acc.set(groupKey, groupedValues);
      }

      const tempValue = aggregate(item, valuesColumns, joinOperation);

      const isValid = tempValue !== null && tempValue !== undefined;

      if (isValid) {
        groupedValues.push(tempValue);
        acc.set(groupKey, groupedValues);
      }
    }

    return acc;
  }, new Map());

  const targetOperation = aggregationFunctions[operation];

  if (targetOperation) {
    return [...groups.entries()]
      .map(([name, value]) => ({
        name,
        value: targetOperation(value)
      }))
      .sort((a, b) => a.name - b.name);
  }

  return [];
}
