import React from 'react';
import LegendWidgetUI from '../../src/widgets/legend/LegendWidgetUI';
import { fireEvent, render, screen } from '../widgets/utils/testUtils';

const MY_CUSTOM_LEGEND_KEY = 'my-custom-legend';

describe('LegendWidgetUI', () => {
  const DATA = [
    {
      // 0
      id: 'category',
      title: 'Category Layer',
      visible: true,
      helperText: 'lorem',
      legend: {
        type: 'category',
        colors: ['#000', '#00F', '#0F0'],
        labels: ['Category 1', 'Category 2', 'Category 3']
      }
    },
    {
      // 1
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
      // 2
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
      // 3
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
      // 4
      id: 'proportion',
      title: 'Proportion Layer',
      visible: true,
      legend: {
        type: 'proportion',
        labels: [100, 500]
      }
    },
    {
      // 5
      id: 'custom_key',
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
    }
  ];

  const Widget = (props) => <LegendWidgetUI {...props} />;

  test('single legend', () => {
    render(<Widget layers={[DATA[0]]}></Widget>);
    // expanded legend toggle
    expect(screen.queryByText('Layers')).not.toBeInTheDocument();
    // collapsed legend toggle
    expect(screen.queryByLabelText('Layers')).not.toBeInTheDocument();
    // layer title
    expect(screen.queryByTestId('categories-legend')).toBeInTheDocument();
  });

  test('multiple legends', () => {
    render(<Widget layers={DATA}></Widget>);
    expect(screen.queryByText('Layers')).toBeInTheDocument();
    expect(screen.queryByTestId('categories-legend')).toBeInTheDocument();
  });

  test('multiple legends with collapsed as true', () => {
    render(<Widget layers={DATA} collapsed={true}></Widget>);
    // expanded legend toggle
    expect(screen.queryByText('Layers')).not.toBeInTheDocument();
    // collapsed legend toggle
    expect(screen.queryByLabelText('Layers')).toBeInTheDocument();
    expect(screen.queryByTestId('categories-legend')).not.toBeInTheDocument();
  });

  test('layer with no legend is not shown on widget', () => {
    const layers = [
      {
        id: 'test-layer-no-legend',
        title: 'Test layer hidden',
        visible: true
      },
      {
        id: 'test-layer-no-legend-2',
        title: 'Test layer shown',
        visible: true,
        legend: {}
      }
    ];
    render(<Widget layers={layers}></Widget>);
    expect(screen.queryByText('Layers')).toBeInTheDocument();
    expect(screen.queryByText('Test layer hidden')).not.toBeInTheDocument();
    expect(screen.queryByText('Test layer shown')).toBeInTheDocument();
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

  test('Empty legend', () => {
    const EMPTY_LAYER = { id: 'empty', title: 'Empty Layer', legend: {} };
    render(<Widget layers={[EMPTY_LAYER]}></Widget>);
    expect(screen.getByText(EMPTY_LAYER.title)).toBeInTheDocument();
  });

  test('renders an error message if legend is unknown', () => {
    const UNKNOWN_KEY = 'unknown';
    render(
      <Widget layers={[{ id: UNKNOWN_KEY, legend: { type: UNKNOWN_KEY } }]}></Widget>
    );
    expect(
      screen.getByText(`${UNKNOWN_KEY} is not a known legend type.`)
    ).toBeInTheDocument();
  });

  test('with custom legend types', () => {
    const MyCustomLegendComponent = jest.fn();
    MyCustomLegendComponent.mockReturnValue(<p>Test</p>);

    render(
      <Widget
        layers={[DATA[5]]}
        customLegendTypes={{ [MY_CUSTOM_LEGEND_KEY]: MyCustomLegendComponent }}
      ></Widget>
    );

    expect(MyCustomLegendComponent).toHaveBeenCalled();
    expect(MyCustomLegendComponent).toHaveBeenCalledWith(
      { layer: DATA[5], legend: DATA[5].legend },
      {}
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('legend with opacity control', async () => {
    const legendConfig = {
      id: 'test-opacity-control',
      title: 'Test opacity control',
      visible: true,
      showOpacityControl: true,
      opacity: 0.8,
      legend: {}
    };
    const onChangeOpacity = jest.fn();
    const container = render(
      <Widget layers={[legendConfig]} onChangeOpacity={onChangeOpacity}></Widget>
    );

    const toggleButton = screen.getByRole('button', { name: 'Opacity' });
    expect(toggleButton).toBeInTheDocument();
    toggleButton.click();

    const opacitySelectorInput = container.getByTestId('opacity-slider');
    expect(opacitySelectorInput).toBeInTheDocument();

    expect(opacitySelectorInput.value).toBe(String(legendConfig.opacity * 100));

    fireEvent.change(opacitySelectorInput, { target: { value: 50 } });

    expect(onChangeOpacity).toHaveBeenCalledTimes(1);
    expect(onChangeOpacity).toHaveBeenCalledWith({ id: legendConfig.id, opacity: 0.5 });
  });

  test('should manage legend collapsed state correctly', () => {
    let legendConfig = { ...DATA[0], collapsed: true };
    const onChangeLegendRowCollapsed = jest.fn();

    const { rerender } = render(
      <Widget
        layers={[legendConfig]}
        onChangeLegendRowCollapsed={onChangeLegendRowCollapsed}
      ></Widget>
    );

    expect(screen.queryByTestId('legend-layer-variable-list')).not.toBeInTheDocument();

    const toggleButton = screen.getByRole('button', { name: 'Expand layer' });
    expect(toggleButton).toBeInTheDocument();
    toggleButton.click();

    expect(onChangeLegendRowCollapsed).toHaveBeenCalledTimes(1);
    expect(onChangeLegendRowCollapsed).toHaveBeenCalledWith({
      id: legendConfig.id,
      collapsed: false
    });

    legendConfig = { ...DATA[0], collapsed: false };

    rerender(
      <Widget
        layers={[legendConfig]}
        onChangeLegendRowCollapsed={onChangeLegendRowCollapsed}
      ></Widget>
    );

    expect(screen.getByTestId('legend-layer-variable-list')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Collapse layer' })).toBeInTheDocument();
  });

  test('helper text', () => {
    render(<Widget layers={[{ ...DATA[0], helperText: 'helperText' }]}></Widget>);
    expect(screen.getByText('helperText')).toBeInTheDocument();
  });
});
