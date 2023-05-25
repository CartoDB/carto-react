import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';
import { animateValue } from '../utils/animations';
import Typography from '../../components/atoms/Typography';
import FormulaSkeleton from './FormulaSkeleton';

const Prefix = styled('span')(() => ({
  marginRight: '2px'
}));

const Suffix = styled('span')(() => ({
  marginLeft: '2px'
}));

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function FormulaWidgetUI(props) {
  const { data, formatter, animation, isLoading } = props;
  const [value, setValue] = useState('-');
  const requestRef = useRef();
  const prevValue = usePrevious(value);
  const referencedPrevValue = useRef(prevValue);

  useEffect(() => {
    if (typeof data === 'number' && animation) {
      animateValue({
        start: referencedPrevValue.current || 0,
        end: data,
        duration: 500,
        drawFrame: (val) => setValue(val),
        requestRef
      });
    } else if (
      typeof data === 'object' &&
      animation &&
      data &&
      referencedPrevValue.current &&
      data.value !== null &&
      data.value !== undefined
    ) {
      animateValue({
        start: referencedPrevValue.current.value,
        end: data.value,
        duration: 1000,
        drawFrame: (val) =>
          setValue({ value: val, prefix: data.prefix, suffix: data.suffix }),
        requestRef
      });
    } else {
      setValue(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => cancelAnimationFrame(requestRef.current);
  }, [animation, data, setValue]);

  const formattedValue = formatter(value);

  const isComplexFormat = typeof formattedValue === 'object' && formattedValue !== null;

  if (isLoading) return <FormulaSkeleton />;

  return isComplexFormat ? (
    <Typography variant='h5' component='div' weight='medium'>
      <Prefix>{formattedValue.prefix}</Prefix>
      {formattedValue.value}
      <Suffix>{formattedValue.suffix}</Suffix>
    </Typography>
  ) : (
    <Typography variant='h5' component='div' weight='medium'>
      {formattedValue}
    </Typography>
  );
}

FormulaWidgetUI.defaultProps = {
  data: '-',
  formatter: (v) => v,
  prefix: '',
  suffix: '',
  animation: true
};

FormulaWidgetUI.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      prefix: PropTypes.string,
      suffix: PropTypes.string
    })
  ]),
  formatter: PropTypes.func,
  animation: PropTypes.bool,
  isLoading: PropTypes.bool
};

export default FormulaWidgetUI;
