import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BarWidgetUI from '../../src/widgets/BarWidgetUI';
import { getMaterialUIContext, mockEcharts } from './testUtils';

describe('BarWidgetUI', () => {
  beforeAll(() => {
    mockEcharts.init();
  });

  afterAll(() => {
    mockEcharts.destroy();
  });

  const DATA = [1, 2, 3];

  const X_AXIS_DATA = ['column_1', 'column_2', 'column_3'];

  const Widget = (props) =>
    getMaterialUIContext(
      <BarWidgetUI
        data={DATA}
        xAxisData={X_AXIS_DATA}
        onSelectedBarsChange={() => {}}
        {...props}
      />
    );

  const DATA_MULTIPLE = [
    [1, 2, 3],
    [1, 2, 3]
  ];

  const Y_AXIS_DATA = ['Row 1', 'Row 2'];

  const LABELS = {
    4: 'Column 1',
    5: 'Column 2',
    6: 'Column 2'
  };

  const WidgetMultiple = (props) =>
    getMaterialUIContext(
      <BarWidgetUI
        data={DATA_MULTIPLE}
        xAxisData={X_AXIS_DATA}
        yAxisData={Y_AXIS_DATA}
        labels={LABELS}
        onSelectedBarsChange={() => {}}
        {...props}
      />
    );

  test('all selected', () => {
    render(<Widget />);
    expect(screen.getByText(/All selected/)).toBeInTheDocument();
  });

  test('renders with vertical false and stacked false', () => {
    render(<Widget vertical={false} stacked={false} />);
  });

  test('renders with custom colors', () => {
    render(<Widget colors={['#fff']} />);
  });

  test('renders with multiple rows', () => {
    render(<WidgetMultiple />);
  });

  test('re-render with different data', () => {
    const { rerender } = render(<Widget />);

    rerender(<Widget />);
    rerender(<Widget data={[...DATA, 1]} />);
  });

  test('with selected bars', () => {
    const mockOnSelectedBarsChange = jest.fn();
    render(<Widget selectedBars={[1]} onSelectedBarsChange={mockOnSelectedBarsChange} />);
    expect(screen.getByText(/1 selected/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Clear/));
    expect(mockOnSelectedBarsChange).toHaveBeenCalledTimes(1);
  });
});
