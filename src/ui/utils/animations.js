/**
 * Animate one value from start to end
 */
export function animateValue({ start, end, duration, drawFrame }) {
  if (start === end) return;

  const range = end - start;
  let current = start;
  const step = range / ((duration / 1000) * 60);
  const animate = () => {
    current += step;
    drawFrame(Math.floor(current));
    if ((step > 0 && current < end) || (step < 0 && current > end)) {
      requestAnimationFrame(animate);
    } else {
      drawFrame(end);
    }
  };
  requestAnimationFrame(animate);
}

/**
 * Animate a series of values from start to end
 */
export function animateValues({ start, end, duration, drawFrame }) {
  const isEqual =
    start.length === end.length && start.every((val, i) => val.value === end[i].value);
  if (isEqual) return;

  let currentValues = end.map((elem, i) =>
    start[i] && start[i].category === elem.category
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
      requestAnimationFrame(animate);
    } else {
      drawFrame(end);
    }
  };
  requestAnimationFrame(animate);
}
