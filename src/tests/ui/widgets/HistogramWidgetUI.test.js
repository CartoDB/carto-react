import React from 'react';
import { render, screen } from '@testing-library/react';
import { HistogramWidgetUI } from 'src/ui';

import { getMaterialUIContext } from 'src/tests/ui/widgets/utils';

describe('HistogramWidgetUI', () => {

  const Widget = (props)=> getMaterialUIContext(<HistogramWidgetUI {...props} />);

  it('empty', async() => {
    render(<Widget data={[]} />);
  
    const noData = await screen.findByText(/No data available/);
    expect(noData);
  });
})
