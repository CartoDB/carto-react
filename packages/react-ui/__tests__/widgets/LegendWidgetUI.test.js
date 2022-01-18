import React from 'react';
import { getMaterialUIContext } from './testUtils';
import LegendWidgetUI from '../../src/widgets/legend/LegendWidgetUI';
import { render, screen } from '@testing-library/react';
import { Typography } from '@material-ui/core';

const CUSTOM_CHILDREN = <Typography>Legend custom</Typography>;

describe('LegendWidgetUI', () => {
  const DATA = [
    {
      id: 'category',
      title: 'Category Layer',
      visible: true,
      legend: {
        type: 'category',
        note: 'lorem',
        colors: ['#000', '#00F', '#0F0'],
        labels: ['Category 1', 'Category 2', 'Category 3']
      }
    },
    {
      id: 'icon',
      title: 'Icon Layer',
      visible: true,
      legend: {
        type: 'icon',
        labels: ['Icon 1', 'Icon 2', 'Icon 3'],
        icons: [
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fnolan%2FMaps%2Fmarker1600.png&f=1&nofb=1',
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fnolan%2FMaps%2Fmarker1600.png&f=1&nofb=1',
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fnolan%2FMaps%2Fmarker1600.png&f=1&nofb=1'
        ]
      }
    },
    {
      id: 'bins',
      title: 'Ramp Layer',
      visible: true,
      legend: {
        type: 'bins',
        colors: ['#000', '#00F', '#0F0', '#F00'],
        labels: [100, 200, 300]
      }
    },
    {
      id: 'continuous',
      title: 'Ramp Layer',
      visible: true,
      legend: {
        type: 'continuous_ramp',
        colors: ['#000', '#00F', '#0F0', '#F00'],
        labels: [100, 200, 300]
      }
    },
    {
      id: 'proportion',
      title: 'Proportion Layer',
      visible: true,
      legend: {
        type: 'proportion',
        labels: [100, 500]
      }
    },
    {
      id: 'custom',
      title: 'Single Layer',
      visible: true,
      legend: {
        children: CUSTOM_CHILDREN
      }
    }
  ];
  const Widget = (props) => getMaterialUIContext(<LegendWidgetUI {...props} />);

  test('single legend', () => {
    render(<Widget layers={[DATA[0]]}></Widget>);
    expect(screen.queryByText('Layers')).not.toBeInTheDocument();
  });

  test('multiple legends', () => {
    render(<Widget layers={DATA}></Widget>);
    expect(screen.queryByText('Layers')).toBeInTheDocument();
    expect(screen.queryByTestId('categories-legend')).toBeInTheDocument();
  });

  test('multiple legends with collapsed as true', () => {
    render(<Widget layers={DATA} collapsed={true}></Widget>);
    expect(screen.queryByText('Layers')).toBeInTheDocument();
    expect(screen.queryByTestId('categories-legend')).not.toBeInTheDocument();
  });

  test('Category legend', () => {
    render(<Widget layers={[DATA[0]]}></Widget>);
    expect(screen.getByTestId('categories-legend')).toBeInTheDocument();
  });

  test('Icon legend', () => {
    render(<Widget layers={[DATA[1]]}></Widget>);
    expect(screen.getByTestId('icon-legend')).toBeInTheDocument();
  });

  test('Bins legend', () => {
    render(<Widget layers={[DATA[2]]}></Widget>);
    expect(screen.getByTestId('ramp-legend')).toBeInTheDocument();
  });

  test('Continuous legend', () => {
    render(<Widget layers={[DATA[3]]}></Widget>);
    expect(screen.getByTestId('ramp-legend')).toBeInTheDocument();
  });

  test('Proportion legend', () => {
    render(<Widget layers={[DATA[4]]}></Widget>);
    expect(screen.getByTestId('proportion-legend')).toBeInTheDocument();
  });

  test('Custom legend', () => {
    render(<Widget layers={[DATA[5]]}></Widget>);
    expect(screen.getByText('Legend custom')).toBeInTheDocument();
  });
});
