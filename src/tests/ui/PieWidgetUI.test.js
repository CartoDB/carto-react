import React from 'react';
import { render } from '@testing-library/react';
import { PieWidgetUI } from 'src/ui';
import { getMaterialUIContext, mockEcharts } from './utils';

describe('PieWidgetUI', () => {
  beforeAll(() => {
    mockEcharts.init();
  });

  afterAll(() => {
    mockEcharts.destroy();
  });

  const DATA = [
    {
      name: 'Category 1',
      value: 1
    },
    {
      name: 'Category 2',
      value: 1
    }
  ];

  const Widget = (props) =>
    getMaterialUIContext(
      <PieWidgetUI data={DATA} onSelectedCategoriesChange={() => {}} {...props} />
    );

  test('renders correctly', () => {
    render(<Widget />);
  });

  test('with selected categories', () => {
    render(<Widget selectedCategories={[DATA[0]]} />);
  });
});
