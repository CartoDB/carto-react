import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import DrawingToolWidgetUI from '../../../src/widgets/DrawingToolWidgetUI';
import { buildReactPropsAsString } from '../../utils';
import CursorIcon from '../../../src/assets/CursorIcon';
import PolygonIcon from '../../../src/assets/PolygonIcon';
import RectangleIcon from '../../../src/assets/RectangleIcon';

const options = {
  title: 'Widgets UI/DrawingToolWidgetUI',
  component: DrawingToolWidgetUI,
  argTypes: {
    enabled: {
      control: { type: 'boolean' }
    }
  }
};

export default options;

// MODES

const DRAW_MODES = [
  { id: 'polygon', label: 'polygon', icon: <PolygonIcon /> },
  { id: 'rectangle', label: 'rectangle', icon: <RectangleIcon /> }
];

const EDIT_MODES = [{ id: 'edit', label: 'Edit geometry', icon: <CursorIcon /> }];

const Template = (args) => {
  const [enabled, setEnabled] = useState(args.enabled ?? false);
  const [selectedMode, setSelectedMode] = useState(DRAW_MODES[0].id);

  return (
    <Box display='inline-block' minWidth={72}>
      <DrawingToolWidgetUI
        drawModes={DRAW_MODES}
        editModes={EDIT_MODES}
        {...args}
        selectedMode={selectedMode}
        onSelectMode={setSelectedMode}
        enabled={enabled}
        onEnabledChange={setEnabled}
      />
    </Box>
  );
};

export const Default = Template.bind({});
const DefaultProps = {};
Default.args = DefaultProps;
Default.parameters = buildReactPropsAsString(DefaultProps, 'DrawingToolWidgetUI');

export const Enabled = Template.bind({});
const EnabledProps = {
  enabled: true
};
Enabled.args = EnabledProps;
Enabled.parameters = buildReactPropsAsString(EnabledProps, 'DrawingToolWidgetUI');

export const WithoutEdit = Template.bind({});
const WithoutEditProps = {
  editModes: []
};
WithoutEdit.args = WithoutEditProps;
WithoutEdit.parameters = buildReactPropsAsString(WithoutEditProps, 'DrawingToolWidgetUI');

export const WithGeometry = Template.bind({});
const WithGeometryProps = {
  geometry: [{ geometry: 1 }],
  onSelectGeometry: () => console.log('onSelectGeometry'),
  onDeleteGeometry: () => console.log('onDeleteGeometry')
};
WithGeometry.args = WithGeometryProps;
WithGeometry.parameters = buildReactPropsAsString(
  WithGeometryProps,
  'DrawingToolWidgetUI'
);
