import React from 'react';
import { render, screen } from '@testing-library/react';
import LegendCategories from '../../../src/widgets/legend/LegendCategories';
import { getPalette } from '../../../src/utils/palette';

const COLOR = 'TealGrn';

const DEFAULT_LEGEND = {
  labels: ['Category 1', 'Category 2'],
  colors: COLOR
};

describe('LegendCategories', () => {
  test('renders labels correctly', () => {
    render(<LegendCategories legend={DEFAULT_LEGEND} />);
    const categoryOne = screen.getAllByText(/Category 1/);
    const categoryTwo = screen.getAllByText(/Category 2/);
    expect(categoryOne[0]).toBeInTheDocument();
    expect(categoryTwo[0]).toBeInTheDocument();
  });
  test('renders colors (CARTOColors) correctly', () => {
    render(<LegendCategories legend={DEFAULT_LEGEND} />);
    const elements = document.querySelectorAll('[class*="markerCircle"]');
    getPalette(COLOR, 2).forEach((color, idx) =>
      expect(elements[idx]).toHaveStyle(`background-color: ${color}`)
    );
  });
  test('renders colors (hex) correctly', () => {
    render(<LegendCategories legend={{ ...DEFAULT_LEGEND, colors: ['#000', '#fff'] }} />);
    const [firstCategory, secondCategory] = document.querySelectorAll(
      '[class*="markerCircle"]'
    );
    expect(firstCategory).toHaveStyle('background-color: #000;');
    expect(secondCategory).toHaveStyle('background-color: #fff;');
  });
  test('renders stroked colors correctly', () => {
    render(<LegendCategories legend={{ ...DEFAULT_LEGEND, isStrokeColor: true }} />);
    const elements = document.querySelectorAll('[class*="markerCircle"]');
    getPalette(COLOR, 2).forEach((color, idx) =>
      expect(elements[idx]).toHaveStyle(`border-color: ${color}`)
    );
  });
});
