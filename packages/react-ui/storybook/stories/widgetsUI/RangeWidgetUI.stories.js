import React from 'react';
import RangeWidgetUI from '../../../src/widgets/RangeWidgetUI/RangeWidgetUI';
import { Label, ThinContainer } from '../../utils/storyStyles';

const options = {
  title: 'Widgets/RangeWidgetUI',
  component: RangeWidgetUI,
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
  return <RangeWidgetUI {...args} />;
};

const LoadingTemplate = (args) => {
  if (args.series && !Array.isArray(args.series)) {
    args.series = [];
  }

  return (
    <>
      <Label variant='body1' mb={3}>
        {'Limited width'}
      </Label>
      <ThinContainer>
        <RangeWidgetUI {...args} />
      </ThinContainer>

      <Label variant='body1' mt={8} mb={3}>
        {'Responsive'}
      </Label>
      <RangeWidgetUI {...args} />
    </>
  );
};

const data = {
  data: [400, 500],
  min: 0,
  max: 1000,
  limits: [300, 950]
};

export const Default = Template.bind({});
const DefaultProps = { ...data };
Default.args = DefaultProps;

export const Loading = LoadingTemplate.bind({});
const LoadingProps = { ...data, isLoading: true };
Loading.args = LoadingProps;
