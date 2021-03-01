import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormulaWidgetUI } from 'src/ui';
import { currencyFormatter } from './utils';

// Mock animations
jest.mock('src/ui/utils/animations');
// eslint-disable-next-line import/first
import { animateValue } from 'src/ui/utils/animations';

animateValue.mockImplementation(({ end, drawFrame }) => {
  drawFrame(end); // draw final step, no intermediate ones
});

describe('FormulaWidgetUI', () => {
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

  test('with currency formatter', () => {
    const DATA = '1234';
    render(<FormulaWidgetUI data={DATA} formatter={currencyFormatter} />);
    expect(screen.getByText(/\$/)).toBeInTheDocument();
    expect(screen.getByText(/1\.23K/)).toBeInTheDocument();
  });
});
