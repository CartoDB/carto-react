import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import { animationOptionsPropTypes } from '../../../custom-components/AnimatedNumber';

import FormulaValue from './FormulaValue';
import FormulaLabel from './FormulaLabel';

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
 * -->
 */
function ComparativeFormulaWidgetUI({
  data = EMPTY_ARRAY,
  colors = EMPTY_ARRAY,
  animated = true,
  animationOptions,
  formatter = IDENTITY_FN
}) {
  const processedData = processFormulaValues(data, colors);
  const isReference = processedData.length > 1;

  return (
    <div>
      {processedData.map((dataRow, index) => (
        <FormulaGroup key={index}>
          <FormulaValue
            row={dataRow}
            isReference={isReference}
            animated={animated}
            animationOptions={animationOptions}
            formatter={formatter}
          />
          <FormulaLabel row={dataRow} />
        </FormulaGroup>
      ))}
    </div>
  );
}

function processFormulaValues(data, colors) {
  return data
    .map((d, i) => ({
      ...d,
      color: colors[i]
    }))
    .filter((d) => d.value !== undefined);
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
  formatter: PropTypes.func
};

export default ComparativeFormulaWidgetUI;
