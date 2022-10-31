import React from 'react';
import { render, screen } from '../../widgets/utils/testUtils';
import LegendProportion from '../../../src/widgets/legend/LegendProportion';

const DEFAULT_LEGEND = {
  labels: ['0', '200']
};

describe('LegendProportion', () => {
  test('renders correctly', () => {
    render(<LegendProportion legend={DEFAULT_LEGEND} />);
    expect(screen.queryByText('Max: 200')).toBeInTheDocument();
    expect(screen.queryByText('150')).toBeInTheDocument();
    expect(screen.queryByText('50')).toBeInTheDocument();
    expect(screen.queryByText('Min: 0')).toBeInTheDocument();
  });
  test('renders error if neither labels is defined', () => {
    render(<LegendProportion legend={{}} />);
    expect(
      screen.queryByText('You need to specify valid numbers for the labels property')
    ).toBeInTheDocument();
  });
});
