import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormulaWidgetUI } from 'src/ui';
import { currencyFormatter } from './utils';

describe('FormulaWidgetUI', () => {
  test('empty', () => {
    render(<FormulaWidgetUI />);
    expect(screen.getByText(/\-/)).toBeInTheDocument();
  });

  test('simple - data as string', () => {
    const data = '1234';
    render(<FormulaWidgetUI data={data} />);
    expect(screen.getByText(data)).toBeInTheDocument();
  });

  test('simple - data as number', async () => {
    const data = 1234;
    render(<FormulaWidgetUI data={data} />);
    expect(await screen.findByText(data)).toBeInTheDocument();
  });

  test('simple - data as object', async () => {
    const data = { value: 1234 };
    render(<FormulaWidgetUI data={data} />);
    expect(await screen.findByText(data.value)).toBeInTheDocument();
  });

  test('with currency formatter', () => {
    const data = '1234';
    render(<FormulaWidgetUI data={data} formatter={currencyFormatter} />);
    expect(screen.getByText(/\$/)).toBeInTheDocument();
    expect(screen.getByText(/1\.23K/)).toBeInTheDocument();
  });
});
