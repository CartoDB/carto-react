import React from 'react';
import ComparativeCategoryWidgetUI from '../../../src/widgets/comparative/ComparativeCategoryWidgetUI/ComparativeCategoryWidgetUI';
import { Label, ThinContainer } from '../../utils/storyStyles';

const options = {
  title: 'Widgets/ComparativeCategoryWidgetUI',
  component: ComparativeCategoryWidgetUI
};

export default options;

const Template = (args) => <ComparativeCategoryWidgetUI {...args} />;

const LoadingTemplate = (args) => {
  return (
    <>
      <Label variant='body1' mb={3}>
        {'Limited width'}
      </Label>
      <ThinContainer>
        <ComparativeCategoryWidgetUI {...args} />
      </ThinContainer>

      <Label variant='body1' mt={8} mb={3}>
        {'Responsive'}
      </Label>
      <ComparativeCategoryWidgetUI {...args} />
    </>
  );
};

const categoryData = [
  [
    { name: 'data 1', value: 245 },
    { name: 'data 2', value: 354 },
    { name: 'data 3', value: 245 },
    { name: 'data 4', value: 354 },
    { name: 'data 5', value: 245 },
    { name: 'data 6', value: 354 }
  ],
  [
    { name: 'data 1', value: 454 },
    { name: 'data 2', value: 346 },
    { name: 'data 3', value: 454 },
    { name: 'data 4', value: 346 },
    { name: 'data 5', value: 454 },
    { name: 'data 6', value: 346 }
  ],
  [
    { name: 'data 1', value: 532 },
    { name: 'data 2', value: 754 },
    { name: 'data 3', value: 532 },
    { name: 'data 4', value: 754 },
    { name: 'data 5', value: 532 },
    { name: 'data 6', value: 754 }
  ]
];

const data = {
  data: categoryData,
  names: ['serie 1', 'serie 2', 'serie 3'],
  labels: ['label 1', 'label 2', 'label 3', 'label 4', 'label 5', 'label 6'],
  colors: ['#f27', '#fa0', '#32a852'],
  maxItems: 3,
  tooltipFormatter: (n) => `${Number(n).toFixed(2)}%`
};

export const Default = Template.bind({});
Default.args = { ...data };

export const Loading = LoadingTemplate.bind({});
Loading.args = { ...data, isLoading: true };
