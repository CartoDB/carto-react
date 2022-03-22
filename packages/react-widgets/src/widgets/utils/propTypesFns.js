import { AggregationTypes } from '@carto/react-core';

export const columnAggregationOn = (columnPropName) => (props, propName) => {
  if (Array.isArray(props[columnPropName])) {
    if (!props[propName]) {
      return new Error(
        `Prop ${propName} must be defined if ${columnPropName} is an array`
      );
    }
    if (Object.values(AggregationTypes).indexOf(props[propName]) === -1) {
      return new Error(`Prop ${propName} must be a valid aggregation operator`);
    }
  }
};
