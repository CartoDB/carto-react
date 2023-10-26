import React from 'react';
import { render, fireEvent, screen, waitFor } from '../widgets/utils/testUtils';
import RangeWidgetUI from '../../src/widgets/RangeWidgetUI/RangeWidgetUI';

describe('RangeWidgetUI', () => {
  const Widget = (props) => <RangeWidgetUI min={0} max={100} {...props} />;

  test('renders with default props', () => {
    const { container } = render(<Widget />);

    // const minValue = screen.getByLabelText('min value');
    // const maxValue = screen.getByLabelText('max value');
    const minValue = document.querySelector(
      'input[type="range"][aria-label="min value"]'
    );
    const maxValue = document.querySelector(
      'input[type="range"][aria-label="max value"]'
    );

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

    expect(container.getElementsByClassName('MuiSlider-mark').length).toBe(0);
  });

  test('renders specified limits', () => {
    const { container } = render(<Widget limits={[20, 50]} />);

    const minLimit = screen.getByLabelText('min limit');
    const maxLimit = screen.getByLabelText('max limit');

    expect(minLimit).toHaveAttribute('aria-valuemin', '0');
    expect(minLimit).toHaveAttribute('aria-valuemax', '100');
    expect(minLimit).toHaveAttribute('aria-valuenow', '20');

    expect(maxLimit).toHaveAttribute('aria-valuemin', '0');
    expect(maxLimit).toHaveAttribute('aria-valuemax', '100');
    expect(maxLimit).toHaveAttribute('aria-valuenow', '50');

    expect(container.getElementsByClassName('MuiSlider-mark').length).toBe(2);
  });

  test('renders specified limits with same min and max values', () => {
    const { container } = render(<Widget limits={[50, 50]} />);

    const minLimit = screen.getByLabelText('min limit');
    const maxLimit = screen.getByLabelText('max limit');

    expect(minLimit).toHaveAttribute('aria-valuemin', '0');
    expect(minLimit).toHaveAttribute('aria-valuemax', '100');
    expect(minLimit).toHaveAttribute('aria-valuenow', '50');

    expect(maxLimit).toHaveAttribute('aria-valuemin', '0');
    expect(maxLimit).toHaveAttribute('aria-valuemax', '100');
    expect(maxLimit).toHaveAttribute('aria-valuenow', '50');

    expect(container.getElementsByClassName('MuiSlider-mark').length).toBe(1);
  });

  test('renders specified limits and values', () => {
    const { container } = render(<Widget limits={[20, 80]} data={[40, 60]} />);

    const minLimit = screen.getByLabelText('min limit');
    const maxLimit = screen.getByLabelText('max limit');

    const inputMin = screen.getByRole('spinbutton', { name: 'min value' });
    const inputMax = screen.getByRole('spinbutton', { name: 'max value' });

    expect(minLimit).toHaveAttribute('aria-valuemin', '0');
    expect(minLimit).toHaveAttribute('aria-valuemax', '100');
    expect(minLimit).toHaveAttribute('aria-valuenow', '20');

    expect(maxLimit).toHaveAttribute('aria-valuemin', '0');
    expect(maxLimit).toHaveAttribute('aria-valuemax', '100');
    expect(maxLimit).toHaveAttribute('aria-valuenow', '80');

    expect(inputMin).toHaveValue(40);
    expect(inputMax).toHaveValue(60);

    expect(container.getElementsByClassName('MuiSlider-mark').length).toBe(2);
  });

  test('renders specified limits out of min-max range', () => {
    const { container } = render(<Widget limits={[101, 200]} />);

    const minLimit = screen.getByLabelText('min limit');
    const maxLimit = screen.getByLabelText('max limit');

    expect(minLimit).toHaveAttribute('aria-valuemin', '0');
    expect(minLimit).toHaveAttribute('aria-valuemax', '100');
    expect(minLimit).toHaveAttribute('aria-valuenow', '100');

    expect(maxLimit).toHaveAttribute('aria-valuemin', '0');
    expect(maxLimit).toHaveAttribute('aria-valuemax', '100');
    expect(maxLimit).toHaveAttribute('aria-valuenow', '100');

    expect(container.getElementsByClassName('MuiSlider-mark').length).toBe(0);
  });

  test('on selected method is called when we change slider values', async () => {
    const mockOnSelectedRangeChange = jest.fn();
    render(<Widget onSelectedRangeChange={mockOnSelectedRangeChange} />);

    const inputMin = screen.getByRole('spinbutton', { name: 'min value' });
    const inputMax = screen.getByRole('spinbutton', { name: 'max value' });

    // const minValue = screen.getByLabelText('min value');
    // const maxValue = screen.getByLabelText('max value');
    const minValue = document.querySelector(
      'input[type="range"][aria-label="min value"]'
    );
    const maxValue = document.querySelector(
      'input[type="range"][aria-label="max value"]'
    );

    fireEvent.change(inputMin, { target: { value: 20 } });
    fireEvent.blur(inputMin);

    await waitFor(() =>
      expect(mockOnSelectedRangeChange).toHaveBeenCalledWith([20, 100])
    );

    fireEvent.change(inputMax, { target: { value: 80 } });
    fireEvent.blur(inputMax);

    await waitFor(() => expect(mockOnSelectedRangeChange).toHaveBeenCalledWith([20, 80]));

    expect(minValue).toHaveAttribute('aria-valuenow', '20');
    expect(maxValue).toHaveAttribute('aria-valuenow', '80');
  });
});
