const sum = (v, column) => v.reduce((a, b) => typeof b === 'object' ? a + (b.properties[column] || 0) : a + b, 0);
const len = (v) => v.length;

export const aggregationFunctions = () => ({
  count: (val) => len(val),
  min: (val) => val.reduce((a, b) => Math.min(a, b), Infinity),
  max: (val) => val.reduce((a, b) => Math.max(a, b), -Infinity),
  sum: (val, column) => sum(val, column),
  avg: (val, column) => sum(val, column) / val.length
});
