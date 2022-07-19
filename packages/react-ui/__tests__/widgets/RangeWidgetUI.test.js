import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { getMaterialUIContext } from './testUtils';
import RangeWidgetUI from '../../src/widgets/RangeWidgetUI';

describe('SliderWidgetUI', () => {
  const Widget = (props) =>
    getMaterialUIContext(<RangeWidgetUI min={0} max={100} {...props} />);

  test('renders with default props', () => {
    render(<Widget />);
    const minValue = screen.getByRole('slider', { name: 'min value' });
    const maxValue = screen.getByRole('slider', { name: 'max value' });
    const inputMin = screen.getByRole('spinbutton', { name: 'min value' });
    const inputMax = screen.getByRole('spinbutton', { name: 'max value' });

    expect(minValue).toHaveAttribute('aria-valuemin', '0');
    expect(minValue).toHaveAttribute('aria-valuemax', '100');
    expect(minValue).toHaveAttribute('aria-valuenow', '0');

    expect(maxValue).toHaveAttribute('aria-valuemin', '0');
    expect(maxValue).toHaveAttribute('aria-valuemax', '100');
    expect(maxValue).toHaveAttribute('aria-valuenow', '100');

    expect(inputMin).toHaveValue(0);
    expect(inputMax).toHaveValue(100);
  });

  test('renders specified limits', () => {
    render(<Widget limits={[20, 50]} />);

    const minLimit = screen.getByRole('slider', { name: 'min limit' });
    const maxLimit = screen.getByRole('slider', { name: 'max limit' });
    const minIntersection = screen.getByRole('slider', { name: 'min intersection' });
    const maxIntersection = screen.getByRole('slider', { name: 'max intersection' });

    expect(minLimit).toHaveAttribute('aria-valuemin', '0');
    expect(minLimit).toHaveAttribute('aria-valuemax', '100');
    expect(minLimit).toHaveAttribute('aria-valuenow', '20');

    expect(maxLimit).toHaveAttribute('aria-valuemin', '0');
    expect(maxLimit).toHaveAttribute('aria-valuemax', '100');
    expect(maxLimit).toHaveAttribute('aria-valuenow', '50');

    expect(minIntersection).toHaveAttribute('aria-valuemin', '0');
    expect(minIntersection).toHaveAttribute('aria-valuemax', '100');
    expect(minIntersection).toHaveAttribute('aria-valuenow', '20');

    expect(maxIntersection).toHaveAttribute('aria-valuemin', '0');
    expect(maxIntersection).toHaveAttribute('aria-valuemax', '100');
    expect(maxIntersection).toHaveAttribute('aria-valuenow', '50');
  });

  test('renders specified limits and values within the limits', () => {
    render(<Widget limits={[20, 80]} data={[40, 60]} />);

    const minLimit = screen.getByRole('slider', { name: 'min limit' });
    const maxLimit = screen.getByRole('slider', { name: 'max limit' });
    const minIntersection = screen.getByRole('slider', { name: 'min intersection' });
    const maxIntersection = screen.getByRole('slider', { name: 'max intersection' });
    const inputMin = screen.getByRole('spinbutton', { name: 'min value' });
    const inputMax = screen.getByRole('spinbutton', { name: 'max value' });

    expect(minLimit).toHaveAttribute('aria-valuemin', '0');
    expect(minLimit).toHaveAttribute('aria-valuemax', '100');
    expect(minLimit).toHaveAttribute('aria-valuenow', '20');

    expect(maxLimit).toHaveAttribute('aria-valuemin', '0');
    expect(maxLimit).toHaveAttribute('aria-valuemax', '100');
    expect(maxLimit).toHaveAttribute('aria-valuenow', '80');

    expect(minIntersection).toHaveAttribute('aria-valuemin', '0');
    expect(minIntersection).toHaveAttribute('aria-valuemax', '100');
    expect(minIntersection).toHaveAttribute('aria-valuenow', '40');

    expect(maxIntersection).toHaveAttribute('aria-valuemin', '0');
    expect(maxIntersection).toHaveAttribute('aria-valuemax', '100');
    expect(maxIntersection).toHaveAttribute('aria-valuenow', '60');

    expect(inputMin).toHaveValue(40);
    expect(inputMax).toHaveValue(60);
  });

  test('renders specified limits and values out of the limits', () => {
    render(<Widget limits={[40, 60]} data={[20, 80]} />);

    const minLimit = screen.getByRole('slider', { name: 'min limit' });
    const maxLimit = screen.getByRole('slider', { name: 'max limit' });
    const minIntersection = screen.getByRole('slider', { name: 'min intersection' });
    const maxIntersection = screen.getByRole('slider', { name: 'max intersection' });
    const inputMin = screen.getByRole('spinbutton', { name: 'min value' });
    const inputMax = screen.getByRole('spinbutton', { name: 'max value' });

    expect(minLimit).toHaveAttribute('aria-valuemin', '0');
    expect(minLimit).toHaveAttribute('aria-valuemax', '100');
    expect(minLimit).toHaveAttribute('aria-valuenow', '40');

    expect(maxLimit).toHaveAttribute('aria-valuemin', '0');
    expect(maxLimit).toHaveAttribute('aria-valuemax', '100');
    expect(maxLimit).toHaveAttribute('aria-valuenow', '60');

    expect(minIntersection).toHaveAttribute('aria-valuemin', '0');
    expect(minIntersection).toHaveAttribute('aria-valuemax', '100');
    expect(minIntersection).toHaveAttribute('aria-valuenow', '40');

    expect(maxIntersection).toHaveAttribute('aria-valuemin', '0');
    expect(maxIntersection).toHaveAttribute('aria-valuemax', '100');
    expect(maxIntersection).toHaveAttribute('aria-valuenow', '60');

    expect(inputMin).toHaveValue(20);
    expect(inputMax).toHaveValue(80);
  });

  test('renders specified limits and values with a single value out of the limits', () => {
    render(<Widget limits={[20, 80]} data={[10, 50]} />);

    const minLimit = screen.getByRole('slider', { name: 'min limit' });
    const maxLimit = screen.getByRole('slider', { name: 'max limit' });
    const minIntersection = screen.getByRole('slider', { name: 'min intersection' });
    const maxIntersection = screen.getByRole('slider', { name: 'max intersection' });
    const inputMin = screen.getByRole('spinbutton', { name: 'min value' });
    const inputMax = screen.getByRole('spinbutton', { name: 'max value' });

    expect(minLimit).toHaveAttribute('aria-valuemin', '0');
    expect(minLimit).toHaveAttribute('aria-valuemax', '100');
    expect(minLimit).toHaveAttribute('aria-valuenow', '20');

    expect(maxLimit).toHaveAttribute('aria-valuemin', '0');
    expect(maxLimit).toHaveAttribute('aria-valuemax', '100');
    expect(maxLimit).toHaveAttribute('aria-valuenow', '80');

    expect(minIntersection).toHaveAttribute('aria-valuemin', '0');
    expect(minIntersection).toHaveAttribute('aria-valuemax', '100');
    expect(minIntersection).toHaveAttribute('aria-valuenow', '20');

    expect(maxIntersection).toHaveAttribute('aria-valuemin', '0');
    expect(maxIntersection).toHaveAttribute('aria-valuemax', '100');
    expect(maxIntersection).toHaveAttribute('aria-valuenow', '50');

    expect(inputMin).toHaveValue(10);
    expect(inputMax).toHaveValue(50);
  });

  test('On selected method is called when we change slider values', () => {
    const mockOnSelectedRangeChange = jest.fn();
    render(<Widget onSelectedRangeChange={mockOnSelectedRangeChange} />);
    const inputMin = screen.getByRole('spinbutton', { name: 'min value' });
    const inputMax = screen.getByRole('spinbutton', { name: 'max value' });
    const minValue = screen.getByRole('slider', { name: 'min value' });
    const maxValue = screen.getByRole('slider', { name: 'max value' });

    fireEvent.change(inputMin, { target: { value: 20 } });
    fireEvent.blur(inputMin);

    expect(mockOnSelectedRangeChange).toHaveBeenCalledWith([20, 100]);

    fireEvent.change(inputMax, { target: { value: 80 } });
    fireEvent.blur(inputMax);

    expect(mockOnSelectedRangeChange).toHaveBeenCalledWith([20, 80]);

    expect(minValue).toHaveAttribute('aria-valuenow', '20');
    expect(maxValue).toHaveAttribute('aria-valuenow', '80');
  });
});
