import { Box } from '@mui/material';
import React, { useState } from 'react';
import FeatureSelectionWidgetUI from '../../../src/widgets/FeatureSelectionWidgetUI/FeatureSelectionWidgetUI';
import CursorIcon from '../../../src/assets/icons/CursorIcon';
import PolygonIcon from '../../../src/assets/icons/PolygonIcon';
import RectangleIcon from '../../../src/assets/icons/RectangleIcon';

const options = {
  title: 'Widgets/FeatureSelectionWidgetUI',
  component: FeatureSelectionWidgetUI,
  argTypes: {
    enabled: {
      control: { type: 'boolean' }
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium']
      }
    }
  },
  parameters: {
    docs: {
      source: {
        type: 'auto'
      }
    }
  }
};

export default options;

// MODES

const FEATURE_SELECTION_MODES = [
  { id: 'drawPolygonMode', label: 'polygon', icon: <PolygonIcon /> },
  { id: 'drawRectangleMode', label: 'rectangle', icon: <RectangleIcon /> }
];

const EDIT_MODES = [{ id: 'edit', label: 'Edit geometry', icon: <CursorIcon /> }];

const Template = (args) => {
  const [enabled, setEnabled] = useState(args.enabled ?? false);
  const [selectedMode, setSelectedMode] = useState(FEATURE_SELECTION_MODES[0].id);

  return (
    <Box display='inline-block'>
      <FeatureSelectionWidgetUI
        selectionModes={FEATURE_SELECTION_MODES}
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

export const Enabled = Template.bind({});
const EnabledProps = {
  enabled: true
};
Enabled.args = EnabledProps;

export const WithoutEdit = Template.bind({});
const WithoutEditProps = {
  editModes: []
};
WithoutEdit.args = WithoutEditProps;

export const WithGeometry = Template.bind({});
const WithGeometryProps = {
  geometry: {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0.5, 0.5]
    },
    properties: {
      name: 'Mask'
    }
  },
  onSelectGeometry: () => console.log('onSelectGeometry'),
  onDeleteGeometry: () => console.log('onDeleteGeometry')
};
WithGeometry.args = WithGeometryProps;

export const SmallSize = Template.bind({});
const SmallSizeProps = {
  geometry: {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0.5, 0.5]
    },
    properties: {
      name: 'Mask'
    }
  },
  size: 'small',
  onSelectGeometry: () => console.log('onSelectGeometry'),
  onDeleteGeometry: () => console.log('onDeleteGeometry')
};
SmallSize.args = SmallSizeProps;
