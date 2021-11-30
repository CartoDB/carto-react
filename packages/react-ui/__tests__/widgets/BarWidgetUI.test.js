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

  const X_AXIS_DATA = [4, 5, 6];

  const Widget = (props) =>
    getMaterialUIContext(
      <BarWidgetUI
        data={DATA}
        xAxisData={X_AXIS_DATA}
        onSelectedBarsChange={() => {}}
        {...props}
      />
    );

  test('all selected', () => {
    render(<Widget />);
    expect(screen.getByText(/All selected/)).toBeInTheDocument();
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
