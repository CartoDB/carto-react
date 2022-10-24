import React from 'react';
import ComparativeFormulaWidgetUI from '../../../src/widgets/ComparativeFormulaWidgetUI';

const options = {
  title: 'Custom Components/ComparativeFormulaWidgetUI',
  component: ComparativeFormulaWidgetUI
};

export default options;

const Template = (args) => <ComparativeFormulaWidgetUI {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [1245, 3435.9],
  labels: [
    { prefix: '$', suffix: ' sales', note: 'label 1' },
    { prefix: '$', suffix: ' sales', note: 'label 2' }
  ],
  colors: [{ note: '#ff9900' }, { note: '#6732a8' }]
};
