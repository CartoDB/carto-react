import React from 'react';
import { render, screen } from '@testing-library/react';
import { HistogramWidgetUI } from 'src/ui';
import { getMaterialUIContext } from './utils';

describe('HistogramWidgetUI', () => {
  const Widget = (props) => getMaterialUIContext(<HistogramWidgetUI {...props} />);

  test('simple', () => {
    const data = [1, 2, 3, 4];
    render(<Widget data={data} onSelectedBarsChange={() => {}} />);
    expect(screen.getByText(/All selected/)).toBeInTheDocument();
  });
});
