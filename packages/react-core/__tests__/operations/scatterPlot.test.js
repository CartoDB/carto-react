import { AggregationTypes } from '@carto/react-core/';
import { scatterPlot } from '../../src/operations/scatterPlot';

describe('scatterPlot', () => {
  test('should filter invalid values', () => {
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

    expect(scatterPlot({ data, xAxisColumns: ['x'], yAxisColumns: ['y'] })).toEqual([
      [0, 0],
      [1, 2],
      [2, 3]
    ]);
  });

  test('using multiple columns', () => {
    const data = [
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 3 }
    ];

    expect(
      scatterPlot({
        data,
        xAxisColumns: ['x', 'y'],
        xAxisJoinOperation: AggregationTypes.SUM,
        yAxisColumns: ['x', 'y'],
        yAxisJoinOperation: AggregationTypes.SUM
      })
    ).toEqual([
      [0, 0],
      [3, 3],
      [5, 5]
    ]);
  });
});
