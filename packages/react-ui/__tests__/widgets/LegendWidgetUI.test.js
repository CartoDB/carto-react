import React from 'react';
import { getMaterialUIContext } from './testUtils';
import LegendWidgetUI from '../../src/widgets/legend/LegendWidgetUI';
import { render, screen } from '@testing-library/react';
import { Typography } from '@material-ui/core';

const CUSTOM_CHILDREN = <Typography>Legend custom</Typography>;

fdescribe('LegendWidgetUI', () => {
  const DATA = [
    {
      id: 'category',
      title: 'Category Layer',
      visible: true,
      type: 'category',
      note: 'lorem',
      colors: ['#000', '#00F', '#0F0'],
      labels: ['Category 1', 'Category 2', 'Category 3']
    },
    {
      id: 'icon',
      title: 'Icon Layer',
      visible: true,
      type: 'icon',
      labels: ['Icon 1', 'Icon 2', 'Icon 3'],
      icons: [
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fnolan%2FMaps%2Fmarker1600.png&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fnolan%2FMaps%2Fmarker1600.png&f=1&nofb=1',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fnolan%2FMaps%2Fmarker1600.png&f=1&nofb=1'
      ]
    },
    {
      id: 'bins',
      title: 'Ramp Layer',
      visible: true,
      type: 'bins',
      colors: ['#000', '#00F', '#0F0', '#F00'],
      labels: [100, 200, 300]
    },
    {
      id: 'continuous',
      title: 'Ramp Layer',
      visible: true,
      type: 'continuous_ramp',
      colors: ['#000', '#00F', '#0F0', '#F00'],
      labels: [100, 200, 300]
    },
    {
      id: 'proportion',
      title: 'Proportion Layer',
      visible: true,
      type: 'proportion',
      labels: [100, 500]
    },
    {
      id: 'custom',
      title: 'Single Layer',
      visible: true,
      children: CUSTOM_CHILDREN
    }
  ];
  const Widget = (props) => getMaterialUIContext(<LegendWidgetUI {...props} />);

  test('single layer', () => {
    render(<Widget legends={[DATA[0]]}></Widget>);
    expect(screen.queryByText('Layers')).not.toBeInTheDocument();
  });

  test('multiple layers', () => {
    render(<Widget legends={DATA}></Widget>);
    expect(screen.queryByText('Layers')).toBeInTheDocument();
  });
});
