import React from 'react';
import { render, screen } from '@testing-library/react';
import { CategoryWidgetUI } from 'src/ui';

describe('CategoryWidgetUI', () => {

  it('empty', async() => {
    render(<CategoryWidgetUI data={[]} />);
  
    const noData = await screen.findByText(/No data available/);
    expect(noData);
  });
})
