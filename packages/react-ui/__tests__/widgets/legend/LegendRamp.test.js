import React from 'react';
import { render, screen } from '../../widgets/utils/testUtils';
import LegendRamp from '../../../src/widgets/legend/LegendRamp';
import { getPalette } from '../../../src/utils/palette';
import { hexToRgb } from '@mui/material';

const COLOR = 'TealGrn';

const DEFAULT_LEGEND = {
  labels: [0, 200],
  colors: COLOR
};

const DEFAULT_LEGEND_WITH_FORMATTED_LABELS = {
  labels: [
    { value: 0, label: '0 km' },
    { value: 200, label: '200 km' }
  ],
  colors: COLOR
};

describe('LegendRamp', () => {
  test('renders error if neither labels is defined', () => {
    render(<LegendRamp legend={{}} />);
    expect(
      screen.queryByText('You need to specify valid numbers for the labels property')
    ).toBeInTheDocument();
  });
  describe('discontinuous', () => {
    test('renders correctly', () => {
      render(<LegendRamp legend={DEFAULT_LEGEND} />);
      expect(screen.queryByText('< 0')).toBeInTheDocument();
      expect(screen.queryByText('≥ 200')).toBeInTheDocument();

      const elements = document.querySelectorAll('[class*="step"]');
      expect(elements.length).toBe(3);
      getPalette(COLOR, 3).forEach((color, idx) => {
        const backgroundColor = window.getComputedStyle(elements[idx])[
          'background-color'
        ];
        expect(backgroundColor).toBe(hexToRgb(color));
      });
    });
    test('renders formatted labels correctly', () => {
      render(<LegendRamp legend={DEFAULT_LEGEND_WITH_FORMATTED_LABELS} />);
      expect(screen.queryByText('< 0 km')).toBeInTheDocument();
      expect(screen.queryByText('≥ 200 km')).toBeInTheDocument();

      const elements = document.querySelectorAll('[class*="step"]');
      expect(elements.length).toBe(3);
      getPalette(COLOR, 3).forEach((color, idx) => {
        const backgroundColor = window.getComputedStyle(elements[idx])[
          'background-color'
        ];
        expect(backgroundColor).toBe(hexToRgb(color));
      });
    });
  });
  describe('continuous', () => {
    test('renders correctly', () => {
      render(<LegendRamp legend={DEFAULT_LEGEND} isContinuous={true} />);
      expect(screen.queryByText('0')).toBeInTheDocument();
      expect(screen.queryByText('200')).toBeInTheDocument();

      const ramp = document.querySelector('.step');
      const palette = getPalette(COLOR, 2);
      expect(ramp).toHaveStyle(
        `background: linear-gradient(to right, ${palette.join()})`
      );
    });
    test('renders formatted labels correctly', () => {
      render(
        <LegendRamp legend={DEFAULT_LEGEND_WITH_FORMATTED_LABELS} isContinuous={true} />
      );
      expect(screen.queryByText('0 km')).toBeInTheDocument();
      expect(screen.queryByText('200 km')).toBeInTheDocument();

      const ramp = document.querySelector('.step');
      const palette = getPalette(COLOR, 2);
      expect(ramp).toHaveStyle(
        `background: linear-gradient(to right, ${palette.join()})`
      );
    });
  });
});
