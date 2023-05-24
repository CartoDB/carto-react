import React from 'react';
import ComparativeFormulaWidgetUI from '../../../src/widgets/comparative/ComparativeFormulaWidgetUI/ComparativeFormulaWidgetUI';
import { buildReactPropsAsString } from '../../utils/utils';
import { Label, ThinContainer } from '../../utils/storyStyles';

const options = {
  title: 'Organisms/Widgets/ComparativeFormulaWidgetUI',
  component: ComparativeFormulaWidgetUI
};

export default options;

const Template = (args) => <ComparativeFormulaWidgetUI {...args} />;

const LoadingTemplate = (args) => {
  return (
    <>
      <Label variant='body1' mb={3}>
        {'Limited width'}
      </Label>
      <ThinContainer>
        <ComparativeFormulaWidgetUI {...args} />
      </ThinContainer>

      <Label variant='body1' mt={8} mb={3}>
        {'Responsive'}
      </Label>
      <ComparativeFormulaWidgetUI {...args} />
    </>
  );
};

const sampleProps = {
  data: [
    { prefix: '$', suffix: ' sales', label: 'label 1', value: 1245 },
    { prefix: '$', suffix: ' sales', label: 'label 2', value: 3435.9 }
  ],
  colors: ['#ff9900']
};

export const Default = Template.bind({});
Default.args = sampleProps;
Default.parameters = buildReactPropsAsString(sampleProps, 'ComparativeFormulaWidgetUI');

export const Loading = LoadingTemplate.bind({});
Loading.args = { ...sampleProps, isLoading: true };
Loading.parameters = buildReactPropsAsString(sampleProps, 'ComparativeFormulaWidgetUI');
