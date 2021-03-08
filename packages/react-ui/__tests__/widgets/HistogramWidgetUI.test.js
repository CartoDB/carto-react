import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HistogramWidgetUI from '../../src/widgets/HistogramWidgetUI';
import echarts from 'echarts';
import { getMaterialUIContext } from './testUtils';

describe('HistogramWidgetUI', () => {
  let spy;
  beforeEach(() => {
    spy = jest.spyOn(echarts, 'getInstanceByDom').mockImplementation(() => ({
      hideLoading: jest.fn(),
      getOption: jest.fn(() => ({
        series: [
          {
            data: [
              {
                disabled: true,
                itemStyle: {}
              }
            ]
          }
        ]
      })),
      setOption: jest.fn(() => ({
        disabled: true,
        itemStyle: {}
      })),
      showLoading: jest.fn(),
      on: jest.fn()
    }));
  });

  afterAll(() => {
    spy.mockRestore();
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
