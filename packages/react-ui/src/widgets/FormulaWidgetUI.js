import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { animateValue } from './utils/animations';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.h5,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.primary
  },
  prefix: {
    marginRight: '2px'
  },
  suffix: {
    marginLeft: '2px'
  }
}));

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function FormulaWidgetUI(props) {
  const classes = useStyles();
  const { data, formatter, animation } = props;
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

  return (
    <Box className={classes.root}>
      {typeof formattedValue === 'object' && formattedValue !== null ? (
        <span>
          <span className={classes.prefix}>{formattedValue.prefix}</span>
          {formattedValue.value}
          <span className={classes.suffix}>{formattedValue.suffix}</span>
        </span>
      ) : (
        <span>{formattedValue}</span>
      )}
    </Box>
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
  animation: PropTypes.bool
};

export default FormulaWidgetUI;
