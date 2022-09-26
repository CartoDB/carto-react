export enum FilterTypes {
  IN = 'in',
  BETWEEN = 'between', // [a, b] both are included
  CLOSED_OPEN = 'closed_open', // [a, b) a is included, b is not
  TIME = 'time',
  STRING_SEARCH = 'stringSearch',
  FOREIGN_IN = 'foreign_in'
}

export const filterFunctions: Record<
  string,
  (
    filterValues: unknown[],
    featureValue: unknown,
    params?: Record<string, unknown>
  ) => boolean
>;
