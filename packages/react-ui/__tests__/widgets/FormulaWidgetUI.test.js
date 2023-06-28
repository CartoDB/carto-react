import React from 'react';
import { render, screen } from '../widgets/utils/testUtils';
import FormulaWidgetUI from '../../src/widgets/FormulaWidgetUI/FormulaWidgetUI';
import { currencyFormatter } from './testUtils';

describe('FormulaWidgetUI', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => cb());
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

  test('empty', () => {
    render(<FormulaWidgetUI />);
    expect(screen.getByText(/-/)).toBeInTheDocument();
  });

  test('simple - data as string', () => {
    const DATA = '1234';
    render(<FormulaWidgetUI data={DATA} />);
    expect(screen.getByText(DATA)).toBeInTheDocument();
  });

  test('simple - data as number', async () => {
    const DATA = 1234;
    render(<FormulaWidgetUI data={DATA} />);
    expect(await screen.findByText(DATA)).toBeInTheDocument();
  });

  test('simple - data as object', async () => {
    const DATA = { value: 1234 };
    render(<FormulaWidgetUI data={DATA} />);
    expect(await screen.findByText(DATA.value)).toBeInTheDocument();
  });

  test('should render the current value', async () => {
    const { rerender } = render(<FormulaWidgetUI data={1234} />);
    rerender(<FormulaWidgetUI data={0} />);
    expect(await screen.findByText(0)).toBeInTheDocument();
  });

  test('should render undefined as -', async () => {
    render(<FormulaWidgetUI data={undefined} />);
    expect(await screen.findByText('-')).toBeInTheDocument();
  });

  test('should render null as -', async () => {
    render(<FormulaWidgetUI data={null} />);
    expect(await screen.findByText('-')).toBeInTheDocument();
  });

  test('with currency formatter', () => {
    const DATA = '1234';
    render(<FormulaWidgetUI data={DATA} formatter={currencyFormatter} />);
    expect(screen.getByText(/\$/)).toBeInTheDocument();
    expect(screen.getByText(/1\.23K/)).toBeInTheDocument();
  });
});
