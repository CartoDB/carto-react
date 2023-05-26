import React from 'react';
import ScatterPlotWidgetUI from '../../../src/widgets/ScatterPlotWidgetUI/ScatterPlotWidgetUI';
import { Label, ThinContainer } from '../../utils/storyStyles';

const options = {
  title: 'Organisms/Widgets/ScatterPlotWidgetUI',
  component: ScatterPlotWidgetUI,
  parameters: {
    docs: {
      source: {
        type: 'auto'
      }
    }
  }
};

export default options;

const dataDefault = [
  [1000.0, 800.04],
  [800.07, 600.95]
];

const Template = (args) => <ScatterPlotWidgetUI {...args} />;

const LoadingTemplate = (args) => {
  return (
    <>
      <Label variant='body1' mb={3}>
        {'Limited width'}
      </Label>
      <ThinContainer>
        <ScatterPlotWidgetUI {...args} />
      </ThinContainer>

      <Label variant='body1' mt={8} mb={3}>
        {'Responsive'}
      </Label>
      <ScatterPlotWidgetUI {...args} />
    </>
  );
};

const defaultProps = { data: dataDefault, name: 'name' };

export const Default = Template.bind({});
Default.args = defaultProps;

export const xAxisFormatter = Template.bind({});
const xAxisFormatterProps = {
  name: 'xFormatter',
  data: dataDefault,
  xAxisFormatter: (v) => `${v / 1000}k`
};
xAxisFormatter.args = xAxisFormatterProps;

export const yAxisFormatter = Template.bind({});
const yAxisFormatterProps = {
  name: 'yFormatter',
  data: dataDefault,
  yAxisFormatter: (v) => ({ prefix: `$`, value: v })
};
yAxisFormatter.args = yAxisFormatterProps;

export const tooltipFormatter = Template.bind({});
const tooltipFormatterProps = {
  name: 'tooltipFormatter',
  data: dataDefault,
  tooltipFormatter: (v) => `Price $ ${v.value[1]} Sales: ${v.value[0]}`
};

tooltipFormatter.args = tooltipFormatterProps;

export const Loading = LoadingTemplate.bind({});
Loading.args = { ...defaultProps, isLoading: true };
