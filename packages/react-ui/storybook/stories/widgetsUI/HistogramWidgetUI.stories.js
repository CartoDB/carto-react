import React from 'react';
import HistogramWidgetUI from '../../../src/widgets/HistogramWidgetUI/HistogramWidgetUI';
import { Label, ThinContainer } from '../../utils/storyStyles';

const options = {
  title: 'Organisms/Widgets/HistogramWidgetUI',
  component: HistogramWidgetUI,
  parameters: {
    docs: {
      source: {
        type: 'auto'
      }
    }
  }
};

export default options;

const Template = (args) => {
  return <HistogramWidgetUI {...args} />;
};

const LoadingTemplate = (args) => {
  return (
    <>
      <Label variant='body1' mb={3}>
        {'Limited width'}
      </Label>
      <ThinContainer>
        <HistogramWidgetUI {...args} />
      </ThinContainer>

      <Label variant='body1' mt={8} mb={3}>
        {'Responsive'}
      </Label>
      <HistogramWidgetUI {...args} />
    </>
  );
};

const defaultProps = {
  data: [100, 300, 500, 250, 50, 200, 100],
  ticks: [100, 200, 300, 400, 500, 600],
  min: 0,
  max: 700
};

export const Empty = Template.bind({});
const EmptyProps = {
  ...defaultProps
};
Empty.args = EmptyProps;

export const xAxisFormatter = Template.bind({});
const xAxisFormatterProps = {
  ...defaultProps,
  xAxisFormatter: (v) => `${v / 1000}k`
};
xAxisFormatter.args = xAxisFormatterProps;

export const yAxisFormatter = Template.bind({});
const yAxisFormatterProps = {
  ...defaultProps,
  yAxisFormatter: (v) => `${v / 1000}k`
};
yAxisFormatter.args = yAxisFormatterProps;

export const Filtered = Template.bind({});
const FilteredProps = {
  ...defaultProps,
  selectedBars: [1, 2],
  tooltipFormatter: (params) => params[0].value + ' $'
};
Filtered.args = FilteredProps;

export const NonEqualSizeBins = Template.bind({});
const NonEqualSizeBinsProps = {
  ...defaultProps,
  ticks: [100, 200, 250, 450, 500, 600]
};
NonEqualSizeBins.args = NonEqualSizeBinsProps;

export const Loading = LoadingTemplate.bind({});
const LoadingProps = {
  ...defaultProps,
  isLoading: true
};
Loading.args = LoadingProps;
