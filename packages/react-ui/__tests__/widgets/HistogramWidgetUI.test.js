import React from 'react';
import { render, fireEvent, screen } from '../widgets/utils/testUtils';
import HistogramWidgetUI from '../../src/widgets/HistogramWidgetUI/HistogramWidgetUI';
import { mockEcharts } from './testUtils';

describe('HistogramWidgetUI', () => {
  beforeAll(() => {
    mockEcharts.init();
  });

  afterAll(() => {
    mockEcharts.destroy();
  });

  const onSelectedBarsChange = jest.fn();

  const defaultProps = {
    data: [1, 2, 3, 4],
    min: 0,
    max: 5,
    ticks: [0, 1, 2],
    onSelectedBarsChange
  };

  const Widget = (props) => <HistogramWidgetUI {...defaultProps} {...props} />;

  test('all selected', () => {
    render(<Widget />);
    expect(screen.getByText(/All/)).toBeInTheDocument();
  });

  test('all selected with locale', () => {
    render(<Widget locale='es-ES' />);
    expect(screen.getByText(/Todos/)).toBeInTheDocument();
  });

  test('re-render with different data', () => {
    const { rerender } = render(<Widget />);

    rerender(<Widget />);
    rerender(<Widget data={[...defaultProps.data, 1]} />);
  });

  test('with selected bars', () => {
    render(<Widget selectedBars={[1]} />);
    expect(screen.getByText(/2 selected/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Clear/));
    expect(onSelectedBarsChange).toHaveBeenCalledTimes(1);
  });
});
