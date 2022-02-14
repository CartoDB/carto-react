import React from 'react';
import { render, screen } from '@testing-library/react';
import LegendCategories from '../../../src/widgets/legend/LegendCategories';

const DEFAULT_LEGEND = {
  labels: ['Category 1', 'Category 2'],
  colors: 'TealGrn'
};

describe('LegendCategories', () => {
  test('renders labels correctly', () => {
    render(<LegendCategories legend={DEFAULT_LEGEND} />);
    expect(screen.queryByText('Category 1')).toBeInTheDocument();
    expect(screen.queryByText('Category 2')).toBeInTheDocument();
  });
  test('renders colors (CARTOColors) correctly', () => {
    render(<LegendCategories legend={DEFAULT_LEGEND} />);
    const [firstCategory, secondCategory] =
      document.querySelectorAll('[class*="circle"]');
    expect(firstCategory).toHaveStyle('background-color: rgb(176, 242, 188);');
    expect(secondCategory).toHaveStyle('background-color: rgb(137, 232, 172);');
  });
  test('renders colors (hex) correctly', () => {
    render(<LegendCategories legend={{ ...DEFAULT_LEGEND, colors: ['#000', '#fff'] }} />);
    const [firstCategory, secondCategory] =
      document.querySelectorAll('[class*="circle"]');
    expect(firstCategory).toHaveStyle('background-color: #000;');
    expect(secondCategory).toHaveStyle('background-color: #fff;');
  });
  test('renders stroked colors correctly', () => {
    render(<LegendCategories legend={{ ...DEFAULT_LEGEND, isStrokeColor: true }} />);
    const [firstCategory, secondCategory] =
      document.querySelectorAll('[class*="circle"]');
    expect(firstCategory).toHaveStyle('border-color: #b0f2bc;');
    expect(secondCategory).toHaveStyle('border-color: #89e8ac;');
  });
});
