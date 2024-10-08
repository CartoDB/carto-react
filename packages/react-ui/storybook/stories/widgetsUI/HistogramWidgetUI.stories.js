import React from 'react';
import HistogramWidgetUI from '../../../src/widgets/HistogramWidgetUI/HistogramWidgetUI';
import { Label, ThinContainer } from '../../utils/storyStyles';
import { IntlProvider } from 'react-intl';

const options = {
  title: 'Widgets/HistogramWidgetUI',
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

const Widget = (props) => (
  <IntlProvider locale='en'>
    <HistogramWidgetUI {...props} />
  </IntlProvider>
);

const Template = (args) => {
  return <Widget {...args} />;
};

const LoadingTemplate = (args) => {
  return (
    <>
      <Label variant='body1' mb={3}>
        {'Limited width'}
      </Label>
      <ThinContainer>
        <Widget {...args} />
      </ThinContainer>

      <Label variant='body1' mt={8} mb={3}>
        {'Responsive'}
      </Label>
      <Widget {...args} />
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

export const OneNonZeroBinMid = LoadingTemplate.bind({});
OneNonZeroBinMid.args = {
  ...defaultProps,
  data: [0, 300, 0, 0, 0, 0, 0]
};

export const OneNonZeroBinStart = LoadingTemplate.bind({});
OneNonZeroBinStart.args = {
  ...defaultProps,
  data: [100, 0, 0, 0, 0, 0, 0]
};


export const OneNonZeroBinEnd = LoadingTemplate.bind({});
OneNonZeroBinEnd.args = {
  ...defaultProps,
  data: [0, 0, 0, 0, 0, 0, 100]
};
