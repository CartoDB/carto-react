import React from 'react';
import ComparativeFormulaWidgetUI from '../../../src/widgets/comparative/ComparativeFormulaWidgetUI';
import { buildReactPropsAsString } from '../../utils'

const options = {
  title: 'Custom Components/ComparativeFormulaWidgetUI',
  component: ComparativeFormulaWidgetUI
};

export default options;

const Template = (args) => <ComparativeFormulaWidgetUI {...args} />;
const sampleProps = {
  data: [1245, 3435.9],
  labels: [
    { prefix: '$', suffix: ' sales', note: 'label 1' },
    { prefix: '$', suffix: ' sales', note: 'label 2' }
  ],
  colors: [{ note: '#ff9900' }, { note: '#6732a8' }]
};

export const Default = Template.bind({});
Default.args = sampleProps;
Default.parameters = buildReactPropsAsString(sampleProps, 'ComparativeFormulaWidgetUI');
