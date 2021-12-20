import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import FeatureSelectionWidgetUI from '../../../src/widgets/FeatureSelectionWidgetUI';
import { buildReactPropsAsString } from '../../utils';

const options = {
  title: 'Widgets UI/FeatureSelectionWidgetUI',
  component: FeatureSelectionWidgetUI,
  argTypes: {
    activated: {
      control: { type: 'boolean' }
    },
    editable: {
      control: { type: 'boolean' }
    }
  }
};

export default options;

const Template = (args) => {
  const [activated, setActivated] = useState(args.activated ?? false);
  const [selectedDrawMode, setSelectedDrawMode] = useState(null);

  return (
    <Box width={72}>
      <FeatureSelectionWidgetUI
        {...args}
        selectedDrawMode={selectedDrawMode}
        onSelectDrawMode={setSelectedDrawMode}
        activated={activated}
        onActivatedChange={setActivated}
      />
    </Box>
  );
};
export const Default = Template.bind({});
const DefaultProps = {};
Default.args = DefaultProps;
Default.parameters = buildReactPropsAsString(DefaultProps, 'FeatureSelectionWidgetUI');
