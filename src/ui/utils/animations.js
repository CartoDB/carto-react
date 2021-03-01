/**
 * Animate one value from start to end, storing the current request in requestRef hook
 */
export function animateValue({ start, end, duration, drawFrame, requestRef }) {
  if (start === end) return;

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
    start[i] && start[i].name === elem.name
      ? { ...elem, value: start[i].value }
      : elem
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
      currentValues = currentValues.map((elem, i) => ({
        ...elem,
        value: elem.value + steps[i]
      }));
      drawFrame(currentValues);
      currentFrame++;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      drawFrame(end);
    }
  };
  requestRef.current = requestAnimationFrame(animate);
}
