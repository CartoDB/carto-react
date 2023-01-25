import React from 'react';
import { render, screen } from '../widgets/utils/testUtils';
import ComparativeFormulaWidgetUI from '../../src/widgets/comparative/ComparativeFormulaWidgetUI';

const SAMPLE_DATA = [
  {
    value: 1234
  },
  {
    value: 12
  },
  {
    value: 0
  }
];

describe('ComparativeFormulaWidgetUI', () => {
  test('empty', () => {
    const { container } = render(
      <ComparativeFormulaWidgetUI data={[]} animated={false} />
    );
    expect(container).toBeInTheDocument();
  });

  test('simple', async () => {
    render(<ComparativeFormulaWidgetUI data={SAMPLE_DATA} animated={false} />);
    expect(await screen.findByText(SAMPLE_DATA[0].value)).toBeInTheDocument();
  });

  test('multiple', async () => {
    render(<ComparativeFormulaWidgetUI data={SAMPLE_DATA} animated={false} />);
    const data = await Promise.all(
      SAMPLE_DATA.map(async (d) => await screen.findByText(d.value))
    );
    data.forEach((d) => expect(d).toBeInTheDocument());
  });

  test('simple - data as object', async () => {
    const DATA = { value: 1234 };
    render(<ComparativeFormulaWidgetUI data={SAMPLE_DATA} animated={false} />);
    expect(await screen.findByText(DATA.value)).toBeInTheDocument();
  });

  test('with currency formatter', () => {
    render(
      <ComparativeFormulaWidgetUI
        data={SAMPLE_DATA}
        animated={false}
        formatter={(value) => {
          return Intl.NumberFormat('en-US', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            notation: 'compact',
            compactDisplay: 'short'
          }).format(value);
        }}
      />
    );
    expect(screen.getByText(/1\.23K/)).toBeInTheDocument();
  });
});
