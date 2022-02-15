import React from 'react';
import { getMaterialUIContext } from './testUtils';
import LegendWidgetUI, { LEGEND_TYPES } from '../../src/widgets/legend/LegendWidgetUI';
import { fireEvent, render, screen } from '@testing-library/react';
import { Typography } from '@material-ui/core';

const CUSTOM_CHILDREN = <Typography>Legend custom</Typography>;

const MY_CUSTOM_LEGEND_KEY = 'my-custom-legend';

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
    },
    {
      id: 'custom',
      title: 'Single Layer',
      visible: true,
      showOpacityControl: true,
      opacity: 0.6,
      legend: {
        type: MY_CUSTOM_LEGEND_KEY,
        note: 'lorem',
        colors: ['#000', '#00F', '#0F0'],
        labels: ['Category 1', 'Category 2', 'Category 3']
      }
    },
    {
      id: 'custom',
      title: 'Single Layer',
      visible: true,
      showOpacityControl: true,
      opacity: 0.6,
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

  test('renders an error message if legend is unknown', () => {
    const UNKNOWN_KEY = 'unknown';
    render(<Widget layers={[{ id: UNKNOWN_KEY, legend: { type: UNKNOWN_KEY } }]}></Widget>);
    expect(screen.getByText(`${UNKNOWN_KEY} is not a known legend type.`)).toBeInTheDocument();
  });

  test('with custom legend types', () => {
    const MyCustomLegendComponent = jest.fn();
    MyCustomLegendComponent.mockReturnValue(<p>Test</p>);
    render(
      <Widget
        layers={[DATA[6]]}
        customLegendTypes={{ [MY_CUSTOM_LEGEND_KEY]: MyCustomLegendComponent }}
      ></Widget>
    );
    expect(MyCustomLegendComponent).toHaveBeenCalled();
    expect(MyCustomLegendComponent).toHaveBeenCalledWith({ legend: DATA[6].legend }, {});
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('legend with opacity control', () => {
    const legendConfig = DATA[7];
    const onChangeOpacity = jest.fn();
    const container = render(
      <Widget layers={[legendConfig]} onChangeOpacity={onChangeOpacity}></Widget>
    );
    const layerOptionsBtn = screen.getByTitle('Layer options');
    expect(layerOptionsBtn).toBeInTheDocument();
    layerOptionsBtn.click();
    expect(screen.getByText('Opacity')).toBeInTheDocument();

    const opacitySelectorInput = container.getByTestId('opacity-slider');
    expect(opacitySelectorInput.value).toBe('' + legendConfig.opacity * 100);

    fireEvent.change(opacitySelectorInput, { target: { value: '50' } });

    expect(onChangeOpacity).toHaveBeenCalledTimes(1);
    expect(onChangeOpacity).toHaveBeenCalledWith({ id: legendConfig.id, opacity: 0.5 });
  });
});
