import React from 'react';
import ComparativeFormulaWidgetUI from '../../../src/widgets/comparative/ComparativeFormulaWidgetUI/ComparativeFormulaWidgetUI';
import { buildReactPropsAsString } from '../../utils';

const options = {
  title: 'Organisms/Widgets/ComparativeFormulaWidgetUI',
  component: ComparativeFormulaWidgetUI
};

export default options;

const Template = (args) => <ComparativeFormulaWidgetUI {...args} />;
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
