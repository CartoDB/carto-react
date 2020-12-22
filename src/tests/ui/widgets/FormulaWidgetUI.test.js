import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormulaWidgetUI } from 'src/ui';

const currencyFormatter = (value) => {
  return {
    prefix: '$',
    value: Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(isNaN(value) ? 0 : value),
  };
};

describe('FormulaWidgetUI', ()=> {

  it('empty', async() => {
    render(<FormulaWidgetUI data={''} />);
  
    const empty = await screen.getByLabelText('formattedValue');
    expect(empty).toBeEmptyDOMElement();
  });

  // it('simple', async() => {
  //   render(<FormulaWidgetUI data={1234} />);

  //   const value = await screen.findByText('1234');
  //   expect(value);
  // });

  // it('with currency formatter', async() => {
  //   render(<FormulaWidgetUI data={'1234'} formatter={currencyFormatter} />);
  
  //   const mainValue = await screen.findByText('1.23K');
  //   expect(mainValue);

  //   expect(screen.getByLabelText('preffix')).toHaveTextContent('$');
  //   expect(screen.getByLabelText('suffix')).toBeEmptyDOMElement();
  // });
})
