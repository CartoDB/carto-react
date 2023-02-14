import React from 'react';
import { render } from '../widgets/utils/testUtils';
import ComparativePieWidgetUI from '../../src/widgets/comparative/ComparativePieWidgetUI';
import { mockEcharts } from './testUtils';

const PIE_DATA_PROPS = {
  names: ['name 1', 'name 2'],
  data: [
    [
      { name: 'data 1', value: 40 },
      { name: 'data 2', value: 60 }
    ],
    [
      { name: 'data 1', value: 30 },
      { name: 'data 2', value: 70 }
    ]
  ],
  labels: [
    ['label 1', 'label 2'],
    ['label 1', 'label 2']
  ],
  colors: [
    ['#6732a8', '#32a852'],
    ['#a83232', '#ff9900']
  ]
};

describe('ComparativePieWidgetUI', () => {
  beforeAll(() => {
    mockEcharts.init();
  });

  afterAll(() => {
    mockEcharts.destroy();
  });

  const Widget = (props) => <ComparativePieWidgetUI {...PIE_DATA_PROPS} {...props} />;

  test('renders correctly', () => {
    render(<Widget />);
  });

  test('with one selected category', () => {
    render(<Widget selectedCategories={['data 1']} />);
  });

  test('rerenders with different selected category', () => {
    const { rerender } = render(<Widget selectedCategories={[]} />);

    rerender(<Widget selectedCategories={['data 1']} />);
    rerender(<Widget selectedCategories={['data 2']} />);
  });
});
