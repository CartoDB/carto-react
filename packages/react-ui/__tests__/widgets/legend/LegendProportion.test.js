import React from 'react';
import { render, screen } from '@testing-library/react';
import LegendProportion from '../../../src/widgets/legend/LegendProportion';

const LEGEND_WITH_STATS = {
  stats: {
    min: 0,
    max: 200
  }
};

const LEGEND_WITH_LABELS = {
  labels: ['0', '200']
};

describe('LegendProportion', () => {
  test('renders correctly using stats', () => {
    render(<LegendProportion legend={LEGEND_WITH_STATS} />);
    expect(screen.queryByText('Max: 200')).toBeInTheDocument();
    expect(screen.queryByText('150')).toBeInTheDocument();
    expect(screen.queryByText('50')).toBeInTheDocument();
    expect(screen.queryByText('Min: 0')).toBeInTheDocument();
  });
  test('renders correctly using labels', () => {
    render(<LegendProportion legend={LEGEND_WITH_LABELS} />);
    expect(screen.queryByText('Max: 200')).toBeInTheDocument();
    expect(screen.queryByText('150')).toBeInTheDocument();
    expect(screen.queryByText('50')).toBeInTheDocument();
    expect(screen.queryByText('Min: 0')).toBeInTheDocument();
  });
  test('renders error if neither labels and stats is defined', () => {
    render(<LegendProportion legend={{}} />);
    expect(
      screen.queryByText(
        'You need to specify valid numbers for the labels/stats property'
      )
    ).toBeInTheDocument();
  });
});
