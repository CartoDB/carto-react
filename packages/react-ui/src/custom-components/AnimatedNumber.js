import React from 'react';
import PropTypes from 'prop-types';
import useAnimatedNumber from '../hooks/useAnimatedNumber';

/**
 * Renders a <AnimatedNumber /> widget
 * @param {Object} props
 * @param {boolean} props.enabled
 * @param {number} props.value
 * @param {{ duration?: number; animateOnMount?: boolean; initialValue?: number }} [props.options]
 * @param {(n: number) => React.ReactNode} [props.formatter]
 */
function AnimatedNumber({ enabled, value, options, formatter }) {
  const defaultOptions = {
    animateOnMount: true,
    disabled: enabled === false || value === null || value === undefined
  };
  const animated = useAnimatedNumber(value || 0, { ...defaultOptions, ...options });
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
  animateOnMount: PropTypes.bool,
  initialValue: PropTypes.number
});

AnimatedNumber.propTypes = {
  enabled: PropTypes.bool,
  value: PropTypes.number.isRequired,
  options: animationOptionsPropTypes,
  formatter: PropTypes.func
};

export default AnimatedNumber;
