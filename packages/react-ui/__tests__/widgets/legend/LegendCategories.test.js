import React from 'react';
import { render, screen } from '../utils/testUtils';
import LegendCategories from '../../../src/widgets/legend/LegendCategories';
import { getPalette } from '../../../src/utils/palette';
import { hexToRgb } from '@mui/material';

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
    getPalette(COLOR, 2).forEach((color, idx) => {
      const styles = window.getComputedStyle(elements[idx]);
      expect(styles['background-color']).toBe(hexToRgb(color));
    });
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
    getPalette(COLOR, 2).forEach((color, idx) => {
      const styles = window.getComputedStyle(elements[idx]);
      expect(styles['border-color']).toBe(color);
    });
  });
  test('renders masked icons correctly', () => {
    render(
      <LegendCategories
        legend={{ ...DEFAULT_LEGEND, customMarkers: 'https://xyz.com/x.png' }}
      />
    );
    const elements = document.querySelectorAll('[class*="marker"]');
    getPalette(COLOR, 2).forEach((color, idx) => {
      const styles = window.getComputedStyle(elements[idx]);
      expect(styles['mask-image']).toBe('url(https://xyz.com/x.png)');
      expect(styles['background-color']).toBe(hexToRgb(color));
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
      const styles = window.getComputedStyle(elements[idx]);
      expect(styles['background-image']).toBe('url(https://xyz.com/x.png)');
      expect(styles['background-color']).toBe('rgba(0, 0, 0, 0)');
    });
  });
});
