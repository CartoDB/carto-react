export function makeIntervalComplete(values) {
  return values.map((val) => {
    if (val[0] === undefined || val[0] === null) {
      return [Number.MIN_SAFE_INTEGER, val[1]];
    }

    if (val[1] === undefined || val[1] === null) {
      return [val[0], Number.MAX_SAFE_INTEGER];
    }

    return val;
  });
}
