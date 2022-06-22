import { AggregationTypes } from '@carto/react-core';

export const columnAggregationOn = (columnPropName) => (props, propName) => {
  if (Array.isArray(props[columnPropName]) && props[columnPropName].length >= 2) {
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

// FormulaWidget
export const checkFormulaColumn = (props, propName) => {
  const propValue = props[propName];

  const isValidString = !!propValue && typeof propValue === 'string';
  const isValidArray = Array.isArray(propValue) && propValue.length;

  const isValid = isValidString || isValidArray;

  const validationError = new Error(`Prop ${propName} must be a string or an array`);

  if (props.operation === AggregationTypes.COUNT) {
    if (propValue && !isValid) {
      return validationError;
    }
  } else {
    if (!propValue) {
      return new Error(`Prop ${propName} must be defined`);
    }

    if (!isValid) {
      return validationError;
    }
  }
};
