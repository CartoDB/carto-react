import { useEffect, useRef, useState } from "react";
import { animateValue } from '../widgets/utils/animations';

/**
 * React hook to handle animating value changes over time, abstracting the necesary state, refs and effects
 * @param {number} value 
 * @param {{ disabled?: boolean; duration?: number; animateOnMount?: boolean }} [options] 
 */
export default function useAnimatedNumber(value, options = {}) {
  const { disabled, duration, animateOnMount } = options;

  // starting with a -1 to supress a typescript warning
  const requestAnimationFrameRef = useRef(-1); 

  // if we want to run the animation on mount, we set the start value as 0 and animate to the start value
  const [animatedValue, setAnimatedValue] = useState(() => animateOnMount ? 0 : value);

  useEffect(() => {
    if (!disabled) {
      animateValue({
        start: animatedValue || 0,
        end: value,
        duration: duration || 500, // 500ms
        drawFrame: (val) => setAnimatedValue(val),
        requestRef: requestAnimationFrameRef
      });
    } else {
      setAnimatedValue(value)
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      cancelAnimationFrame(requestAnimationFrameRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, disabled, duration]);

  return animatedValue;
};
