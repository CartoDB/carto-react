import React from 'react';
import { render, fireEvent, screen } from '../widgets/utils/testUtils';
import BarWidgetUI from '../../src/widgets/BarWidgetUI';
import { mockEcharts } from './testUtils';

describe('BarWidgetUI', () => {
  beforeAll(() => {
    mockEcharts.init();
  });

  afterAll(() => {
    mockEcharts.destroy();
  });

  const Y_AXIS_DATA = [1, 2, 3];

  const X_AXIS_DATA = ['column_1', 'column_2', 'column_3'];

  const Widget = (props) => (
    <BarWidgetUI
      yAxisData={Y_AXIS_DATA}
      xAxisData={X_AXIS_DATA}
      onSelectedBarsChange={() => {}}
      {...props}
    />
  );

  const Y_AXIS_DATA_MULTIPLE = [
    [1, 2, 3],
    [1, 2, 3]
  ];

  const SERIES = ['Row 1', 'Row 2'];

  const LABELS = {
    4: 'Column 1',
    5: 'Column 2',
    6: 'Column 2'
  };

  const WidgetMultiple = (props) => (
    <BarWidgetUI
      yAxisData={Y_AXIS_DATA_MULTIPLE}
      xAxisData={X_AXIS_DATA}
      series={SERIES}
      labels={LABELS}
      onSelectedBarsChange={() => {}}
      {...props}
    />
  );

  test('all selected', () => {
    render(<Widget />);
    expect(screen.getByText(/All selected/)).toBeInTheDocument();
  });

  test('renders with stacked false', () => {
    render(<Widget stacked={false} />);
  });

  test('renders with custom colors', () => {
    render(<Widget colors={['#fff']} />);
  });

  test('renders with multiple rows', () => {
    render(<WidgetMultiple />);
  });

  test('re-render with different yAxisData', () => {
    const { rerender } = render(<Widget />);

    rerender(<Widget />);
    rerender(<Widget yAxisData={[...Y_AXIS_DATA, 1]} />);
  });

  test('with selected bars', () => {
    const mockOnSelectedBarsChange = jest.fn();
    render(<Widget selectedBars={[1]} onSelectedBarsChange={mockOnSelectedBarsChange} />);
    expect(screen.getByText(/1 selected/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Clear/));
    expect(mockOnSelectedBarsChange).toHaveBeenCalledTimes(1);
  });
});
