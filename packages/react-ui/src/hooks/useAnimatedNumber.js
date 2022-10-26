import { useEffect, useRef, useState } from "react";
import { animateValue } from '../widgets/utils/animations';

/**
 * React hook to handle animating value changes over time, abstracting the necesary state, refs and effects
 * @param {number} value 
 * @param {{ disabled?: boolean; duration?: number; animateOnMount?: boolean; initialValue?: number; }} [options] 
 */
export default function useAnimatedNumber(value, options = {}) {
  const { disabled, duration, animateOnMount, initialValue = 0 } = options;

  // starting with a -1 to supress a typescript warning
  const requestAnimationFrameRef = useRef(-1); 

  // if we want to run the animation on mount, we set the starting value of the animated number as 0 (or the number in `initialValue`) and animate to the target value from there
  const [animatedValue, setAnimatedValue] = useState(() => animateOnMount ? initialValue : value);

  useEffect(() => {
    if (!disabled) {
      animateValue({
        start: animatedValue,
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
