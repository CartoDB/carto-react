import React from 'react';
import { render } from '../widgets/utils/testUtils';
import ScatterPlotWidgetUI from '../../src/widgets/ScatterPlotWidgetUI/ScatterPlotWidgetUI';
import { mockEcharts } from './testUtils';

describe('ScatterPlotWidgetUI', () => {
  beforeAll(() => {
    mockEcharts.init();
  });

  afterAll(() => {
    mockEcharts.destroy();
  });
  const DATA = [
    [1, 2],
    [2, 4],
    [3, 6]
  ];
  const Widget = (props) => (
    <ScatterPlotWidgetUI data={DATA} onSelectedBarsChange={() => {}} {...props} />
  );

  test('renders correctly', () => {
    render(<Widget />);
  });

  test('re-render with different data', () => {
    const { rerender } = render(<Widget />);

    rerender(<Widget />);
    rerender(<Widget data={[...DATA, [4, 8]]} />);
  });
});
