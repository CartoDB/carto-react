export function makeClosedInterval(values) {
  return values.map(val => {
    if (val[0] === undefined) {
      return [Number.MIN_SAFE_INTEGER, val[1]]
    }

    if (val[1] === undefined) {
      return [val[0], Number.MAX_SAFE_INTEGER]
    }
  
    return val;
  });
}
