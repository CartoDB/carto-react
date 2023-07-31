import React from 'react';
import ComparativePieWidgetUI from '../../../src/widgets/comparative/ComparativePieWidgetUI';
import { buildReactPropsAsString } from '../../utils/utils';
import { Label, ThinContainer } from '../../utils/storyStyles';

const options = {
  title: 'Widgets/ComparativePieWidgetUI',
  component: ComparativePieWidgetUI
};

export default options;

const Template = (args) => <ComparativePieWidgetUI {...args} />;

const LoadingTemplate = (args) => {
  return (
    <>
      <Label variant='body1' mb={3}>
        {'Limited width'}
      </Label>
      <ThinContainer>
        <ComparativePieWidgetUI {...args} />
      </ThinContainer>

      <Label variant='body1' mt={8} mb={3}>
        {'Responsive'}
      </Label>
      <ComparativePieWidgetUI {...args} />
    </>
  );
};

const sampleProps = {
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
  ],
  selectedCategories: ['data 1']
};

export const Default = Template.bind({});
Default.args = sampleProps;
Default.parameters = buildReactPropsAsString(sampleProps, 'ComparativePieWidgetUI');

export const Loading = LoadingTemplate.bind({});
Loading.args = { ...sampleProps, isLoading: true };
Loading.parameters = buildReactPropsAsString(sampleProps, 'ComparativePieWidgetUI');
