import React from 'react';
import { render, screen } from '@testing-library/react';
import LegendRamp from '../../../src/widgets/legend/LegendRamp';
import { getPalette } from '../../../src/utils/palette';

const COLOR = 'TealGrn';

const LEGEND_WITH_STATS = {
  stats: {
    min: 0,
    max: 200
  },
  colors: COLOR
};

const LEGEND_WITH_LABELS = {
  labels: ['0', '200'],
  colors: COLOR
};

describe('LegendRamp', () => {
  test('renders error if neither labels and stats is defined', () => {
    render(<LegendRamp legend={{}} />);
    expect(
      screen.queryByText(
        'You need to specify valid numbers for the labels/stats property'
      )
    ).toBeInTheDocument();
  });
  describe('discontinuous', () => {
    test('renders correctly using stats', () => {
      render(<LegendRamp legend={LEGEND_WITH_STATS} />);
      expect(screen.queryByText('< 0')).toBeInTheDocument();
      expect(screen.queryByText('≥ 200')).toBeInTheDocument();

      const elements = document.querySelectorAll('[class*="step"]');
      expect(elements.length).toBe(2);
      getPalette(COLOR, 2).forEach((color, idx) =>
        expect(elements[idx]).toHaveStyle(`background-color: ${color}`)
      );
    });
    test('renders correctly using labels', () => {
      render(<LegendRamp legend={LEGEND_WITH_LABELS} />);
      expect(screen.queryByText('< 0')).toBeInTheDocument();
      expect(screen.queryByText('≥ 200')).toBeInTheDocument();

      const elements = document.querySelectorAll('[class*="step"]');
      expect(elements.length).toBe(3);
      getPalette(COLOR, 3).forEach((color, idx) =>
        expect(elements[idx]).toHaveStyle(`background-color: ${color}`)
      );
    });
  });
  describe('continuous', () => {
    test('renders correctly using stats', () => {
      render(<LegendRamp legend={LEGEND_WITH_STATS} isContinuous={true} />);
      expect(screen.queryByText('0')).toBeInTheDocument();
      expect(screen.queryByText('200')).toBeInTheDocument();

      const ramp = document.querySelector('[class*="step"]');
      const palette = getPalette(COLOR, 2);
      expect(ramp).toHaveStyle(`background-image: linear-gradient(to right, ${palette.join()})`);
    });
    test('renders correctly using labels', () => {
      render(<LegendRamp legend={LEGEND_WITH_LABELS} isContinuous={true} />);
      expect(screen.queryByText('0')).toBeInTheDocument();
      expect(screen.queryByText('200')).toBeInTheDocument();

      const ramp = document.querySelector('[class*="step"]');
      const palette = getPalette(COLOR, 2);
      expect(ramp).toHaveStyle(`background-image: linear-gradient(to right, ${palette.join()})`);
    });
  });
});
