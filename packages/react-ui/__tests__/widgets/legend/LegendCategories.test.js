import React from 'react';
import { render, screen } from '../../widgets/utils/testUtils';
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
    const elements = document.querySelectorAll('[class*="marker"]');
    getPalette(COLOR, 2).forEach((color, idx) =>
      expect(elements[idx]).toHaveStyle(`background-color: ${color}`)
    );
  });
  test('renders colors (hex) correctly', () => {
    render(<LegendCategories legend={{ ...DEFAULT_LEGEND, colors: ['#000', '#fff'] }} />);
    const [firstCategory, secondCategory] =
      document.querySelectorAll('[class*="marker"]');
    expect(firstCategory).toHaveStyle('background-color: #000;');
    expect(secondCategory).toHaveStyle('background-color: #fff;');
  });
  test('renders stroked colors correctly', () => {
    render(<LegendCategories legend={{ ...DEFAULT_LEGEND, isStrokeColor: true }} />);
    const elements = document.querySelectorAll('[class*="marker"]');
    getPalette(COLOR, 2).forEach((color, idx) =>
      expect(elements[idx]).toHaveStyle(`border-color: ${color}`)
    );
  });
  test('renders masked icons correctly', () => {
    render(
      <LegendCategories
        legend={{ ...DEFAULT_LEGEND, customMarkers: 'https://xyz.com/x.png' }}
      />
    );
    const elements = document.querySelectorAll('[class*="marker"]');
    getPalette(COLOR, 2).forEach((color, idx) => {
      expect(elements[idx]).toHaveStyle(`mask-image: url(https://xyz.com/x.png)`);
      expect(elements[idx]).toHaveStyle(`background-color: ${color}`);
    });
  });
  test('renders non-masked icons correctly', () => {
    render(
      <LegendCategories
        legend={{
          ...DEFAULT_LEGEND,
          customMarkers: 'https://xyz.com/x.png',
          maskedMarkers: false
        }}
      />
    );
    const elements = document.querySelectorAll('[class*="marker"]');
    getPalette(COLOR, 2).forEach((color, idx) => {
      expect(elements[idx]).toHaveStyle(`background-image: url(https://xyz.com/x.png)`);
      expect(elements[idx]).toHaveStyle(`background-color: rgba(0,0,0,0)`);
    });
  });
});
