import { scatterPlot } from '../../src/operations/scatterPlot';
test('filter invalid values', () => {
  const data = [
    { x: 0 }, // Missing y
    { y: 1 }, // Missing x
    { x: null, y: 1 }, // null x
    { x: 1, y: null }, // null y
    { x: 0, y: 0 }, // zero for both
    { x: 1, y: 2 }, // valid
    {}, // no values for both
    { x: 2, y: 3 } // valid
  ];
  expect(scatterPlot(data, 'x', 'y')).toEqual([
    [0, 0],
    [1, 2],
    [2, 3]
  ]);
});
