import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import { animationOptionsPropTypes } from '../../../custom-components/AnimatedNumber';

import FormulaValue from './FormulaValue';
import FormulaLabel from './FormulaLabel';
import FormulaSkeleton from '../../FormulaWidgetUI/FormulaSkeleton';

const IDENTITY_FN = (v) => v;
const EMPTY_ARRAY = [];

const FormulaGroup = styled('div')(({ theme }) => ({
  '&:nth-of-type(n+2)': {
    marginTop: theme.spacing(2)
  }
}));

/**
 * Renders a `<ComparativeFormulaWidgetUI />` widget
 * <!--
 * @param {Object} props
 * @param {{ prefix?: React.ReactNode; suffix?: React.ReactNode; label?: React.ReactNode, value: number }[]} [props.data]
 * @param {string[]} [props.colors]
 * @param {boolean} [props.animated]
 * @param {{ duration?: number; animateOnMount?: boolean; initialValue?: number; }} [props.animationOptions]
 * @param {(v: number) => React.ReactNode} [props.formatter]
 * @param {boolean} [props.isLoading]
 * -->
 */
function ComparativeFormulaWidgetUI({
  data = EMPTY_ARRAY,
  colors = EMPTY_ARRAY,
  animated = true,
  animationOptions,
  formatter = IDENTITY_FN,
  isLoading = false
}) {
  const formulaValues = prepareFormulaValues(data, colors);

  if (isLoading) {
    return <FormulaSkeleton />;
  }

  return (
    <div>
      {formulaValues.map((row, index) => (
        <FormulaGroup key={index}>
          <FormulaValue
            row={row}
            animated={animated}
            animationOptions={animationOptions}
            formatter={formatter}
          />
          <FormulaLabel row={row} />
        </FormulaGroup>
      ))}
    </div>
  );
}

function prepareFormulaValues(data, colors) {
  const values = data
    .map((d, i) => ({
      ...d,
      color: colors[i]
    }))
    .filter((d) => d.value !== undefined);

  const isReference = values && values.length > 1;
  if (isReference) {
    values[0].shouldBeHighlighted = true;
  }

  return values;
}

ComparativeFormulaWidgetUI.displayName = 'ComparativeFormulaWidgetUI';
ComparativeFormulaWidgetUI.defaultProps = {
  data: EMPTY_ARRAY,
  colors: EMPTY_ARRAY,
  animated: true,
  animationOptions: {},
  formatter: IDENTITY_FN
};

const formulaDataPropTypes = PropTypes.shape({
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  note: PropTypes.string,
  value: PropTypes.number
});

ComparativeFormulaWidgetUI.propTypes = {
  data: PropTypes.arrayOf(formulaDataPropTypes).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
  animated: PropTypes.bool,
  animationOptions: animationOptionsPropTypes,
  formatter: PropTypes.func,
  isLoading: PropTypes.bool
};

export default ComparativeFormulaWidgetUI;
