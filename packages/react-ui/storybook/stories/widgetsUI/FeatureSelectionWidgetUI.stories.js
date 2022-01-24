import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import FeatureSelectionWidgetUI from '../../../src/widgets/FeatureSelectionWidgetUI';
import { buildReactPropsAsString } from '../../utils';
import CursorIcon from '../../../src/assets/CursorIcon';
import PolygonIcon from '../../../src/assets/PolygonIcon';
import RectangleIcon from '../../../src/assets/RectangleIcon';

const options = {
  title: 'Widgets UI/FeatureSelectionWidgetUI',
  component: FeatureSelectionWidgetUI,
  argTypes: {
    enabled: {
      control: { type: 'boolean' }
    }
  }
};

export default options;

// MODES

const FEATURE_SELECTION_MODES = [
  { id: 'polygon', label: 'polygon', icon: <PolygonIcon /> },
  { id: 'rectangle', label: 'rectangle', icon: <RectangleIcon /> }
];

const EDIT_MODES = [{ id: 'edit', label: 'Edit geometry', icon: <CursorIcon /> }];

const Template = (args) => {
  const [enabled, setEnabled] = useState(args.enabled ?? false);
  const [selectedMode, setSelectedMode] = useState(FEATURE_SELECTION_MODES[0].id);

  return (
    <Box display='inline-block' minWidth={72}>
      <FeatureSelectionWidgetUI
        drawModes={FEATURE_SELECTION_MODES}
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
Default.parameters = buildReactPropsAsString(DefaultProps, 'FeatureSelectionWidgetUI');

export const Enabled = Template.bind({});
const EnabledProps = {
  enabled: true
};
Enabled.args = EnabledProps;
Enabled.parameters = buildReactPropsAsString(EnabledProps, 'FeatureSelectionWidgetUI');

export const WithoutEdit = Template.bind({});
const WithoutEditProps = {
  editModes: []
};
WithoutEdit.args = WithoutEditProps;
WithoutEdit.parameters = buildReactPropsAsString(
  WithoutEditProps,
  'FeatureSelectionWidgetUI'
);

export const WithGeometry = Template.bind({});
const WithGeometryProps = {
  geometry: [{ geometry: 1 }],
  onSelectGeometry: () => console.log('onSelectGeometry'),
  onDeleteGeometry: () => console.log('onDeleteGeometry')
};
WithGeometry.args = WithGeometryProps;
WithGeometry.parameters = buildReactPropsAsString(
  WithGeometryProps,
  'FeatureSelectionWidgetUI'
);
