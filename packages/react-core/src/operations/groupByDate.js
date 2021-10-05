import { getMonday } from '../utils/dateUtils';
import { aggregationFunctions } from './aggregation/values';
import { GroupDateTypes } from './GroupDateTypes';

const GROUP_KEY_FN_MAPPING = {
  // @ts-ignore
  [GroupDateTypes.YEARS]: (date) => new Date(Date.UTC(date.getFullYear())),
  [GroupDateTypes.MONTHS]: (date) =>
    new Date(Date.UTC(date.getFullYear(), date.getMonth())),
  [GroupDateTypes.WEEKS]: (date) => getMonday(date),
  [GroupDateTypes.DAYS]: (date) =>
    new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  // [GroupDateTypes.HOURS]: (date) =>
  //   new Date(
  //     Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours())
  //   ),
  // [GroupDateTypes.MINUTES]: (date) =>
  //   new Date(
  //     Date.UTC(
  //       date.getFullYear(),
  //       date.getMonth(),
  //       date.getDate(),
  //       date.getHours(),
  //       date.getMinutes()
  //     )
  //   )
};

export function groupValuesByDateColumn(
  data,
  valuesColumn,
  keysColumn,
  groupType,
  operation
) {
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
    const group = groupKeyFn(formattedValue).getTime();

    let groupedValues = acc.get(group);
    if (!groupedValues) {
      groupedValues = [];
      acc.set(group, groupedValues);
    }

    const isValid = item[valuesColumn] !== null && item[valuesColumn] !== undefined;

    if (isValid) {
      groupedValues.push(item[valuesColumn]);
      acc.set(group, groupedValues);
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
