import React from 'react';
import { render, screen } from '../../widgets/utils/testUtils';
import LegendProportion from '../../../src/widgets/new-legend/legend-types/LegendProportion';
import { IntlProvider } from 'react-intl';

const DEFAULT_LEGEND = {
  labels: ['0', '200']
};

describe('LegendProportion', () => {
  test('renders correctly', () => {
    render(
      <IntlProvider locale='en'>
        <LegendProportion legend={DEFAULT_LEGEND} />
      </IntlProvider>
    );
    expect(screen.queryByText('Max: 200')).toBeInTheDocument();
    expect(screen.queryByText('150')).toBeInTheDocument();
    expect(screen.queryByText('50')).toBeInTheDocument();
    expect(screen.queryByText('Min: 0')).toBeInTheDocument();
  });
  test('renders correctly without min and max', () => {
    render(
      <IntlProvider locale='en'>
        <LegendProportion legend={{ ...DEFAULT_LEGEND, showMinMax: false }} />
      </IntlProvider>
    );
    expect(screen.queryByText('Max')).not.toBeInTheDocument();
    expect(screen.queryByText('Min')).not.toBeInTheDocument();
    expect(screen.queryByText('200')).toBeInTheDocument();
    expect(screen.queryByText('150')).toBeInTheDocument();
    expect(screen.queryByText('50')).toBeInTheDocument();
    expect(screen.queryByText('0')).toBeInTheDocument();
  });
  test('renders error if neither labels is defined', () => {
    render(<LegendProportion legend={{}} />);
    expect(
      screen.queryByText('You need to specify valid numbers for the labels property')
    ).toBeInTheDocument();
  });
});
