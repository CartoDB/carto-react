/**
 * Animate one value from start to end, storing the current request in requestRef hook
 */
export function animateValue({ start, end, duration, drawFrame, requestRef }) {
  const startAndEndZero = start === 0 && end === 0; // must ensure 1 render

  if (start === end && !startAndEndZero) {
    return;
  }

  const range = end - start;
  let current = start;
  const step = range / ((duration / 1000) * 60);
  const animate = () => {
    current += step;
    drawFrame(Math.floor(current));
    if ((step > 0 && current < end) || (step < 0 && current > end)) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      drawFrame(end);
    }
  };
  requestRef.current = requestAnimationFrame(animate);
}

/**
 * Animate a series of values from start to end, storing the current request in requestRef hook
 */
export function animateValues({ start, end, duration, drawFrame, requestRef }) {
  const isEqual =
    start.length === end.length && start.every((val, i) => val.value === end[i].value);
  if (isEqual) return;

  let currentValues = end.map((elem, i) =>
    start[i] && start[i].name === elem.name ? { ...elem, value: start[i].value } : elem
  );
  let currentFrame = 0;

  const ranges = currentValues.map((elem, i) => end[i].value - elem.value);
  const noChanges = ranges.every((val) => val === 0);
  if (noChanges) {
    drawFrame(end);
    return;
  }

  const frames = (duration / 1000) * 60;
  const steps = ranges.map((val) => val / frames);

  const animate = () => {
    if (currentFrame < frames) {
      currentValues = currentValues.map((elem, i) => {
        // We use Math.floor to avoid displaying a long list of decimals during animation
        // this happens especially when we don't have a formatting function for the widget
        // TODO If values are between 0 and 1 we would not have animation effect
        const value = Math.floor(elem.value + steps[i]);
        const prevValue = i > 0 && Math.floor(elem.value + steps[i - 1]);
        return {
          ...elem,
          value: value === prevValue ? end[i]?.value : value
        };
      });
      drawFrame(currentValues);
      currentFrame++;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      drawFrame(end);
    }
  };
  requestRef.current = requestAnimationFrame(animate);
}
