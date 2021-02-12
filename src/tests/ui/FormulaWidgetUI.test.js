import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormulaWidgetUI } from 'src/ui';
import { currencyFormatter } from './utils';

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
