import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HistogramWidgetUI from '../../src/widgets/HistogramWidgetUI';
import { getMaterialUIContext, mockEcharts } from './testUtils';

describe('HistogramWidgetUI', () => {
  beforeAll(() => {
    mockEcharts.init();
  });

  afterAll(() => {
    mockEcharts.destroy();
  });

  const DATA = [1, 2, 3];
  const Widget = (props) =>
    getMaterialUIContext(
      <HistogramWidgetUI data={DATA} onSelectedBarsChange={() => {}} {...props} />
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
