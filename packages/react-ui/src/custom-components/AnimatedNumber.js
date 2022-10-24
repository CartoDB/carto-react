import React from 'react';
import PropTypes from 'prop-types';
import useAnimateNumber from 'use-animate-number';

function countDecimals(n) {
  if (Math.floor(n) === n) return 0;
  return String(n).split('.')[1]?.length || 0;
}

function AnimatedNumber({ enabled, value, options, formatter }) {
  const defaultOptions = {
    direct: true,
    decimals: countDecimals(value),
    disabled: enabled === false || value === null || value === undefined
  };
  const [animated] = useAnimateNumber(value, { ...defaultOptions, ...options });
  return <span>{formatter ? formatter(animated) : animated}</span>;
}

AnimatedNumber.displayName = 'AnimatedNumber';
AnimatedNumber.defaultProps = {
  enabled: true,
  value: 0,
  options: {},
  formatter: null
};

export const animationOptionsPropTypes = PropTypes.shape({
  duration: PropTypes.number,
  enterance: PropTypes.bool,
  direct: PropTypes.bool,
  disabled: PropTypes.bool,
  decimals: PropTypes.number
});

AnimatedNumber.propTypes = {
  enabled: PropTypes.bool,
  value: PropTypes.number.isRequired,
  options: animationOptionsPropTypes,
  formatter: PropTypes.func
};

export default AnimatedNumber;
